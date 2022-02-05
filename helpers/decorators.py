from rest_framework.response import Response
from social_network.settings import DEBUG


def try_except_decorator(error_message: str = 'Something went wrong', status=500):
    def decorator(function):
        def wrapper(self, *args, **kwargs):
            try:
                return function(self, *args, **kwargs)
            except Exception as e:
                if DEBUG:
                    return Response({'detail': str(e)}, status=status)
                else:
                    return Response({'detail': error_message}, status=status)

        return wrapper
    return decorator
    