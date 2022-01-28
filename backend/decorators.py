from rest_framework.response import Response


def try_except_decorator(error_message: str = 'Bad data', status=400):
    def decorator(function):
        def wrapper(self, *args, **kwargs):
            try:
                return function(self, *args, **kwargs)
            except Exception as e:
                return Response({'error': error_message}, status=status)

        return wrapper
    return decorator