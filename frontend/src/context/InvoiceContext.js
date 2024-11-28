// context/InvoiceContext.js
import React, { createContext, useState, useContext } from 'react';

const InvoiceContext = createContext();

export const useInvoiceContext = () => {
  return useContext(InvoiceContext);
};

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addInvoice = (invoice) => {
    setInvoices((prevInvoices) => [...prevInvoices, invoice]);
  };

  const deleteInvoice = (invoiceId) => {
    setInvoices((prevInvoices) => prevInvoices.filter((invoice) => invoice.id !== invoiceId));
  };

  const setInvoicesList = (invoiceList) => {
    setInvoices(invoiceList);
  };

  return (
    <InvoiceContext.Provider value={{ invoices, loading, error, addInvoice, deleteInvoice, setInvoicesList, setLoading, setError }}>
      {children}
    </InvoiceContext.Provider>
  );
};
