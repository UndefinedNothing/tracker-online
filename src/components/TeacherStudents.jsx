import box from "../assets/box.png";

const calculateProgress2 = (student) => {
    const completedTasks = student.studentCurrentScore;
    const totalTasks = student.studentGoal;
    if (completedTasks > totalTasks) {
        return {
            progress: 100,
            text: `${completedTasks} из ${totalTasks} задач выполнено`
        };
    }
    else {
        return {
            progress: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
            text: `${completedTasks} из ${totalTasks} задач выполнено`
        };
    }
};

const TeacherStudents = ({
    currentGroupId,
    onAddStudent,
    onDeleteStudent,
    students
}) => {
    return (
        <div className="tasks-section-new">
            {!currentGroupId ? (
                <div className="empty-state">
                    <img src={box} alt="box" />
                    <h3>Выберите группу</h3>
                    <p>Или создайте новую группу для начала работы</p>
                </div>
            ) : (
                <>
                    <button
                        className="btn btn-add"
                        onClick={onAddStudent}
                    >
                        + Добавить студента
                    </button>

                    {students.length === 0 ? (
                        <div className="empty-state">
                            <img src={box} alt="box" />
                            <h3>Нет студентов в этой группе</h3>
                            <p>Добавьте студентов, нажав на кнопку выше</p>
                        </div>
                    ) : (
                        students.map(student => {
                            const { progress, text } = calculateProgress2(student);
                            return (
                                <div
                                    key={student.id}
                                    className={'group-card-new1'}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <h3>{student.name} ({student.login})</h3>
                                        <button
                                            className="btn btn-delete"
                                            onClick={() => onDeleteStudent(student.login)}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                    <div className="progress-container">
                                        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div className="group-date"> </div>
                                        <div className="progress-text">{text}</div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </>
            )}
        </div>
    );
};

export default TeacherStudents;