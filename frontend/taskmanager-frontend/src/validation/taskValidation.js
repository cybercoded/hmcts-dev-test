// validation/validation.js
export const validateTitle = (rule, value) => {
  if (!value || value.trim().length < 3) {
    return Promise.reject('Title must be at least 3 characters long.');
  }
  return Promise.resolve();
};

export const validateDescription = (rule, value) => {
  if (value && value.trim().length > 0 && value.trim().length < 5) {
    return Promise.reject('Description must be at least 5 characters long if provided.');
  }
  return Promise.resolve();
};

export const validateStatus = (rule, value) => {
  const validStatuses = ['todo', 'in_progress', 'done'];
  if (!value || !validStatuses.includes(value)) {
    return Promise.reject(`Status must be one of: ${validStatuses.join(', ')}`);
  }
  return Promise.resolve();
};

export const validateDueDate = (rule, value) => {
  if (!value) {
    return Promise.reject('Please select a due date.');
  }
  if (value.isBefore(new Date(), 'day')) {
    return Promise.reject('Due date cannot be in the past.');
  }
  return Promise.resolve();
};

// validation/validation.js (add this at the bottom or anywhere)
export const validateTaskId = (rule, value) => {
  if (!value || value.trim() === '') {
    return Promise.reject('Task ID is required');
  }
  // Add any other logic here, e.g. length or format checks
  if (!/^\d+$/.test(value.trim())) { // Example: taskId must be digits only
    return Promise.reject('Task ID must be numeric');
  }
  return Promise.resolve();
};

