// import React from 'react'
// import { useSelector } from 'react-redux'
// import classes from "./AccountSettings.module.css";

// const AccountSettings = () => {

//     const { user } = useSelector(state => state?.auth);
//     const darkMode = useSelector(state => state?.theme?.darkMode);

//     const firstName = user.firstName;
//     const lastName = user.lastName || "";
//     const fullName = firstName + " " + lastName;
//     const email = user.email;
//     const createdAt = user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//     }) : ''

//     console.log(user)

//     //Add user image in future
//     const addUserImageHandler = () => {

//     }

//     return (
//         <div className={`${classes.accountSettings} ${darkMode ? classes.dark : classes.light}`}>
//             <header className={classes.header}>
//                 <h1 className={classes.heading}>
//                     Account Settings
//                 </h1>
//                 <p>Manage your account information and preferences</p>
//             </header>

//             <main className={classes.mainContent}>
//                 <section className={classes.leftSection}>
//                     <div className={classes.userInfoSection}>
//                         <div className={classes.userImage}>
//                             <img />
//                             <button
//                                 type='button'
//                                 onClick={addUserImageHandler}
//                                 className={classes.button}>
//                                 +
//                             </button>
//                         </div>
//                         <div className={classes.userInfo}>
//                             <p><strong>Name : </strong>{fullName}</p>
//                             <p><strong>Email : </strong>{email}</p>
//                         </div>
//                         <div className={classes.userCreatedAt}>
//                             <p><strong>Created At : </strong>{createdAt}</p>
//                         </div>
//                     </div>
//                 </section>
//                 <section className={classes.rightSection}>

//                 </section>
//             </main>
//         </div>
//     )
// }

// export default AccountSettings


import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import classes from "./AccountSettings.module.css";
import { FaUserCircle, FaEdit, FaKey, FaBell, FaPalette, FaSignOutAlt, FaCamera } from 'react-icons/fa';

import ResetPassword from '../pages/ResetPassword';
import { logoutUser } from '../redux/auth/authSlice';

const AccountSettings = () => {
    const { user, isAuthenticated, loading } = useSelector(state => state?.auth);
    const darkMode = useSelector(state => state?.theme?.darkMode);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [activeSection, setActiveSection] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || ''
    });

    const firstName = user?.firstName || '';
    const lastName = user?.lastName || "";
    const fullName = `${firstName} ${lastName}`.trim();
    const email = user?.email || '';
    const createdAt = user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : '';

    // Add user image in future
    const addUserImageHandler = () => {
        // Implement image upload functionality
        console.log('Add user image');
    }

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            // Save changes logic here
            console.log('Saving changes:', userData);
        }
    }

    const handleInputChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        if (!isAuthenticated && !loading) {
            navigate('/', { replace: true });
        }
    }, [isAuthenticated, loading, navigate]);

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            // Navigation is handled by the useEffect above
        } catch (error) {
            console.error('Logout error:', error);
            // Even if API call fails, force logout locally
            // You might want to dispatch the logout action directly
        }
    }

    const menuItems = [
        { id: 'profile', label: 'Profile', icon: <FaUserCircle /> },
        { id: 'security', label: 'Security', icon: <FaKey /> },
        { id: 'notifications', label: 'Notifications', icon: <FaBell /> },
        { id: 'appearance', label: 'Appearance', icon: <FaPalette /> },
    ];

    const renderContent = () => {
        switch (activeSection) {
            case 'profile':
                return (
                    <div className={classes.profileContent}>
                        <div className={classes.sectionHeader}>
                            <h3>Profile Information</h3>
                            <button
                                className={classes.editBtn}
                                onClick={handleEditToggle}
                            >
                                <FaEdit />
                                {isEditing ? 'Save Changes' : 'Edit Profile'}
                            </button>
                        </div>

                        <div className={classes.profileForm}>
                            <div className={classes.formGroup}>
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={userData.firstName}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                />
                            </div>

                            <div className={classes.formGroup}>
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={userData.lastName}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                />
                            </div>

                            <div className={classes.formGroup}>
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>

                        <div className={classes.accountInfo}>
                            <h4>Account Information</h4>
                            <div className={classes.infoGrid}>
                                <div className={classes.infoItem}>
                                    <span className={classes.infoLabel}>Member Since:</span>
                                    <span className={classes.infoValue}>{createdAt}</span>
                                </div>
                                <div className={classes.infoItem}>
                                    <span className={classes.infoLabel}>User ID:</span>
                                    <span className={classes.infoValue}>{user?._id?.substring(0, 8)}...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'security':
                return <ResetPassword />;

            case 'notifications':
                return (
                    <div className={classes.notificationsContent}>
                        <h3>Notification Preferences</h3>
                        <div className={classes.notificationSettings}>
                            <div className={classes.settingItem}>
                                <label>
                                    <input type="checkbox" defaultChecked />
                                    Email notifications for resume updates
                                </label>
                            </div>
                            <div className={classes.settingItem}>
                                <label>
                                    <input type="checkbox" defaultChecked />
                                    Weekly resume tips and suggestions
                                </label>
                            </div>
                            <div className={classes.settingItem}>
                                <label>
                                    <input type="checkbox" />
                                    Product updates and new features
                                </label>
                            </div>
                        </div>
                    </div>
                );

            case 'appearance':
                return (
                    <div className={classes.appearanceContent}>
                        <h3>Appearance Settings</h3>
                        <div className={classes.themeSettings}>
                            <div className={classes.settingItem}>
                                <label>
                                    <input
                                        type="radio"
                                        name="theme"
                                        value="light"
                                        defaultChecked={!darkMode}
                                    />
                                    Light Mode
                                </label>
                            </div>
                            <div className={classes.settingItem}>
                                <label>
                                    <input
                                        type="radio"
                                        name="theme"
                                        value="dark"
                                        defaultChecked={darkMode}
                                    />
                                    Dark Mode
                                </label>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    }

    return (
        <div className={`${classes.accountSettings} ${darkMode ? classes.dark : classes.light}`}>
            <header className={classes.header}>
                <h1 className={classes.heading}>
                    Account Settings
                </h1>
                <p className={classes.subtitle}>Manage your account information and preferences</p>
            </header>

            <main className={classes.mainContent}>
                {/* Sidebar Navigation */}
                <aside className={classes.sidebar}>
                    <div className={classes.userCard}>
                        <div className={classes.avatarSection}>
                            <div className={classes.avatar}>
                                <FaUserCircle size={60} />
                                <button
                                    className={classes.avatarEdit}
                                    onClick={addUserImageHandler}
                                >
                                    <FaCamera size={14} />
                                </button>
                            </div>
                            <div className={classes.userBasicInfo}>
                                <h3>{fullName}</h3>
                                <p>{email}</p>
                            </div>
                        </div>
                    </div>

                    <nav className={classes.navigation}>
                        {menuItems.map(item => (
                            <button
                                key={item.id}
                                className={`${classes.navItem} ${activeSection === item.id ? classes.active : ''}`}
                                onClick={() => setActiveSection(item.id)}
                            >
                                <span className={classes.navIcon}>{item.icon}</span>
                                <span className={classes.navLabel}>{item.label}</span>
                            </button>
                        ))}
                    </nav>

                    <div className={classes.sidebarFooter}>
                        <button
                            className={classes.logoutBtn}
                            onClick={handleLogout}
                        >
                            <FaSignOutAlt />
                            Logout
                        </button>
                    </div>
                </aside>

                {/* Main Content Area */}
                <section className={classes.contentArea}>
                    {renderContent()}
                </section>
            </main>
        </div>
    )
}

export default AccountSettings