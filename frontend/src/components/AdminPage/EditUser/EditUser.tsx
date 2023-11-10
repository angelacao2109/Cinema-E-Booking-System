import React from "react";
import './EditUser.css';

function EditUser() {
    // Placeholder data for admins
    const admins = [
        { email: "admin1@example.com", promoStatus: "Active", id: 1 },
        { email: "admin2@example.com", promoStatus: "Inactive", id: 2 },
        // ... other admins
    ];

    // Placeholder data for registered users
    const users = [
        { email: "user1@example.com", promoStatus: "Active", id: 3 },
        { email: "user2@example.com", promoStatus: "Pending", id: 4 },
        // ... other users
    ];

    // Function to handle delete action
    const handleDelete = (userId) => {
        // Logic to delete user by id
        console.log(`Delete user with id: ${userId}`);
    };

    return (
        <div>
            <h1>MANAGE USERS</h1>
            <hr/>
            <div>
                <h2 className="align-left">Admins</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Promo Status</th>
                            <th>Delete Account</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((admin) => (
                            <tr key={admin.id}>
                                <td>{admin.email}</td>
                                <td>{admin.promoStatus}</td>
                                <td>
                                    <button onClick={() => handleDelete(admin.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <h2 className="align-left">Registered Users</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Promo Status</th>
                            <th>Delete Account</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.email}</td>
                                <td>{user.promoStatus}</td>
                                <td>
                                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EditUser;
