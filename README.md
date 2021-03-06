# This will be updated in time to reflect the new workflow of this package

<!--
# cep-bundler-core

Core functionality for making bundler extensions to compile CEP.
All the functionality is exposed through one simple function:

```js
const core = require('@samuel-charpentier/cep-bundler-core');

core.compile({
	out: '/path/to/dist', // REQUIRED type: string
	isDev: false, // OPTIONAL type: boolean, default: false
	env: 'production', // OPTIONAL type: string, default: process.env.NODE_ENV
	root: '/path/to/project/root', // OPTIONAL type: string, default: process.cwd()
	htmlFilename: './index.html', // OPTIONAL type: string, default: 'index.html'
});
```

Know that running this function on Windows, it will try to create a symbolic link in the CEP directory pointing to your `root/out` folder. Creating a symbolic link on Windows requires administrator privilege. You will be prompted to allow administrator privilege. This will only happen if there is no symbolic link in the CEP directory named after your CEP ID and pointing to your `root/out` folder.

## Configuration

You can overwrite the default values and configure the bundler in 3 different places:

1. A `cep` object in your projects `package.json` ;
2. Environement valiables (ex: a `.env` file with `dotenv` npm package)
3. The `core.compile()` function parameter.

The configurations are compounded together. The order of priority is parameter > .env > package.json.

This means that if your `package.json` contains:

```json
{
	"cep": {
		"name": "My extention name in package.json",
		"id": "my.extention.id",
		"out": "/anywhere"
	}
}
```

That your `.env` file contains:

```bash
CEP_NAME="My Extention name in .env" # overwrites cep.name in package.json
CEP_OUT="/whereShouldIPutMyExtention" # overwrites cep.out in package.json
```

And that your dev or build `index.js` contains:

```js
const core = require('@samuel-charpentier/cep-bundler-core');

core.compile({
	out: '/dist', // overwrites CEP_OUT in .env
});
```

Then the bundler config will be:

```js
config = {
	name: 'My Extention name in .env',
	id: 'my.extention.id',
	out: '/dist',
};
```

### out

The `out` should be a valid folder path. It specifies where the bundler output should go: `manifest.xml`, `dev.html`, `node_modules` folder and (optionally) `.debug` file. This is usually the folder where your compiled javascript ends up.

### isDev

When `isDev` is true, the bundler will create a `dev.html` file that contains a redirect to `http://${devHost}:${devPort}`. The `MainPath` in the `manifest.xml` will point to this file instead of the `htmlFilename` option. When `isDev` is false, none of this happens and the `MainPath` in the `manifest.xml` points to the `htmlFilename` option.

### env

The `env` option is used when you want different configurations for other environments, you might for example have `development`, `staging`, `ci` and `production` environments that you want to configure differently.
This option is only used when configure the bundler through your `package.json`, here is an example of using different extension names for different environments.

```json
"cep": {
    "env":"development",
    "development": {
        "name": "My Extension DEVELOPMENT",
        "id": "com.mycompany.myextension.development",
    },
    "beta": {
        "name": "My Extension BETA",
        "id": "com.mycompany.myextension.beta",
    },
    "production": {
        "name": "My Extension",
        "id": "com.mycompany.myextension",
    }
}
```

### root

The `root` option determines where the bundler should look for the `package.json` and `node_modules` folder, when you leave this off the current working directory will be used.

### htmlFilename

The htmlFilename is the name of your html file, this option is only used when `isDev` is false.
This path is relative from the `out` folder.

## CEP Configuration

You can configure CEP a either through environment variables or by a config object under the `cep` key in the `package.json` of your project.

### package.json

```json
"cep": {
    "name": "My Extension",
    "id": "com.mycompany.myextension",
    "hosts": "*"
}
```

### Environment Variables

Either `set` thorugh your terminal or add to the `.env` file.

```bash
CEP_NAME="My Extension"
CEP_ID="com.mycompany.myextension"
CEP_HOSTS="*"
```

### Options

#### Id

This is the unique id of the extension.

```json
"id": "com.mycompany.myextension"
```

Environment variable: `CEP_ID`

#### Version

This sets the version of the bundle.

```json
"version": "1.2.0"
```

Environment variable: `CEP_VERSION`

