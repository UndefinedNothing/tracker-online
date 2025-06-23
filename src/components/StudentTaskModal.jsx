const StudentTaskModal = ({
  show,
  onClose,
  onSubmit,
  taskTitle,
  setTaskTitle,
  taskNumber,
  setTaskNumber,
  taskPlatform,
  setTaskPlatform,
  taskDifficulty,
  setTaskDifficulty,
  taskLink,
  setTaskLink
}) => {
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3 className="modal-title">Добавить новую задачу</h3>
        <div className="form-group">
          <label htmlFor="taskTitle">Название задачи*</label>
          <input
            type="text"
            id="taskTitle"
            placeholder="Например: Задача о рюкзаке"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            autoFocus
          />

          <label htmlFor="taskNumber">Номер задачи*</label>
          <input
            type="text"
            id="taskNumber"
            placeholder="Например: 0001"
            value={taskNumber}
            onChange={(e) => setTaskNumber(e.target.value)}
          />

          <label>Источник*</label>
          <select
            name="platform"
            value={taskPlatform}
            onChange={(e) => setTaskPlatform(e.target.value)}
          >
            <option value="CODEFORCES">CodeForces</option>
            <option value="LEETCODE">LeetCode</option>
            <option value="ACMP">ACMP</option>
          </select>

          {taskPlatform == 'CODEFORCES' && (
            <>
              <label>Сложность*</label>
              <input
                type="number"
                min="800"
                max="3500"
                id="difficulty"
                placeholder="от 800 до 3500"
                value={taskDifficulty}
                onChange={(e) => setTaskDifficulty(e.target.value)}
              />
            </>
          )}

          {taskPlatform == 'LEETCODE' && (
            <>
              <label>Сложность*</label>
              <select
                name="difficulty"
                value={taskDifficulty}
                onChange={(e) => setTaskDifficulty(e.target.value)}
              >
                <option value="1">EASY</option>
                <option value="2">MEDIUM</option>
                <option value="3">HARD</option>
              </select>
            </>
          )}

          {taskPlatform == 'ACMP' && (
            <>
              <label>Сложность*</label>
              <input
                type="number"
                min="1"
                max="100"
                id="difficulty"
                placeholder="от 1 до 100"
                value={taskDifficulty}
                onChange={(e) => setTaskDifficulty(e.target.value)}
              />
            </>
          )}

          <label htmlFor="taskLink">Ссылка*</label>
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

export default StudentTaskModal;