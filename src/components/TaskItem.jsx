import React from 'react';

const TaskItem = ({ 
  task, 
  onToggle, 
  onDelete 
}) => {
  return (
    <div className="task-item">
      <div className="task-info">
        <input 
          type="checkbox" 
          className="task-checkbox" 
          checked={task.completed}
          onChange={onToggle}
        />
        <span className={`task-title ${task.completed ? 'task-completed' : ''}`}>
          {task.title}
        </span>
      </div>
      <div className="task-actions">
        <button 
          className="btn btn-delete"
          onClick={onDelete}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default TaskItem;