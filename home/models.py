from django.db import models
from django.core.validators import MinValueValidator

class Trip(models.Model):
    """Model to store user trip plans"""
    destination = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    num_travelers = models.IntegerField(validators=[MinValueValidator(1)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.destination} ({self.start_date} - {self.end_date})"


class ItineraryDay(models.Model):
    """Model to store daily itinerary for a trip"""
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='itinerary_days')
    day_number = models.IntegerField()
    date = models.DateField()
    activities = models.TextField()  # JSON string of activities
    hotels = models.TextField(null=True, blank=True)  # JSON string of recommended hotels
    notes = models.TextField(blank=True)
    
    class Meta:
        ordering = ['day_number']
        unique_together = ['trip', 'day_number']
    
    def __str__(self):
        return f"Day {self.day_number} - {self.date}"
