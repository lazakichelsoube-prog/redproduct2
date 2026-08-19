from django.db import models
from cloudinary_storage.storage import MediaCloudinaryStorage

class Hotel(models.Model):
    nom = models.CharField(max_length=255)
    adresse = models.CharField(max_length=255)
    email = models.EmailField()
    telephone = models.CharField(max_length=20)
    prix_nuit = models.DecimalField(max_digits=10, decimal_places=2)
    devise = models.CharField(max_length=10, default='XOF')
    photo = models.ImageField(upload_to='hotels/', storage=MediaCloudinaryStorage(), blank=True, null=True)
    date_creation = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nom