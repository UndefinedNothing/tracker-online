const TeacherGroupEditModal = ({ 
  show, 
  onClose, 
  onSubmit, 
  groupName, 
  setGroupName,
  dueDate,
  setDueDate,
  groupDiff,
  setGroupDiff,
  groupDiff1,
  setGroupDiff1,
  groupDiff2,
  setGroupDiff2,
  groupGoal, 
  setGroupGoal 
}) => {
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3 className="modal-title">Редактировать группу</h3>
        <div className="form-group">
          <label htmlFor="groupName">Название группы</label>
          <input
            type="text"
            id="groupName"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            autoFocus
          />

          <label htmlFor="groupDate">Срок</label>
          <input
            type="date"
            id="groupDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <label htmlFor="groupDiff">Минимальная сложность (от 1 до 100)</label>
          <input
            type="number"
            min="1"
            max="100"
            id="groupDiff"
            value={groupDiff}
            onChange={(e) => setGroupDiff(e.target.value)}
          />

          <label htmlFor="groupDiff1">Порог сложности "+2" (от 1 до 100)</label>
          <input
            type="number"
            min="1"
            max="100"
            id="groupDiff1"
            value={groupDiff1}
            onChange={(e) => setGroupDiff1(e.target.value)}
          />

          <label htmlFor="groupDiff2">Порог сложности "+3" (от 1 до 100)</label>
          <input
            type="number"
            min="1"
            max="100"
            id="groupDiff2"
            value={groupDiff2}
            onChange={(e) => setGroupDiff2(e.target.value)}
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

export default TeacherGroupEditModal;