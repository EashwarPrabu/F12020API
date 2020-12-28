# **F1 Rest API**

A **_RESTful_** API about the **_2020 F1 season_** implemented securely using JWT.

## **Built With:**

- [NodeJS](https://github.com/nodejs/node)
- [Mongoose](https://www.npmjs.com/package/mongoose)
- [JWT](https://www.npmjs.com/package/jsonwebtoken)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [Joi](https://www.npmjs.com/package/joi)

## **Routes:**

### **Public Routes:**

- `GET /`
- `POST /signup`
- `POST /login`

### **Secured Routes:**

- `GET /api/races` - Retrieves the info of all the races!
- `GET /api/races/<raceNumber>` - Retrieves the info of the specified race!
- `POST /api/races` - Store info about a new race!
- `PUT /api/races/<raceNumber>` - To update some info about the existing race!
- `DELETE /api/races` - Deletes all the exisiting races!
- `DELETE /api/races/<raceNumber>` - Deletes the specified race

## **Sample Payload:**

**1. Signup:**

```json
{
  "name": "<Your Name>",
  "email": "<Your Email>",
  "password": "<Your Password>"
}
```

**2. Login:**

```json
{
  "email": "<Registered Email>",
  "password": "<Registered Password>"
}
```

**3. Race:**

```json
{
  // Imaginary Race 😜
  "raceName": "Indian GP",
  "location": "Delhi, India",
  "raceNumber": 18,
  "raceWinner": "Eashwar Prabu",
  "driverOfTheDay": "Eashwar Prabu",
  "createdAt": "2020-12-28T20:36:39.822Z"
}
```

**Note**: The `POST` and `PUT` methods expects the entire payload to work flawlessly!

## **How to Use:**

1. Sign up with a valid email and a password. Don't worry, all your passwords are hashed and stored securely.
2. Login using your crediantials. The response would contain a `auth-token` that would be required to access the API.
3. Copy the `auth-token` and add it as an **Header** for all the requests.
4. Get to know the **2020 F1 season using this awesome API**!