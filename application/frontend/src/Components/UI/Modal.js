import React, {Component} from 'react';
import './Modal.css';

import Backdrop from './Backdrop';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { show, children } = this.props;
    return nextProps.show !== show || nextProps.children !== children;
  }

  render() {
    const { show, modalClosed, children } = this.props;
    return (
      <div>
        <Backdrop show={show} clicked={modalClosed} />
        <div
          className="Modal"
          style={{
            transform: show ? 'translateY(0)' : 'translateY(-200vh)',
            opacity: show ? '1' : '0'
          }}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default Modal;
