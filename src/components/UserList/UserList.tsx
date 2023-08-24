import React, { useEffect, useState } from 'react'
import AiModal from '../Layout/Modal';



type User = {
    id: number;
    fullName: string;
    email: string;
    userRole: string;
};

export default function UserList() {
    const [isAddOpen, setAddOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [isEdit, setIsEdit] = useState(false)
    const [filteredList, setFilteredList] = useState(users);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        userRole: "",
        password: ""
    })

    const [editData, setEditData] = useState({
        userId: '',
        fullName: '',
        email: '',
        userRole: "",
        password: ""
    })
    console.log(users)

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://192.168.1.89:8080/api/users");
            const data = await response.json();
            console.log(data)

            if (response.status === 200) {
                setUsers(data);
                setFilteredList(data)
                // Update the users state with the data from the API
            } else {
                console.log("Failed to fetch users");
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };


    const deleteUser = async (user: any) => {
        
        try {
            const response = await fetch(`http://192.168.1.89:8080/api/users/${user.userId}/deleteUser`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            fetchUsers();
            if (response.status === 200) {
                console.log("User Deleted")
            } else {
                console.log("Failed to delete")
            }

        } catch (err) {
            console.log("Failed to delete:", err)
        }
    }

    const editUser = (user: any) => {
        setAddOpen(true)
        setIsEdit(true)
        setEditData({
            userId: user.userId,
            fullName: user.fullName,
            email: user.email,
            userRole: user.userRole,
            password: user.password
        })
    }

    const setName = (event: any) => {
        {isEdit? setEditData((prevData) => ({
            ...prevData,
            fullName: event.target.value
        })): setFormData((prevData) => ({
            ...prevData,
            fullName: event.target.value
        }))}
    }

    const setEmail = (event: any) => {
        {isEdit? setEditData((prevData) => ({
            ...prevData,
            email: event.target.value
        })): setFormData((prevData) => ({
            ...prevData,
            email: event.target.value
        }))}
    }

    const setRole = (event: any) => {
        {isEdit? setEditData((prevData) => ({
            ...prevData,
            userRole: event.target.value
        })): setFormData((prevData) => ({
            ...prevData,
            userRole: event.target.value
        }))}
    }

    const setPassword = (event: any) => {
        {isEdit? setEditData((prevData) => ({
            ...prevData,
            password: event.target.value
        })): setFormData((prevData) => ({
            ...prevData,
            password: event.target.value
        }))}
    }

    const updateData = async () => {
        console.log(editData.userId)
        try {
            const response = await fetch(`http://192.168.1.89:8080/api/users/${editData.userId}/updateUser`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editData)
            })
            fetchUsers()
            if (response.status === 201) {
                setAddOpen(false)
                console.log("User updated")
            } else {
                console.log("Failed to update")
            }

        } catch (err) {
            console.log("Failed to update:", err)
        }
    }


    const submitData = async () => {
        console.log(formData)
        try {
            const response = await fetch("http://192.168.1.89:8080/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            fetchUsers()
            if (response.status === 200) {
                setAddOpen(false)
                console.log("User updated")
            } else {
                console.log("Failed to update")
            }

        } catch (err) {
            console.log("Failed to update:", err)
        }
    }

    const filterUser = (event: any) => {
        const filterValue = event.target.value.toLowerCase();
        const filteredUsers = users.filter((user) => {
            return user.fullName.toLowerCase().includes(filterValue)
        });
        setFilteredList(filteredUsers);
    };

    return (
        <div className="plan-list">
            <AiModal title={isEdit ? "Edit User" : "Add User"} isOpen={isAddOpen} onClose={() => setAddOpen(false)}>
                <form className="user-form" onSubmit={isEdit ? updateData : submitData}>
                    <div className="form-group">
                        <label htmlFor="username">Name:</label>
                        <input type="text" id="username" name="username" placeholder="Enter your name" required value={isEdit?editData.fullName:formData.fullName} onChange={setName} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" required value={isEdit?editData.email:formData.email} onChange={setEmail} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" required value={isEdit?editData.password:formData.password} onChange={setPassword} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Role:</label>
                        <select id="role" name="role" className="role-dropdown" value={isEdit?editData.userRole:formData.userRole} onChange={setRole}>
                            <option value="Admin">Admin</option>
                            <option value="Teacher">Teacher</option>
                            <option value="Student">Student</option>
                        </select>
                    </div>

                    <button type="submit" className="submit-btn">Register</button>
                </form>

            </AiModal>
            <div className="module-header glass-structure">
                <h3>Users</h3>
                <div className="module-actions">
                    <input type="text" placeholder="Search..." className="module-search-input" onChange={filterUser} />
                    <button className="module-add-btn" onClick={() => setAddOpen(!isAddOpen)} >Add</button>
                </div>
            </div>
            <div className="table-container glass-table-structure">
                <table className="table-stripped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredList.map(user => (
                                <tr key={user.id}>
                                    <td>{user.fullName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.userRole}</td>
                                    <td>
                                        <button className="table-action-btn table-edit-btn" onClick={() => editUser(user)}>Edit</button>
                                        <button className="table-action-btn table-delete-btn" onClick={() => deleteUser(user)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
}
