import React from 'react';

// Расчет прогресса для цели
const calculateProgress = (tasks) => {
    const completedTasks = tasks.filter(t => t.completed).length;
    const totalTasks = tasks.length;
    return {
        progress: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
        text: `${completedTasks} из ${totalTasks} задач выполнено`
    };
};

const StudentTasks = ({
    tasks,
    onAddTask,
    onToggleTask,
    onDeleteTask
}) => {
    const { progress, text } = calculateProgress(tasks);
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
                            <h3>Цель 1</h3>
                            <button
                                className="btn btn-delete"
                            >
                                ✕
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
                        onClick={onAddTask}
                    >
                        + Добавить задачу
                    </button>

                    {tasks.map(task => (
                        <div key={task.id} className="task-item">
                            <div className="task-info">
                                <input
                                    type="checkbox"
                                    className="task-checkbox"
                                    checked={task.completed}
                                    onChange={() => onToggleTask(task, task.id)}
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
                                        onClick={() => onDeleteTask(task.id)}
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

export default StudentTasks;