# vile-hlint

A [vile](http://vile.io) plugin for
[hlint](https://hackage.haskell.org/package/hlint).

## Requirements

- [nodejs](http://nodejs.org)
- [npm](http://npmjs.org)
- [haskell](http://nodejs.org)
- [cabal-install](https://www.haskell.org/cabal/download.html)

## Installation

Currently, you need to have hlint installed manually.

Example:

    npm i vile-hlint
    cabal install hlint

## Config

```yaml
hlint:
  config:
    path: "custom hintfile path"
```

## Architecture

This project is currently written in JavaScript. HLint provides
a JSON CLI output that is currently used until a more ideal
IPC option is implemented.

- `bin` houses any shell based scripts
- `src` is es6+ syntax compiled with [babel](https://babeljs.io)
- `lib` generated js library

## Hacking

    cd vile-hlint
    npm install
    cabal install hlint
    npm run dev
    npm test
