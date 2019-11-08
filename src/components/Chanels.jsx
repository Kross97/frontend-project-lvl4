import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as actions from '../actions';
import AddChanel from './AddChanel';
import ModalRemove from './ModalRemoveChannel';
import ModalRename from './ModalChangeName';
import ButtonCLose from './Button_close';

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

showModals = (type) => () => {
  const { showRemove, showRename } = this.state;
  if (type === 'remove') { this.setState({ showRemove: !showRemove }); } else if (type === 'rename') { this.setState({ showRename: !showRename }); }
}

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
    <ButtonCLose onSubmit={this.addRemoveId(id)} onClick={this.showModals('remove')} text="x" variant="danger" />
  );
}

renderChannelRename(id) {
  return (
    <ButtonCLose onSubmit={this.addRenameId(id)} onClick={this.showModals('rename')} text="R" variant="primary" />
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
      <ModalRemove id={idRemove} show={showRemove} handleClose={this.showModals('remove')} />
      <ModalRename id={idRename} show={showRename} handleClose={this.showModals('rename')} />
      <div className="container-allChannels btn-group-vertical container-fluid">
        {channels.map((channel) => this.renderChannels(channel))}
      </div>
    </div>
  );
}
}

export default connect(mapProps, allActions)(Channels);
