# bankaApp
[![Build Status](https://travis-ci.com/misanj/bankaApp.svg?branch=develop)](https://travis-ci.com/misanj/bankaApp) [![Coverage Status](https://coveralls.io/repos/github/misanj/bankaApp/badge.svg?branch=ch-install-travis-165409373)](https://coveralls.io/github/misanj/bankaApp?branch=ch-install-travis-165409373)  [![Maintainability](https://api.codeclimate.com/v1/badges/2c836f4a027b11297a10/maintainability)](https://codeclimate.com/github/misanj/bankaApp/maintainability)  [![Test Coverage](https://api.codeclimate.com/v1/badges/2c836f4a027b11297a10/test_coverage)](https://codeclimate.com/github/misanj/bankaApp/test_coverage)

Banka is a light-weight core banking application that powers banking operations like account creation, customer deposit and withdrawals. This app is meant to support a single bank, where     users can signup and create bank accounts online, but must visit the branch to withdraw or  deposit money.. 


## Installing / Getting started

Running this application, you'll need to have Node.js and git version control installed to clone the repo. Then follow the instructions....

- clone the repo using

```shell
https://github.com/misanj/bankaApp.git
```
- run `npm install --prod` to install dependencies
- create a .env file from the .env.example file and fill in the necessary environment variables
- run `npm run build` to build the project and then run `npm start` to start the server
- now access the server on the localhost port 5200 i.e `localhost:5000 or 127.0.0.1:5000`

 Now the server will go live and listen for requests


## Developing

To futher develop this app, a few handy tools nodemon, debug and some other dev dependencies have been put inplace to enable a smooth run, You can access them by starting the server using npm run dev. But before using the command, make sure to follow the steps below:

```shell
git clone https://github.com/misanj/bankaApp.git
cd bankaApp/
npm install
npm run dev
```

### Building

The app is written in ES6+ and wired to run ES5 transpiled code in production. To transpile any changes to ES5 run the script shown below:

```shell
npm run build
```
Babel then transpiles your ES6+ files to ES5 for environment compatibility


## Features

* User (client) can sign up
* User (client) can login
* User (client) can create an account
* User (client) can view account transaction history
* User (client) can view a specific account transaction
* Staff (cashier) can debit user (client) account
* Staff (cashier) can credit user (client) account
* Admin/staff can view all user accounts
* Admin/staff can view a specific user account
* Admin/staff can activate or deactivate an account
* Admin/staff can delete a specific user account
* Admin can create staff and admin user accounts
* User can reset password
* Integrate real time email notification upon credit/debit transaction on user account
* User can upload a photo to their profile. 

## Links

- Project UI: https://misanj.github.io/bankaApp/UI/
- Repository: https://github.com/misanj/bankaApp.git
- Pivotal tracker: https://www.pivotaltracker.com/n/projects/2322986
- Heroku: https://ba-nka.herokuapp.com/

## Licensing

Copyright (C) Misanj Temisan Otokuefor "The code in this project is licensed under ISC LICENSE"