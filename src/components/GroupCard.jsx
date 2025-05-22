import React from 'react';

const GroupCard = ({ group, isActive, onSelect, onDelete }) => {
  const completedTasks = group.tasks.filter(t => t.completed).length;
  const totalTasks = group.tasks.length;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div 
      className={`group-card ${isActive ? 'active-group' : ''}`}
      onClick={onSelect}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>{group.name}</h3>
        <button 
          className="btn btn-delete" 
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          ×
        </button>
      </div>
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="progress-text">
        {completedTasks} из {totalTasks} задач выполнено
      </div>
    </div>
  );
};

export default GroupCard;