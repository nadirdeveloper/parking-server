# REGISTRATION API END POINT

Used To Create A User In Database.

**URL** : `/user/signup`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "fullName": "[unicode 64 chars max]",
    "email": "[valid email address]",
    "password": "[password in plain text]",
    "dob":"[valid date of birth]",
    "phoneNumber":"[valid phone number]""
}
```

**Data example**

```json
{
    "fullName": "Nadir Ali",
    "email": "nadirali@gmail.com",
    "password": "123456",
    "dob":"Wed Sep 01 2021",
    "phoneNumber":"12345678910",
    "role":"user"
    }
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "success": true,
    "message": "New User is created",
    "newUser": {
    "firstName":"ilove",
    "lastName":"auth",
    "emailAddress":"iloveauth@gmail.com",
    "password":"123456",
    "subscriptionToOffer":"true",
    "company":"ecommer"
    }
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


**Condition** : If user already exists.

**Code** : `400 BAD REQUEST`

**Content example**

```json
{
    "emailAddress": "This Email Adress is Already Registered"
}
```
