import keyMirror from 'keymirror';

// Miscelaneous constants
export const Visibility = keyMirror({
    COLLAPSED: null,
    EXPANDED: null
});

export const ActionTypes = keyMirror({
    TOGGLE: null
});

export const API = {};

export const Strings = {
    SEND: "Enviar",
    PLACEHOLDER_MESSAGE: "Introduzca su mensaje...",
    HEADER_TEXT: "Web Chat"
};

export const SETTINGS = {
    header_text: Strings.HEADER_TEXT,
    message_placeholder: Strings.PLACEHOLDER_MESSAGE,
    send_text: Strings.SEND,
    form_fields: ["Nombre", "RUT"],
    toggle_background_color: "#0853CB",
    toggle_color: "#FFFFFF"
};