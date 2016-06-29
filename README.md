![Logo Chattigo](https://raw.githubusercontent.com/throoze/chattigo-webchat/develop/src/assets/images/CHATTIGO.png)
# Chattigo's webchat-client
Webchat client for chattigo support service.

## Installation
You can download Chattigo's webchat client from our CDN (not live yet), like this:

```html
<!DOCTYPE html>
<html>

 <head>
   <meta charset="utf-8">
 </head>
<body>
  <div id="app">
      <h1>Your web site.</h1>h1>
      <div><p> whatever...</p></div> 
  </div>
  <script type="text/javascript" src="<CDN>/chattigo-webchat.js"></script>
  <script type="text/javascript">
        var chattigo = new Chattigo("<your_API_key>");
        chattigo.init();
  </script>
</body>
</html>
```
It is also available via npm, as a CommonJS package:

    $ npm install --save chattigo-webchat

And then, in your html or in a javascript file, just do:

```js
var chattigo = new Chattigo("<your_API_key>");
chattigo.init();
```

Alternatively, you can clone this project, and use webpack to generate the
necessary files in the dist folder, and include them in your project.

## Usage


```html
<!DOCTYPE html>
<html>
 <head>
   <meta charset="utf-8">
 </head>
<body>
  <div id="app">
      <h1>Your web site.</h1>h1>
      <div><p> whatever...</p></div> 
  </div>
  <script type="text/javascript" src="<CDN>/chattigo-webchat.js"></script>
  <script type="text/javascript">
        var chattigo = new Chattigo("<your_API_key>");
        chattigo.init();
  </script>
</body>
</html>
```

## Settings

There is a second optional parameter to `Chattigo` constructor, the `settings`
object, and its usage is as follows:

```js
var settings = {
    header_text: "Web Chat",
    message_placeholder: "Introduzca su mensaje...",
    send_text: "Enviar",
    form_fields: ["Nombre", "RUT"],
    toggle_background_color: "#0853CB",
    toggle_color: "#FFFFFF"
};

var chattigo = new Chattigo("<your_API_key>", settings);
chattigo.init();
```

The default settings are defined as follows:

```js
const SETTINGS = {
    header_text: "Web Chat",
    message_placeholder: "Introduzca su mensaje...",
    send_text: "Enviar",
    form_fields: ["Nombre", "RUT"],
    toggle_background_color: "#0853CB",
    toggle_color: "#FFFFFF"
}
```

|          Setting          |                              Description                             |       Type      |         Default Value        |
|---------------------------|----------------------------------------------------------------------|-----------------|------------------------------|
| `header_text`             | Text displayed in the chat widget's upper bar                        | string          | `"Web Chat"`                 |
| `message_placeholder`     | Placeholder for the send message box                                 | string          | `"Introduzca su mensaje..."` |
| `send_text`               | Text displayed in the send button                                    | string          | `"Enviar"`                   |
| `form_fields`             | List of fields required in order to start a chat session             | list of strings | `["Nombre", "RUT"]`          |
| `toggle_background_color` | CSS `background-color` for the webchat button in the collapsed state | string          | `"#0853CB"`                  |
| `toggle_color`            | CSS `color` property for the webchat button in the collapsed state   | string          | `"#FFFFFF"`                  |

Expect more customization in next releases.


## API Key

In order to get an API key you need to get in touch with chattigo executives.
Visit [our website](http://www.chattigo.com) or contact our executives through
contacto@chattigo.com.


## License

Chattigo's webchat client is distributed under GNU GENERAL PUBLIC LICENSE,
Version 3. Check the
[license](https://github.com/throoze/chattigo-webchat/blob/develop/LICENSE)
file for further details.