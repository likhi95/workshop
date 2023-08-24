import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

const TemplateLayout = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    // const location = useLocation();
    // const userName = location.state?.userName || '';
    return (
        <div className="admin-layout">
            <div className="admin-appbar glass-structure">
                <h2 className='title'>Study Planner</h2>
                <div className="admin-profile" onClick={() => setDropdownOpen(!isDropdownOpen)}>
                    Welcome
                    {isDropdownOpen && (
                        <div className="admin-dropdown glass-structure">
                            <button onClick={() => console.log('Logout')}>Logout</button>
                        </div>
                    )}
                </div>
            </div>
            <div className="admin-sidenav glass-structure">
                <a href="/admin/study-plan">Subject</a>
                <a href="/admin/user-list">Users</a>
            </div>
            <div className="admin-content">
                <Outlet />
            </div>
        </div>
    );
}

export default TemplateLayout;