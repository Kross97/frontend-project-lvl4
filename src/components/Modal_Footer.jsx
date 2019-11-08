import { Modal, Button } from 'react-bootstrap';
import React from 'react';

const Footer = (props) => {
  const {
    action,
    handleClose,
    valueBtn1,
    valueBtn2,
  } = props;
  return (
    <Modal.Footer>
      <Button variant="secondary" onClick={action}>
        {valueBtn1}
      </Button>
      <Button variant="primary" onClick={handleClose}>
        {valueBtn2}
      </Button>
    </Modal.Footer>
  );
};

export default Footer;
