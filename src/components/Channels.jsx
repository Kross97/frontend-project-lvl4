import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { channels } from '../reducers';
import AddChanel from './AddChanel';
import ModalRemove from './ModalRemoveChannel';
import ModalRename from './ModalChangeName';
import ButtonClose from './ButtonClose';

const mapStateToProps = (state) => {
  const props = {
    allChannels: state.channels.allChannels,
    currentChannelId: state.channels.currentChannelId,
  };
  return props;
};

const actionCreators = {
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

changesStateButton = (id, type) => (e) => {
  e.preventDefault();
  const { showRemove, showRename } = this.state;
  switch (type) {
    case 'remove':
      this.setState({ idRemove: id, showRemove: !showRemove });
      break;
    case 'rename':
      this.setState({ idRename: id, showRename: !showRename });
      break;
    default:
      throw new Error('error type!');
  }
};

static AddChanel = AddChanel;

/* eslint class-methods-use-this: ["error", {
"exceptMethods": ["renderChannels"] }] */
renderChannels(channel) {
  const buttonsCLoseAst = [{ type: 'remove', text: 'x', style: 'danger' }, { type: 'rename', text: 'R', style: 'primary' }];
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
      {channel.removable && buttonsCLoseAst.map((btn) => (
        <ButtonClose
          key={btn.type}
          onClick={this.changesStateButton(channel.id, btn.type)}
          text={btn.text}
          variant={btn.style}
        />
      ))}
    </div>
  );
}

render() {
  const { allChannels } = this.props;
  const styleDiv = { height: '780px' };
  const {
    showRemove,
    showRename,
    idRemove,
    idRename,
  } = this.state;
  return (
    <div style={styleDiv} className="col-2 no-gutters overflow-auto mh-100">
      <Channels.AddChanel />
      <ModalRemove id={idRemove} show={showRemove} handleClose={this.showModals('remove')} />
      <ModalRename id={idRename} show={showRename} handleClose={this.showModals('rename')} />
      <div className="btn-group-vertical col-12 row no-gutters">
        {allChannels.map((channel) => this.renderChannels(channel))}
      </div>
    </div>
  );
}
}

export default connect(mapStateToProps, actionCreators)(Channels);
