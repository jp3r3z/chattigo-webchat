import keyMirror from 'keymirror';

// Miscelaneous constants
export const Visibility = keyMirror({
    COLLAPSED: null,
    EXPANDED: null
});

export const ActionTypes = keyMirror({
    TOGGLE: null,
    COLLAPSE: null,
    EXPAND: null,
    LOGIN: null,
    LOGOUT: null,
    ADD_MESSAGE: null,
    CLEAR_CHAT: null,
    FLUSH: null
});

const ROOT = process.env.NODE_ENV === "production" ?
                "https://api.chattigo.com" :
                "http://localhost:3000";

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
            },
            SEND_FILE: {
                method: "post",
                URL: `${ROOT}/api/v1/chat/file`
            }
        }
    },
    Nominatim: {
        ReverseGeocoding: {
            method: "get",
            URL: 'https://nominatim.openstreetmap.org/reverse'
        }
    }
};

export const FormFields = {
    defaults: {
        type: 'string',
        required: false
    }
};

export const Strings = {
    SEND: "Enviar",
    ATTACH_FILE: "Adjuntar un archivo",
    // PLACEHOLDER_MESSAGE: "Mensaje o archivo",
    PLACEHOLDER_MESSAGE: "Mensaje",
    HEADER_TEXT: "Web Chat",
    LOGIN: "Iniciar sesión",
    LOGOUT: "Terminar Chat",
    LOADING: "Cargando...",
    ANONYMOUS: "Yo",
    GEOLOCATION_NOT_AVAILABLE: "El servicio de geolocalización no está disponible",
    GEOLOCATION_PERMISSION_DENIED: "El usuario no dio permiso de recibir la geolocalización",
    GEOLOCATION_POSITION_UNAVAILABLE: "La información de geolocalización no está disponible",
    GEOLOCATION_TIMEOUT: "La petición para obtener la información de geolocalización alcanzó el límite de tiempo",
    GEOLOCATION_UNKNOWN_ERROR: (error) => (`Se produjo un error desconocido al solicitar información de geolocalización: ${error}`),
    GEOLOCATION_REVERSE_GEOCODING_ERROR: (error) => (`Se produjo un error al solicitar geocodificación reversa: ${error}`),
    WELCOME: "Bienvenido al servicio de web chat de chattigo. Por favor introduzca la información solicitada para iniciar la sesión.",
    EXCEPTION_NAME_FIELD_MISSING: "Si se definen campos personalizados de inicio de sesión, debe especificar en la configuración el campo a ser utilizado como nombre (name_field).",
    EXCEPTION_CHECK_CONFIG: "Por favor revise la configuración del widget de Chattigo.",
    EXCEPTION_FIELD_REQUIRED: (fieldname) => (`El campo ${fieldname} es obligatorio`),
    FORM_ERRORS: "Se han encontrado errores en el formulario",
    AUTH_EXCEPTION_CLIENT_MSG: "Tu API Key es inválido. Por favor contacta con los ejecutivos de Chattigo para obtener un API Key válido.",
    AUTH_EXCEPTION_USER_MSG: "Ha ocurrido un error con el sistema de chat. De ser posible, por favor notifica al administrador de esta página.",
    MEDIA_TYPE_EXCEPTION_CLIENT_MSG: "Se intentó subir un archivo de un tipo no soportado.",
    MEDIA_TYPE_EXCEPTION_USER_MSG: "El archivo que estás tratando de cargar no es soportado por nuestro sistema. Los tipos de archivo permitidos son: imágenes, audios, documentos de ms-word, ms-excel y ms-powerpoint.",
    CLIENT_LOGGED_OUT: "CLIENTE DESCONECTADO"
};

export const SETTINGS = {
    customer_classname: "customer",
    header_text: Strings.HEADER_TEXT,
    header_background_color: null,
    header_color: null,
    header_icon_color: null,
    send_text: Strings.SEND,
    login_text: Strings.LOGIN,
    welcome_text: Strings.WELCOME,
    message_placeholder: Strings.PLACEHOLDER_MESSAGE,
    login_fields: ["Nombre", "Email", "RUT"],
    toggle_background_color: "#0853CB",
    toggle_button: null,
    toggle_color: "#FFFFFF",
    send_background_color: "#0853CB",
    send_color: "#FFFFFF",
    message_list_background_image: null,
    width: 300,
    height: 400,
    locale: "es",
    toggle_button_image: null,
    name_field: "Nombre",
    preserve_history: true
};
