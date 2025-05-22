import React from 'react';

// Расчет прогресса для цели
const calculateProgress = (group) => {
    const completedTasks = 0;
    const totalTasks = group.groupGoal;
    return {
        progress: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
        text: `${completedTasks} из ${totalTasks} задач выполнено`
    };
};

const TeacherGroup = ({
    group,
    students,
    onAddStudent,
    onDeleteStudent,
    onBtn
}) => {
    const { progress, text } = calculateProgress(group);
    return (
        <div className="tasks-section-new">
            {!true ? (
                <div className="empty-state">
                    <img src="box.png" alt="Нет задач" />
                    <h3>Цель не задана</h3>
                    <p>Создайте новую цель для начала работы</p>
                </div>
            ) : (
                <>
                    <div
                        className={'group-card-new'}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>{group.name}</h3>
                            <button
                                className="btn btn-delete"
                                onClick={onBtn}
                            >
                                ✎
                            </button>
                        </div>
                        <div className="progress-container">
                            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            {/* {group.date ? (
                                <div className="group-date">до {group.date}</div>
                            ) : (
                                <div className="group-date"> </div>)} */}
                            <div className="group-date"> </div>
                            <div className="progress-text">{text}</div>
                        </div>
                    </div>

                    <button
                        className="btn btn-add"
                        onClick={onAddStudent}
                    >
                        + Добавить студента
                    </button>

                    {students.map(student => (
                        <div key={student.id} className="task-item">
                            <div className="task-info">
                                <span className={`task-title ${student.completed ? 'task-completed' : ''}`}>
                                    <a>{student.login}</a>
                                </span>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div className="task-actions">
                                    <button
                                        className="btn btn-delete"
                                        onClick={() => onDeleteStudent(student.login)}
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </>
            )}
        </div>
    );
};

export default TeacherGroup;