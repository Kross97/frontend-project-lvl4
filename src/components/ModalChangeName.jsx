import React from 'react';
import axios from 'axios';
import {
  Modal,
  Button,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';
import routes from '../routes';

const mapProps = ({ channels: { textRename } }) => ({ textRename });

const allActions = {
  updateText: actions.updateTextChannelRename,
  resetText: actions.resetTextChannelRename,
};

class ModalChange extends React.Component {
renameChannel = (id) => async (e) => {
  e.preventDefault();
  const { handleClose, resetText, textRename } = this.props;
  await axios.patch(routes.channelPath(id), { data: { attributes: { name: textRename } } });
  resetText();
  handleClose();
}

changeNameChannel = (e) => {
  const { updateText } = this.props;
  const { value } = e.target;
  updateText({ value });
}

render() {
  const { show, handleClose, id } = this.props;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Введите новое имя канала</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <FormControl
            onChange={this.changeNameChannel}
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={this.renameChannel(id)}>
             Изменить
        </Button>
        <Button variant="primary" onClick={handleClose}>
             Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
}

export default connect(mapProps, allActions)(ModalChange);
