// Расчет прогресса для цели
const calculateProgress = (groupResult) => {
    const completedTasks = groupResult.currentGroupScore;
    const totalTasks = groupResult.groupGoal;
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

const TeacherGroups = ({
    groups,
    currentGroupId,
    onSelectGroup,
    onAddGroup,
    onEditGroup
}) => {
    return (
        <div className="groups-section">
            <button
                className="btn btn-add-group"
                onClick={onAddGroup}
            >
                + Добавить группу
            </button>

            {groups.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#7f8c8d' }}>Нет групп</p>
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
                                    onClick={() => onEditGroup(group)}
                                >
                                    <h3>✎</h3>
                                </button>
                            </div>

                            <div className="progress-text">Минимальная сложность: {group.minAvgDifficulty}</div>

                            <div className="progress-container">
                                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {group.dueDate ? (
                                    <div className="group-date">до {group.dueDate}</div>
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

export default TeacherGroups;