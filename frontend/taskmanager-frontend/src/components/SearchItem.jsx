import React, { useState } from 'react';
import { Table, Input, Button, message, Space, Popconfirm, Form } from 'antd';
import { getTask, deleteTask } from '../api';
import {
  SearchOutlined,
  RollbackOutlined,
  EditOutlined,
} from '@ant-design/icons';

// Import validator function (should return a Promise rejection with error msg)
import { validateTaskId } from '../validation/taskValidation';

const SearchItem = ({ onEdit, onSearchActive }) => {
  const [form] = Form.useForm();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTask = () => {
  form
    .validateFields()
    .then(async (values) => {
      setLoading(true);
      try {
        const res = await getTask(values.task_id.trim());
        setTask(res.data);
        onSearchActive(true);
        form.setFields([
          { name: 'task_id', errors: [] }, // clear previous errors
        ]);
      } catch (err) {
        setTask(null);
        onSearchActive(false);
        // Set form field error on task_id
        form.setFields([
          {
            name: 'task_id',
            errors: ['Task ID not found'],
          },
        ]);
      }
      setLoading(false);
    })
    .catch(() => {
      setTask(null);
      onSearchActive(false);
      // validation error will be shown on input automatically
    });
};


  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTask(null);
      form.resetFields();
      onSearchActive(false);
      message.success('Task deleted');
    } catch (err) {
      message.error('Failed to delete task');
    }
  };

  const handleBack = () => {
    setTask(null);
    form.resetFields();
    onSearchActive(false);
  };

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Task ID', dataIndex: 'task_id', key: 'task_id' },
    {
      title: 'Due Date',
      dataIndex: 'due_date',
      key: 'due_date',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => onEdit(record.task_id)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => handleDelete(record.task_id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <Form form={form} layout="inline" initialValues={{ task_id: '' }}>
        <Form.Item
          name="task_id"
          rules={[{ validator: validateTaskId }]}
          style={{ flex: 1, minWidth: 200 }}
        >
          <Input
            placeholder="Enter Task ID"
            onPressEnter={fetchTask}
            allowClear
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            loading={loading}
            onClick={fetchTask}
          >
            Retrieve Task
          </Button>
        </Form.Item>
      </Form>

      {task && (
        <Table
          rowKey="task_id"
          columns={columns}
          dataSource={[task]}
          loading={loading}
          pagination={false}
          style={{ marginTop: 16 }}
        />
      )}

      {task && (
        <Button
          onClick={handleBack}
          icon={<RollbackOutlined />}
          style={{ marginTop: 16 }}
        >
          Go Back
        </Button>
      )}
    </>
  );
};

export default SearchItem;
