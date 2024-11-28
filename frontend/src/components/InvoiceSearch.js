import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InvoiceSearch = () => {
  const [invoices, setInvoices] = useState([]); // Defining state for invoices
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  // Fetch invoices when the component is mounted
  useEffect(() => {
    fetchInvoices();
  }, []); // Empty dependency array means it runs once when the component mounts

  // Function to fetch invoices from the API
  const fetchInvoices = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/invoices/');
      setInvoices(response.data.results); // Set the fetched invoices to state
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter invoices based on the search query
  const filteredInvoices = invoices.filter((invoice) =>
    invoice.invoice_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.customer_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Invoice Search</h2>
      <input
        type="text"
        placeholder="Search by Invoice Number or Customer Name"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <ul>
        {filteredInvoices.map((invoice) => (
          <li key={invoice.id}>
            <h3>{invoice.invoice_number}</h3>
            <p>{invoice.customer_name}</p>
            <p>{invoice.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceSearch;
