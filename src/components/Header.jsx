import React from 'react';
import logo from "../assets/logo1.png";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <h1>CodeProgress</h1>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {/* <div className="user-avatar"><img src="notification.png" alt="Уведомления"/></div> */}
        <div className="user-avatar">U</div>
      </div>
    </header>
  );
};

export default Header;