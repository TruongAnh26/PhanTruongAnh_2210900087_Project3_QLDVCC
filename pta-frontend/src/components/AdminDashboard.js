import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './admin/AdminLayout';
import PlantList from './admin/plants/PlantList';
import OrderList from './admin/orders/OrderList';
import UserList from './admin/users/UserList';
import MaintenanceScheduleList from './admin/schedules/MaintenanceScheduleList';
import Dashboard from './admin/Dashboard';

const AdminDashboard = () => {
    return (
        <AdminLayout>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="plants" element={<PlantList />} />
                <Route path="orders" element={<OrderList />} />
                <Route path="users" element={<UserList />} />
                <Route path="schedules" element={<MaintenanceScheduleList />} />
            </Routes>
        </AdminLayout>
    );
};

export default AdminDashboard; 