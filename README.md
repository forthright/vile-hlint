# vile-hlint [![Circle CI](https://circleci.com/gh/forthright/vile-hlint.svg?style=shield&circle-token=198632e74a5cc53f485da11dcf23a3917a3cd19d)](https://circleci.com/gh/forthright/vile-hlint) [![score-badge](https://vile.io/api/v0/projects/vile-hlint/badges/score?token=USryyHar5xQs7cBjNUdZ)](https://vile.io/~brentlintner/vile-hlint) [![security-badge](https://vile.io/api/v0/projects/vile-hlint/badges/security?token=USryyHar5xQs7cBjNUdZ)](https://vile.io/~brentlintner/vile-hlint) [![coverage-badge](https://vile.io/api/v0/projects/vile-hlint/badges/coverage?token=USryyHar5xQs7cBjNUdZ)](https://vile.io/~brentlintner/vile-hlint) [![dependency-badge](https://vile.io/api/v0/projects/vile-hlint/badges/dependency?token=USryyHar5xQs7cBjNUdZ)](https://vile.io/~brentlintner/vile-hlint)

A [Vile](https://vile.io) plugin for identifying common style and
maintainability issues in your Haskell code (via [HLint](https://github.com/ndmitchell/hlint)).

## Requirements

- [Node.js](http://nodejs.org)
- [Haskell](https://www.haskell.org)
- [cabal-install](https://www.haskell.org/cabal/download.html)

## Installation

Currently, you need to have hlint installed manually.

Example:

    npm i -D vile vile-hlint
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

## Versioning

## Licensing

This project is licensed under the [MPL-2.0](LICENSE) license.

Any contributions made to this project are made under the current license.

## Contributions

Current list of [Contributors](https://github.com/forthright/vile-hlint/graphs/contributors).

Any contributions are welcome and appreciated!

All you need to do is submit a [Pull Request](https://github.com/forthright/vile-hlint/pulls).

1. Please consider tests and code quality before submitting.
2. Please try to keep commits clean, atomic and well explained (for others).

### Issues

Current issue tracker is on [GitHub](https://github.com/forthright/vile-hlint/issues).

Even if you are uncomfortable with code, an issue or question is welcome.

### Code Of Conduct

By participating in this project you agree to our [Code of Conduct](CODE_OF_CONDUCT.md).

### Maintainers

- Brent Lintner - [@brentlintner](http://github.com/brentlintner)

## Architecture

This project is currently written in JavaScript. HLint provides
a JSON CLI output that is currently used until a more ideal
IPC option is implemented.

- `bin` houses any shell based scripts
- `src` is es6+ syntax compiled with [babel](https://babeljs.io)
- `lib` generated js library

## Developing

    cd vile-hlint
    npm install
    cabal install hlint
    npm run dev
    npm test
