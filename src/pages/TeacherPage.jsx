import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './MainPage.css';
import Header from '../components/Header';
import TeacherGroupModal from '../components/TeacherGroupModal';
import TeacherStudentModal from '../components/TeacherStudentModal';
import TeacherGroup from '../components/TeacherGroup';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://motivationappbackend-uyxp.onrender.com/api/v1',
});

function TeacherPage() {
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState();
  const [students, setStudents] = useState([]);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupGoal, setGroupGoal] = useState();
  const [studentLogin, setStudentLogin] = useState('');
  const [studentGoal, setStudentGoal] = useState();

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/users/${id}/teacher/groups`);
        console.log(response.data[0]);
        setGroup(response.data[0]);

        const response1 = await api.get(`/groups/${response.data[0].id}`);
        console.log(response1.data.members);
        setStudents(response1.data.members);

        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // Добавление студента
  const addStudent = async () => {
    const newStudent = {
      login: studentLogin,
      studentGoal: studentGoal
    };

    try {
      const response = await api.put(`/users/${id}/teacher/groups/${group.id}/addStudent?studentLogin=${studentLogin}&studentGoal=${studentGoal}`);
      console.log(response.data);
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

    // Здесь должен быть запрос к API для удаления
  };

  const editGroup = async () =>{
    try {
      const response = await api.put(`/users/${id}/teacher/groups/${group.id}/edit`,{
        id: group.id,
        name: groupName,
        groupGoal: groupGoal,
        ownerName: group.ownerName,
        ownerId: group.ownerId
      });
      console.log(response);
      setGroup({
        id: group.id,
        name: groupName,
        groupGoal: groupGoal,
        ownerName: group.ownerName,
        ownerId: group.ownerId
      })
    } catch (err) {
      console.error(err);
    }
    
    setShowGroupModal(false);
  };

  if (loading) {
    return <h3>Загрузка данных...</h3>; // Показываем во время загрузки
  }

  return (
    <div className="app">
      <Header />

      <div className="main-container">
        <TeacherGroup
          group={group}
          students={students}
          onAddStudent={() => setShowStudentModal(true)}
          onDeleteStudent={deleteStudent}
          onBtn={() => setShowGroupModal(true)}
        />
      </div>

      <TeacherGroupModal
        show={showGroupModal}
        onClose={() => {
          setGroupName('');
          setGroupGoal();
          setShowGroupModal(false);
        }}
        onSubmit={editGroup}
        groupName={groupName}
        setGroupName={setGroupName}
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
    </div>
  );
}

export default TeacherPage;