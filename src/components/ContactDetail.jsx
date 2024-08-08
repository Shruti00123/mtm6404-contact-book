
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../db';
import { doc, getDoc } from 'firebase/firestore';
import '../ContactDetail.css';

const ContactDetail = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const contactDoc = await getDoc(doc(db, 'contacts', id));
        if (contactDoc.exists()) {
          setContact(contactDoc.data());
        } else {
          setError(new Error('Contact not found'));
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchContact();
  }, [id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!contact) {
    return <div>Loading...</div>;
  }

  return (
    <div className="contact-detail">
      <h1>{contact.firstName} {contact.lastName}</h1>
      <p>Email: {contact.email}</p>
      <p>Phone: {contact.phone}</p>
      <p>Address: {contact.street}, {contact.city}, {contact.state}, {contact.zip}</p>
      <Link to={`/edit/${id}`}>Edit</Link>
    </div>
  );
};

export default ContactDetail;
