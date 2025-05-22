import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
//import GroupList from '../components/GroupList';
//import TaskList from '../components/TaskList';
import Header from '../components/Header';
import Groups from '../components/Groups';
import Tasks from '../components/Tasks';
import GroupModal from '../components/GroupModal';
import TaskModal from '../components/TaskModal';

function MainPage() {
  const [groups, setGroups] = useState('');
  const [currentGroupId, setCurrentGroupId] = useState(null);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDate, setGroupDate] = useState();
  const [taskTitle, setTaskTitle] = useState('');
  const [taskLink, setTaskLink] = useState('');

  // Добавление новой цели
  const addGroup = () => {
    if (!groupName.trim()) return;
    
    const newGroup = {
      id: Date.now().toString(),
      name: groupName,
      date: groupDate,
      tasks: []
    };

    setGroups([...groups, newGroup]);
    setGroupName('');
    setGroupDate();
    setShowGroupModal(false);
    selectGroup(newGroup.id);
  };

  // Добавление новой задачи
  const addTask = () => {
    if (!taskTitle.trim() || !currentGroupId) return;

    setGroups(groups.map(group => {
      if (group.id === currentGroupId) {
        return {
          ...group,
          tasks: [
            ...group.tasks,
            {
              id: Date.now().toString(),
              title: taskTitle,
              link: taskLink,
              completed: false
            }
          ]
        };
      }
      return group;
    }));

    setTaskTitle('');
    setTaskLink('');
    setShowTaskModal(false);
  };

  // Удаление цели
  const deleteGroup = (groupId) => {
    if (window.confirm('Вы уверены, что хотите удалить эту группу и все её задачи?')) {
      const updatedGroups = groups.filter(g => g.id !== groupId);
      setGroups(updatedGroups);
      
      if (currentGroupId === groupId) {
        setCurrentGroupId(null);
      }
    }
  };

  // Удаление задачи
  const deleteTask = (groupId, taskId) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          tasks: group.tasks.filter(t => t.id !== taskId)
        };
      }
      return group;
    }));
  };

  // Переключение состояния задачи
  const toggleTaskCompletion = (groupId, taskId) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          tasks: group.tasks.map(task => {
            if (task.id === taskId) {
              const newCompletedState = !task.completed;
              return {
                ...task,
                completed: newCompletedState,
                completedAt: newCompletedState ? new Date().toISOString().slice(0,10) : null
              };
            }
            return task;
          })
        };
      }
      return group;
    }));
  };

  // Выбор цели
  const selectGroup = (groupId) => {
    setCurrentGroupId(groupId);
  };

  // Получение текущей цели
  const getCurrentGroup = () => {
    return groups.find(g => g.id === currentGroupId);
  };

  return (
    <div className="app">
      <Header />

      <div className="main-container">
        <Groups 
          groups={groups}
          currentGroupId={currentGroupId}
          onSelectGroup={setCurrentGroupId}
          onAddGroup={() => setShowGroupModal(true)}
          onDeleteGroup={deleteGroup}
        />
        
        <Tasks
          currentGroupId={currentGroupId}
          onAddTask={() => setShowTaskModal(true)}
          onToggleTask={toggleTaskCompletion}
          onDeleteTask={deleteTask}
          getCurrentGroup={getCurrentGroup}
        />
      </div>

      <GroupModal 
        show={showGroupModal}
        onClose={() => {
          setGroupName('');
          setGroupDate();
          setShowGroupModal(false);
        }}
        onSubmit={addGroup}
        groupName={groupName}
        setGroupName={setGroupName}
        groupDate={groupDate}
        setGroupDate={setGroupDate}
      />

      <TaskModal 
        show={showTaskModal}
        onClose={() => {
          setTaskTitle('');
          setTaskLink('');
          setShowTaskModal(false);
        }}
        onSubmit={addTask}
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        taskLink={taskLink}
        setTaskLink={setTaskLink}
      />
    </div>
  );
}

export default MainPage;