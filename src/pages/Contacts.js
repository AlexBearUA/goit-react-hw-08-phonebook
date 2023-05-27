import { useSelector } from 'react-redux';
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
      <h2>Wellcome to your phonebook</h2>
      <AddContactForm contacts={contacts} />

      <h2>Contacts</h2>
      <Filter />
      {isFetching && !isError && <Loader />}

      {visibleContacts && visibleContacts.length > 0 && !isError ? (
        <ContactList contacts={visibleContacts} />
      ) : (
        !isFetching && <p className="list-is-empty">No contacts</p>
      )}
      {isError && <p>Something going wrong, please refresh page</p>}
    </div>
  );
};
export default Contacts;
