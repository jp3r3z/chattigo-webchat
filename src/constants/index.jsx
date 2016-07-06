import keyMirror from 'keymirror';

// Miscelaneous constants
export const Visibility = keyMirror({
    COLLAPSED: null,
    EXPANDED: null
});

export const ActionTypes = keyMirror({
    TOGGLE: null,
    LOGIN: null,
    LOGOUT: null,
    ADD_MESSAGE: null,
    CLEAR_CHAT: null
});

const ROOT = "http://localhost:3000";
export const WebAPI = {
    v1: {
        ENDPOINTS: {
            SEND_MESSAGE: {
                method: "post",
                URL: `${ROOT}/api/v1/chat`
            },
            REQUEST_MESSAGES: {
                method: "get",
                URL: `${ROOT}/api/v1/chat`
            }
        }
    }
};

export const Strings = {
    SEND: "Enviar",
    PLACEHOLDER_MESSAGE: "Introduzca su mensaje...",
    HEADER_TEXT: "Web Chat",
    LOGIN: "Iniciar sesión",
    ANONYMOUS: "Anónimo",
    WELCOME: "Bienvenido al servicio de web chat de chattigo. Por favor introduzca la información solicitada para iniciar la sesión.",
    EXCEPTION_NAME_FIELD_MISSING: "Si se definen campos personalizados de inicio de sesión, debe especificar en la configuración el campo a ser utilizado como nombre (name_field).",
    EXCEPTION_CHECK_CONFIG: "Por favor revise la configuración del widget de Chattigo.",
    AUTH_EXCEPTION_CLIENT_MSG: "Tu API Key es inválido. Por favor contacta con los ejecutivos de Chattigo para obtener un API Key válido.",
    AUTH_EXCEPTION_USER_MSG: "Ha ocurrido un error con el sistema de chat. De ser posible, por favor notifica al administrador de esta página."
};

export const SETTINGS = {
    customer_classname: "customer",
    header_text: Strings.HEADER_TEXT,
    send_text: Strings.SEND,
    login_text: Strings.LOGIN,
    welcome_text: Strings.WELCOME,
    message_placeholder: Strings.PLACEHOLDER_MESSAGE,
    login_fields: ["Nombre", "Email", "RUT"],
    toggle_background_color: "#0853CB",
    toggle_color: "#FFFFFF",
    send_background_color: "#0853CB",
    send_color: "#FFFFFF",
    message_list_background_image: null,
    width: 300,
    height: 400,
    locale: "es",
    scroll_theme: "dark",
    toggle_button_image: null,
    name_field: "Nombre"
};