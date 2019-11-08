import React from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import routes from '../routes';

export default class ModalRemove extends React.Component {
removeChannel = (id) => async (e) => {
  e.preventDefault();
  const { handleClose } = this.props;
  await axios.delete(routes.channelPath(id));
  handleClose();
}

render() {
  const { show, handleClose, id } = this.props;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Подтверждение удаления канала</Modal.Title>
      </Modal.Header>
      <Modal.Body>Вы желаете удалить канал?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={this.removeChannel(id)}>
             Удалить
        </Button>
        <Button variant="primary" onClick={handleClose}>
             Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
}
