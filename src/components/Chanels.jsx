import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { channels } from '../reducers';
import AddChanel from './AddChanel';
import ModalRemove from './ModalRemoveChannel';
import ModalRename from './ModalChangeName';
import ButtonCLose from './Button_close';

const mapProps = (state) => {
  const props = {
    channels: state.channels.allChannels,
    currentChannelId: state.channels.currentChannelId,
  };
  return props;
};

const allActions = {
  changeChannelId: channels.actions.changeChannelId,
  removedChannelId: channels.actions.removedChannelId,
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
"exceptMethods": ["renderChannels"] }] */
renderChannels(channel) {
  const { currentChannelId } = this.props;
  const btnClass = cn({
    'items-channel btn btn-secondary': true,
    'col-12': !channel.removable,
    'col-8': channel.removable,
  });
  return (
    <div className="col-12 row no-gutters">
      <button onClick={this.changeChannel(channel.id)} disabled={channel.id === currentChannelId} key={channel.id} type="button" className={btnClass}>
        {channel.name}
      </button>
      {channel.removable && <ButtonCLose onSubmit={this.addRemoveId(channel.id)} onClick={this.showModals('remove')} text="x" variant="danger" />}
      {channel.removable && <ButtonCLose onSubmit={this.addRenameId(channel.id)} onClick={this.showModals('rename')} text="R" variant="primary" />}
    </div>
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
    <div className="col-2 no-gutters" style={styleDiv}>
      <Channels.AddChanel />
      <ModalRemove id={idRemove} show={showRemove} handleClose={this.showModals('remove')} />
      <ModalRename id={idRename} show={showRename} handleClose={this.showModals('rename')} />
      <div className="btn-group-vertical col-12 row no-gutters">
        {channels.map((channel) => this.renderChannels(channel))}
      </div>
    </div>
  );
}
}

export default connect(mapProps, allActions)(Channels);
