def is_int(str: str):
    try:
        int(str)
        return True
    except Exception:
        return False