import requests
import os
import hashlib
from typing import List
import logging

logger = logging.getLogger(__name__)

class ImageService:
    def __init__(self, upload_dir: str = "temp_images"):
        self.upload_dir = upload_dir
        if not os.path.exists(upload_dir):
            os.makedirs(upload_dir)

    def download_image(self, url: str) -> str:
        """
        Downloads an image from a URL and returns the local path.
        """
        try:
            response = requests.get(url, stream=True, timeout=10)
            if response.status_code == 200:
                # Create a unique filename based on URL hash
                file_ext = url.split('.')[-1].split('?')[0] or 'jpg'
                filename = f"{hashlib.md5(url.encode()).hexdigest()}.{file_ext}"
                filepath = os.path.join(self.upload_dir, filename)
                
                with open(filepath, 'wb') as f:
                    for chunk in response.iter_content(1024):
                        f.write(chunk)
                return filepath
        except Exception as e:
            logger.error(f"Error downloading image {url}: {str(e)}")
        return None

    def optimize_images(self, urls: List[str]) -> List[str]:
        """
        Downloads and prepares a list of images.
        """
        downloaded_paths = []
        for url in urls:
            path = self.download_image(url)
            if path:
                downloaded_paths.append(path)
        return downloaded_paths

    def cleanup(self, filepaths: List[str]):
        """
        Deletes temporary files after upload.
        """
        for path in filepaths:
            if os.path.exists(path):
                os.remove(path)
