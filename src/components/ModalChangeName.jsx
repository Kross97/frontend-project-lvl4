import React from 'react';
import axios from 'axios';
import {
  Modal,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { channels } from '../reducers';
import routes from '../routes';
import ModalFooter from './ModalFooter';

const mapStateToProps = ({ channels: { textRename } }) => ({ textRename });

const actionCreators = {
  updateTextChannelRename: channels.actions.updateTextChannelRename,
  resetTextChannelRename: channels.actions.resetTextChannelRename,
};

class ModalChange extends React.Component {
renameChannel = (id) => async (e) => {
  e.preventDefault();
  const { handleClose, resetTextChannelRename, textRename } = this.props;
  await axios.patch(routes.channelPath(id), { data: { attributes: { name: textRename } } });
  resetTextChannelRename();
  handleClose();
}

changeNameChannel = ({ target }) => {
  const { updateTextChannelRename } = this.props;
  updateTextChannelRename({ value: target.value });
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
          <FormControl onChange={this.changeNameChannel} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
        </InputGroup>
      </Modal.Body>
      <ModalFooter action={this.renameChannel(id)} handleClose={handleClose} valueBtn1="Изменить" valueBtn2="Отмена" />
    </Modal>
  );
}
}

export default connect(mapStateToProps, actionCreators)(ModalChange);
