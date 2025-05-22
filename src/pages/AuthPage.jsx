import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://motivationappbackend-uyxp.onrender.com/api/v1',
});

function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    login: '',
    name: '',
    role: 'STUDENT',
    password: '',
    repeatPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.login) newErrors.login = 'Логин обязателен';
    if (!formData.password) newErrors.password = 'Пароль обязателен';

    if (!isLogin) {
      if (!formData.name) newErrors.name = 'Имя обязательно';
      if (formData.password !== formData.repeatPassword) {
        newErrors.repeatPassword = 'Пароли не совпадают';
      }
      if (formData.password.length < 6) {
        newErrors.password = 'Пароль должен быть не менее 6 символов';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      if (isLogin) {
        // Отправка данных для входа
        console.log('Login data:', {
          login: formData.login,
          password: formData.password
        });
        try {
          const response = await api.post('/auth/login', {
            login: formData.login,
            password: formData.password
          });
          const { userId, role } = response.data;
          navigate(`/${role}/${userId}`);
        } catch (error) {
          console.error(error);
        }
      } else {
        // Отправка данных для регистрации
        console.log('Register data:', {
          login: formData.login,
          name: formData.name,
          role: formData.role,
          password: formData.password
        });
        try {
          const response = await api.post('/auth/register', {
            login: formData.login,
            name: formData.name,
            role: formData.role,
            password: formData.password,
            repeatPassword: formData.repeatPassword
          });
          const message = response.data;
          alert(message);
          setIsLogin(true);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div className="logo1">
          <img src="logo1.png" alt="Лого" />
          <h1>CodeProgress</h1>
        </div>
        <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Логин:</label>
            <input
              type="text"
              name="login"
              value={formData.login}
              onChange={handleChange}
            />
            {errors.login && <span className="error">{errors.login}</span>}
          </div>

          {!isLogin && (
            <>
              <div className="form-group">
                <label>Имя:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label>Роль:</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="STUDENT">Студент</option>
                  <option value="TEACHER">Преподаватель</option>
                </select>
              </div>
            </>
          )}

          <div className="form-group">
            <label>Пароль:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Подтвердите пароль:</label>
              <input
                type="password"
                name="repeatPassword"
                value={formData.repeatPassword}
                onChange={handleChange}
              />
              {errors.repeatPassword && (
                <span className="error">{errors.repeatPassword}</span>
              )}
            </div>
          )}

          <button type="submit" className="submit-btn">
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>

        <div className="toggle-auth">
          {isLogin ? (
            <p>
              Нет аккаунта?{' '}
              <button onClick={() => setIsLogin(false)}>Зарегистрироваться</button>
            </p>
          ) : (
            <p>
              Уже есть аккаунт?{' '}
              <button onClick={() => setIsLogin(true)}>Войти</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;