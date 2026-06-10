import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <ul
      className="nav-bar"
      style={{
        display: "flex",
        gap: "15px",
        alignItems: "center",
        listStyle: "none",
      }}
    >
      {/* HOME */}
      <Link to="/">
        <li>Home</li>
      </Link>

      {/* MY BOOKINGS (ONLY LOGGED IN USERS) */}
      {user && (
        <Link to="/my-bookings">
          <li>My Bookings</li>
        </Link>
      )}

      {/* RIGHT SIDE AUTH */}
      <div style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
        {user ? (
          <>
            <li>👋 {user.name}</li>
            {user && user.email === "admin@gmail.com" && (
              <Link to="/admin">
                <li>Admin Panel</li>
              </Link>
            )}

            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <Link to="/login">
            <li>
              <button>Login</button>
            </li>
          </Link>
        )}
      </div>
    </ul>
  );
}
