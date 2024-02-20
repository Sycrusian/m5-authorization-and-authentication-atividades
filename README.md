# Authorization and Authentication Activities API

Project created to practice managing authorization and authentication procedures in an API.

## User Routes

### Register User   POST  /user/register

Standard Body

```json
{
	"name": "John Doe",
	"email": "jdoe@mail.com",
	"password": "password"
}
```

Standard Return     201 Created

```json
{
	"id": 1,
	"name": "John Doe",
	"email": "jdoe@mail.com"
}
```

### Login           POST  /user/login

Standard Body

```json
{
	"email": "jdoe@mail.com",
	"password": "password"
}
```

Standard Return     200 OK

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA4Mzc1NTI1LCJleHAiOjE3MDg0NjE5MjV9.ZrzAfp5Xlz77kQKU6tMOuOMHeOAZ7aF99t-vOCEr6KQ",
	"user": {
		"id": 1,
		"name": "John Doe",
		"email": "jdoe@mail.com"
	}
}
```

Possible Errors

401 UNAUTHORIZED

```json
{
	"message": "Email or password incorrect."
}
```

### Get User        GET   /user

Authorization token required for this route:

```json
{
	"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA4Mzc1NTI1LCJleHAiOjE3MDg0NjE5MjV9.ZrzAfp5Xlz77kQKU6tMOuOMHeOAZ7aF99t-vOCEr6KQ"
}
```

Standard Return     200 OK

```json
{
	"id": 1,
	"name": "John Doe",
	"email": "jdoe@mail.com"
}
```

Possible Errors

404 NOT FOUND

```json
{
	"message": "User not found."
}
```
