import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modale.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handelKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handelKeydown);
  }

  handelKeydown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  handelBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <div className={css.Overlay} onClick={this.handelBackdropClick}>
        <div className={css.Modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
