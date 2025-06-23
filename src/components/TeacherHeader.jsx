import logo from "../assets/logo1.png";

const TeacherHeader = ({ onClick, name }) => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <h1>CodeProgress</h1>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div className="user-avatar" onClick={onClick}>{name[0]}</div>
      </div>
    </header>
  );
};

export default TeacherHeader;