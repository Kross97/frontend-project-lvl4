import { createAction } from 'redux-actions';

export const updateTextMessage = createAction('UPDATE_TEXT');

export const resetTextMessage = createAction('RESET_TEXT');

export const addMessageSucces = createAction('ADD_MESSAGE');

export const addChannel = createAction('ADD_CHANNEL');

export const removeChannel = createAction('REMOVE_CHANNEL');

export const renameChannel = createAction('RENAME_CHANNEL');

export const changeChannelId = createAction('CHANGE_ID');

export const updateTextChannel = createAction('UPDATE_TEXT_CHANNEL');

export const resetTextChannel = createAction('RESET_TEXT_CHANNEL');

export const updateTextChannelRename = createAction('RENAME_CHANNEL_TEXT');

export const resetTextChannelRename = createAction('RESET_TEXT_RENAME');
