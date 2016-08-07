# vile-hlint [![Circle CI](https://circleci.com/gh/forthright/vile-hlint.svg?style=svg&circle-token=198632e74a5cc53f485da11dcf23a3917a3cd19d)](https://circleci.com/gh/forthright/vile-hlint)

[![score-badge](https://vile.io/~/brentlintner/vile-hlint/badges/score?token=uFywUmzZfbg6UboLzn6R)](https://vile.io/~/brentlintner/vile-hlint) [![security-badge](https://vile.io/~/brentlintner/vile-hlint/badges/security?token=uFywUmzZfbg6UboLzn6R)](https://vile.io/~/brentlintner/vile-hlint) [![coverage-badge](https://vile.io/~/brentlintner/vile-hlint/badges/coverage?token=uFywUmzZfbg6UboLzn6R)](https://vile.io/~/brentlintner/vile-hlint) [![dependency-badge](https://vile.io/~/brentlintner/vile-hlint/badges/dependency?token=uFywUmzZfbg6UboLzn6R)](https://vile.io/~/brentlintner/vile-hlint)

A [vile](https://vile.io) plugin for [hlint](https://hackage.haskell.org/package/hlint).

## Requirements

- [nodejs](http://nodejs.org)
- [npm](http://npmjs.org)
- [haskell](http://nodejs.org)
- [cabal-install](https://www.haskell.org/cabal/download.html)

## Installation

Currently, you need to have hlint installed manually.

Example:

    npm i vile --save-dev
    npm i vile-hlint --save-dev
    cabal install hlint

## Config

```yaml
hlint:
  config:
    path: "custom hintfile path"
```

## Allowing Files

If no `vile.allow` or `hlint.allow` is set, `.` is used.

```yaml
hlint:
  allow:
    - src
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
