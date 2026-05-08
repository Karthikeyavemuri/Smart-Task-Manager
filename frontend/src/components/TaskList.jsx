import React from 'react';
import styled from 'styled-components';
import { Badge } from 'react-bootstrap';

const TaskCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-left: 4px solid ${props => 
    props.priority === 'High' ? '#ef4444' : 
    props.priority === 'Medium' ? '#f59e0b' : '#10b981'
  };
  border-radius: 16px;
  padding: 1.5rem 2rem;
  margin-bottom: 1.25rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  &:hover {
    transform: translateX(8px);
    background: rgba(255, 255, 255, 0.04);
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    border-color: rgba(255, 255, 255, 0.1);
  }
`;

const TaskTitle = styled.h5`
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #fff;
  font-size: 1.15rem;
  text-decoration: ${props => props.status === 'Completed' ? 'line-through' : 'none'};
  opacity: ${props => props.status === 'Completed' ? 0.5 : 1};
  transition: opacity 0.3s;
`;

const TaskDesc = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin-bottom: 1.25rem;
  line-height: 1.6;
  opacity: ${props => props.status === 'Completed' ? 0.5 : 1};
`;

const ActionButton = styled.button`
  background: transparent;
  border: 1px solid rgba(255,255,255,0.15);
  color: #fff;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    background: rgba(255,255,255,0.1);
  }
  
  &.delete {
    color: var(--text-secondary);
    border-color: transparent;
  }

  &.delete:hover {
    background: rgba(239, 68, 68, 0.15);
    color: #ef4444;
  }
`;

function TaskList({ tasks, onTaskUpdated, onTaskDeleted }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-5">
        <div style={{ fontSize: '4rem', opacity: 0.1, marginBottom: '1.5rem' }}>📝</div>
        <h5 className="text-white fw-semibold">No tasks yet</h5>
        <p className="text-secondary">Your workspace is perfectly clear. Add a task to get started.</p>
      </div>
    );
  }

  const toggleStatus = (task) => {
    const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    onTaskUpdated({ ...task, status: newStatus });
  };

  return (
    <div>
      {tasks.map(task => (
        <TaskCard key={task.id} priority={task.priority} status={task.status}>
          <div style={{ flex: 1, paddingRight: '2.5rem' }}>
            <div className="d-flex align-items-center gap-3 mb-2">
              <TaskTitle status={task.status} className="mb-0">{task.title}</TaskTitle>
              <Badge bg={
                task.status === 'Completed' ? 'success' : 
                task.status === 'In Progress' ? 'primary' : 'secondary'
              } pill className="fw-medium px-3 py-2 bg-opacity-75">
                {task.status}
              </Badge>
            </div>
            
            {task.description && <TaskDesc status={task.status}>{task.description}</TaskDesc>}
            
            <div className="d-flex gap-3 mt-3">
              <ActionButton onClick={() => toggleStatus(task)}>
                {task.status === 'Completed' ? '⏪ Reopen Task' : '✅ Mark as Complete'}
              </ActionButton>
            </div>
          </div>
          
          <ActionButton className="delete" onClick={() => onTaskDeleted(task.id)} title="Delete Task">
            🗑️
          </ActionButton>
        </TaskCard>
      ))}
    </div>
  );
}

export default TaskList;
