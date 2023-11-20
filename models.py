from django.db import models
import uuid

# Create your models here.

class Upload1(models.Model):
    uid = models.UUIDField(editable=False,default=uuid.uuid4)
    name  = models.CharField(max_length=100)
    uploaded_at = models.DateTimeField(auto_now_add = True)
 
 