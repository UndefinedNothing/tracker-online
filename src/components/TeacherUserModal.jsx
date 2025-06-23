import "./UserModal.css";

const TeacherUserModal = ({
    show,
    name,
    username,
    onLogout,
    onClose,
}) => {
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

                <button onClick={onLogout} className="logout-button">
                    Выйти из аккаунта
                </button>
            </div>
        </div>
    );
};

export default TeacherUserModal;