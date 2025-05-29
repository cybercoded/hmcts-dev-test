import React, { useState } from 'react';
import { Layout, Button, Typography, message } from 'antd';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import RetrieveTaskById from './components/SearchItem';
import {
  RollbackOutlined,
  PlusOutlined
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isSearching, setIsSearching] = useState(false); // Controls whether search result is showing

  const openCreateForm = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const openEditForm = (taskId) => {
    fetch(`http://localhost:8000/api/tasks/${taskId}/`)
      .then(res => {
        if (!res.ok) throw new Error('Task not found');
        return res.json();
      })
      .then(task => {
        setEditingTask(task);
        setShowForm(true);
      })
      .catch(() => {
        message.error('Failed to fetch task details');
      });
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <Layout style={{ minHeight: '100vh', width: 1000, margin: '0 auto', padding: 24 }}>
      <Header style={{ background: '#fff', padding: '0 24px' }}>
        <Title level={2} style={{ margin: 0, lineHeight: '64px', borderRadius: '10px' }}>
          Caseworker Task Manager
        </Title>
      </Header>
      <Content style={{ padding: 24 }}>
        <div style={{ marginBottom: '20px' }}>
          <RetrieveTaskById onEdit={openEditForm} onSearchActive={setIsSearching} />
        </div>

        {showForm ? (
          <>
            <TaskForm
              initialValues={editingTask}
              onSuccess={closeForm}
              onCancel={closeForm}
            />
            <Button style={{ marginTop: 16 }} icon={<RollbackOutlined />} onClick={closeForm}>
              Back to Task List
            </Button>
          </>
        ) : (
          !isSearching && (
            <>
              <Button
                type="primary"
                onClick={openCreateForm}
                icon={<PlusOutlined />}
                style={{ marginBottom: 16, backgroundColor: '#52c41a', borderColor: '#52c41a' }}
              >
                Create New Task
              </Button>
              <TaskList onEdit={openEditForm} />
            </>
          )
        )}
      </Content>
    </Layout>
  );
}

export default App;
