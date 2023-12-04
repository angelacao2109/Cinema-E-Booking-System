import React, { useState, useEffect } from "react";
import './EditUser.css';
import axios from "axios";

interface User {
    email: string;
    accountStatus: string;
    enabled: boolean;
    id: number;
}

const authToken = document.cookie
  .split("; ")
  .find((row) => row.startsWith("authToken="))
  ?.split("=")[1];

function EditUser() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/admin/getAllUsers',
                {
                    headers: {
                      Authorization: authToken,
                      "Content-Type": "application/json",
                      "Referrer-Policy": "unsafe_url",
                    },
                }); 
    
                const nonAdminUsers = response.data.filter(user => 
                    !user.roles.some(role => role.name === 'ROLE_ADMIN')
                );
    
                setUsers(nonAdminUsers.map(user => ({
                    email: user.email,
                    accountStatus: user.enabled ? "Active" : "Suspended",
                    enabled: user.enabled,
                    id: user.id
                })));
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
    
        fetchUsers();
    }, []);
    
    
    const handleSuspend = async (userId: number) => {
        try {
            const response = await axios.post('http://localhost:8080/api/admin/disableUser',{ email: users.find(u => u.id === userId)?.email },
            {
                headers: {
                  Authorization: authToken,
                  "Content-Type": "application/json",
                  "Referrer-Policy": "unsafe_url",
                },
            });
            if (response.status === 200) {
                setUsers(users.map(user => 
                    user.id === userId ? { ...user, accountStatus: "Suspended" } : user
                ));
            }
        } catch (error) {
            console.error('Error suspending user:', error);
        }
    };

    const handleEnable = async (userId: number) => {
        try {
            const response = await axios.post('http://localhost:8080/api/admin/enableUser', { email: users.find(u => u.id === userId)?.email },
            {
                headers: {
                  Authorization: authToken,
                  "Content-Type": "application/json",
                  "Referrer-Policy": "unsafe_url",
                },
            });
            if (response.status === 200) {
                setUsers(users.map(user => 
                    user.id === userId ? { ...user, accountStatus: "Active" } : user
                ));
            }
        } catch (error) {
            console.error('Error enabling user:', error);
        }
    };

    return (
        <div>
            <h1>MANAGE USERS</h1>
            <hr/>
            <div>
                <h2>Registered Users</h2>
                <table className="right-aligned-table">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Account Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.email}</td>
                                <td>{user.accountStatus}</td>
                                <td className="action-cell">
                                    <button onClick={() => handleSuspend(user.id)}>Suspend</button>
                                    <button onClick={() => handleEnable(user.id)}>Enable</button>
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
