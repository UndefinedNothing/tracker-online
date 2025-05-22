import React from 'react';

const TaskModal = ({ 
  show, 
  onClose, 
  onSubmit, 
  taskTitle, 
  setTaskTitle,
  taskLink, 
  setTaskLink
}) => {
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3 className="modal-title">Добавить новую задачу</h3>
        <div className="form-group">
          <label htmlFor="taskTitle">Название задачи</label>
          <input
            type="text"
            id="taskTitle"
            placeholder="Например: Задача о рюкзаке"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            autoFocus
          />

          <label htmlFor="taskLink">Ссылка</label>
          <input
            type="url"
            id="taskLink"
            placeholder="Например: https://acmp.ru"
            value={taskLink}
            onChange={(e) => setTaskLink(e.target.value)}
          />
        </div>
        <div className="modal-actions">
          <button 
            className="btn btn-cancel"
            onClick={onClose}
          >
            Отмена
          </button>
          <button className="btn btn-save" onClick={onSubmit}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;