#### Name

This sets the name of extension as it will show in the application.

```json
"name: "My Extension"
```

Environment variable: `CEP_NAME`

#### Hosts

By default, the extension will target all known Adobe hosts. To target specific hosts, modify the list of the hosts you want to target.
For example, to target just Illustrator and After Effects:

```json
"hosts": "ILST, AEFT"
```

And to target specific versions:

```json
"hosts": "ILST, IDSN@*, PHXS@6.0, AEFT@[5.0,10.0]"
```

This will target all versions of Illustrator and In Design, Photoshop 6.0, and After Effects 5.0 - 10.0.

Environment variable: `CEP_HOSTS`

#### Icon

To add a custom panel icon, add all [icon files](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_8.x/Documentation/CEP%208.0%20HTML%20Extension%20Cookbook.md#high-dpi-panel-icons) and set their paths in your config:

```bash
"iconNormal": "./assets/icon-normal.png",
"iconRollover": "./assets/icon-rollover.png",
"iconDarkNormal": "./assets/icon-dark.png",
"iconDarkRollover": "./assets/icon-dark-rollover.png"
```

Environment variables:

```bash
CEP_ICON_NORMAL="./assets/icon-normal.png",
CEP_ICON_ROLLOVER="./assets/icon-rollover.png",
CEP_ICON_DARK_NORMAL="./assets/icon-dark.png",
CEP_ICON_DARK_ROLLOVER="./assets/icon-dark-rollover.png"
```

#### Panel Size

```json
"panelWidth": 500,
"panelHeight": 500,
```

Environment variables:

```bash
CEP_PANEL_WIDTH=500
CEP_PANEL_HEIGHT=500
```

#### Panel Minimum Size

```json
"panelMinWidth": 500,
"panelMinHeight": 500,
```

Environment variables:

```bash
CEP_PANEL_MIN_WIDTH=500
CEP_PANEL_MIN_HEIGHT=500
```

#### Panel Maximum Size

```json
"panelMaxWidth": 500,
"panelMaxHeight": 500,
```

Environment variables:

```bash
CEP_PANEL_MAX_WIDTH=500
CEP_PANEL_MAX_HEIGHT=500
```

#### Debug ports

```json
"debugPorts": {
    "PHXS": 3001,
    "IDSN": 3002,
    "AICY": 3003,
    "ILST": 3004,
    "PPRO": 3005,
    "PRLD": 3006,
    "AEFT": 3007,
    "FLPR": 3008,
    "AUDT": 3009,
    "DRWV": 3010,
    "MUST": 3011,
    "KBRG": 3012,
},
```

Environment variables:

```bash
CEP_DEBUG_PORT_PHXS="3001"
CEP_DEBUG_PORT_IDSN="3002"
CEP_DEBUG_PORT_AICY="3003"
CEP_DEBUG_PORT_ILST="3004"
CEP_DEBUG_PORT_PPRO="3005"
CEP_DEBUG_PORT_PRLD="3006"
CEP_DEBUG_PORT_AEFT="3007"
CEP_DEBUG_PORT_FLPR="3008"
CEP_DEBUG_PORT_AUDT="3009"
CEP_DEBUG_PORT_DRWV="3010"
CEP_DEBUG_PORT_MUST="3011"
CEP_DEBUG_PORT_KBRG="3012"
```

#### Debug in production

Enabling this will create the .debug file, even when building for production.

```json
"debugInProduction": true
```

Environment variable:

```bash
CEP_DEBUG_IN_PRODUCTION="1"
```

#### CEF Params

```json
"cefParams": [
    "--allow-file-access-from-files",
    "--allow-file-access",
    "--enable-nodejs"
]
```

Environment variable:

```bash
CEP_CEF_PARAMS="--allow-file-access-from-files,--allow-file-access,--enable-nodejs,--mixed-context"
```

#### Dev host & port

```json
"devHost": "localhost",
"devPort": 8080,
```

Environment variable:

```bash
CEP_DEV_HOST="localhost"
CEP_DEV_PORT="8080"
```

## Credits

This code is mostly taken from (an old version of) [cep-bundler-core](https://www.npmjs.com/package/cep-bundler-core) by [@fusepilot](https://github.com/fusepilot).
-->