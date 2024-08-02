import React from 'react';
import { useAuth } from '../hooks/authHook';

const Profile = () => {
    const { user, logout } = useAuth();

    return user ? (
        <div className="profile-container">
            <h1>Profile</h1>
            <div className="profile-info">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Biography:</strong> {user.biografia}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <div className="profile-photo">
                    <strong>Photo:</strong>
                    <img src={user.photo} alt="profile" />
                </div>
            </div>
            <button onClick={logout} className="logout-button">Logout</button>
        </div>
    ) : null;
};

export default Profile;
