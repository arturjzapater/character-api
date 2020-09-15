# Character API

Character API is a simple REST API to store and retrieve character documents.

## The Purpose

I built this API mainly to investigate how to use [Babel](https://babeljs.io/) with Node and to explore the library [Fluture](https://github.com/fluture-js/Fluture). It is not meant to be used in a real environment, but rather as an exercise to build a minimally functional app using new concepts.

The [setup for Babel](.babelrc) includes the plugin for the [pipeline operator proposal](https://github.com/tc39/proposal-pipeline-operator).

## Description

Character API has two end points, which accept requests in several methods:

- `/api/characters`
    - `GET`: Returns a paginated list of all the characters stored in the database. It accepts an optional query parameter `page`.
    - `POST`: It creates a new document in the database. It returns 400 if the document isn't formatted correctly.
- `/api/characters/:id`
    - `GET`: Returns a specific document from the database matching the `id` provided or 404 if no such id exists.
    - `PUT`: Updates a specific document from the database matching the `id` provided. It returns 404 if no such id exists or 400 if the document isn't formatted correctly.
    - `DELETE`: Deletes a specific document from the database matching the `id` provided. It returns 404 if no such document exists.

All documents submitted via `POST` and `PUT` requests must include the following fields (though they can include more):
- `name`: a `string` specifying the character's name.
- `aliases`: an `array` indicating the character's aliases if any. It can be empty.
- `feats`: an `array` indicating important achievements of the character. It can be empty.
- `occupation`: a `string` indicating the character's occupation.

## Requirements

To use this application you will need Node >= 12

## Installation

Clone the project and install its dependencies:
```bash
git clone git@github.com:arturjzapater/character-api.git
cd character-api
npm i
```

Create a copy of the `.env` file:
```bash
cp -a .env.example .env
```

Seed database:
```bash
npm run seed
```

Start the server in development mode:
```bash
npm run dev
```

## Available Scripts

- `test`: run unit tests
- `test:watch`: run unit tests on watch mode
- `e2e`: run end-to-end tests
- `dev`: run the server in development mode
- `build`: build the files with babel
- `start`: build and start the server in production mode
- `seed`: add some mock data to the database
