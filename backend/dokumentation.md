## User API

#### Login

```http(s)
  POST /api/user/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. email of user |
| `password` | `string` | **Required**. password of user |

returns JSON:

    {
        message: "successfully logged in", token: JWT_TOKEN
    }


#### Register

```http(s)
  POST /api/user/register
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. email of user |
| `password` | `string` | **Required**. password of user |

returns JSON:

    {
        message: "successfully logged in", token: JWT_TOKEN
    }

# Events API

This API provides various endpoints to manage events.

## Authentication

To access the endpoints, you need to include a valid JWT Token in the  `Authorization ` header of your requests.

## Create Event

### Endpoint

` ` `http
PUT /api/event/create
`

**Description:** Create a new event.

**Request Body:**

| Parameter      | Type     | Description                           |
| :------------- | :------- | :------------------------------------ |
|  `title `        |  `string ` | **Required**. The title of the event. |
|  `description `  |  `string ` | **Required**. The description of the event. |
|  `price `        |  `number ` | **Required**. The price of the event. |
|  `endLocation `  |  `string ` | **Required**. The end location of the event. |
|  `startLocation `|  `string ` | The start location of the event (nullable). |
|  `links `        |  `JSON `   | Links related to the event (nullable). |

**Response:**

` ` `json
{
"message": "Event was created successfully!",
"eventId": "event_id_here"
}
`

## Get Event by ID

### Endpoint

` ` `http
GET /api/event/getById/:eventId
`

**Description:** Get an event by its ID.

**Parameters:**

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
|  `eventId ` |  `string ` | **Required**. The ID of the event.    |

**Response:**

- Event details in JSON format.

## Delete Event

### Endpoint

` ` `http
POST /api/event/delete
`

**Description:** Delete an event by its ID. You can only delete your own events.

**Request Body:**

| Parameter  | Type     | Description                          |
| :--------- | :------- | :----------------------------------- |
|  `eventId ` |  `string ` | **Required**. The ID of the event.   |

**Response:**

` ` `json
{
"message": "Event {eventId} was successfully deleted"
}
`

## Get All Events

### Endpoint

` ` `http
POST /api/event/getAll
`

**Description:** Get all events with pagination support.

**Request Body:**

| Parameter  | Type     | Description                          |
| :--------- | :------- | :----------------------------------- |
|  `pageSize ` |  `number ` | **Required**. Number of events per page. |
|  `page `     |  `number ` | **Required**. Page number.            |

**Response:**

- List of events in JSON format.

## Get User Created Events

### Endpoint

` ` `http
POST /api/event/getUser
`

**Description:** Get all events created by the authenticated user.

**Response:**

- List of user-created events in JSON format.

## Get Event Members

### Endpoint

` ` `http
POST /api/event/getMembers
`

**Description:** Get all members of an event by its ID.

**Request Body:**

| Parameter  | Type     | Description                          |
| :--------- | :------- | :----------------------------------- |
|  `eventId ` |  `string ` | **Required**. The ID of the event.   |

**Response:**

- List of event members in JSON format.

## Add Member to Event

### Endpoint

` ` `http
POST /api/event/addMember
`

**Description:** Add the authenticated user to an event by its ID.

**Request Body:**

| Parameter  | Type     | Description                          |
| :--------- | :------- | :----------------------------------- |
|  `eventId ` |  `string ` | **Required**. The ID of the event.   |

**Response:**

` ` `json
{
"message":  `User with the userId: @userId_here was added as a member to the event @eventId_here `
}
`

## Get User Joined Events

### Endpoint

` ` `http
POST /api/event/getJoined
`

**Description:** Get all events that the authenticated user has joined.

**Response:**

- List of joined events in JSON format.