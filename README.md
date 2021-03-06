# Fireplace

Fireplace is a packaged version of the Firefox Marketplace's front-end.

[![Build Status](https://travis-ci.org/mozilla/fireplace.svg?branch=master)](https://travis-ci.org/mozilla/fireplace)


## Glossary

<dl>
  <dt><a href="https://github.com/mozilla/ashes">Ashes</a></dt>
  <dd>A secure debug information collection server</dd>

  <dt>Damper</dt>
  <dd>A node.js server that serves a browser-friendly version of Fireplace</dd>

  <dt><a href="https://github.com/mozilla/flue">Flue</a></dt>
  <dd>A mocked-out version of the Marketplace API.</dd>

  <dt>Inferno</dt>
  <dd>A build server which generates a packaged version of the Marketplace.</dd>

  <dt>Yule Log</dt>
  <dd>A fake version of Fireplace to provide the Gaia team with a package that can
  be shipped and later upgraded to the real Fireplace.</dd>
</dl>


## Installation

```bash
npm install
npm install -g commonplace
```

### Flue

Comprehensive Flue documentation can be found in
[Flue's README](https://github.com/mozilla/flue/blob/master/README.md).


### Yule Log

Docs can be found in
[Yule Log's README](https://github.com/mozilla/fireplace/blob/master/yulelog/README.md) and in the [Marketplace Documentation](http://marketplace.readthedocs.org/en/latest/topics/package.html).


### Packaged App

Docs can be found in the [Marketplace Documentation](http://marketplace.readthedocs.org/en/latest/topics/package.html).

Please note that any file that belongs in the package must get added to `package/files.txt`.


## Usage

If you haven't already, run `commonplace init` to install local settings
files. Some settings in `media/js/settings_local.js` will need to be updated
if you plan to run a local setup, at minimum you should have something like this:

```js
define('settings_local', [], function() {
    return {
        api_url: 'http://localhost',
        media_url: 'http://localhost/media'
    };
});
```

**Important**: Do not end the URLs in your settings file with slashes, doing so will lead to subtle and hard-to-debug errors.

Once you have your settings file in place, to run Fireplace from the terminal, run the following command:

```bash
damper
```

This will start a local server and filesystem watcher on 0.0.0.0:8675 by
default.

For more options, read the [damper documentation](https://github.com/mozilla/commonplace/wiki/Damper).

For instructions on running Flue (the mock API server), please see the [Flue
docs](https://github.com/mozilla/fireplace/blob/master/flue/README.rst).


### Compiling

To run the compilation process, which compiles templates, CSS, and locale
files, run the following command:

```bash
commonplace compile
```


### Compiling Includes

If you need to compile include files (i.e.: for Space Heater or a less HTTP-
heavy version of the project), run `commonplace includes`. This will generate
two files:

```
src/media/js/include.js
src/media/css/include.css
```

The CSS in `include.css` is generated in the order in which CSS files are
included in `src/index.html`.

`include.js` uses a lightweight AMD loader (rather than require.js). This keeps
file size down and also makes it possible to name-mangle internal keywords which
otherwise wouldn't be minifiable. Note that the only safe globals are `require`
and `define`---using any other non-browser globals will result in errors. I.e.:
accessing `_` without requiring `'underscore'` will cause the code to fail. Also
note that all modules must include a name as the first parameter.


## Localizing

A detailed guide to extracting strings and creating JS language packs can be
found [on the wiki](https://github.com/mozilla/commonplace/wiki/L10n#extracting-strings).


## The API

[Read the docs.](http://firefox-marketplace-api.readthedocs.org/)


## Tests

Casper should be installed along with your other npm deps. The tests expect version
1.1+. You can verify the version with:

```
casperjs --version
```

### Running unit tests

Load [http://localhost:8675/tests](http://localhost:8675/tests) in your browser.


### Running functional tests

Before you run the functional tests, make sure your `settings_local.js` file has
the subset of keys found in
[`settings_travis.js`](https://github.com/mozilla/fireplace/blob/master/src/media/js/settings_travis.js).

```bash
make test
```

### Running a single test

```bash
casperjs test tests/ui/<PATH_TO_TEST_FILE>
```

## Local Development

The packaging section above will explain how to build a package from your local
source. If you want to install a hosted version of your local Fireplace you
can do so. It won't have all the same privileges as the packaged app but it
can let you test device-specific things like payments.

To install as a hosted app, start the damper server (see Usage), and
use this manifest:
[http://0.0.0.0:8675/hosted-manifest.webapp](http://0.0.0.0:8675/hosted-manifest.webapp).

### Setting up a virtual host with Nginx

See [Using Fireplace with Zamboni](https://github.com/mozilla/fireplace/wiki/Using-Fireplace-with-Zamboni)
