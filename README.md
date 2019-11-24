# simple-rest-api
A simple REST API.

[![Build Status](https://api.travis-ci.com/petrucci53/simple-rest-api.svg?branch=master)](https://travis-ci.com/petrucci53/simple-rest-api)

## Usage
Sending a POST request to `/api/v1/records` with a JSON payload like below will fetch the data from the MongoDB database according to the parameters set in the payload.
    
    {
        "startDate": "2016-01-26",
        "endDate": "2018-02-02",
        "minCount": 2700,
        "maxCount": 3000
    }

## Example Heroku App
https://getir-simple-rest-api.herokuapp.com/api/v1/records