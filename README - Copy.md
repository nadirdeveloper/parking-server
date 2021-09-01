# PARKING RESERVATION API DOCUMENTATION

These are the API created for the UI of Parking RESERVATION System.

The API origin which you will be using are following:

For Development:

'http://localhost:5000'

For Production:

'http://localhost:5000'

## Open Endpoints

Open endpoints require no Authentication.

* [Login](documentation/login.md) : `POST /auth/login`

Open endpoints require no Authentication.

* [Registration](documentation/signup.md) : `POST /auth/signup`


## Endpoints that require Authentication

Closed endpoints require a valid Token to be included in the header of the
request. A Token can be acquired from the Login view above.

* [Get Parking Areas](documentation/getParkingAreas.md) : `POST /parking/getParkingAreas`