import React from 'react';

const Tasks = ({
  currentGroupId,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  getCurrentGroup
}) => {
  return (
    <div className="tasks-section">
      {!currentGroupId ? (
        <div className="empty-state">
          <img src="box.png" alt="Нет задач" />
          <h3>Выберите цель</h3>
          <p>Или создайте новую цель для начала работы</p>
        </div>
      ) : (
        <>
          <button
            className="btn btn-add"
            onClick={onAddTask}
          >
            + Добавить задачу
          </button>

          {getCurrentGroup()?.tasks.length === 0 ? (
            <div className="empty-state">
              <img src="box.png" alt="Нет задач" />
              <h3>Нет задач в этой группе</h3>
              <p>Добавьте первую задачу, нажав на кнопку выше</p>
            </div>
          ) : (
            getCurrentGroup()?.tasks.map(task => (
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
            ))
          )}
        </>
      )}
    </div>
  );
};

export default Tasks;