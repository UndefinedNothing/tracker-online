import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './MainPage.css';
import StudentHeader from '../components/StudentHeader';
import StudentTasks from '../components/StudentTasks';
import StudentTaskModal from '../components/StudentTaskModal';
import StudentUserModal from "../components/StudentUserModal";
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://motivationappbackend-uyxp.onrender.com/api/v1',
});

function StudentPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState({ groupId: 0, currentGroupScore: 0, groupGoal: 0 });
  const [studentGroup, setStudentGroup] = useState({ id: 0, name: 'Вы не добавлены в группу', groupGoal: 0, studentGoal: 0 });
  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskNumber, setTaskNumber] = useState('');
  const [taskPlatform, setTaskPlatform] = useState('CODEFORCES');
  const [taskDifficulty, setTaskDifficulty] = useState('');
  const [taskLink, setTaskLink] = useState('');
  const [progress, setProgress] = useState(0);
  const [progressGroup, setProgressGroup] = useState(0);
  const [profile, setProfile] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp0 = await api.get(`/users/${id}/student/profile`);
        setProfile(resp0.data);

        const resp = await api.get(`/users/${id}/student/groups`);
        if (resp.data.length > 0) {
          setStudentGroup(resp.data[0])
          setProgress(resp.data[0].studentCurrentScore)
        }

        const resp1 = await api.get(`/groups/${resp.data[0].id}/result`);
        setGroup(resp1.data);
        setProgressGroup(resp1.data.currentGroupScore);

        const response = await api.get(`/users/${id}/student/tasks`);
        const updatedResp = response.data.map((task, index) => {
          return {
            ...task,
            id: Date.now().toString() + index,
            completed: task.verdict == 'SUCCESS' ? true : false,
            completedAt: task.verdict == 'SUCCESS' ? task.lastChangedTime.slice(0, 10) : null,
            link: 'https://' + task.link,
            count: task.difficulty < resp1.data.minDifficulty ? 0 : task.difficulty <= resp.data[0].easyMediumThreshold ? 1 : task.difficulty >= resp.data[0].mediumHardThreshold ? 3 : 2
          };
        });
        setTasks(updatedResp);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Добавление новой задачи
  const addTask = async () => {
    if (!taskTitle.trim()) return;

    try {
      const response = await api.put(`/users/${id}/student/tasks/addTask`, {
        platform: taskPlatform,
        number: taskNumber,
        title: taskTitle,
        difficulty: taskDifficulty,
        link: taskLink,
        verdict: 'FAIL'
      });
      const newTask = {
        id: Date.now().toString(),
        title: taskTitle,
        platform: taskPlatform,
        number: taskNumber,
        difficulty: taskDifficulty,
        link: taskLink,
        verdict: 'FAIL',
        completed: false,
        completedAt: null,
        count: response.data.first < group.minDifficulty ? 0 : response.data.first <= studentGroup.easyMediumThreshold ? 1 : response.data.first >= studentGroup.mediumHardThreshold ? 3 : 2
      };
      setTasks([...tasks, newTask]);
    } catch (err) {
      console.error(err);
    }

    setTaskTitle('');
    setTaskNumber('');
    setTaskDifficulty('');
    setTaskLink('');
    setShowTaskModal(false);
  };

  // Удаление задачи
  const deleteTask = async (taskx, taskId) => {
    try {
      const response = await api.delete(`/users/${id}/student/tasks/deleteTask`, {data: {
        platform: taskx.platform,
        number: taskx.number,
        title: taskx.title,
        difficulty: taskx.difficulty,
        link: taskx.link,
        verdict: taskx.verdict
      }});
      if (taskx.completed) {
        setProgress(progress - taskx.count);
        setProgressGroup(progressGroup - taskx.count);
      }
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      console.error(err);
    }
  };

  // Переключение состояния задачи
  const toggleTaskCompletion = async (taskx, taskId) => {
    try {
      if (!taskx.completed) {
        const response = await api.put(`/users/${id}/student/tasks/addTask`, {
          platform: taskx.platform,
          title: taskx.title,
          difficulty: taskx.difficulty,
          link: taskx.link,
          verdict: !taskx.completed ? 'SUCCESS' : 'FAIL'
        });
        setProgress(progress + taskx.count);
        setProgressGroup(progressGroup + taskx.count);

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
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Синхронизация с CodeForces
  const onSync = async () => {
    try {
      setLoading(true);
      const response = await api.put(`/users/${id}/student/tasks/sync`);
      navigate(0);
    } catch (err) {
      console.error(err);
    }
  }

  // Синхронизация с ACMP
  const onSyncAcmp = async () => {
    try {
      setLoading(true);
      const response = await api.put(`/users/${id}/student/tasks/syncAcmp`);
      navigate(0);
    } catch (err) {
      console.error(err);
    }
  }

  const handleLogout = () => {
    navigate('/');
  };

  if (loading) {
    return <h3 style={{ display: 'flex', justifyContent: 'center', marginTop: '300px' }}>Загрузка данных...</h3>; // Показываем во время загрузки
  }

  return (
    <div className="app">
      <StudentHeader
        onSync={() => onSync()}
        onClick={() => setIsModalOpen(true)}
        name={profile.name}
      />

      <div className="main-container">
        <StudentTasks
          progress={progress}
          progressGroup={progressGroup}
          group={group}
          studentGroup={studentGroup}
          tasks={tasks}
          onSyncCf={() => onSync()}
          onSyncAcmp={() => onSyncAcmp()}
          onAddTask={() => setShowTaskModal(true)}
          onToggleTask={toggleTaskCompletion}
          onDeleteTask={deleteTask}
        />
      </div>

      <StudentTaskModal
        show={showTaskModal}
        onClose={() => {
          setTaskTitle('');
          setTaskNumber('');
          setTaskDifficulty('');
          setTaskLink('');
          setShowTaskModal(false);
        }}
        onSubmit={addTask}
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        taskNumber={taskNumber}
        setTaskNumber={setTaskNumber}
        taskPlatform={taskPlatform}
        setTaskPlatform={setTaskPlatform}
        taskDifficulty={taskDifficulty}
        setTaskDifficulty={setTaskDifficulty}
        taskLink={taskLink}
        setTaskLink={setTaskLink}
      />


      <StudentUserModal
        show={isModalOpen}
        id={id}
        name={profile.name}
        username={profile.login}
        initialHandler={profile.cfHandler}
        initialId={profile.acmpId}
        onLogout={handleLogout}
        onClose={() => setIsModalOpen(false)}
        profile={profile}
        setProfile={setProfile}
      />
    </div>
  );
}

export default StudentPage;