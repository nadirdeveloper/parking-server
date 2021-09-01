# Login API END POINT

Used to collect a Token for a registered User.

**URL** : `/user/login/`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "email": "[valid email address]",
    "password": "[password in plain text]"
}
```

**Data example**

```json
{
    "email": "iloveauth@example.com",
    "password": "abcd1234"
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

**Condition** : If 'emailAddress' is empty.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "email": "emailAddress field is required"
}

```
**Condition** : If 'password' is empty.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "password": "password field is required"
}
```
**Condition** : If 'emailAddress' does not match with any account.

**Code** : `404 NOT FOUND`

**Content** :

```json
{
    "success": false,
    "message": "Email not found"
}
```


**Condition** : If 'emailAddress' and 'password' combination is wrong.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "success": false,
    "message": "Password does not matched"
}
```


