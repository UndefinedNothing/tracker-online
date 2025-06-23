import { useState } from "react";
import "./UserModal.css";
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://motivationappbackend-uyxp.onrender.com/api/v1',
});

const StudentUserModal = ({
  show,
  id,
  name,
  username,
  initialHandler,
  initialId,
  onLogout,
  onClose,
  profile,
  setProfile
}) => {
  const [handler, setHandler] = useState(initialHandler);
  const [isEditingCf, setIsEditingCf] = useState(false);
  const [tempHandler, setTempHandler] = useState(handler);

  const [acmpId, setAcmpId] = useState(initialId);
  const [isEditingId, setIsEditingId] = useState(false);
  const [tempId, setTempId] = useState(acmpId);

  const handleEditClick = () => {
    setTempHandler(handler);
    setIsEditingCf(true);
  };

  const idEditClick = () => {
    setTempId(acmpId);
    setIsEditingId(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await api.put(`/users/${id}/student/profile/edit`, {
        id: id,
        login: username,
        name: name,
        cfHandler: tempHandler,
        acmpId: acmpId
      });
      console.log(response);
      setHandler(tempHandler);
      setIsEditingCf(false);
      setProfile({ ...profile, cfHandler: tempHandler });
    } catch (err) {
      console.error(err);
    }
  };

  const idSaveClick = async () => {
    try {
      const response = await api.put(`/users/${id}/student/profile/edit`, {
        id: id,
        login: username,
        name: name,
        cfHandler: handler,
        acmpId: tempId
      });
      console.log(response);
      setAcmpId(tempId);
      setIsEditingId(false);
      setProfile({ ...profile, acmpId: tempId });
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelClick = () => {
    setIsEditingCf(false);
  };

  const idCancelClick = () => {
    setIsEditingId(false);
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="user-modal">
        <button className="close-button" onClick={onClose}>
          ✕
        </button>

        <div className="user-header">
          {/* <img src={avatar} alt="User Avatar" className="user-avatar" /> */}
          <div className="user-avatar1">{name[0]}</div>
          <div className="user-names">
            <h3 className="user-name">{name}</h3>
            <p className="user-username">{username}</p>
          </div>
        </div>

        <div className="user-bio">
          <p>CF Handler:</p>
          {isEditingCf ? (
            <>
              <textarea
                value={tempHandler}
                onChange={(e) => setTempHandler(e.target.value)}
                className="bio-textarea"
              />
              <div className="bio-actions">
                <button onClick={handleSaveClick} className="save-button">
                  Сохранить
                </button>
                <button onClick={handleCancelClick} className="cancel-button">
                  Отмена
                </button>
              </div>
            </>
          ) : (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p style={{ fontSize: "1.2rem" }}>{handler}</p>
              {/* <button onClick={handleEditClick} className="edit-button">
                Редактировать
              </button> */}
              <button
                className="btn btn-delete"
                onClick={handleEditClick}
              >
                <h3>✎</h3>
              </button>
            </div>
          )}
        </div>

        <div className="user-bio">
          <p>ACMP ID:</p>
          {isEditingId ? (
            <>
              <textarea
                value={tempId}
                onChange={(e) => setTempId(e.target.value)}
                className="bio-textarea"
              />
              <div className="bio-actions">
                <button onClick={idSaveClick} className="save-button">
                  Сохранить
                </button>
                <button onClick={idCancelClick} className="cancel-button">
                  Отмена
                </button>
              </div>
            </>
          ) : (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p style={{ fontSize: "1.2rem" }}>{acmpId}</p>
              {/* <button onClick={handleEditClick} className="edit-button">
                Редактировать
              </button> */}
              <button
                className="btn btn-delete"
                onClick={idEditClick}
              >
                <h3>✎</h3>
              </button>
            </div>
          )}
        </div>

        <button onClick={onLogout} className="logout-button">
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
};

export default StudentUserModal;