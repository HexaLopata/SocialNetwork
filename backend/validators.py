import datetime
from django.forms import ValidationError

def validate_date(date: str):
    """
        validate date in format YYYY-MM-DD
    """
    try:
        datetime.datetime.strptime(date, '%Y-%m-%d')
    except ValueError:
        raise ValidationError("Incorrect date format, should be YYYY-MM-DD")