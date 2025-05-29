from rest_framework import serializers
from .models import Task
from datetime import datetime

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

    def validate_task_id(self, value):
        if not value.isdigit():
            raise serializers.ValidationError("Task ID must be numeric.")
        return value

    def validate_title(self, value):
        if not value or len(value.strip()) < 3:
            raise serializers.ValidationError("Title must be at least 3 characters long.")
        return value

    def validate_description(self, value):
        if not value or len(value.strip()) < 5:
            raise serializers.ValidationError("Description must be at least 5 characters long.")
        return value

    def validate_status(self, value):
        valid_statuses = ['todo', 'in_progress', 'done']  # Adjust per your status options
        if value.lower() not in valid_statuses:
            raise serializers.ValidationError(f"Status must be one of {valid_statuses}.")
        return value.lower()


    def validate_due_date(self, value):
        if value:
            value_date = value.date() if isinstance(value, datetime) else value
            if value_date < datetime.now().date():
                raise serializers.ValidationError("Due date cannot be in the past.")
        return value
