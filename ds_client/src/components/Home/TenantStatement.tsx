import { useEffect, useState, ChangeEvent, FormEvent } from "react";

interface Tenant {
  id?: number;
  tenant_name: string;
  room_number: number;
  rent_amount: number;
  join_date: string;
  total_overdue_months: number;
  total_overdue_amount: number;
}

interface TenantStatement {
  generated_on: string;
  tenant: {
    id: number;
    tenant_name: string;
    room_number: number;
    rent_amount: number;
    join_date: string;
  };
  payment_history: {
    year: number;
    month: number;
    amount_due: number;
    amount_paid: number;
    balance: number;
    date_paid: string | null;
  }[];
  summary: {
    total_due: number;
    total_paid: number;
    balance: number;
  };
}

export default function TenantStatement() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [statement, setStatement] = useState<TenantStatement | null>(null);

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = () => {
    fetch("http://127.0.0.1:8000/tenants_all_details/")
      .then((res) => res.json())
      .then((data) => setTenants(data));
  };

  const fetchTenantStatement = (tenantId: number) => {
    fetch(`http://127.0.0.1:8000/tenant/${tenantId}/tenant_statement/`)
      .then((res) => res.json())
      .then((data) => setStatement(data))
      .catch((err) => console.error("Statement fetch error:", err));
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <div className="font-bold text-xl text-center mb-2 underline">
        <h1>Summary of Tenants' Rent Payments</h1>
      </div>
      <div>
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
            {tenants.map((t) => (
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
                <td style={{ border: "1px solid #ddd", padding: "0px" }}>
                  <button
                    onClick={() => fetchTenantStatement(t.id!)}
                    className="px-1 bg-green-400"
                  >
                    View Statement
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {statement && (
        <div
          style={{
            marginTop: "30px",
            border: "1px solid #aaa",
            padding: "15px",
          }}
        >
          <h3 className="font-bold text-center text-xl mb-5 underline decoration-dashed">
            Tenant Rent Payment Statement
          </h3>
          <div className="mb-10">
            <hr className="my-4 border-gray-300" />
            <h3>
              <strong>Tenant Name</strong> : {statement.tenant.tenant_name}
            </h3>
            <h3>
              <strong>Generated on</strong> : {statement.generated_on}
            </h3>
            <h3>
              <strong>Room Number</strong> : {statement.tenant.room_number}
            </h3>
            <p>
              {/* <strong>Room Number:</strong> {statement.tenant.room_number} |{" "} */}
              <strong>Rent Amount (Kes):</strong> {statement.tenant.rent_amount}
            </p>
            <p>
              <strong>Join Date:</strong> {statement.tenant.join_date}
            </p>
            <hr className="my-4 border-gray-300" />
          </div>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "10px",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <th style={{ border: "1px solid #ddd", padding: "1px" }}>
                  Year
                </th>
                <th style={{ border: "1px solid #ddd", padding: "1px" }}>
                  Month
                </th>
                <th style={{ border: "1px solid #ddd", padding: "1px" }}>
                  Amount Due (Kes)
                </th>
                <th style={{ border: "1px solid #ddd", padding: "1px" }}>
                  Amount Paid (Kes)
                </th>
                <th style={{ border: "1px solid #ddd", padding: "1px" }}>
                  Overdue Amount (Kes)
                </th>
                <th style={{ border: "1px solid #ddd", padding: "1px" }}>
                  Date Paid
                </th>
              </tr>
            </thead>
            <tbody>
              {statement.payment_history.map((p, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #ddd" }}>
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "1px",
                      textAlign: "center",
                    }}
                  >
                    {p.year}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "1px",
                      textAlign: "center",
                    }}
                  >
                    {p.month}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "1px",
                      textAlign: "right",
                    }}
                  >
                    {p.amount_due}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "1px",
                      textAlign: "right",
                    }}
                  >
                    {p.amount_paid}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "1px",
                      textAlign: "right",
                    }}
                  >
                    {p.balance}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "1px",
                      textAlign: "center",
                    }}
                  >
                    {p.date_paid ?? "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-5 mb-3">
            <h4 className="font-bold underline">Rent Summary</h4>
            <p>
              <strong>Total Due (Kes):</strong> {statement.summary.total_due}
            </p>
            <p>
              <strong>Total Paid (Kes):</strong> {statement.summary.total_paid}
            </p>
            <p>
              <strong>Balance (Kes):</strong> {statement.summary.balance}
            </p>
          </div>
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">End of Statement</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <button
            onClick={() => setStatement(null)}
            style={{ marginTop: "10px" }}
            className="px-1 bg-green-400 hover:bg-green-700"
          >
            Close Statement
          </button>
        </div>
      )}
    </div>
  );
}
