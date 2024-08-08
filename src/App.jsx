
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContactList from './components/ContactList';
import ContactDetail from './components/ContactDetail';
import ContactForm from './components/ContactForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContactList />} />
        <Route path="/contact/:id" element={<ContactDetail />} />
        <Route path="/add" element={<ContactForm isEdit={false} />} />
        <Route path="/edit/:id" element={<ContactForm isEdit={true} />} />
      </Routes>
    </Router>
  );
};

export default App;
