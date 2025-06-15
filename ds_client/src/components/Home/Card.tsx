import React from "react";
import { useParams } from "react-router-dom";
import DashboardHome from "./DashboardHome.tsx";
// import AddPosts from "../../Blogs/AddBlog";
import UsersList from "./UsersList.tsx";
import TenantsList from "./TenantsList.tsx";
import ManageTenants from "./ManageTenants.tsx";
import RentPayments from "./RentPayments.tsx";
import TenantStatement from "./TenantStatement.tsx";
// import Profile from "./Profile";

const Card = ({ title, onLogin, user }) => {
  const { path } = useParams(); // Get the current path

  switch (title) {
    case "Dashboard":
      return <DashboardHome />;
    case "Manage Tenants":
      return <ManageTenants />;
    // case "Add Blog":
    //   return <AddPosts />;
    // case "Manage Blogs":
    //   return <ManageBlogs />;
    // case "Manage Messages":
    //   return <Messages />;
    case "UsersList":
      return <UsersList />;
    case "TenantsList":
      return <TenantsList />;
    case "Rent Payment":
      return <RentPayments />;
    case "Tenant Statement":
      return <TenantStatement />;
    // case "Profile":
    //   return <Profile onLogin={onLogin} user={user}/>;
    default:
      return null; // Return null if no matching menu item found
  }
};

export default Card;