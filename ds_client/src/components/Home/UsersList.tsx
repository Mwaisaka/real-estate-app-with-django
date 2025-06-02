import { useEffect, useState, ChangeEvent } from "react";

interface User {
    id: number;
    user_id: number;
    fullname: string;
    age: number;
    gender: string;
    role: string;
    [key: string]: any; // for dynamic key access in searchCategory
}

function UsersList() {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchCategory, setSearchCategory] = useState<string>("fullname");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const usersPerPage = 15;
    const [confirmDeleteIds, setConfirmDeleteIds] = useState<number[]>([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/users")
            .then((r) => r.json())
            .then(setUsers);
    }, []);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users
        .filter((user) =>
            user[searchCategory]?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleDelete = (userId: number) => {
        setConfirmDeleteIds([...confirmDeleteIds, userId]);
    };

    const confirmDelete = async (userId: number) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/admin/${userId}`, {
                method: "DELETE",
            });
            if (response.ok) {
                alert("User deleted successfully");
                setUsers(users.filter((user) => user.user_id !== userId));
            } else if (response.status === 400) {
                throw new Error("Invalid role. Only 'teacher' or 'student' can be deleted");
            } else {
                throw new Error("Failed to delete user");
            }
        } catch (error: any) {
            console.error("Error deleting user:", error.message);
        }
        setConfirmDeleteIds(confirmDeleteIds.filter((id) => id !== userId));
    };

    const cancelDelete = (userId: number) => {
        setConfirmDeleteIds(confirmDeleteIds.filter((id) => id !== userId));
    };

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchCategory(event.target.value);
        setCurrentPage(1);
    };

    return (
        <section style={{ display: "flex", justifyContent: "center" }}>
            <div>
                <div style={{ textAlign: "center" }}>
                    <h2>
                        <strong>
                            <u>LIST OF ALL USERS</u>
                        </strong>
                    </h2>
                    <input
                        type="text"
                        placeholder="Enter search term"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <select value={searchCategory} onChange={handleSelectChange}>
                        <option value="fullname">Name</option>
                        <option value="role">Role</option>
                        <option value="rent_amount">Rent</option>
                    </select>
                    <p>Items found: {currentUsers.length}</p>
                </div>

                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                    <thead>
                        <tr style={{ borderBottom: "1px solid #ddd" }}>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                                FULLNAME
                            </th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                                EMAIL
                            </th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                                CREATE DATE
                            </th>

                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                                ACTION
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user) => (
                            <tr key={user.id} style={{ borderBottom: "1px solid #ddd" }}>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                    {user.fullname}
                                </td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                    {user.email}
                                </td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                    {user.create_date}
                                </td>


                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                                    {confirmDeleteIds.includes(user.id) && (
                                        <>
                                            <button onClick={() => confirmDelete(user.id)}>
                                                Confirm
                                            </button>
                                            <button onClick={() => cancelDelete(user.id)}>
                                                Cancel
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <h3>Page</h3>
                    {[...Array(Math.ceil(users.length / usersPerPage)).keys()].map(
                        (number) => (
                            <button key={number} onClick={() => paginate(number + 1)}>
                                {number + 1}
                            </button>
                        )
                    )}
                </div>
            </div>
        </section>
    );
}

export default UsersList;
