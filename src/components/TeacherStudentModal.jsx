const TeacherStudentModal = ({ 
  show, 
  onClose, 
  onSubmit, 
  studentLogin, 
  setStudentLogin,
  studentGoal, 
  setStudentGoal
}) => {
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3 className="modal-title">Добавить студента</h3>
        <div className="form-group">
          <label htmlFor="taskTitle">Логин студента*</label>
          <input
            type="text"
            id="taskTitle"
            placeholder="Например: student"
            value={studentLogin}
            onChange={(e) => setStudentLogin(e.target.value)}
            autoFocus
          />

          <label htmlFor="taskLink">Цель студента*</label>
          <input
            type="number"
            min="1"
            id="taskLink"
            value={studentGoal}
            onChange={(e) => setStudentGoal(e.target.value)}
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

export default TeacherStudentModal;