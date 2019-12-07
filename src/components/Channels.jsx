import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { channels, channelsActions } from '../reducers';
import AddChanel from './AddChanel';
import ModalRemove from './ModalRemoveChannel';
import ModalRename from './ModalChangeName';
import ButtonClose from './ButtonClose';

const mapStateToProps = (state) => {
  const props = {
    allChannels: state.channels.allChannels,
    currentChannelId: state.channels.currentChannelId,
    showRemove: state.channelsActions.showRemove,
    showRename: state.channelsActions.showRename,
    idRemove: state.channelsActions.idRemove,
    idRename: state.channelsActions.idRename,
  };
  return props;
};

const actionCreators = {
  changeChannelId: channels.actions.changeChannelId,
  removedChannelId: channels.actions.removedChannelId,
  isShowRemoveModal: channelsActions.actions.isShowRemoveModal,
  isShowRenameModal: channelsActions.actions.isShowRenameModal,
  uppdateIdRemove: channelsActions.actions.uppdateIdRemove,
  uppdateIdRename: channelsActions.actions.uppdateIdRename,
};

class Channels extends React.Component {
changeChannel = (id) => (e) => {
  e.preventDefault();
  const { changeChannelId } = this.props;
  changeChannelId({ id });
};

showModals = (type) => () => {
  const { isShowRemoveModal, isShowRenameModal } = this.props;
  if (type === 'remove') { isShowRemoveModal(); } else if (type === 'rename') { isShowRenameModal(); }
}

changesStateButton = (id, type) => (e) => {
  e.preventDefault();
  const {
    isShowRemoveModal,
    isShowRenameModal,
    uppdateIdRemove,
    uppdateIdRename,
  } = this.props;
  switch (type) {
    case 'remove':
      uppdateIdRemove({ id });
      isShowRemoveModal();
      break;
    case 'rename':
      uppdateIdRename({ id });
      isShowRenameModal();
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
  const {
    allChannels,
    showRemove,
    showRename,
    idRemove,
    idRename,
  } = this.props;
  return (
    <div className="col-2 no-gutters overflow-auto mh-100">
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
