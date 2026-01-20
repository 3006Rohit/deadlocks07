import pandas as pd
import numpy as np
import requests
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.preprocessing import OneHotEncoder
from datetime import datetime, timedelta
from geopy.geocoders import Nominatim
import logging
import os
from dotenv import load_dotenv

# Load environment variables for API keys
load_dotenv()

class AdvancedHimachalPlanner:
    def __init__(self):
        """Initialize advanced trip planner with APIs and ML models"""
        self.encoder = OneHotEncoder(handle_unknown='ignore')
        self.geolocator = Nominatim(user_agent="himachal_planner")
        self.logger = self._setup_logger()
        self.models = {
            'hotel': GradientBoostingRegressor(),
            'activity': GradientBoostingRegressor()
        }
        # Get API key from environment variable or use fallback
        self.weather_api_key = os.getenv('OPENWEATHER_API_KEY')
        self._load_datasets()
        
    def _setup_logger(self):
        """Configure logging system"""
        logging.basicConfig(level=logging.INFO)
        return logging.getLogger(__name__)
        
    def _load_datasets(self):
        """Load and preprocess datasets"""
        try:
            self.hotels = pd.read_csv('himachal_hotels_expanded.csv')
            self.activities = pd.read_csv('himachal_activities_expanded.csv')
            self.weather_data = self._fetch_weather_history()
        except FileNotFoundError as e:
            self.logger.error(f"Dataset file not found: {e}")
            raise
        except Exception as e:
            self.logger.error(f"Error loading datasets: {e}")
            raise
            
    def _fetch_weather_history(self):
        """Get historical weather patterns"""
        try:
            response = requests.get('https://api.weather.com/himachal_history')
            if response.status_code == 200:
                return pd.DataFrame(response.json())
            else:
                self.logger.warning(f"Weather API returned status code: {response.status_code}")
                return pd.DataFrame()
        except Exception as e:
            self.logger.warning(f"Weather API failed: {e}")
            return pd.DataFrame()
            
    def _get_current_weather(self, city):
        """Fetch real-time weather for a city"""
        if not self.weather_api_key:
            self.logger.warning("No weather API key found, skipping weather data")
            return None
            
        try:
            location = self.geolocator.geocode(city + ", Himachal Pradesh")
            if not location:
                self.logger.warning(f"Could not geolocate {city}, Himachal Pradesh")
                return None
                
            response = requests.get(
                f"https://api.openweathermap.org/data/2.5/weather?lat={location.latitude}&lon={location.longitude}&appid={self.weather_api_key}"
            )
            
            if response.status_code != 200:
                self.logger.error(f"Weather API returned status code: {response.status_code}")
                return None
                
            data = response.json()
            
            # Extract only weather condition and temperature
            if data and 'weather' in data and 'main' in data:
                return {
                    'condition': data['weather'][0]['description'],
                    'temperature': data['main']['temp']
                }
            return None
        except Exception as e:
            self.logger.error(f"Weather fetch failed: {e}")
            return None
            
    def test_api_key(self):
        """Test if the API key is loaded correctly"""
        if not self.weather_api_key:
            print("API key not found.")
        else:
            print(f"API key loaded: {self.weather_api_key}")

    def train_models(self):
        """Train all recommendation models"""
        self._train_hotel_model()
        self._train_activity_model()
        
    def _train_hotel_model(self):
        """Train hotel recommendation model"""
        # Convert truly numeric columns
        numeric_cols = ['price', 'rating', 'amenities_score', 'popularity_score']
        self.logger.info("Hotel data before processing:")
        self.logger.info(self.hotels[numeric_cols + ['room_types', 'breakfast_included', 'free_cancellation']].head())
        
        # Convert numeric columns
        for col in numeric_cols:
            self.hotels[col] = pd.to_numeric(self.hotels[col], errors='coerce')
            self.logger.info(f"Converted {col} to numeric.")
        
        # Convert boolean columns
        bool_cols = ['breakfast_included', 'free_cancellation']
        for col in bool_cols:
            self.hotels[col] = self.hotels[col].astype(int)
            self.logger.info(f"Converted {col} to numeric (0/1).")
        
        # One-hot encode room types
        room_types_encoded = self.encoder.fit_transform(self.hotels[['room_types']]).toarray()
        room_types_df = pd.DataFrame(room_types_encoded, 
                                   columns=self.encoder.get_feature_names_out(['room_types']))
        
        # Combine all features
        self.hotels = pd.concat([self.hotels, room_types_df], axis=1)
        
        # Drop rows with missing values and original room_types column
        self.hotels = self.hotels.dropna(subset=numeric_cols).drop(columns=['room_types'])
        
        # Prepare features and target
        feature_cols = numeric_cols + bool_cols + list(room_types_df.columns)
        X = self.hotels[feature_cols]
        y = self.hotels['popularity_score']
        
        self.logger.info(f"Training model with {len(X)} samples")
        self.models['hotel'].fit(X, y)
            
    def _train_activity_model(self):
        """Train activity recommendation model"""
        X = self.activities[['cost', 'duration', 'type_encoded', 'weather_sensitive', 'min_age']]
        y = self.activities['satisfaction_score']
        self.models['activity'].fit(X, y)
        
    def generate_itinerary(self, budget, days, travelers, preferences):
        """
        Generate optimized multi-day itinerary
        Args:
            budget: Total trip budget (INR)
            days: Number of days
            travelers: Number of people
            preferences: Dict of user preferences
        """
        # Validate inputs
        if days < 2 or days > 14:
            raise ValueError("Trip duration must be 2-14 days")
            
        # Select destination based on preferences
        destination = self._select_destination(preferences)
        
        # Get weather forecast
        weather = self._get_current_weather(destination)
        
        # Generate daily plans
        itinerary = {
            'destination': destination,
            'weather_info': {
                'condition': weather['condition'] if weather else 'Unknown',
                'temperature_celsius': round(weather['temperature'] - 273.15, 1) if weather else None
            },
            'daily_plans': [],
            'total_estimated_cost': 0
        }
        
        daily_budget = budget / days
        remaining_budget = budget
        
        for day in range(1, days+1):
            date = (datetime.now() + timedelta(days=day)).strftime('%Y-%m-%d')
            daily_plan = self._plan_day(
                destination=destination,
                date=date,
                daily_budget=daily_budget,
                travelers=travelers,
                preferences=preferences,
                weather=weather
            )
            itinerary['daily_plans'].append(daily_plan)
            remaining_budget -= daily_plan['day_cost']
            
        itinerary['total_estimated_cost'] = budget - remaining_budget
        
        # Format output to match requested structure
        output = f"Destination: {itinerary['destination']}\n"
        output += f"Current Weather: {itinerary['weather_info']['condition']}, {itinerary['weather_info']['temperature_celsius']}°C\n\n"
        
        for i, daily_plan in enumerate(itinerary['daily_plans'], start=1):
            output += f"Day {i} ({(datetime.now() + timedelta(days=i)).strftime('%Y-%m-%d')})\n"
            if daily_plan['hotel']:
                output += f"Accommodation: {daily_plan['hotel']['name']} (₹{daily_plan['hotel']['price']})\n"
                output += f"Rating: {daily_plan['hotel']['rating']}★ | Amenities: {daily_plan['hotel']['amenities_score']}/10 | Location: {daily_plan['hotel']['location']}\n"
                output += f"Room: {daily_plan['hotel']['room_types']} | Breakfast included: {daily_plan['hotel']['breakfast_included']} | Free cancellation: {daily_plan['hotel']['free_cancellation']}\n"
            output += "Activities:\n"
            for activity in daily_plan['activities']:
                output += f"{activity['name']} ({activity['duration']} hours, ₹{activity['cost']})\n"
                output += f"{activity['type']} activity | Satisfaction: {activity['satisfaction_score']}/100 | Weather-sensitive: {activity['weather_sensitive']}\n"
            output += f"Total Day Cost: ₹{daily_plan['day_cost']}\n\n"
        
        output += "Weather Considerations:\n"
        output += "All activities are weather-sensitive\n"
        if weather and 'condition' in weather:
            output += f"Current {weather['condition']} condition is "
            if 'rain' in weather['condition'].lower():
                output += "not ideal for outdoor activities\n"
            else:
                output += "suitable for outdoor activities\n"
        
        if weather and 'temperature' in weather:
            temp_c = round(weather['temperature'] - 273.15, 1)
            output += f"Temperature around {temp_c}°C is "
            if 10 <= temp_c <= 25:
                output += "ideal for trekking\n"
            elif temp_c < 10:
                output += "quite cold, bring warm clothing\n"
            else:
                output += "warm, stay hydrated during activities\n"
        
        output += f"Total Estimated Trip Cost: ₹{itinerary['total_estimated_cost']}\n"
        
        return output
        
    def _plan_day(self, destination, date, daily_budget, travelers, preferences, weather):
        """Plan activities for a single day"""
        # Select hotel if first day
        hotel = None
        if date == (datetime.now() + timedelta(days=1)).strftime('%Y-%m-%d'):
            hotel = self._select_hotel(destination, daily_budget * 0.4, travelers)
            
        # Select activities based on weather and preferences
        activities = self._select_activities(
            destination=destination,
            budget=daily_budget - (hotel['price']/travelers if hotel else 0),
            preferences=preferences,
            weather=weather
        )
        
        return {
            'date': date,
            'hotel': hotel,
            'activities': activities,
            'day_cost': (hotel['price'] if hotel else 0) + sum(a['cost'] for a in activities)
        }
        
    def _select_hotel(self, destination, budget, travelers):
        """Select best hotel within budget with robust column handling"""
        try:
            # Filter hotels
            candidates = self.hotels[
                (self.hotels['city'] == destination) & 
                (self.hotels['price'] <= budget / travelers)
            ].copy()
            
            self.logger.info(f"Found {len(candidates)} hotels within budget")
            self.logger.info(f"Columns in filtered candidates: {candidates.columns.tolist()}")
            
            if len(candidates) == 0:
                self.logger.warning(f"No hotels found in {destination} within budget of ₹{budget}")
                # Return a placeholder default hotel if none available
                return {
                    'name': 'Budget Accommodation',
                    'price': budget,
                    'rating': 3.0,
                    'amenities_score': 5,
                    'location': destination,
                    'room_types': 'Standard',
                    'breakfast_included': False,
                    'free_cancellation': False
                }
                
            # Ensure candidates has all required columns
            required_cols = {
                'room_types': 'Standard',
                'breakfast_included': True,
                'free_cancellation': True
            }
            
            for col, default in required_cols.items():
                if col not in candidates.columns:
                    candidates[col] = default
                    self.logger.warning(f"Using default value for missing column: {col} = {default}")
            
            # Prepare features
            room_types_encoded = self.encoder.transform(candidates[['room_types']])
            room_types_df = pd.DataFrame(
                room_types_encoded,
                columns=self.encoder.get_feature_names_out(['room_types']),
                index=candidates.index
            )
            
            # Combine features
            feature_cols = ['price', 'rating', 'amenities_score', 'breakfast_included', 'free_cancellation']
            
            # Ensure all required feature columns exist
            for col in feature_cols:
                if col not in candidates.columns:
                    candidates[col] = 0  # Default value if column is missing
            
            # Create feature matrix
            X = pd.concat([candidates[feature_cols], room_types_df], axis=1).fillna(0)
            
            # Predict scores
            candidates['pred_score'] = self.models['hotel'].predict(X)
            
            # Return best hotel
            best_hotel = candidates.nlargest(1, 'pred_score').iloc[0].to_dict()
            
            # Ensure all required fields are in the result
            required_fields = ['name', 'price', 'rating', 'amenities_score', 'location', 
                             'room_types', 'breakfast_included', 'free_cancellation']
            
            for field in required_fields:
                if field not in best_hotel:
                    if field == 'name':
                        best_hotel[field] = f"{destination} Hotel"
                    elif field == 'location':
                        best_hotel[field] = destination
                    else:
                        best_hotel[field] = 0
            
            return best_hotel
            
        except Exception as e:
            self.logger.error(f"Hotel selection failed: {str(e)}")
            # Return a default hotel in case of errors
            return {
                'name': 'Fallback Accommodation',
                'price': budget,
                'rating': 3.0,
                'amenities_score': 5,
                'location': destination,
                'room_types': 'Standard',
                'breakfast_included': False,
                'free_cancellation': False
            }
        
    def _select_activities(self, destination, budget, preferences, weather):
        """Select daily activities using ML model"""
        try:
            candidates = self.activities[
                (self.activities['city'] == destination) & 
                (self.activities['cost'] <= budget)
            ].copy()
            
            if len(candidates) == 0:
                self.logger.warning(f"No activities found in {destination} within budget of ₹{budget}")
                # Return empty activities list if none available
                return []
            
            # Filter by weather conditions
            if weather and isinstance(weather, dict) and 'condition' in weather:
                if 'rain' in weather['condition'].lower():
                    self.logger.info("Filtering out weather-sensitive activities due to rain")
                    candidates = candidates[~candidates['weather_sensitive']]
                    
            # Filter by preferences
            if preferences and preferences.get('activity_types'):
                self.logger.info(f"Filtering by activity types: {preferences['activity_types']}")
                candidates = candidates[
                    candidates['type'].isin(preferences['activity_types'])
                ]
                
            # If no activities match after filtering, reset filters
            if len(candidates) == 0:
                self.logger.warning("No activities match filters, resetting to all activities in budget")
                candidates = self.activities[
                    (self.activities['city'] == destination) & 
                    (self.activities['cost'] <= budget)
                ].copy()
                
            # Ensure required columns exist
            required_cols = ['cost', 'duration', 'type_encoded', 'name', 'type', 'satisfaction_score', 'weather_sensitive']
            for col in required_cols:
                if col not in candidates.columns:
                    if col == 'type_encoded':
                        candidates[col] = 0
                    elif col == 'satisfaction_score':
                        candidates[col] = 70
                    elif col == 'weather_sensitive':
                        candidates[col] = False
                    else:
                        candidates[col] = 'Unknown'
            
            # Predict satisfaction scores
            candidates['pred_score'] = self.models['activity'].predict(
                candidates[['cost', 'duration', 'type_encoded', 'weather_sensitive', 'min_age']]
            )
            
            # Optimize activity selection
            selected = []
            remaining_budget = budget
            remaining_time = 8  # hours
            
            for _, activity in candidates.sort_values('pred_score', ascending=False).iterrows():
                if activity['cost'] <= remaining_budget and activity['duration'] <= remaining_time:
                    selected.append(activity.to_dict())
                    remaining_budget -= activity['cost']
                    remaining_time -= activity['duration']
                    
                    # Stop if we have at least 2 activities and less than 2 hours remaining
                    if len(selected) >= 2 and remaining_time < 2:
                        break
                        
            return selected
            
        except Exception as e:
            self.logger.error(f"Activity selection failed: {str(e)}")
            return []
        
    def _select_destination(self, preferences):
        """Select destination based on user preferences"""
        try:
            # Implement destination scoring logic
            destinations = {
                'Shimla': {'urban': 8, 'nature': 6, 'adventure': 5, 'culture': 7, 'relaxation': 6},
                'Manali': {'urban': 5, 'nature': 9, 'adventure': 9, 'culture': 5, 'relaxation': 7},
                'Dharamshala': {'urban': 4, 'nature': 8, 'adventure': 6, 'culture': 9, 'relaxation': 8},
                'Dalhousie': {'urban': 3, 'nature': 9, 'adventure': 7, 'culture': 6, 'relaxation': 9},
                'Kasauli': {'urban': 4, 'nature': 7, 'adventure': 4, 'culture': 5, 'relaxation': 8}
            }
            
            if not preferences or not preferences.get('activity_types'):
                return np.random.choice(list(destinations.keys()))
                
            # Score each destination based on preferences
            scores = {}
            for dest, attrs in destinations.items():
                score = 0
                for pref in preferences.get('activity_types', []):
                    if pref in attrs:
                        score += attrs[pref]
                scores[dest] = score
                
            # Select destination with highest score
            if scores:
                best_destination = max(scores, key=scores.get)
                self.logger.info(f"Selected {best_destination} with score {scores[best_destination]}")
                return best_destination
            
            return np.random.choice(list(destinations.keys()))
            
        except Exception as e:
            self.logger.error(f"Destination selection failed: {str(e)}")
            # Return default destination in case of errors
            return 'Shimla'

# Example usage
if __name__ == "__main__":
    planner = AdvancedHimachalPlanner()
    planner.train_models()
    
    itinerary_output = planner.generate_itinerary(
        budget=50000,
        days=3,
        travelers=1,
        preferences={
            'activity_types': ['adventure', 'nature'],
            'pace': 'moderate'
        }
    )
    
    print(itinerary_output)
