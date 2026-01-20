import os
import pandas as pd
from datetime import datetime, timedelta
import logging

logger = logging.getLogger(__name__)

def load_data(file_path):
    """Load CSV data with error handling"""
    try:
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"Data file not found: {file_path}")
        return pd.read_csv(file_path)
    except Exception as e:
        logger.error(f"Error loading {file_path}: {str(e)}")
        raise

def generate_plan(budget, destination, from_date, to_date, trip_type):
    """Generate travel itinerary with proper error handling"""
    try:
        # Load data files with error handling
        data_dir = os.path.join(os.path.dirname(__file__), 'data')
        hotels = load_data(os.path.join(data_dir, "hotels.csv"))
        activities = load_data(os.path.join(data_dir, "activities.csv"))
        transport = load_data(os.path.join(data_dir, "transport.csv"))

        # Validate date format and calculate days
        try:
            from_date = datetime.strptime(from_date, "%Y-%m-%d")
            to_date = datetime.strptime(to_date, "%Y-%m-%d")
            num_days = (to_date - from_date).days + 1
            if num_days <= 0:
                raise ValueError("End date must be after start date")
        except ValueError as e:
            raise ValueError(f"Invalid date format: {str(e)}")

        # Weather functionality removed
        weather = "Weather information unavailable"

        # Find matching hotel
        hotel_matches = hotels[hotels['destination'] == destination]
        if len(hotel_matches) == 0:
            raise ValueError(f"No hotels found for destination: {destination}")
        hotel = hotel_matches.iloc[0]
        stay_cost = hotel['price_per_night'] * num_days

        # Find matching activities
        act = activities[(activities['destination'] == destination) & 
                         (activities['type'] == trip_type)]
        if len(act) == 0:
            raise ValueError(f"No activities found for {trip_type} in {destination}")
        selected_activities = act.head(num_days)

        # Build daily plan
        daily_plan = []
        total_activity_cost = 0
        for i in range(num_days):
            activity = selected_activities.iloc[i % len(selected_activities)]
            total_activity_cost += activity['price']
            daily_plan.append({
                "day": f"Day {i+1}",
                "activity": activity['activity'],
                "stay": hotel['hotel_name'],
                "cost": {
                    "stay": hotel['price_per_night'],
                    "food": 500,
                    "activity": activity['price']
                }
            })

        # Calculate transport cost
        transport_matches = transport[transport['to'] == destination]
        if len(transport_matches) == 0:
            raise ValueError(f"No transport options found to {destination}")
        travel_cost = transport_matches.iloc[0]['price']

        total = travel_cost + stay_cost + total_activity_cost + (500 * num_days)
        
        return {
            "destination": destination,
            "from": from_date.strftime("%Y-%m-%d"),
            "to": to_date.strftime("%Y-%m-%d"),
            "type": trip_type,
            "weather": weather,
            "total_estimated_expense": total,
            "itinerary": daily_plan
        }
    except Exception as e:
        logger.error(f"Error generating plan: {str(e)}")
        raise
