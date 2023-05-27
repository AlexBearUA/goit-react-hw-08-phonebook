import { Link } from 'react-router-dom';
import css from './PageNotFound.module.css';

const PageNotFound = () => {
  return (
    <div className={css.NotFound}>
      <p className={css.NotFoundText}>Sorry, page not found</p>
      <Link className={css.BackLink} to="/">
        Back to Home
      </Link>
    </div>
  );
};
export default PageNotFound;
