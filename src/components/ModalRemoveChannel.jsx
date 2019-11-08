import React from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import routes from '../routes';
import Footer from './Modal_Footer';

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
      <Footer action={this.removeChannel(id)} handleClose={handleClose} valueBtn1="Удалить" valueBtn2="Отмена" />
    </Modal>
  );
}
}
