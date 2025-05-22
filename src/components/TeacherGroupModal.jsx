import React from 'react';

const TeacherGroupModal = ({ 
  show, 
  onClose, 
  onSubmit, 
  groupName, 
  setGroupName,
  groupGoal, 
  setGroupGoal 
}) => {
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3 className="modal-title">Добавить новую цель</h3>
        <div className="form-group">
          <label htmlFor="groupName">Название цели</label>
          <input
            type="text"
            id="groupName"
            placeholder="Например: Решить 10 задач из LeetCode"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            autoFocus
          />

          <label htmlFor="groupGoal">Количество задач</label>
          <input
            type="number"
            min="1"
            id="groupGoal"
            value={groupGoal}
            onChange={(e) => setGroupGoal(e.target.value)}
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

export default TeacherGroupModal;