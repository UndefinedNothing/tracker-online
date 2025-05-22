import React from 'react';

const Task = ({ 
  task, 
  onToggleTask, 
  onDeleteTask 
}) => {
  return (
    <div key={task.id} className="task-item">
        <div className="task-info">
            <input 
                type="checkbox" 
                className="task-checkbox" 
                checked={task.completed}
                onChange={() => onToggleTask(currentGroupId, task.id)}
            />
            <span className={`task-title ${task.completed ? 'task-completed' : ''}`}>
                <a href={task.link} target="_blank">{task.title}</a>
            </span>
        </div>
        <div style={{ display: 'flex' }}>
            {task.completedAt && (
            <div className="task-date">
                Выполнено: {task.completedAt}
            </div>)}
            <div className="task-actions">
                <button 
                    className="btn btn-delete"
                    onClick={() => onDeleteTask(currentGroupId, task.id)}
                >
                    ✕
                </button>
            </div>
        </div>
    </div>
  );
};

export default Task;