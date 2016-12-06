![Logo Chattigo](https://raw.githubusercontent.com/throoze/chattigo-webchat/develop/src/assets/images/CHATTIGO.png)
[![npm version](https://badge.fury.io/js/chattigo-webchat.svg)](https://badge.fury.io/js/chattigo-webchat)
[![Dependency Status](https://david-dm.org/throoze/chattigo-webchat.svg)](https://david-dm.org/throoze/chattigo-webchat)
[![devDependency Status](https://david-dm.org/throoze/chattigo-webchat/dev-status.svg)](https://david-dm.org/throoze/chattigo-webchat#info=devDependencies)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)
[![GPL Licence](https://badges.frapsoft.com/os/gpl/gpl.svg?v=103)](https://opensource.org/licenses/GPL-3.0/)
# Chattigo's webchat-client
Webchat client for chattigo support service.

## Installation
You can download Chattigo's webchat client from our CDN, like this:

```html
<!DOCTYPE html>
<html>
 <head>
   <meta charset="utf-8">
   <script type="text/javascript" src="http://driverwebchat1600.cloudapp.net/chattigo-webchat.js"></script>
 </head>
<body>
  <div id="app">
      <h1>Your web site.</h1>
      <div><p> whatever...</p></div>
  </div>
  <script type="text/javascript">
      document.addEventListener("DOMContentLoaded", function() {
          var chattigo = new Chattigo("<your_API_key>");
          chattigo.init();
      });
  </script>
</body>
</html>
```

It is also available via npm, as a CommonJS package:


    $ npm install --save chattigo-webchat


In case you are using npm, you can also require/import chattigo as a CommonJS
module:

```js
// ES5
var Chattigo = require('chattigo-webchat');
```

```js
// ES6
import Chattigo from 'chattigo-webchat';

```

And then, in your html or in a javascript file, just do:


```js
// ES5
var chattigo = new Chattigo("<your_API_key>");
chattigo.init();
```


```js
// ES6
const chattigo = new Chattigo("<your_API_key>");
chattigo.init();
```


Alternatively, you can clone this project, and use webpack to generate the
necessary files in the dist folder, and include them in your project.

### Bootstrap considerations

Since `chattigo-webchat` uses bootstrap components, it comes with `bootstrap.js` library
prepackaged. In case you are using bootstrap on your website, please use the following code
to conditionally include `bootstrap.js` only in case chattigo doesn't load.


```html
<script type="text/javascript" src="http://driverwebchat1600.cloudapp.net/chattigo-webchat.js"></script>
<script type="text/javascript">
    if (typeof(Chattigo) === 'function') {
        console.log("Chattigo loaded... Nothing done");
    } else {
        var bootstrap_cdn = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js';
        console.log("Chattigo couldn't load... Loading bootstrap from CDN");
        var bootstrap_script = document.createElement('script');
        bootstrap_script.setAttribute('src', bootstrap_cdn);
        document.head.appendChild(bootstrap_script);
        console.log("Bootstrap loaded!");
    }
</script>
```

Make sure to include this snippet after you include `jquery`, so bootstrap can
load correctly. Also, make sure to replace the value of the variable
`bootstrap_cdn` with the proper url of your bootstrap distribution.


## Usage


```html
<!DOCTYPE html>
<html>
 <head>
   <meta charset="utf-8">
   <script type="text/javascript" src="http://driverwebchat1600.cloudapp.net/chattigo-webchat.js"></script>
 </head>
<body>
  <div id="app">
      <h1>Your web site.</h1>
      <div><p> whatever...</p></div>
  </div>
  <script type="text/javascript">
      document.addEventListener("DOMContentLoaded", function() {
          var chattigo = new Chattigo("<your_API_key>");
          chattigo.init();
      });
  </script>
</body>
</html>
```

### Settings

There is a second optional parameter to `Chattigo` constructor, the `settings`
object, and its usage is as follows:

```js
var settings = {
    header_text: "Web Chat",
    send_text: "Enviar",
    login_text: "Iniciar sesión",
    welcome_text: "Bienvenido al servicio de web chat de chattigo. Por favor introduzca la información solicitada para iniciar la sesión.",
    message_placeholder: "Introduzca su mensaje...",
    login_fields: ["Nombre", "Email", "RUT"],
    toggle_background_color: "#0853CB",
    toggle_color: "#FFFFFF",
    send_background_color: "#0853CB",
    send_color: "#FFFFFF",
    message_list_background_image: null,
    width: 300,
    height: 400,
    locale: "es",
    toggle_button_image: null,
    name_field: "Nombre"
};

var chattigo = new Chattigo("<your_API_key>", settings);
chattigo.init();
```

The default settings are defined as follows:

```js
const SETTINGS = {
    header_text: "Web Chat",
    send_text: "Enviar",
    login_text: "Iniciar sesión",
    welcome_text: "Bienvenido al servicio de web chat de chattigo. Por favor introduzca la información solicitada para iniciar la sesión.",
    message_placeholder: "Introduzca su mensaje...",
    login_fields: ["Nombre", "Email", "RUT"],
    toggle_background_color: "#0853CB",
    toggle_color: "#FFFFFF",
    send_background_color: "#0853CB",
    send_color: "#FFFFFF",
    message_list_background_image: null,
    width: 300,
    height: 400,
    locale: "es",
    toggle_button_image: null,
    name_field: "Nombre",
    toggle_button: null
};
```

### Options

| Setting | Description | Type | Default Value |
|:-------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:-----------------------------:|:--------------------------------------------------------------------------------------------------------------------------:|
| `header_text` | Text displayed in the chat widget's upper bar | string | `"Web Chat"` |
| `message_placeholder` | Placeholder for the send message box | string | `"Introduzca su mensaje..."` |
| `send_text` | Text displayed in the send button | string | `"Enviar"` |
| `login_fields` | List of fields required by Chattigo's customer in order to start a chat session. This data will be sent as a chat message, in JSON format, where every key corresponds to a [kebab-cased](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles) form of the field name. This will be improved in future releases. Refer to [Login Form Fields](https://github.com/throoze/chattigo-webchat#login-form-fields) section for validation and advanced usage. | list of strings | `["Nombre", "Email", "RUT"]` |
| `toggle_background_color` | CSS `background-color` for the webchat button in the collapsed state | string | `"#0853CB"` |
| `toggle_color` | CSS `color` property for the webchat button in the collapsed state | string | `"#FFFFFF"` |
| `welcome_text` | Welcome message displayed in the login form | string | `"Bienvenido al servicio de web chat de chattigo. Por favor introduzca la información solicitada para iniciar la sesión."` |
| `width` | Number of pixels of the expanded widget's width | int | `300` |
| `height` | Number of pixels of the expanded widget's height | int | `400` |
| `send_background_color` | Send message button css `background-color` property | string | `"#0853CB"` |
| `send_color` | Send message css `color` property | string | `"#FFFFFF"` |
| `message_list_background_image` | One of: `null`, for using chattigo's default background; `false`, for no background image; or a string containing the absolute url for a background image. | `null`, `false` or url string | `null` |
| `locale` | [Moment.js](http://momentjs.com/docs/#/i18n/) supported locale for displaying dates. | string | `"es"` |
| `toggle_button_image` | URL for an image to be displayed in the collapsed chattigo's widget; a valid glyphicon name as documentend in [bootstrap's glyphicon documentation](http://getbootstrap.com/components/#glyphicons); or null for chattigo's default image. | string or `null` | `null` |
| `name_field` | Name of the field defined in `form_fields` which is going to be used as the user display name. Note that if you customize `form_fields`, you have to customize this setting too, and they need to be consistent. | string | `'Nombre'` |
| `toggle_button` | (**EXPERIMENTAL**). Allows setting a completely custom collapsed chat button. User should write the custom html as a string. Styles for the custom button must be defined by the user, whether through inline styles, a `style` tag in your document, or a stylesheet imported through a `link` tag. The custom collapsed toggle button will be rendered as follows: `<div id="chattigo-webchat-container"><div id="chattigo-widget" class="collapsed custom"><!-- Your custom html here--></div></div>`. This option overrides `toggle_button_image`, `toggle_background_color` and `toggle_color`. | string | `null` |

Expect more customization in future releases.

### Login Form Fields

You can specify how you want chattigo webchat client to render your login form
fields,using the option `login_fields`. Up to now, you can specify string
fields whether they are rendered as a text input or as a select input. Fields
are of `string` type by default. Expect more field types in future releases.

#### String Fields

You can specify a `string` field in the `login_fields` option in several ways:

  * By specifying its label as a string:

        login_fields: ["Nombre", "Email", "RUT"]

  * By specifying a `label` and/or a `type` key:

        login_fields: [{label: 'Nombre', type: 'string'}, 'Email', { label: 'RUT' }]

  * By specifying a `choices` key:

        login_fields: [{label: 'Nombre', type: 'string'}, 'Email', { label: 'RUT' }, {
          label: 'Carrera',
          choices: [
              'Ingeniería',
              'Matemática',
              'Biología'
              /* ... */
            ]
          }]


#### Validation

Chattigo's webchat client provides built in validation for required fields.
Fields are not required by default, so, if you want some field to be required,
just add `required: true` to its definition in `login_fields` option.

Also, you can provide a validation function for each field by using the
`validation` field. Such function must receive a parameter corresponding to
the value of the field to be validated, and must throw an exception with
the desired message in case the value is invalid.

For instance, let's say we want to validate that a certain field is a
valid email. An example validation function could be:

```js
document.addEventListener("DOMContentLoaded", function() {
    var chattigo = new Chattigo(
      "<your_API_key>",
      { login_fields: [
          "Nombre",
          {
            label: "Email",
            required: true,
            validation: function(value) {
              var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              if (!re.test(value)) {
                throw new Error("El valor de Email debe ser un correo electrónico válido");
              }
            }
          },
          {label:"RUT", required: true}
        ]
      }
    );
    chattigo.init();
});
```
In this example, both `Email` and `RUT` fields are required, and email
validation through regex test is provided for `Email` field.

## API Key

In order to get an API key you need to get in touch with chattigo executives.
Visit [our website](http://www.chattigo.im) or contact our executives through
contacto@chattigo.com.


## License

Chattigo's webchat client is distributed under GNU GENERAL PUBLIC LICENSE,
Version 3. Check the
[license](https://github.com/throoze/chattigo-webchat/blob/develop/LICENSE)
file for further details.
