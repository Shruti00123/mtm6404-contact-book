// src/components/ContactForm.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../db';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, addDoc, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import '../ContactForm.css';

const ContactForm = ({ isEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: ''
  });

  useEffect(() => {
    if (isEdit && id) {
      const fetchContact = async () => {
        const contactDoc = await getDoc(doc(db, 'contacts', id));
        if (contactDoc.exists()) {
          setContact(contactDoc.data());
        }
      };

      fetchContact();
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateDoc(doc(db, 'contacts', id), contact);
        navigate(`/contact/${id}`);
      } else {
        const docRef = await addDoc(collection(db, 'contacts'), contact);
        navigate(`/contact/${docRef.id}`);
      }
    } catch (error) {
      console.error('Error adding/updating contact:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      await deleteDoc(doc(db, 'contacts', id));
      navigate('/');
    }
  };

  return (
    <div className="contact-form">
      <h1>{isEdit ? 'Edit' : 'New'} Contact</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={contact.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="lastName"
          value={contact.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          name="email"
          value={contact.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="phone"
          value={contact.phone || ''}
          onChange={handleChange}
          placeholder="Phone"
        />
        <input
          type="text"
          name="street"
          value={contact.street || ''}
          onChange={handleChange}
          placeholder="Street"
        />
        <input
          type="text"
          name="city"
          value={contact.city || ''}
          onChange={handleChange}
          placeholder="City"
        />
        <input
          type="text"
          name="state"
          value={contact.state || ''}
          onChange={handleChange}
          placeholder="Province/State"
        />
        <input
          type="text"
          name="zip"
          value={contact.zip || ''}
          onChange={handleChange}
          placeholder="Postal/Zip"
        />
        <button type="submit">{isEdit ? 'Update' : 'Add'} Contact</button>
        <button type="button" onClick={() => navigate('/')}>Cancel</button>
        {isEdit && <button type="button" onClick={handleDelete} className="delete-button">Delete Contact</button>}
      </form>
    </div>
  );
};

export default ContactForm;
