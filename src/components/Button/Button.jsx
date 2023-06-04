import css from './Button.module.css';
import PropTypes from 'prop-types';

export function Button({ onBtnLoadmore }) {
  return (
    <div>
      <button className={css.Button} type="button" onClick={onBtnLoadmore}>
        Load more
      </button>
    </div>
  );
}

Button.propTypes = {
  onBtnLoadmore: PropTypes.func.isRequired,
};
