from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from tasks.models import Task
from django.utils import timezone


class TaskTests(APITestCase):
    def setUp(self):
        self.task = Task.objects.create(title="Test Task", description="Test", status="todo", due_date=timezone.now().isoformat())

    def test_get_task_list(self):
        url = reverse('task-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) >= 1)

    def test_get_task_detail(self):
        url = reverse('task-detail', args=[self.task.task_id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['task_id'], self.task.task_id)

    def test_create_task(self):
        url = reverse('task-list')
        data = {"title": "New Task", "description": "Desc", "status": "todo", "due_date": timezone.now().isoformat()}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Task.objects.count(), 2)

    def test_delete_task(self):
        url = reverse('task-detail', args=[self.task.task_id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Task.objects.count(), 0)
