import { Routes, Route } from 'react-router-dom'

import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Admin from './Pages/Admin';
import Customer from './Pages/Customer';
import CustomerLayout from './Pages/CustomerLayout';
import CustomerCart from './Pages/CustomerCart'; 
import CreateUser from './Pages/User/CreateUser';
import SearchUser from './Pages/User/SearchUser';
import UpdateUser from './Pages/User/UpdateUser';
import DeleteUser from './Pages/User/DeleteUser';
import ViewAllusers from './Pages/User/ViewAllusers';
import Add_product from './Pages/product/Add_product';
import Delete_product from './Pages/product/Delete_product';
import Search_product from './Pages/product/Search_product';
import ViewAll_product from './Pages/product/ViewAll_product';
import Update_product from './Pages/product/Update_product';
import UserManagementNav from './Pages/User/UserManagementNavBar';
import ProductManagementNavBar from './Pages/product/ProductManagementNavBar';
import './styles.css';

function App() {

  return (
    <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />


      <Route path="/admin" element={<Admin />} />


      <Route path="/customer" element={<CustomerLayout />}>
        <Route index element={<Customer />} />
        <Route path="category/:name" element={<Customer />} />
        <Route path="cart" element={<CustomerCart />} />
      </Route>


      <Route path="/admin/users" element={<UserManagementNav/>} >
        
        <Route path="create" element={<CreateUser />} />
        <Route path="search" element={<SearchUser />} />
        <Route path="update" element={<UpdateUser />} />
        <Route path="delete" element={<DeleteUser />} />
        <Route path="view" element={<ViewAllusers />} />

      </Route>

      <Route path="/pm" element={<ProductManagementNavBar />} >
        <Route path="addproduct" element={<Add_product />} />
        <Route path="deleteProduct" element={<Delete_product />} />
        <Route path="updateProduct" element={<Update_product />} />
        <Route path="searchProduct" element={<Search_product />} />
        <Route path="viewAllProduct" element={<ViewAll_product />} />
      </Route>

    </Routes>
  );
}

export default App;
