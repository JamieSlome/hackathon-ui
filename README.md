## Overview

This application was originally built in 24 hours for a Public Cloud team hackathon. The intended use case is to enable the Springboard Collaborative nonprofit to manage and review outcomes for the homeless population they serve. This application allows users to enter Organizations, Beneficiaries, and the Needs that are provided and consumed.

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

There are two options for running development server.

Running with mocks in place:

```bash
# Spin up the dev server:
$ yarn start-mock
# or
$ npm run start-mock
```

Running without mocks (in case of testing backend defined in .env.local)

```bash
# Spin up the dev server:
$ yarn start
# or
$ npm start
```

## Building for Deployment

> **IMPORTANT:** Update the VITE_API_BASE_URL value in .env at the root of the project with the base url of the running backend before the build step.

Builds the app for production to the `dist` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

```bash
$ yarn build
# or
$ npm run build
```

## Serving the Project

A nodejs server is configured at ./index.cjs. This is a simple server that is set up to serve the static ui content from the root dist folder created during the build step.

To start this server run

```bash
$ yarn start-prod
# or
$ npm run start-prod
# or
$ node index.cjs
```

## Generating OpenApi Client

> **NOTE:** This is only necessary if the openapi spec is changed.

The clients and types are defined in the openapi/api.yaml and can be used to generate new client code should the definition need to be updated.

```bash
# Regenerating the client code from openapi spec:
$ yarn gen-client
# or
$ npm run gen-client
```
