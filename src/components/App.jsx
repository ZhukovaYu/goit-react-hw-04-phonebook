 
import { useState, useEffect } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactsList } from "./ContactsList/ContactsList";
import './App.css';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contactsStorage = localStorage.getItem('contacts');
    const parsedContactsStorage = JSON.parse(contactsStorage);
    return parsedContactsStorage || [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ];
  });
  
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = (contact) => {
    const isExist = contacts.find(item => item.name === contact.name)
    if (isExist) {
      alert('This name is already in contacts')
      return
    }
    setContacts(prevState => [...prevState, contact])
  }

  const deleteContact = (id) => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id))
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const getFilteredContacts = () => {
    return contacts.filter(contact => contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
  }

  const filteredContacts = getFilteredContacts();

  return (
    <>
      <div className="Container">
        <section title="Phonebook" className="Section">
          <h1>Phonebook</h1>
          <ContactForm onSubmit={handleSubmit} />
        </section>
         
        <section title="Contacts" className="Section">
          <h2>Contacts</h2>
          <Filter handleInputChange={handleFilterChange} />
          <ContactsList contacts={filteredContacts} handleDelete={deleteContact} />
        </section>
      </div>
    </>
  );
};
