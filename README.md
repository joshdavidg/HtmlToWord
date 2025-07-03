# HTML To Word Document Patcher #

This api service is used to patch word documents with data that can either be base64 encoded plaintext and html text or unencoded plaintext and html text. 
For use with power automate connectors that retrieve document data as a base64 string and should only be passed the document content string.

## API Endpoints ##

* /word-patcher - main functionality endpoint for the api
* /healthcheck - allows for checking whether api is up or not

### Usage ###

The api should be used in combination with a docx file that has identifying tags in the form of `{{Key}}`

The `word-patcher` endpoint expects a request body in the following form(s): 

Use the following object layout to explicitly indicate type of the data (html or text) and whether it is base64 encoded or not. 
The "Key" must match the text between the `{{}}` tags in the docx file. 
```sh
{
  patchDocument: <b64 encoded document content string>,
  patchData: {
    "Key": {
      type: "text" or "html",
      encoding: "b64" (optional - assumes not encoded if excluded),
      data: "data to patch into specified key location in word document"
    },
    ...
  }
}
```

The following is a short form that can be used when the data is unencoded text only.
```sh
{
  patchDocument: <b64 encoded document content string>,
  patchData: {
    "Key": "data to patch into specified key location in word document",
    ...
  }
}
```

On success, the api will return the following object: 
```sh
{
  $content-type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  $content: < base64 encoded patched doc data>
}
```

On error, the api will return an error with the follow form: 
```sh
{
  status: <status code>,
  message: "error message",
  errors:
    [
      <error context>
    ]
}
```

## Setup and Deployment ##

The api is deployed using docker compose and will deploy with port 1234 exposed.

* Ensure docker is installed with docker compose

#### Dependencies ####

Docker with Docker Compose

### Run Tests ###

Testing is not currently 100% coverage, but does cover the main api functionality

1. Ensure node is installed on your system.
2. run `npm ci` in the root of the project to install npm dependencies
3. run `npm run test` to run tests.


## TODO ##

* Create tests to reach above 95% code coverage
* Implement Table processing for html to word patcher
