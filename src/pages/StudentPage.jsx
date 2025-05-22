import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './MainPage.css';
import Header from '../components/Header';
import StudentTasks from '../components/StudentTasks';
import TaskModal from '../components/TaskModal';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://motivationappbackend-uyxp.onrender.com/api/v1',
});

function StudentPage() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskLink, setTaskLink] = useState('');

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/users/${id}/student/tasks`);
        //console.log(response.data);

        const updatedResp = response.data.map((resp, index) => {
          return {
            ...resp,
            id: Date.now().toString() + index,
            completed: resp.verdict == 'SUCCESS' ? true : false,
            link: 'https://' + resp.link
          };
        });

        console.log(updatedResp);
        setTasks(updatedResp);
        
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // Добавление новой задачи
  const addTask = async () => {
    if (!taskTitle.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title: taskTitle,
      link: taskLink,
      completed: false,
      completedAt: null
    };

    try {
      const response = await api.put(`/users/${id}/student/tasks/addTask`, {
        platform: 'CODEFORCES',
        title: taskTitle,
        link: taskLink,
        verdict: 'FAIL'
      });
      console.log(response.data);
      setTasks([...tasks, newTask]);
    } catch (err) {
      console.error(err);
    }

    setTaskTitle('');
    setTaskLink('');
    setShowTaskModal(false);
  };

  // Удаление задачи
  const deleteTask = async (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));

    // Здесь должен быть запрос к API для удаления
  };

  // Переключение состояния задачи
  const toggleTaskCompletion = async (taskx, taskId) => {

    try {
      const response = await api.put(`/users/${id}/student/tasks/addTask`, {
        platform: 'CODEFORCES',
        title: taskx.title,
        link: taskx.link,
        verdict: !taskx.completed ? 'SUCCESS' : 'FAIL'
      });
      console.log(response.data);

      setTasks(tasks.map(task => {
        if (task.id === taskId) {
          const newCompleted = !task.completed;
          return {
            ...task,
            completed: newCompleted,
            completedAt: newCompleted ? new Date().toISOString().slice(0, 10) : null
          };
        }
        return task;
      }));
    } catch (err) {
      console.error(err);
    }

  };
  
  if (loading) {
    return <h3>Загрузка данных...</h3>; // Показываем во время загрузки
  }

  return (
    <div className="app">
      <Header />

      <div className="main-container">
        <StudentTasks
          tasks={tasks}
          onAddTask={() => setShowTaskModal(true)}
          onToggleTask={toggleTaskCompletion}
          onDeleteTask={deleteTask}
        />
      </div>

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

export default StudentPage;