import React, { useState } from "react";

const InvoiceForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    invoice_number: "",
    customer_name: "",
    date: "",
    details: [{ description: "", quantity: 1, unit_price: 0 }],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDetailChange = (index, e) => {
    const { name, value } = e.target;
    const details = [...formData.details];
    details[index][name] = value;
    setFormData({ ...formData, details });
  };

  const addDetail = () => {
    setFormData({
      ...formData,
      details: [...formData.details, { description: "", quantity: 1, unit_price: 0 }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="invoice_number" onChange={handleInputChange} placeholder="Invoice Number" required />
      <input type="text" name="customer_name" onChange={handleInputChange} placeholder="Customer Name" required />
      <input type="date" name="date" onChange={handleInputChange} required />
      {formData.details.map((detail, idx) => (
        <div key={idx}>
          <input type="text" name="description" onChange={(e) => handleDetailChange(idx, e)} placeholder="Description" required />
          <input type="number" name="quantity" onChange={(e) => handleDetailChange(idx, e)} placeholder="Quantity" required />
          <input type="number" name="unit_price" onChange={(e) => handleDetailChange(idx, e)} placeholder="Unit Price" required />
        </div>
      ))}
      <button type="button" onClick={addDetail}>Add Detail</button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default InvoiceForm;
