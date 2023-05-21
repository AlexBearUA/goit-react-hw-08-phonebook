import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { selectFilter } from '../redux/filter/filterSlice';
import { AddContactForm } from '../components/AddContactForm/AddContactForm';
import { ContactList } from '../components/ContactList/ContactList';
import { Filter } from '../components/Filter/Filter';
import { Loader } from '../components/Loaders/Loader';
import { useGetContactsQuery } from '../redux/contacts/contactsAPI';
import css from './Contacts.module.css';

const Contacts = () => {
  const { data: contacts, isFetching, isError } = useGetContactsQuery();

  const filter = useSelector(selectFilter);

  const getVisibleContacts = (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return (
      contacts &&
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      )
    );
  };

  const visibleContacts = getVisibleContacts(contacts, filter);

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <AddContactForm contacts={visibleContacts} />

      <h2>Contacts</h2>
      <Filter />
      {isFetching && !isError && <Loader />}

      {visibleContacts && visibleContacts.length > 0 && !isError ? (
        <ContactList contacts={visibleContacts} />
      ) : (
        !isFetching && <p className="list-is-empty">No contacts</p>
      )}
      {isError && <p>Something going wrong, please refresh page</p>}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 1000,
        }}
      />
    </div>
  );
};
export default Contacts;
