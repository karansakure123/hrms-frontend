import { useAuth } from '../../context/AuthContext';
import '../../styles/Navbar.css';

const BaseNavbar = ({ title }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-brand">
          <span className="navbar-link">{title}</span>
        </div>
      </div>
    </nav>
  );
};

export default BaseNavbar;