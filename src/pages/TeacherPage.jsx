import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './MainPage.css';
import TeacherHeader from '../components/TeacherHeader';
import TeacherGroupModal from '../components/TeacherGroupModal';
import TeacherGroupEditModal from '../components/TeacherGroupEditModal';
import TeacherStudentModal from '../components/TeacherStudentModal';
import TeacherUserModal from "../components/TeacherUserModal";
import TeacherGroups from '../components/TeacherGroups';
import TeacherStudents from '../components/TeacherStudents';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://motivationappbackend-uyxp.onrender.com/api/v1',
});

function TeacherPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentGroupId, setCurrentGroupId] = useState(null);
  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState([]);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showGroupEditModal, setShowGroupEditModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [dueDate, setDueDate] = useState();
  const [groupDiff, setGroupDiff] = useState();
  const [groupDiff1, setGroupDiff1] = useState();
  const [groupDiff2, setGroupDiff2] = useState();
  const [groupGoal, setGroupGoal] = useState();
  const [studentLogin, setStudentLogin] = useState('');
  const [studentGoal, setStudentGoal] = useState();
  const [profile, setProfile] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupInfo, setGroupInfo] = useState([0, 0, 0]);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respProfile = await api.get(`/users/${id}/teacher/profile`);
        setProfile(respProfile.data);

        const respGroups = await api.get(`/users/${id}/teacher/groups`);
        setGroups(respGroups.data);

        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response1 = await api.get(`/groups/${currentGroupId}`);
        setStudents(response1.data.members);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData1();
  }, [currentGroupId]);

  // Добавление студента
  const addStudent = async () => {
    const newStudent = {
      login: studentLogin,
      studentGoal: studentGoal,
      studentCurrentScore: 0
    };

    try {
      const response = await api.put(`/users/${id}/teacher/groups/${currentGroupId}/addStudent?studentLogin=${studentLogin}&studentGoal=${studentGoal}`);
      setStudents([...students, newStudent]);
    } catch (err) {
      console.error(err);
    }

    setStudentLogin('');
    setStudentGoal();
    setShowStudentModal(false);
  };

  // Удаление студента
  const deleteStudent = async (sLogin) => {
    setStudents(students.filter(student => student.login !== sLogin));
  };

  // Редактирование группы
  const editGroup = async () => {
    try {
      const response = await api.put(`/users/${id}/teacher/groups/${groupInfo[0]}/edit`, {
        id: groupInfo[0],
        name: groupName,
        groupGoal: groupGoal,
        minAvgDifficulty: groupDiff,
        easyMediumThreshold: groupDiff1,
        mediumHardThreshold: groupDiff2,
        dueDate: dueDate,
        ownerName: groupInfo[1],
        ownerId: groupInfo[2]
      });
      navigate(0);
    } catch (err) {
      console.error(err);
    }

    setShowGroupEditModal(false);
  };

  // Добавление группы
  const addGroup = async () => {
    try {
      const response = await api.post(`/users/${id}/teacher/groups/create?name=${groupName}&groupGoal=${groupGoal}&minAvgDifficulty=${groupDiff}&dueDate=${dueDate}&easyMediumThreshold=${groupDiff1}&mediumHardThreshold=${groupDiff2}`);
      navigate(0);
    } catch (err) {
      console.error(err);
    }

    setShowGroupModal(false);
  };

  const onEdit = (group) => {
    setGroupName(group.name);
    setDueDate(group.dueDate);
    setGroupDiff(group.minAvgDifficulty);
    setGroupDiff1(group.easyMediumThreshold);
    setGroupDiff2(group.mediumHardThreshold);
    setGroupGoal(group.groupGoal);
    setGroupInfo([group.id, group.ownerName, group.ownerId]);
    setShowGroupEditModal(true);
  };

  const handleLogout = () => {
    navigate('/');
  };

  if (loading) {
    return <h3 style={{ display: 'flex', justifyContent: 'center', marginTop: '300px' }}>Загрузка данных...</h3>; // Показываем во время загрузки
  }

  return (
    <div className="app">
      <TeacherHeader
        onClick={() => setIsModalOpen(true)}
        name={profile.name}
      />

      <div className="main-container">
        <TeacherGroups
          groups={groups}
          currentGroupId={currentGroupId}
          onSelectGroup={setCurrentGroupId}
          onAddGroup={() => setShowGroupModal(true)}
          onEditGroup={onEdit}
        />

        <TeacherStudents
          currentGroupId={currentGroupId}
          onAddStudent={() => setShowStudentModal(true)}
          onDeleteStudent={deleteStudent}
          students={students}
        />
      </div>

      <TeacherGroupModal
        show={showGroupModal}
        onClose={() => {
          setGroupName('');
          setDueDate();
          setGroupDiff();
          setGroupDiff1();
          setGroupDiff2();
          setGroupGoal();
          setShowGroupModal(false);
        }}
        onSubmit={addGroup}
        groupName={groupName}
        setGroupName={setGroupName}
        dueDate={dueDate}
        setDueDate={setDueDate}
        groupDiff={groupDiff}
        setGroupDiff={setGroupDiff}
        groupDiff1={groupDiff1}
        setGroupDiff1={setGroupDiff1}
        groupDiff2={groupDiff2}
        setGroupDiff2={setGroupDiff2}
        groupGoal={groupGoal}
        setGroupGoal={setGroupGoal}
      />

      <TeacherGroupEditModal
        show={showGroupEditModal}
        onClose={() => {
          setGroupName('');
          setDueDate();
          setGroupDiff();
          setGroupDiff1();
          setGroupDiff2();
          setGroupGoal();
          setShowGroupEditModal(false);
        }}
        onSubmit={editGroup}
        groupName={groupName}
        setGroupName={setGroupName}
        dueDate={dueDate}
        setDueDate={setDueDate}
        groupDiff={groupDiff}
        setGroupDiff={setGroupDiff}
        groupDiff1={groupDiff1}
        setGroupDiff1={setGroupDiff1}
        groupDiff2={groupDiff2}
        setGroupDiff2={setGroupDiff2}
        groupGoal={groupGoal}
        setGroupGoal={setGroupGoal}
      />

      <TeacherStudentModal
        show={showStudentModal}
        onClose={() => {
          setStudentLogin('');
          setStudentGoal();
          setShowStudentModal(false);
        }}
        onSubmit={addStudent}
        studentLogin={studentLogin}
        setStudentLogin={setStudentLogin}
        studentGoal={studentGoal}
        setStudentGoal={setStudentGoal}
      />

      <TeacherUserModal
        show={isModalOpen}
        name={profile.name}
        username={profile.login}
        onLogout={handleLogout}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default TeacherPage;