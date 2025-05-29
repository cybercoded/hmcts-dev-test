// components/TaskItem.jsx
import React from 'react';
import { Card, Button, Space, Typography } from 'antd';
import {
  SearchOutlined,
  RollbackOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const { Paragraph, Text } = Typography;

const TaskItem = ({ task, onEdit, onDelete }) => {
  return (
    <Card
      title={task.title}
      style={{ marginBottom: 16 }}
      extra={
        <Space>
          <Button type="primary" icon={<EditOutlined />} onClick={() => onEdit(task.task_id)}>
            Edit
          </Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => onDelete(task.task_id)}>
            Delete
          </Button>
        </Space>
      }
    >
      {task.description && <Paragraph>{task.description}</Paragraph>}
      <Text strong>Task ID:</Text> <Text>{task.task_id}</Text>
      <br />
      <Text strong>Status:</Text> <Text> {task.status}</Text>
      <br />
      <Text strong>Due:</Text> <Text> {new Date(task.due_date).toLocaleString()}</Text>
    </Card>
  );
};

export default TaskItem;
