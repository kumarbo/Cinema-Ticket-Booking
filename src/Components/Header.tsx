import "../styles/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <ul className="nav-bar">
      <Link to="/">
        <li>Home</li>
      </Link>

      {user ? (
        <li className="user-box">
          <p>Welcome {user.name}</p>

          <button onClick={handleLogout}>Logout</button>
        </li>
      ) : (
        <Link to="/login">
          <li>
            <button>Login</button>
          </li>
        </Link>
      )}
    </ul>
  );
}
