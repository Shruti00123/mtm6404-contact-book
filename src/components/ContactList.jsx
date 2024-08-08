
import React, { useEffect, useState } from 'react';
import { db } from '../db';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import '../ContactList.css';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        console.log("Fetching contacts...");
        const contactsCollection = collection(db, 'contacts');
        const q = query(contactsCollection, orderBy('lastName', 'asc'));  
        const contactsSnapshot = await getDocs(q);
        const contactsList = contactsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        console.log("Fetched contacts sorted by last name:", contactsList);

        setContacts(contactsList);
      } catch (error) {
        setError(error);
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(contact =>
    contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return <div>Error fetching contacts: {error.message}</div>;
  }

  return (
    <div className="contact-list">
      <h1>Contacts</h1>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <ul>
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <li key={contact.id}>
              <Link to={`/contact/${contact.id}`}>{contact.firstName} {contact.lastName}</Link>
            </li>
          ))
        ) : (
          <li>No contacts found</li>
        )}
      </ul>
      <Link to="/add" className="add-button">+</Link>
    </div>
  );
};

export default ContactList;
