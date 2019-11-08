import { createReducer } from 'redux-starter-kit';
import { combineReducers } from 'redux';
import update from 'immutability-helper';
import * as actions from '../actions';

const messages = createReducer({ allMessages: [], text: '' }, {
  [actions.addMessageSucces]: (state, action) => {
    const { message } = action.payload;
    return {
      ...state,
      allMessages: [...state.allMessages, message],
    };
  },
  [actions.removeChannel]: (state, action) => {
    const { id } = action.payload;
    return {
      ...state,
      allMessages: state.allMessages.filter((mes) => mes.channelId !== id),
    };
  },
  [actions.updateTextMessage]: (state, action) => ({ ...state, text: action.payload.text }),
  [actions.resetTextMessage]: (state) => ({ ...state, text: '' }),
});

const channels = createReducer({
  allChannels: [],
  currentChannelId: 1,
  text: '',
  textRename: '',
}, {
  [actions.addChannel]: (state, action) => {
    const { allChannels } = state;
    return {
      ...state,
      allChannels: [...allChannels, action.payload.channel],
    };
  },
  [actions.removeChannel]: (state, action) => {
    const { id } = action.payload;
    const { allChannels } = state;
    return {
      ...state,
      allChannels: allChannels.filter((ch) => ch.id !== id),
    };
  },
  [actions.renameChannel]: (state, action) => {
    const { channel } = action.payload;
    const currentIndex = state.allChannels.findIndex((ch) => ch.id === channel.id);
    const newState = update(state, { allChannels: { [currentIndex]: { $set: channel } } });
    return {
      ...state,
      allChannels: newState.allChannels,
    };
  },
  [actions.changeChannelId]: (state, action) => ({ ...state, currentChannelId: action.payload.id }),
  [actions.updateTextChannel]: (state, action) => {
    const { payload: { value } } = action;
    return {
      ...state,
      text: value,
    };
  },
  [actions.updateTextChannelRename]: (state, action) => {
    const { value } = action.payload;
    return {
      ...state,
      textRename: value,
    };
  },
  [actions.resetTextChannel]: (state) => ({ ...state, text: '' }),
  [actions.resetTextChannelRename]: (state) => ({ ...state, textRename: '' }),
});

export default combineReducers({
  messages,
  channels,
});
