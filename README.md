# License Plate Explorer

Node app for calling VES API to retrieve license plate information

Tried a similar app in react, but hit CORS issues so doing it this way instead

## Running local

`docker-compose up`

update your .env file as follows, where the username password matches those specified in docker-compose

`
API_KEY=<YOUR VES API KEY>
DB_USERNAME=licenseplate
DB_PASSWORD=licenseplate
`

`node app.js`

## Mongo

- I tested with mongosh on windows
`./mongosh mongodb://licenseplate:licenseplate@localhost:27017/licenseplate?authSource=admin`
- show all records
`db.registrations.find();`
- search
`db.registrations.find({registrationNumber:'YOUR PLATE'})`