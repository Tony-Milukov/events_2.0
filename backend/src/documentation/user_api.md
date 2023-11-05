### User API

The User API provides endpoints for user management, authentication, and user rating functionality.

#### Authentication

To access most User API endpoints, user authentication is required. Authentication is achieved using a JWT token.

##### Login

```http
POST /api/user/login
```

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `email` | `string` | **Required**. User's email  |
| `password` | `string` | **Required**. User's password |

**Response:**

- Status Code: 200 OK
- Body: JSON object containing a success message and a JWT token.
  ```json
  {
    "message": "Successfully logged in",
    "token": "<JWT Token>"
  }
  ```

##### Register

```http
PUT /api/user/register
```

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `email` | `string` | **Required**. User's email  |
| `password` | `string` | **Required**. User's password |

**Response:**

- Status Code: 200 OK
- Body: JSON object containing a success message and a JWT token.
  ```json
  {
    "message": "Successfully registered",
    "token": "<JWT Token>"
  }
  ```

#### User Rating

Users can rate other users on a scale of 1 to 5.

##### Rate User

```http
PUT /api/user/rating
```

| Parameter  | Type     | Description                               |
| :--------- | :------- | :---------------------------------------- |
| `rating` | `number` | **Required**. The rating to assign (1-5) |
| `userId` | `number` | **Required**. The ID of the user to rate |

**Response:**

- Status Code: 200 OK
- Body: JSON object with a success message.
  ```json
  {
    "message": "Successfully rated user with userId: <userId>, rated with: <rating>"
  }
  ```

##### Get User Rating

```http
GET /api/user/rating/:userId
```

| Parameter   | Type     | Description                   |
| :---------- | :------- | :---------------------------- |
| `userId`  | `number` | **Required**. The user's ID |

**Response:**

- Status Code: 200 OK
- Body: JSON object containing user rating information.
  ```json
  {
    "rating": <averageRating>,
    "ratingsCount": <count>
  }
  ```

##### Update userData

```http
PUT /api/user/update
```

| Parameter     | Type     | Description                 |
|:--------------|:---------|:----------------------------|
| `username`    | `string` | **one of params required**. |
| `descripiton` | `string` | **one of params required**. |

**Response:**

- Status Code: 200 OK
- Body: JSON object containing user rating information.
  ```json
  {
    "message": "Successfully updated user information"
  }
  ```

```http
PUT /api/user/pic
```

| Parameter | Type   | Description   |
|:----------|:-------|:--------------|
| `image`   | `file` | **Required**. |

**Response:**

- Status Code: 200 OK
- Body: JSON object containing upload confirmation.
  ```json
  {
    "message": "You successfully updated user information"
  }
  ```