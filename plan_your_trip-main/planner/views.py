from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .itinerary_generator import generate_plan
import logging

logger = logging.getLogger(__name__)

class GenerateItineraryView(APIView):
    def get(self, request):
        return Response(
            {'error': 'This endpoint only accepts POST requests.'},
            status=status.HTTP_405_METHOD_NOT_ALLOWED
        )

    def post(self, request):
        try:
            # Validate required fields
            required_fields = ['budget', 'destination', 'from_date', 'to_date', 'trip_type']
            if not all(field in request.data for field in required_fields):
                return Response(
                    {'error': f'Missing required fields. Required: {", ".join(required_fields)}'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Generate itinerary
            itinerary = generate_plan(
                request.data['budget'],
                request.data['destination'],
                request.data['from_date'],
                request.data['to_date'],
                request.data['trip_type']
            )
            return Response(itinerary)

        except ValueError as e:
            logger.error(f"Validation error: {str(e)}")
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            return Response(
                {'error': 'An unexpected error occurred while generating itinerary'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
