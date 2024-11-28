import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [invoices, setInvoices] = useState([]);
  const [newInvoice, setNewInvoice] = useState({
    invoice_number: "",
    customer_name: "",
    date: "",
    details: [{ description: "", quantity: 1, unit_price: 0 }],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch invoices from the backend
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/invoices/")
      .then((response) => {
        setInvoices(response.data.results || response.data); // Adjust for API response format
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch invoices");
        console.error(error);
      });
  }, []);

  // Create a new invoice
  const handleCreateInvoice = (e) => {
    e.preventDefault();

    // Ensure all fields are properly formatted
    const formattedData = {
      ...newInvoice,
      details: newInvoice.details.map((detail) => ({
        description: detail.description.trim(),
        quantity: Math.max(1, parseInt(detail.quantity) || 1),
        unit_price: parseFloat(detail.unit_price) || 0,
      })),
    };

    axios
      .post("http://127.0.0.1:8000/api/invoices/", formattedData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setInvoices([...invoices, response.data]); // Add the new invoice to the list
        setNewInvoice({
          invoice_number: "",
          customer_name: "",
          date: "",
          details: [{ description: "", quantity: 1, unit_price: 0 }],
        });
        setError("");
      })
      .catch((error) => {
        setError(error.response?.data?.detail || "Failed to create invoice");
        console.error(error);
      });
  };

  // Delete an invoice by ID
  const handleDeleteInvoice = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/invoices/${id}/`)
      .then(() => {
        setInvoices(invoices.filter((invoice) => invoice.id !== id));
      })
      .catch((error) => console.error(error));
  };

  // Handle input change in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInvoice({
      ...newInvoice,
      [name]: value,
    });
  };

  // Handle detail change (description, quantity, unit_price)
  const handleDetailChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDetails = [...newInvoice.details];
    updatedDetails[index] = { ...updatedDetails[index], [name]: value };
    setNewInvoice({ ...newInvoice, details: updatedDetails });
  };

  // Add a new detail row
  const handleAddDetail = () => {
    setNewInvoice({
      ...newInvoice,
      details: [...newInvoice.details, { description: "", quantity: 1, unit_price: 0 }],
    });
  };

  return (
    <div className="container">
      <h1>Invoice Management</h1>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

      {/* Create Invoice Form */}
      <div className="form-container">
        <h2>Create Invoice</h2>
        <form onSubmit={handleCreateInvoice}>
          <div className="form-input">
            <input
              type="text"
              name="invoice_number"
              value={newInvoice.invoice_number}
              onChange={handleInputChange}
              placeholder="Invoice Number"
              required
            />
          </div>
          <div className="form-input">
            <input
              type="text"
              name="customer_name"
              value={newInvoice.customer_name}
              onChange={handleInputChange}
              placeholder="Customer Name"
              required
            />
          </div>
          <div className="form-input">
            <input
              type="date"
              name="date"
              value={newInvoice.date}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Invoice Details */}
          <h3>Invoice Details</h3>
          {newInvoice.details.map((detail, index) => (
            <div key={index} className="details-row">
              <input
                type="text"
                name="description"
                value={detail.description}
                onChange={(e) => handleDetailChange(index, e)}
                placeholder="Description"
                required
              />
              <input
                type="number"
                name="quantity"
                value={detail.quantity}
                onChange={(e) => handleDetailChange(index, e)}
                placeholder="Quantity"
                required
              />
              <input
                type="number"
                name="unit_price"
                value={detail.unit_price}
                onChange={(e) => handleDetailChange(index, e)}
                placeholder="Unit Price"
                required
              />
            </div>
          ))}
          <button type="button" className="add-detail-btn" onClick={handleAddDetail}>
            Add Detail
          </button>
          <button type="submit" className="submit-btn">Create Invoice</button>
        </form>
      </div>

      {/* List of Invoices */}
      <div className="invoice-list">
        <h2>Invoices List</h2>
        <ul>
          {invoices.map((invoice) => (
            <li key={invoice.id} className="invoice-item">
              <strong>{invoice.invoice_number}</strong> - {invoice.customer_name}
              <button className="delete-btn" onClick={() => handleDeleteInvoice(invoice.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
