import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as actions from '../actions';
import AddChanel from './AddChanel';
import ModalRemove from './ModalRemoveChannel';
import ModalRename from './ModalChangeName';

const mapProps = (state) => {
  const { channels } = state;
  const props = {
    channels: channels.allChannels,
    currentChannelId: channels.currentChannelId,
  };
  return props;
};

const allActions = {
  changeChannelId: actions.changeChannelId,
  removedChannelId: actions.removedChannelId,
};

class Channels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRemove: false,
      showRename: false,
      idRemove: 0,
      idRename: 0,
    };
  }

changeChannel = (id) => (e) => {
  e.preventDefault();
  const { changeChannelId } = this.props;
  changeChannelId({ id });
};

handleShowRemove = () => {
  const { showRemove } = this.state;
  this.setState({ showRemove: !showRemove });
};

handleShowRename = () => {
  const { showRename } = this.state;
  this.setState({ showRename: !showRename });
};

addRemoveId = (id) => (e) => {
  e.preventDefault();
  this.setState({ idRemove: id });
};

addRenameId = (id) => (e) => {
  e.preventDefault();
  this.setState({ idRename: id });
};

static AddChanel = AddChanel;

/* eslint class-methods-use-this: ["error", {
"exceptMethods": ["renderChannelRemove","renderChannels"] }] */

renderChannelRemove(id) {
  return (
    <Form className="col-2" onSubmit={this.addRemoveId(id)}>
      <Button className="col-12" variant="danger" type="submit" onClick={this.handleShowRemove}>
        <span>х</span>
      </Button>
    </Form>
  );
}

renderChannelRename(id) {
  return (
    <Form className="col-2" onSubmit={this.addRenameId(id)}>
      <Button className="col-12" variant="primary" type="submit" onClick={this.handleShowRename}>
        <span>R</span>
      </Button>
    </Form>
  );
}

renderChannels(channel) {
  const { currentChannelId } = this.props;
  const btnClass = cn({
    'items-channel btn btn-secondary': true,
    'col-12': channel.id === 1 || channel.id === 2,
    'col-8': channel.id !== 1 && channel.id !== 2,
  });
  return (
    <span className="btn-channel container-fluid row no-gutters">
      <button onClick={this.changeChannel(channel.id)} disabled={channel.id === currentChannelId} key={channel.id} type="button" className={btnClass}>
        {channel.name}
      </button>
      {channel.removable && this.renderChannelRemove(channel.id)}
      {channel.removable && this.renderChannelRename(channel.id)}
    </span>
  );
}

render() {
  const { channels } = this.props;
  const styleDiv = { overflow: 'auto', height: '780px', 'max-height': '780px' };
  const {
    showRemove,
    showRename,
    idRemove,
    idRename,
  } = this.state;
  return (
    <div style={styleDiv}>
      <Channels.AddChanel />
      <ModalRemove id={idRemove} show={showRemove} handleClose={this.handleShowRemove} />
      <ModalRename id={idRename} show={showRename} handleClose={this.handleShowRename} />
      <div className="container-allChannels btn-group-vertical container-fluid">
        {channels.map((channel) => this.renderChannels(channel))}
      </div>
    </div>
  );
}
}

export default connect(mapProps, allActions)(Channels);
