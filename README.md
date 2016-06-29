![Logo Chattigo](https://github.com/throoze/chattigo-webchat/blob/develop/src/assets/images/CHATTIGO.png)
# Chattigo's webchat-client
Webchat client for chattigo support service.

## Installation
You can download Chattigo's webchat client from our CDN, like this:

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

And then in your html or in a javascript file, just do:

```js
var chattigo = new Chattigo("<your_API_key>");
chattigo.init();
```

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

var settings = {};

var chattigo = new Chattigo("<your_API_key>", settings);
chattigo.init();
```

## API Key
You need to get in touch with chattigo executives in order to get an API key.
Visit [our website](http://www.chattigo.com) or contact our executives through
contacto@chattigo.com.


## License

Chattigo's webchat client is distributed under GNU GENERAL PUBLIC LICENSE,
Version 3. Check the
[license](https://github.com/throoze/chattigo-webchat/blob/develop/LICENSE)
file for further details.