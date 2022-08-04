from file_api.models import Image
from channels.db import database_sync_to_async

class ImageService:
    def get_image_by_id(self, id: int):
        return Image.objects.filter(id=id).first()

    @database_sync_to_async
    def get_image_by_id_async(self, id: int):
        return self.get_image_by_id(id)