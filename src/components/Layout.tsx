// components/Layout.tsx
import React from "react";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
    <header>
      <Navbar />
    </header>
      <div className="layout-container">
        <aside className="sidebar-container">
          <Sidebar />
        </aside>
      <div>
        <main className="flex-1 p-6">
          <Outlet /> 
        </main>
      </div>
      </div>
    </>
  )
};

export default Layout;
