import { useEffect, useState, ChangeEvent, FormEvent } from "react";

interface Tenant {
  id?: number;
  tenant_name: string;
  room_number: number;
  rent_amount: number;
  join_date: string;
  total_overdue_months: number;
  total_overdue_amount: number;
  [key: string]: any; // for dynamic key access in searchCategory
}

export default function ManageTenants() {
  const [showForm, setShowForm] = useState(false);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [formTenant, setFormTenant] = useState<Tenant>({
    tenant_name: "",
    room_number: 0,
    rent_amount: 0,
    join_date: "",
    total_overdue_months: 0,
    total_overdue_amount: 0,
  });
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchCategory, setSearchCategory] = useState<string>("tenant_name");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const tenantsPerPage = 15;
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = () => {
    fetch(`${API_URL}/tenants_all_details/`)
      .then((res) => res.json())
      .then((data) => setTenants(data));
  };

  const indexOfLastTenant = currentPage * tenantsPerPage;
  const indexOfFirstTenant = indexOfLastTenant - tenantsPerPage;
  const currentTenants = tenants
    .filter((tenant) => {
      const value = tenant[searchCategory];
      if (typeof value === "string") {
        return value.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (typeof value === "number") {
        return value.toString().includes(searchTerm);
      }
      return false;
    })
    .slice(indexOfFirstTenant, indexOfLastTenant);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormTenant({ ...formTenant, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formattedTenant = {
      ...formTenant,
      join_date: new Date(formTenant.join_date)
        .toLocaleDateString("en-GB")
        .split("/")
        .join("-"),
    };
    const url = isEditing
      ? `${API_URL}/edit_tenant/${isEditing}/`
      : `${API_URL}/add_tenant/`;

    const method = isEditing ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedTenant),
    })
      .then((res) => res.json())
      .then(() => {
        fetchTenants();
        setFormTenant({
          tenant_name: "",
          room_number: 0,
          rent_amount: 0,
          join_date: "",
          total_overdue_months: 0,
          total_overdue_amount: 0,
        });
        setIsEditing(null);
        setShowForm(false); // hide form after submit
      });
  };

  const handleEdit = (tenant: Tenant) => {
    setFormTenant(tenant);
    setIsEditing(tenant.id ?? null);
    setShowForm(true); // show form when editing
  };

  const handleDelete = async (id: number | undefined) => {
    //Ask the user for confirmation
    const confirmDeleteTenant = window.confirm(
      "Are you sure you want to delete this tenant?"
    );

    if (confirmDeleteTenant) {
      //Proceed to delete the tenant
      try {
        const response = await fetch(`${API_URL}/delete_tenant/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          alert("Tenant not deleted!");
          throw new Error(`Failed to delete tenant: ${response.statusText}`);
        }
        alert("Tenant deleted successfully!");

        //Refresh tenants list
        fetchTenants();
      } catch (error) {
        console.error("Error deleting tenant:", error);
      }
    } else {
      //Do noting and retain the post
      alert("Tenant not deleted!");
      return;
    }
  };

  const handleAddNew = () => {
    setFormTenant({
      tenant_name: "",
      room_number: 0,
      rent_amount: 0,
      join_date: "",
      total_overdue_months: 0,
      total_overdue_amount: 0,
    });
    setIsEditing(null);
    setShowForm(true);
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
    <div style={{ padding: "0px", marginTop: "20px" }}>
      <div className="font-bold text-2xl text-center mb-2 underline">
        <h1>Tenants' List</h1>
      </div>
      <div
        className="bg-gray-300"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "20px 0",
          flexWrap: "wrap", // optional for responsiveness
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <input
            type="text"
            placeholder="Enter search term"
            value={searchTerm}
            onChange={handleSearch}
          />
          <select value={searchCategory} onChange={handleSelectChange}>
            <option value="tenant_name">Tenant Name</option>
            <option value="room_number">Room Number</option>
            <option value="rent_amount">Rent Amount</option>
          </select>
          <p style={{ margin: 0 }}>Items found: {currentTenants.length}</p>
        </div>
        <div>
          <button
            onClick={handleAddNew}
            style={{
              padding: "5px 5px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            {isEditing ? "Edit Tenant" : "Add New Tenant"}
          </button>
        </div>
      </div>

      {showForm && (
        <>
          <form
            onSubmit={handleSubmit}
            style={{
              marginBottom: "20px",
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            {[
              {
                label: "Tenant Name",
                id: "tenant_name",
                type: "text",
              },
              {
                label: "Room Number",
                id: "room_number",
                type: "number",
              },
              {
                label: "Rent Amount",
                id: "rent_amount",
                type: "number",
              },
              {
                label: "Join Date",
                id: "join_date",
                type: "date",
              },
              {
                label: "Overdue Months",
                id: "total_overdue_months",
                type: "number",
              },
              {
                label: "Overdue Amount",
                id: "total_overdue_amount",
                type: "number",
              },
            ].map(({ label, id, type }) => (
              <div
                key={id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label htmlFor={id}>{label}</label>
                <input
                  type={type}
                  id={id}
                  name={id}
                  placeholder={label}
                  value={(formTenant as any)[id]}
                  onChange={handleChange}
                  required={[
                    "tenant_name",
                    "room_number",
                    "rent_amount",
                    "join_date",
                  ].includes(id)}
                  readOnly={
                    isEditing != null &&
                    ["total_overdue_months", "total_overdue_amount"].includes(
                      id
                    )
                  }
                />
              </div>
            ))}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "end",
              }}
            >
              <button
                type="submit"
                style={{ height: "38px", marginTop: "22px" }}
              >
                {isEditing ? "Update" : "Add"}
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setIsEditing(null);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </>
      )}

      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #ddd" }}>
            <th style={{ border: "1px solid #ddd", padding: "5px" }}>
              Tenant Name
            </th>
            <th style={{ border: "1px solid #ddd", padding: "5px" }}>
              Room Number
            </th>
            <th style={{ border: "1px solid #ddd", padding: "5px" }}>
              Rent Amount
            </th>
            <th style={{ border: "1px solid #ddd", padding: "5px" }}>
              Join Date
            </th>
            <th style={{ border: "1px solid #ddd", padding: "5px" }}>
              Overdue Months
            </th>
            <th style={{ border: "1px solid #ddd", padding: "5px" }}>
              Overdue Amount (Kes)
            </th>
            <th style={{ border: "1px solid #ddd", padding: "5px" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentTenants.map((t) => (
            <tr key={t.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {t.tenant_name}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                {t.room_number}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                {t.rent_amount}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                {t.join_date}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                {t.total_overdue_months}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                {t.total_overdue_amount}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <button
                  onClick={() => handleEdit(t)}
                  className="px-2 bg-green-400"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="bg-red-500"
                >
                  Delete
                </button>
              </td>
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
  );
}
