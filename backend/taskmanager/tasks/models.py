from django.db import models
import random

def generate_task_id():
    return str(random.randint(10000, 99999))  # generates 5-digit number as string

class Task(models.Model):
    STATUS_CHOICES = [
        ('todo', 'To Do'),
        ('in_progress', 'In Progress'),
        ('done', 'Done'),
    ]
    task_id = models.CharField(max_length=5, unique=True, editable=False, default=generate_task_id)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='todo')
    due_date = models.DateTimeField()

    def __str__(self):
        return self.title

