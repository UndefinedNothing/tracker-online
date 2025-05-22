import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ 
  currentGroup, 
  onAddTask, 
  onToggleTask, 
  onDeleteTask 
}) => {
  if (!currentGroup) {
    return (
      <div className="tasks-section">
        <div className="empty-state">
          <img 
            src="box.png" 
            alt="Нет задач" 
          />
          <h3>Выберите цель</h3>
          <p>Или создайте новую цель для начала работы</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tasks-section">
      <button 
        className="btn btn-add"
        onClick={onAddTask}
      >
        + Добавить задачу
      </button>

      {currentGroup.tasks.length === 0 ? (
        <div className="empty-state">
          <img 
            src="box.png" 
            alt="Нет задач" 
          />
          <h3>Нет задач в этой группе</h3>
          <p>Добавьте первую задачу, нажав на кнопку выше</p>
        </div>
      ) : (
        currentGroup.tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={() => onToggleTask(currentGroup.id, task.id)}
            onDelete={() => onDeleteTask(currentGroup.id, task.id)}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;