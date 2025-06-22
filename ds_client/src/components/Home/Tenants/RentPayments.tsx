import { useEffect, useState, ChangeEvent, FormEvent } from "react";

interface RentPayment {
  id?: number;
  tenant_id?: number;
  tenant_name: string;
  year: number;
  month: number;
  amount_due: number;
  amount_paid: number;
  date_paid: string;
}
interface Tenant {
  id?: number;
  tenant_name: string;
  room_number: number;
  rent_amount: number;
  join_date: string;
  total_overdue_months: number;
  total_overdue_amount: number;
}

export default function RentPayments() {
  const [showForm, setShowForm] = useState(false);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [payments, setPayments] = useState<RentPayment[]>([]);
  const [paymentForm, setPaymentForm] = useState({
    tenant: "", // tenant ID
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,

    amount_paid: 0,
    date_paid: "",
  });
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchTenantsPayments();
  }, []);

  const fetchTenantsPayments = () => {
    fetch(`${API_URL}/payments/`)
      .then((res) => res.json())
      .then((data) => setPayments(data));
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = () => {
    fetch(`${API_URL}/tenants/`)
      .then((res) => res.json())
      .then((data) => setTenants(data));
  };

  const handlePaymentChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPaymentForm({ ...paymentForm, [name]: value });
  };

  const handleSubmitPayment = (e: FormEvent) => {
    e.preventDefault();

    const url = isEditing
      ? `${API_URL}/edit_payment/${isEditing}/`
      : `${API_URL}/add_payment/`;

    const method = isEditing ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentForm),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(`Error: ${data.error}`);
        } else {
          alert(
            isEditing
              ? "Payment updated successfully!"
              : "Payment added successfully!"
          );
          // Optionally refresh data or reset form
          setPaymentForm({
            tenant: "",
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,

            amount_paid: 0,
            date_paid: "",
          });
          setIsEditing(null);
          setShowForm(false); // hide form after submit
          fetchTenantsPayments(); // refresh the table
        }
      })
      .catch((err) => console.error("Payment error:", err));
  };

  const handleEdit = (rentpayment: RentPayment) => {
    setPaymentForm({
      tenant: rentpayment.tenant_id?.toString() || "",
      year: rentpayment.year,
      month: rentpayment.month,

      amount_paid: rentpayment.amount_paid,
      date_paid: rentpayment.date_paid,
    });
    setIsEditing(rentpayment.id ?? null);
    setShowForm(true); // show form when editing
  };

  const handleDelete = async (id: number | undefined) => {
    //Ask the user for confirmation
    const confirmDeletePayment = window.confirm(
      "Are you sure you want to delete this payment?"
    );

    if (confirmDeletePayment) {
      //Proceed to delete the tenant
      try {
        const response = await fetch(
          `${API_URL}/delete_payment/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          alert("Payment not deleted!");
          throw new Error(`Failed to delete tenant: ${response.statusText}`);
        }
        alert("Payment deleted successfully!");

        //Refresh tenants list
        fetchTenantsPayments();
      } catch (error) {
        console.error("Error deleting payment:", error);
      }
    } else {
      //Do noting and retain the post
      alert("Payment not deleted!");
      return;
    }
  };

  const handleAddNew = () => {
    setPaymentForm({
      tenant: "",
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      amount_paid: 0,
      date_paid: "",
    });
    setIsEditing(null);
    setShowForm(true);
  };

  return (
    <div style={{ padding: "0px", marginTop: "20px" }}>
      <div className="font-bold text-xl text-center mb-2 underline">
        <h1>Tenants' Monthly Rent Payments</h1>
      </div>
      <button
        onClick={handleAddNew}
        style={{
          marginBottom: "10px",
          padding: "5px 10px",
          backgroundColor: "#4caf50",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        {isEditing ? "Edit Tenant" : "Add New Payment"}
      </button>
      {showForm && (
        <>
          <form
            onSubmit={handleSubmitPayment}
            style={{
              marginTop: "20px",
              padding: "10px",
              border: "1px solid #ccc",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "15px",
                alignItems: "flex-end",
              }}
            >
              <div>
                <label>Tenant</label>
                <br />
                <select
                  name="tenant"
                  value={paymentForm.tenant}
                  onChange={handlePaymentChange}
                  required
                >
                  <option value="">Select Tenant</option>
                  {tenants.map((tenant) => (
                    <option key={tenant.id} value={tenant.id}>
                      {tenant.tenant_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>Year</label>
                <br />
                <input
                  type="number"
                  name="year"
                  value={paymentForm.year}
                  onChange={handlePaymentChange}
                  placeholder="Year"
                  required
                />
              </div>

              <div>
                <label>Month</label>
                <br />
                <input
                  type="number"
                  name="month"
                  min={1}
                  max={12}
                  value={paymentForm.month}
                  onChange={handlePaymentChange}
                  placeholder="Month"
                  required
                />
              </div>

              <div>
                <label>Amount Paid</label>
                <br />
                <input
                  type="number"
                  name="amount_paid"
                  value={paymentForm.amount_paid}
                  onChange={handlePaymentChange}
                  placeholder="Amount Paid"
                  required
                />
              </div>

              <div>
                <label>Date Paid</label>
                <br />
                <input
                  type="date"
                  name="date_paid"
                  value={paymentForm.date_paid}
                  onChange={handlePaymentChange}
                />
              </div>

              <div>
                <br />
                <button type="submit" style={{ padding: "6px 12px" }}>
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
            <th style={{ border: "1px solid #ddd", padding: "5px" }}>Year</th>
            <th style={{ border: "1px solid #ddd", padding: "5px" }}>Month</th>

            <th style={{ border: "1px solid #ddd", padding: "5px" }}>
              Amount Paid
            </th>
            <th style={{ border: "1px solid #ddd", padding: "5px" }}>
              Date Paid
            </th>
            <th style={{ border: "1px solid #ddd", padding: "5px" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {payments.map((t) => (
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
                {t.year}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                {t.month}
              </td>

              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                {t.amount_paid}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                {t.date_paid}
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
    </div>
  );
}
