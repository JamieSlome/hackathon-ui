## Overview

This application was originally built in under 24 hours for a Public Cloud team hackathon. The intended use case is to enable the Springboard Collaborative nonprofit to manage and review outcomes for the homeless population they serve. This application allows users to enter Organizations, Beneficiaries, and the Needs that are provided and consumed.

This project was bootstrapped with [Vite](https://vitejs.dev/guide/).

## Installation

If you don't have `node` and `npm` installed, do [that](https://docs.npmjs.com/getting-started/installing-node) first.

> **NOTE:** `node` version must be >= `18.18.0` for Vite to work

Navigate into the project directory and install package dependencies.

```bash
# Install all necessary npm packages:
$ npm install
# or
$ yarn install
```

## Running Locally

```bash
# Spin up the dev server:
$ yarn start
# or
$ npm start
```

## Building for Deployment

Builds the app for production to the `dist` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

```bash
$ yarn build
# or
$ npm run build
```

## Generating OpenApi Client

The clients and types are defined in the openapi/api.yaml and can be used to generate new client code should the definition need to be updated.

```bash
# Regenerating the client code from openapi spec:
$ yarn gen-client
# or
$ npm run gen-client
```
