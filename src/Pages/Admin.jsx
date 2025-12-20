import "./Admin.css";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  return (
    <div className="admin-page">
      <h1 style={{textAlign: "center"}}>Welcome Admin</h1>

      <button className="main-btn user-button" 
        onClick={() => navigate("/admin/users")}>
        User Management
      </button>
      <button className="main-btn product-button"
      onClick={() => navigate("/pm")}>
         Manage Products
         </button>
      
    </div>
  );
}

export default Admin;
