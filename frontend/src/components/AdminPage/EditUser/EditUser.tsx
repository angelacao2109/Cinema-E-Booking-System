import React, { useState } from "react";
import './EditUser.css';

function EditUser() {
    const [admins, setAdmins] = useState([
        { email: "admin1@example.com", id: 1 },
        { email: "admin2@example.com", id: 2 },
        // ... other admins
    ]);

    const [users, setUsers] = useState([
        { email: "user1@example.com", promoStatus: "Active", id: 3 },
        { email: "user2@example.com", promoStatus: "Pending", id: 4 },
        // ... other users
    ]);

    const [newAdmin, setNewAdmin] = useState({ email: '' });

    const handleNewAdminChange = (e) => {
        setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
    };

    const handleNewAdminSubmit = (e) => {
        e.preventDefault();
        setAdmins([...admins, { ...newAdmin, id: new Date().getTime() }]);
        setNewAdmin({ email: '' });
    };

    const handleUpdate = (userId, updatedData) => {
        // Implement update logic
        console.log(`Update user with id: ${userId}`);
    };
    
    const handleSuspend = (userId) => {
        // Implement suspend logic
        console.log(`Suspend user with id: ${userId}`);
    };
    
    const handleDelete = (userId) => {
        // Implement delete logic
        console.log(`Delete user with id: ${userId}`);
    };

    return (
        <div>
            <h1>MANAGE USERS</h1>
            <hr/>
            <div>
                <h2 className="align-left">Admins</h2>
                <table className="right-aligned-table">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((admin) => (
                            <tr key={admin.id}>
                                <td>{admin.email}</td>
                                <td className="action-cell">
                                <button style={{ margin: '5px', padding: '5px 10px' }}onClick={() => handleDelete(admin.id)}>Delete</button>
                                <button style={{ margin: '5px', padding: '5px 10px' }}onClick={() => handleUpdate(admin.id, {/* updatedData */})}>Edit</button>
                                <button style={{ margin: '5px', padding: '5px 10px' }}onClick={() => handleSuspend(admin.id)}>Suspend</button>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <h2 className="align-left">Registered Users</h2>
                <table className="right-aligned-table">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Promo Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.email}</td>
                                <td>{user.promoStatus}</td>
                                <td>
                                    <button style={{ margin: '5px', padding: '5px 10px' }} onClick={() => handleDelete(user.id)}>Delete</button>
                                    <button style={{ margin: '5px', padding: '5px 10px' }} onClick={() => handleUpdate(user.id, {/* updatedData */})}>Edit</button>
                                    <button style={{ margin: '5px', padding: '5px 10px' }} onClick={() => handleSuspend(user.id)}>Suspend</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <h2>Add New Admin</h2>
                <form onSubmit={handleNewAdminSubmit}>
                    <label>
                        Email:
                        <input type="email" name="email" value={newAdmin.email} onChange={handleNewAdminChange} />
                    </label>
                    <button type="submit">Add Admin</button>
                </form>
            </div>
        </div>
    );
}

export default EditUser;
