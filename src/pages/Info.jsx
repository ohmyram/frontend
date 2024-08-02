import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../services/UserContext';

const Info = () => {
    const { user, loading, isAuthenticated, logout } = useUser();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [updatedMessage, setUpdatedMessage] = useState('');

    useEffect(() => {
        if (!isAuthenticated && !loading) {
            navigate('/login');
        }
    }, [isAuthenticated, loading, navigate]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const imageUrl = user?.perfil ? `http://localhost:3000/${user.perfil}` : '/path-to-default-profile-image.jpg';

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated || !user) {
        return null;
    }

    return (
        <div className="font-sans min-h-screen">
            <header className="flex justify-between items-center p-4 bg-white">
                <img src="/devchallenges.svg" alt="devchallenges" className="h-8 w-36" />
                <div className="relative">
                    <div className="flex items-center cursor-pointer" onClick={toggleMenu}>
                        <img src={imageUrl} alt="Profile" className="w-8 h-8 rounded-lg mr-2" />
                        <span>{user.name}</span>
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                            <Link to="/info" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</Link>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Group Chat</a>
                            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</button>
                        </div>
                    )}
                </div>
            </header>

            <main className="text-center mt-8 mb-4">
                <h1 className="text-3xl font-bold">Personal info</h1>
                <p className="text-gray-600">Basic info, like your name and photo</p>
            </main>

            <section className="max-w-4xl mx-auto bg-white rounded-xl border border-gray-300">
                <header className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-medium">Profile</h2>
                        <p className="text-sm text-gray-500">Some info may be visible to other people</p>
                    </div>
                    <Link to="/update" className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">Edit</Link>
                </header>

                <div className="p-6">
                    {updatedMessage && <p className="mb-4 text-green-500">{updatedMessage}</p>}
                    <ProfileItem label="Photo">
                        <img src={imageUrl} alt="Profile" className="w-16 h-16 rounded-lg object-cover" />
                    </ProfileItem>
                    <ProfileItem label="Name" value={user.name} />
                    <ProfileItem label="Bio" value={user.biografia} />
                    <ProfileItem label="Phone" value={user.phone} />
                    <ProfileItem label="Email" value={user.email} />
                    <ProfileItem label="Password" value="************" />
                </div>
            </section>
        </div>
    );
};

const ProfileItem = ({ label, value, children }) => (
    <div className="flex py-4 px-12">
        <div className="w-1/3 text-gray-500 text-sm">{label}</div>
        <div className="w-2/3 text-gray-800">{value || children}</div>
    </div>
);

export default Info;
