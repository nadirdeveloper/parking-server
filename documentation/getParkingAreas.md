# Page Speed Service API END POINT

Used to collect a Details from Page Speed API for a registered User.

**URL** : `/services/pagespeed/`

**Method** : `POST`

**Auth required** : YES


**Authorization constraints**

```json
{
    "Authorization": "[valid Bearer Token]",
}
```

**Authorization example**

```json
{
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWxBZGRyZXNzIjoibmFkaXJAZ21haWwuY29tIiwiaWF0IjoxNjA5MzQ3NTI1LCJleHAiOjE2NDA5MDQ0NTF9.Xx1H5pkhVTNSuuOb_8jJMf39zdn4Oytn5FH3CXY2-Dg",
}
```

**Data constraints**

```json
{
    "websiteUrl": "[valid website url]",
}
```

**Data example**

```json
{
    "websiteUrl": "https://developers.google.com/",
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "success": true,
}
```

## Error Response

**Condition** : If fields are missed.

**Code** : `400 BAD REQUEST`

**Content example**

```json
{
    "fieldname": "This field is required."
}
```

**Condition** : If there is no Authorization token in headers.

**Code** : `403 Forbidden`

**Content** :

```json
{
    "success":false,
    "message":"No Authentication token was found"
}
```

**Condition** : If Authorization token in headers is invalid or expired.

**Code** : `403 Forbidden`

**Content** :

```json
{
    "success":false,
    "message":"User Authentication token is invalid"
}
```



**Condition** : If something went wrong during fetching webiste url.

**Code** : `404 Not Found`

**Content** :

```json
{
    "success":false,
    "message":"Something Went Wrong"
}
```

