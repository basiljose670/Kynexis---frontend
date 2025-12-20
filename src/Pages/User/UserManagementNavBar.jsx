import { NavLink, Outlet, useNavigate } from "react-router-dom";
import './UserManagementNavBar.css';

function UserManagementNavBar() {

  const navigate = useNavigate();

  return (
    <div>

      <nav className="navbar">

        <span 
          className="back-btn"
          onClick={() => navigate("/admin")}
        >
          ← Back
        </span>

        <NavLink to="create">Create</NavLink>
        <NavLink to="search">Search</NavLink>
        <NavLink to="update">Update</NavLink>
        <NavLink to="delete">Delete</NavLink>
        <NavLink to="view">View All</NavLink>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}

export default UserManagementNavBar;
