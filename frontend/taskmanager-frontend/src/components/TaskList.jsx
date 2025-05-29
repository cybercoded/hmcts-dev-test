import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import { getTasks, deleteTask } from '../api';
import {
  SearchOutlined,
  RollbackOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const TaskList = ({ onEdit }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      message.error('Failed to load tasks');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      message.success('Task deleted');
      loadTasks();
    } catch (err) {
      message.error('Failed to delete task');
    }
  };

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Task ID', dataIndex: 'task_id', key: 'task_id' },
    { title: 'Due Date', dataIndex: 'due_date', key: 'due_date', render: text => new Date(text).toLocaleString() },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="link" icon={<EditOutlined />}  onClick={() => onEdit(record.task_id)}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => handleDelete(record.task_id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" icon={<DeleteOutlined />} danger>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return <Table rowKey="id" columns={columns} dataSource={tasks} loading={loading} />;
};

export default TaskList;
