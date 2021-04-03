# Como trabajar Webpack con Vue.js

Iniciamos ejecutando

```bash
npm init -y
git init
```

Creamos una carpeta llamada **src** dentro de esta creamos un archivo `index.js` y un `index.html` una ademas creamos una carpeta llamada **components** y dentro un archivo `app.vue`

Creamos un archivo llamado `webpack.config.js` y ejecutamos el siguiente codigo

```bash
npm i webpack -D
```

Dentro del archivo `webpack.config.js` escribimos la siguiente estructura

```jsx
module.exports = {
  entry: "./src/index.js", // punto de entrada
  output: {
    // salida
    path: __dirname + "/dist", // carpeta que contendra el archivo de salido
    filename: "bundle.js", // nombre del archivo que va a salir
  },
};
```

Dentro del archivo `index.html` creamos una estructura de html dentro del `<body>` creamos un `<div>` con el id **app**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue js setup</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

Dentro del `package.json` en la seccion de scripts añadimos el siguiente comando.

```json
"webpack": "webpack --mode development",
```

Corremos el sigueinte comando

```json
npm run webpack
```

**_Te aparecera que npm quiere instalar otro complemento le daras que si_**

A continuacion se te creara una carpeta llamada dist dentro de ella tiene un archivo llamada `bundle.js`

Ejecutamos para instalar Vue

```bash
npm i vue vue-template-compiler -D
```

En el archivo `App.vue` creamos la siguiente estructura

```jsx
<template> <!--   TEMPLATE HTML   -->
  <h1>{{ title }}</h1>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello World",
    };
  },
};
</script>
```

Instalamos los siguientes plugins

```bash
npm i babel-loader babel-preset-env vue-loader -D
```

_babel : traductor de js moderno_

v*ue: ayuda a traducit codigo de vue*

Creamos un archivo llamado `.babelrc` con la siguiente configuracion.

```bash
{
  "presets": [
    "env"
  ]
}
```

En el archivo `webpack.config.js` hacemos un llamado a VueLoaderPlugin

```jsx
const { VueLoaderPlugin } = require("vue-loader");
```

Ademas creamos una opcion llamada module y dentro de ella unas reglas como se muestra a continuacion.

```jsx
module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: {
          loader: "vue-loader",
        },
      },
    ],
  },
};
```

Para ejecutar el plugin creamos otra opcion llamada plugins

```jsx
plugins: [new VueLoaderPlugin()];
```

Ahora instalamos un servidor local de desarollo

```bash
npm i webpack-dev-server -D
```

Instalamos un plugin que compile automaticamente el html

```bash
npm i html-webpack-plugin -D
```

Nos dirigimos al `package.json` y en la seccion de scripts añadimos

```json
"dev": "webpack serve --mode development --open"
```

Nos dirigimos al `webpack.config.js` y requerimos el html webpack plugin

```jsx
const HtmlWebpackPlugin = require("html-webpack-plugin");
```

Ademas en la opcion de plugins iniciamos el nuevo plugin e indicamos donde esta template base

```jsx
new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
```

Para finalizar creamos un archivo llamado `.gitignore` y le agregamos lo siguiente

```bash
.DS_Store
node_modules
/dist

# local env files
.env.local
.env.*.local

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

Ejecutamos npm run dev y se nos abriria nuestro servidor local con el template de nuestra web

```bash
npm run dev
```

Ya tenemos la configuracion basica lista para poder trabajar con Vue y Webpack

### Agregar estilos

Para agregarle estilos a nuestro template de vue instalamos

```bash
npm i vue-style-loader -D
npm i css-loader -D
```

Ahora nos dirigimos al `webpack.config.js` y añadimos en la parte de module

```bash
{
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
```

Si queremos alistar nuestro codigo para produccio aregramos en el `package.json`

```bash
"build": "webpack --mode production"
```

Ejecutamos

```bash
npm run build
```

- Cuando tenga todo terminado se vera algo asi :

  - Carpetas

    ![Como trabajar Webpack con Vue js]()

  - webpack.config.js

    ```jsx
    const HtmlWebpackPlugin = require("html-webpack-plugin");
    const { VueLoaderPlugin } = require("vue-loader");

    module.exports = {
      entry: "./src/index.js", // punto de entrada
      output: {
        // salida
        path: __dirname + "/dist", // carpeta que contendra el archivo de salida

        filename: "bundle.js", // nombre del archivo que va a salir
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
            },
          },
          {
            test: /\.vue$/,
            loader: "vue-loader",
          },
          // this will apply to both plain `.css` files
          // AND `<style>` blocks in `.vue` files
          {
            test: /\.css$/,
            use: ["vue-style-loader", "css-loader"],
          },
        ],
      },
      plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
          template: "./src/index.html",
        }),
      ],
    };
    ```

  - package.json

    ```json
    {
      "name": "webpack-vue",
      "version": "1.0.0",
      "description": "Vue2 con webpack configuracion basica",
      "main": "index.js",
      "scripts": {
        "dev": "webpack serve --mode development --open",
        "build": "webpack --mode production"
      },
      "keywords": [],
      "author": "Juan Camilo <jcamilodev@gmail.com>",
      "license": "MIT",
      "devDependencies": {
        "babel-loader": "^8.2.2",
        "babel-preset-env": "^1.7.0",
        "css-loader": "^5.2.0",
        "html-webpack-plugin": "^5.3.1",
        "vue": "^2.6.12",
        "vue-loader": "^15.9.6",
        "vue-style-loader": "^4.1.3",
        "vue-template-compiler": "^2.6.12",
        "webpack": "^5.28.0",
        "webpack-cli": "^4.6.0",
        "webpack-dev-server": "^3.11.2"
      }
    }
    ```

  - index.html

    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vue js setup</title>
      </head>
      <body>
        <div id="app"></div>
      </body>
    </html>
    ```

  - index.js

    ```jsx
    import Vue from "vue";
    import App from "./components/App.vue";
    new Vue({
      render: (h) => h(App),
    }).$mount("#app");
    ```

  - app.vue

    ```html
    <template>
      <!--   TEMPLATE HTML   -->
      <h1>{{ title }}</h1>
    </template>

    <script>
      export default {
        data() {
          return {
            title: "Bienvenidos a Vue con webpack",
          };
        },
      };
    </script>
    ```

  - .babelrc

    ```html
    { "presets": [ "env" ] }
    ```

**\*Recuerda:** le puedes ir añadiendo plugins dependiendo de tus necesidades\*
