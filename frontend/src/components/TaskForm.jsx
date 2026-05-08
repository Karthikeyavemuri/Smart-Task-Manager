import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';

const StyledForm = styled(Form)`
  .form-label {
    font-weight: 500;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
  }
  
  .form-control, .form-select {
    margin-bottom: 1.5rem;
    transition: all 0.3s ease;
  }
`;

function TaskForm({ onTaskAdded }) {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'Pending',
    priority: 'Medium'
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title.trim()) return;
    onTaskAdded(task);
    setTask({ title: '', description: '', status: 'Pending', priority: 'Medium' });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Task Title</Form.Label>
        <Form.Control 
          className="custom-input"
          type="text" 
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="e.g. Update Resume..."
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control 
          className="custom-input"
          as="textarea" 
          rows={3}
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Add details about this task..."
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Priority Level</Form.Label>
        <Form.Select className="custom-select" name="priority" value={task.priority} onChange={handleChange}>
          <option value="High">🔥 High Priority</option>
          <option value="Medium">⚡ Medium Priority</option>
          <option value="Low">🧊 Low Priority</option>
        </Form.Select>
      </Form.Group>

      <Button type="submit" className="btn-primary-custom w-100 mt-2 py-3 shadow">
        Create New Task
      </Button>
    </StyledForm>
  );
}

export default TaskForm;
