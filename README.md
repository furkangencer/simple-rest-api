# simple-rest-api
A simple REST API.

[![Build Status](https://api.travis-ci.com/petrucci53/simple-rest-api.svg?branch=master)](https://travis-ci.com/petrucci53/simple-rest-api)

## Starting Server
In order to start the server, first you should create `.env` file in the root directory of the project and set the necessary environment variables. You can take a look at `.env.example` file for the variables.

After this step, you can start the server in development mode like below:

    npm run dev

## Making Request
Sending a POST request to `/api/v1/records` with a JSON payload like below will fetch the data from the MongoDB database according to the parameters set in the payload.
    
    {
        "startDate": "2016-01-26",
        "endDate": "2018-02-02",
        "minCount": 2700,
        "maxCount": 3000
    }


For those who want to deploy the app to a production environment like Heroku, make sure you set the necessary environment variables.
