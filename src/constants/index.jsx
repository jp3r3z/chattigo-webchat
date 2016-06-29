import keyMirror from 'keymirror';

// Miscelaneous constants
export const Visibility = keyMirror({
    COLLAPSED: null,
    EXPANDED: null
});

export const ActionTypes = keyMirror({
    TOGGLE: null,
    LOGIN: null,
    LOGOUT: null
});

export const API = {};

export const Strings = {
    SEND: "Enviar",
    PLACEHOLDER_MESSAGE: "Introduzca su mensaje...",
    HEADER_TEXT: "Web Chat",
    LOGIN: "Iniciar sesión",
    WELCOME: "Bienvenido al servicio de web chat de chattigo. Por favor introduzca la información solicitada para iniciar la sesión."
};

export const SETTINGS = {
    header_text: Strings.HEADER_TEXT,
    send_text: Strings.SEND,
    login_text: Strings.LOGIN,
    welcome_text: Strings.WELCOME,
    message_placeholder: Strings.PLACEHOLDER_MESSAGE,
    login_fields: ["Nombre", "Email", "RUT"],
    toggle_background_color: "#0853CB",
    toggle_color: "#FFFFFF",
    width: 300,
    height: 400
};