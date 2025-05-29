import React, { useEffect } from 'react';
import { Form, Input, Button, Select, DatePicker, message } from 'antd';
import moment from 'moment';
import { createTask, updateTask } from '../api';
import {
    RollbackOutlined,
    PlusOutlined,
    EditOutlined,
} from '@ant-design/icons';

// Import validators
import {
    validateTitle,
    validateDescription,
    validateStatus,
    validateDueDate,
} from '../validation/taskValidation';

const { TextArea } = Input;
const statusOptions = [
    { label: 'To Do', value: 'todo' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Done', value: 'done' },
];

const TaskForm = ({ initialValues, onSuccess, onCancel }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue({
                ...initialValues,
                due_date: moment(initialValues.due_date),
            });
        } else {
            form.resetFields();
        }
    }, [initialValues, form]);

    const onFinish = async (values) => {
        try {
            const payload = {
                ...values,
                due_date: values.due_date.toISOString(),
            };
            if (initialValues && initialValues.id) {
                await updateTask(initialValues.id, payload);
                message.success('Task updated successfully');
            } else {
                await createTask(payload);
                message.success('Task created successfully');
            }
            onSuccess();
            form.resetFields();
        } catch (err) {
            message.error('Failed to save task');
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
                name="title"
                label="Title"
                rules={[{ validator: validateTitle }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="description"
                label="Description"
                rules={[{ validator: validateDescription }]}
            >
                <TextArea rows={4} />
            </Form.Item>

            <Form.Item
                name="status"
                label="Status"
                rules={[{ validator: validateStatus }]}
            >
                <Select options={statusOptions} />
            </Form.Item>

            <Form.Item
                name="due_date"
                label="Due Date"
                rules={[{ validator: validateDueDate }]}
            >
                <DatePicker showTime />
            </Form.Item>

            <Form.Item>
                <Button
                    htmlType="submit"
                    icon={initialValues ? <EditOutlined /> : <PlusOutlined />}
                    type="primary"
                    style={{
                        marginRight: 8,
                        backgroundColor: initialValues ? '#52c41a' : undefined,
                        borderColor: initialValues ? '#52c41a' : undefined,
                    }}
                >
                    {initialValues ? 'Update' : 'Create'}
                </Button>

                {onCancel && (
                    <Button onClick={onCancel} icon={<RollbackOutlined />}>
                        Cancel
                    </Button>
                )}
            </Form.Item>
        </Form>
    );
};

export default TaskForm;
