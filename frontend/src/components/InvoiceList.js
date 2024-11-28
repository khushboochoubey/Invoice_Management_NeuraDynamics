import React from "react";
import axios from "axios";

const InvoiceList = ({ invoices, setInvoices }) => {
  const deleteInvoice = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/invoices/${id}/`)
      .then(() => setInvoices(invoices.filter((invoice) => invoice.id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Invoices</h2>
      {invoices.map((invoice) => (
        <div key={invoice.id}>
          <p>{invoice.invoice_number} - {invoice.customer_name}</p>
          <button onClick={() => deleteInvoice(invoice.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default InvoiceList;
