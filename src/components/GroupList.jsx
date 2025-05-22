import React from 'react';
import GroupCard from './GroupCard';

const GroupList = ({ 
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
        groups.map(group => (
          <GroupCard
            key={group.id}
            group={group}
            isActive={currentGroupId === group.id}
            onSelect={() => onSelectGroup(group.id)}
            onDelete={() => onDeleteGroup(group.id)}
          />
        ))
      )}
    </div>
  );
};

export default GroupList;