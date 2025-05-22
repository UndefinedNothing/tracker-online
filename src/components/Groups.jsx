import React from 'react';

// Расчет прогресса для цели
const calculateProgress = (group) => {
    const completedTasks = group.tasks.filter(t => t.completed).length;
    const totalTasks = group.tasks.length;
    return {
        progress: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
        text: `${completedTasks} из ${totalTasks} задач выполнено`
    };
};

const Groups = ({
    groups,
    currentGroupId,
    onSelectGroup,
    onAddGroup,
    onDeleteGroup
}) => {
    return (
        <div className="groups-section">
            <button
                className="btn btn-add-group"
                onClick={onAddGroup}
            >
                + Добавить цель
            </button>

            {groups.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#7f8c8d' }}>Нет целей</p>
            ) : (
                groups.map(group => {
                    const { progress, text } = calculateProgress(group);
                    return (
                        <div
                            key={group.id}
                            className={`group-card ${currentGroupId === group.id ? 'active-group' : ''}`}
                            onClick={() => onSelectGroup(group.id)}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h3>{group.name}</h3>
                                <button
                                    className="btn btn-delete"
                                    onClick={() => onDeleteGroup(group.id)}
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="progress-container">
                                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {group.date ? (
                                    <div className="group-date">до {group.date}</div>
                                ) : (
                                    <div className="group-date"> </div>)}
                                <div className="progress-text">{text}</div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default Groups;