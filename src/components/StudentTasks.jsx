import { useState } from 'react';

// Расчет прогресса для общей цели
const calculateProgress1 = (group, progressGroup) => {
    const completedTasks = progressGroup;
    const totalTasks = group.groupGoal;
    if (completedTasks > totalTasks) {
        return {
            progress1: 100,
            text1: `${completedTasks} из ${totalTasks} задач выполнено`
        };
    }
    else {
        return {
            progress1: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
            text1: `${completedTasks} из ${totalTasks} задач выполнено`
        };
    }
};

// Расчет прогресса для личной цели
const calculateProgress2 = (studentGroup, progress) => {
    const completedTasks = progress;
    const totalTasks = studentGroup.studentGoal;
    if (completedTasks > totalTasks) {
        return {
            progress2: 100,
            text2: `${completedTasks} из ${totalTasks} задач выполнено`
        };
    }
    else {
        return {
            progress2: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
            text2: `${completedTasks} из ${totalTasks} задач выполнено`
        };
    }
};

const StudentTasks = ({
    progress,
    progressGroup,
    group,
    studentGroup,
    tasks,
    onSyncCf,
    onSyncAcmp,
    onAddTask,
    onToggleTask,
    onDeleteTask
}) => {
    // Состояние для поискового запроса
    const [searchTerm, setSearchTerm] = useState('');
    // Фильтрация элементов по названию и номеру
    const filteredTasks = tasks.filter(task => {
        const searchLower = searchTerm.toLowerCase();
        return (
            task.title.toLowerCase().includes(searchLower) ||
            task.number.toLowerCase().includes(searchLower) ||
            task.platform.toLowerCase().includes(searchLower)
        );
    });

    const { progress1, text1 } = calculateProgress1(group, progressGroup);
    const { progress2, text2 } = calculateProgress2(studentGroup, progress);
    return (
        <div className="tasks-section-new">
            <div style={{ backgroundColor: "#f1f3f4", width: "100%", display: 'flex', justifyContent: 'center' }}>
                <div
                    className={'group-card-new'}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h3>{studentGroup.name}</h3>
                        <div className="progress-text">{studentGroup.ownerName}</div>
                        <div className="progress-text">Минимальная сложность: {group.minDifficulty}</div>
                    </div>

                    <div className="progress-text">Общая цель:</div>
                    <div className="progress-container">
                        <div className="progress-bar" style={{ width: `${progress1}%` }}></div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {/* {group.date ? (
                                <div className="group-date">до {group.date}</div>
                            ) : (
                                <div className="group-date"> </div>)} */}
                        <div className="group-date"> </div>
                        <div className="progress-text">{text1}</div>
                    </div>

                    <div className="progress-text">Личная цель:</div>
                    <div className="progress-container">
                        <div className="progress-bar" style={{ width: `${progress2}%` }}></div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {group.dueDate ? (
                            <div className="group-date">до {group.dueDate}</div>
                        ) : (
                            <div className="group-date"> </div>)}
                        <div className="group-date"> </div>
                        <div className="progress-text">{text2}</div>
                    </div>
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <input
                    type="text"
                    placeholder="Поиск задач..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        padding: '8px',
                        marginRight: '10px',
                        marginBottom: '20px',
                        width: '215px',
                        border: '1px solid #ddd',
                        borderRadius: '4px'
                    }}
                />
                <button className="btn btn-add" onClick={onAddTask}>+ Добавить задачу</button>
                <button className="btn btn-add" onClick={onSyncCf}>Синхронизировать с CF</button>
                <button className="btn btn-add" onClick={onSyncAcmp}>Синхронизировать с ACMP</button>
            </div>

            <div style={{
                display: "flex",
                flexDirection: "row",
                width: "85%"
            }}>
                <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <h3 style={{ marginBottom: "10px" }}>Незавершенные</h3>
                    {filteredTasks.filter(task => !task.completed).length === 0 ? (
                        <div>Нет задач</div>
                    ) : (
                        <>
                            {filteredTasks.filter(task => !task.completed).map(task => (
                                <div key={task.id} className="task-item">
                                    <div style={{ display: 'flex', flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                                        <input
                                            type="checkbox"
                                            className="task-checkbox"
                                            checked={task.completed}
                                            onChange={() => onToggleTask(task, task.id)}
                                        />
                                        <p style={{ color: "#3498db" }}>+{task.count}</p>
                                        <div className="task-actions">
                                            <button
                                                className="btn btn-delete"
                                                onClick={() => onDeleteTask(task, task.id)}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </div>
                                    <div className="task-info">
                                        <span className={`task-title ${task.completed ? 'task-completed' : ''}`}>
                                            <a href={task.link} target="_blank" style={{ color: 'inherit', textDecoration: 'none' }}><h3>{task.number}. {task.title}</h3></a>
                                        </span>
                                        <span style={{ fontSize: "0.8rem", color: "#7f8c8d" }}>{task.platform}</span>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        {task.completedAt && (
                                            <div className="task-date">
                                                Выполнено: {task.completedAt}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                            }
                        </>
                    )}

                </div>
                <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <h3 style={{ marginBottom: "10px" }}>Завершенные</h3>
                    {filteredTasks.filter(task => task.completed).length === 0 ? (
                        <div>Нет задач</div>
                    ) : (
                        <>
                            {filteredTasks.filter(task => task.completed).map(task => (
                                <div key={task.id} className="task-item">
                                    <div style={{ display: 'flex', flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                                        <input
                                            type="checkbox"
                                            className="task-checkbox"
                                            checked={task.completed}
                                            onChange={() => onToggleTask(task, task.id)}
                                        />
                                        <p style={{ color: "#7f8c8d" }}>+{task.count}</p>
                                        <div className="task-actions">
                                            <button
                                                className="btn btn-delete"
                                                onClick={() => onDeleteTask(task, task.id)}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </div>
                                    <div className="task-info">
                                        <span className={`task-title ${task.completed ? 'task-completed' : ''}`}>
                                            <a href={task.link} target="_blank" style={{ color: 'inherit', textDecoration: 'none' }}><h3>{task.number}. {task.title}</h3></a>
                                        </span>
                                        <span style={{ fontSize: "0.8rem", color: "#7f8c8d" }}>{task.platform}</span>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        {task.completedAt && (
                                            <div className="task-date">
                                                Выполнено: {task.completedAt}
                                            </div>)}
                                    </div>
                                </div>
                            ))
                            }
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentTasks;