import { useDispatch } from 'react-redux';
import { register } from 'redux/auth/operations';
import css from './RegisterForm.module.css';

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    dispatch(
      register({
        name: form.elements.name.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );
    form.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit} autoComplete="of">
      <label className={css.label}>
        Username
        <input placeholder="Enter your name..." type="text" name="name" />
      </label>
      <label className={css.label}>
        Email
        <input placeholder="Enter your email..." type="email" name="email" />
      </label>
      <label className={css.label}>
        Password
        <input
          placeholder="Enter your password..."
          type="password"
          name="password"
        />
      </label>
      <button type="submit">Register</button>
    </form>
  );
};
