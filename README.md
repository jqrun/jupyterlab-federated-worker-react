# myextension

Reproducer extension for an issue with workers using react in a prebuild extension.

To repro, install the extension, spin up lab, open a python notebook, and render a simple cell like:

```python
[1,2,3]
```

The error:

```
consumes:19 Uncaught (in promise) Error: Shared module react doesn't exist in shared scope default
    at ensureExistence (consumes:19)
    at consumes:93
    at consumes:78
    at Object.webpack/sharing/consume/default/react (consumes:122)
    at Object.__webpack_require__.m.<computed> [as webpack/sharing/consume/default/react] (consumes:130)
    at __webpack_require__ (bootstrap:19)
    at Object../lib/worker.js (lib_worker_js.cec92441c3301ea9a8a7.js:12)
    at __webpack_require__ (bootstrap:19)
    at bootstrap:34
    at Function.__webpack_require__.O (chunk loaded:23)
```

## Requirements

- JupyterLab >= 3.0

## Install

```bash
pip install myextension
```

## Contributing

### Development install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the myextension directory
# Install package in development mode
pip install -e .
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Rebuild extension Typescript source after making changes
jlpm run build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm run watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm run build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

### Uninstall

```bash
pip uninstall myextension
jupyter labextension uninstall myextension
```
