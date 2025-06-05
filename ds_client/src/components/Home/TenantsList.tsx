import { useEffect, useState, ChangeEvent } from "react";

interface Tenant {
    id: number;
    tenant_name: string;
    room_number: number;
    rent_amount: number;
    join_date: string;
    total_overdue_months : number;
    total_overdue_amount : number;
    [key: string]: any; // for dynamic key access in searchCategory
}

function TenantsList() {
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchCategory, setSearchCategory] = useState<string>("tenant_name");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const tenantsPerPage = 15;
    const [confirmDeleteIds, setConfirmDeleteIds] = useState<number[]>([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/tenants_all_details")
            .then((r) => r.json())
            .then(setTenants);
            console.log("Tenants: "+tenants)
    }, []);

    const indexOfLastTenant = currentPage * tenantsPerPage;
    const indexOfFirstTenant = indexOfLastTenant - tenantsPerPage;
    const currentTenants = tenants
        .filter((tenant) =>
            {
                const value = tenant[searchCategory];
                if (typeof value === "string") {
                    return value.toLowerCase().includes(searchTerm.toLowerCase());
                } else if (typeof value === "number") {
                    return value.toString().includes(searchTerm);
                }
                return false;
            }
        )
        .slice(indexOfFirstTenant, indexOfLastTenant);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleDelete = (tenantId: number) => {
        setConfirmDeleteIds([...confirmDeleteIds, tenantId]);
    };

    const confirmDelete = async (tenantId: number) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/admin/${tenantId}`, {
                method: "DELETE",
            });
            if (response.ok) {
                alert("Tenant deleted successfully");
                setTenants(tenants.filter((tenant) => tenant.tenant_id !== tenantId));
            } else if (response.status === 400) {
                throw new Error("Invalid role. Only 'teacher' or 'student' can be deleted");
            } else {
                throw new Error("Failed to delete user");
            }
        } catch (error: any) {
            console.error("Error deleting user:", error.message);
        }
        setConfirmDeleteIds(confirmDeleteIds.filter((id) => id !== tenantId));
    };

    const cancelDelete = (tenantId: number) => {
        setConfirmDeleteIds(confirmDeleteIds.filter((id) => id !== tenantId));
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
        <section style={{ display: "flex", justifyContent: "center" , marginTop: '10px'}}>
            <div>
                <div style={{ textAlign: "center", marginTop: '20px', marginBottom: '20px'}}>
                    <h2>
                        <strong>
                            <u>LIST OF ALL TENANTS</u>
                        </strong>
                    </h2>
                    <input
                        type="text"
                        placeholder="Enter search term"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <select value={searchCategory} onChange={handleSelectChange}>
                        <option value="tenant_name">Name</option>
                        <option value="room_number">Room</option>
                        <option value="rent_amount">Rent</option>
                    </select>
                    <p>Items found: {currentTenants.length}</p>
                </div>

                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                    <thead>
                        <tr style={{ borderBottom: "1px solid #ddd" }}>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                                Tenant Name
                            </th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                                Room Number
                            </th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                                Rent Amount
                            </th>

                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                                Join Date
                            </th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                                Overdue Months
                            </th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                                Overdue Amount (Kes)
                            </th>
                            {/* <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                                ACTION
                            </th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {currentTenants.map((tenant) => (
                            <tr key={tenant.id} style={{ borderBottom: "1px solid #ddd" }}>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                    {tenant.tenant_name}
                                </td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" , textAlign: "center"}}>
                                    {tenant.room_number}
                                </td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" , textAlign: "center"}}>
                                    {tenant.rent_amount}
                                </td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" , textAlign: "center"}}>
                                    {tenant.join_date}
                                </td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" , textAlign: "center"}}>
                                    {tenant.total_overdue_months}
                                </td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" , textAlign: "center"}}>
                                    {tenant.total_overdue_amount}
                                </td>


                                {/* <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                    <button onClick={() => handleDelete(tenant.id)}>Delete</button>
                                    {confirmDeleteIds.includes(tenant.id) && (
                                        <>
                                            <button onClick={() => confirmDelete(tenant.id)}>
                                                Confirm
                                            </button>
                                            <button onClick={() => cancelDelete(tenant.id)}>
                                                Cancel
                                            </button>
                                        </>
                                    )}
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <h3>Page</h3>
                    {[...Array(Math.ceil(tenants.length / tenantsPerPage)).keys()].map(
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

export default TenantsList;
