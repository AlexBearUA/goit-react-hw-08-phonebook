import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Modal } from 'components/Modal/Modal';
import { ButtonLoader } from 'components/Loaders/ButtonLoader';
import { EditContactForm } from 'components/EditContactForm/EditContactForm';
import {
  useDeleteContactMutation,
  useUpdateContactMutation,
} from '../../redux/contacts/contactsAPI';
import { BiPencil, BiTrash } from 'react-icons/bi';
import css from './ContactListItem.module.css';
import PropTypes from 'prop-types';

export const ContactListItem = ({ name, number, id }) => {
  const [
    deleteContact,
    {
      isLoading: isDeleting,
      isSuccess: isSuccessDeleting,
      isError: isErrorDeleting,
    },
  ] = useDeleteContactMutation();

  const [
    updateContact,
    {
      isLoading: isUpdating,
      isSuccess: isSuccessUpdating,
      isError: isErrorUpdating,
    },
  ] = useUpdateContactMutation();

  const [isModalOpen, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!isModalOpen);
  };

  useEffect(() => {
    isSuccessDeleting && toast.success('Contact deleted!');
    isSuccessUpdating && toast.success('Contact updated!');
    isErrorDeleting && toast.error('Contact not deleted!');
    isErrorUpdating && toast.error('Contact not updated!');
  }, [isSuccessDeleting, isSuccessUpdating, isErrorDeleting, isErrorUpdating]);

  return (
    <>
      <p>
        <span>{name}</span>
        <span>{number}</span>
      </p>
      <div className={css.ItemButtons}>
        <button onClick={toggleModal} disabled={isUpdating}>
          {isUpdating ? (
            <div className={css.BtnContent}>
              <ButtonLoader />
              <span>Editing...</span>
            </div>
          ) : (
            <div className={css.BtnContent}>
              <BiPencil />
              <span>Edit</span>
            </div>
          )}
        </button>
        <button
          onClick={() => {
            deleteContact(id);
          }}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <div className={css.BtnContent}>
              <ButtonLoader />
              <span>Deleting...</span>
            </div>
          ) : (
            <div className={css.BtnContent}>
              <BiTrash />
              <span>Delete</span>
            </div>
          )}
        </button>
      </div>
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <EditContactForm
            onEditSubmit={updateContact}
            onClose={toggleModal}
            name={name}
            number={number}
            id={id}
          />
        </Modal>
      )}
    </>
  );
};

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
