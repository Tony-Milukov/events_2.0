
### Event API

The Event API provides endpoints for managing events, including creating, retrieving, updating, and deleting events. It also supports user requests to join events.

#### Create Event

```http
PUT /api/event/create
```

| Parameter        | Type       | Description                                           |
| :--------------- | :--------- | :---------------------------------------------------- |
| `title`        | `string` | **Required**. The title of the event.                |
| `description`  | `string` | **Required**. Description of the event.              |
| `price`        | `number` | **Required**. Price of the event.                    |
| `endLocation`  | `string` | **Required**. Location where the event ends.         |
| `startLocation`| `string` | Location where the event starts (optional).           |
| `links`        | `array`  | Array of JSON objects representing event links (optional). |

**Response:**

- Status Code: 200 OK
- Body: JSON object containing a success message and the ID of the created event.
  ```json
  {
    "message": "Event was created successfully!",
    "eventId": "<Event ID>"
  }
  ```
#### Update Event

```http
PUT /api/event/update
```

| Parameter        | Type       | Description                                                                         |
| :--------------- | :--------- |:------------------------------------------------------------------------------------|
| `title`        | `string` | **one of this Required**. The title of the event.                                   |
| `description`  | `string` | **one of this Required**. Description of the event.                                 |
| `price`        | `number` | **one of this Required**. Price of the event.                                       |
| `endLocation`  | `string` | **one of this Required**. Location where the event ends.                            |
| `startLocation`| `string` | **one of this Required** Location where the event starts (optional).                |
| `links`        | `array`  | **one of this Required** Array of JSON objects representing event links (optional). |
 
**Response:**

- Status Code: 200 OK
- Body: JSON object containing a success message and the ID of the created event.
  ```json
  {
    "message": "Successfully updated event with evenId: 41"
  }
  ```

#### Get Event by ID

```http
GET /api/event/getById/:eventId
```

| Parameter   | Type       | Description                   |
| :---------- | :--------- | :---------------------------- |
| `eventId` | `number` | **Required**. The event's ID |

**Response:**

- Status Code: 200 OK
- Body: JSON object containing event details.
  ```json
  {
    "event": {
      "id": "<Event ID>",
      "title": "<Event Title>",
      "description": "<Event Description>",
      "price": <Event Price>,
      "startLocation": "<Start Location>",
      "endLocation": "<End Location>",
      "links": [ "<Link 1>", "<Link 2>", ... ],
      "eventCreator": {
        "id": "<User ID>",
        "username": "<Username>",
        "email": "<Email>",
        "roles": [ "<Role 1>", "<Role 2>", ... ]
      },
      "users": [ "<User 1>", "<User 2>", ... ]
    }
  }
  ```

#### Delete Event by ID

```http
POST /api/event/delete
```

| Parameter   | Type       | Description                   |
| :---------- | :--------- | :---------------------------- |
| `eventId` | `number` | **Required**. The event's ID |

**Response:**

- Status Code: 200 OK
- Body: JSON object with a success message.
  ```json
  {
    "message": "Event <eventId> was successfully deleted"
  }
  ```

#### Get All Events

```http
POST /api/event/getAll
```

| Parameter   | Type       | Description                     |
| :---------- | :--------- | :------------------------------ |
| `pageSize`| `number` | Number of events per page.      |
| `page`    | `number` | Page number (starting from 1).  |

**Response:**

- Status Code: 200 OK
- Body: JSON object containing a list of events.
  ```json
  {
    "events": [
      {
        "id": "<Event ID>",
        "title": "<Event Title>",
        "description": "<Event Description>",
        "price": <Event Price>,
        "startLocation": "<Start Location>",
        "endLocation": "<End Location>",
        "links": [ "<Link 1>", "<Link 2>", ... ],
        "eventCreator": {
          "id": "<User ID>",
          "username": "<Username>",
          "email": "<Email>",
          "roles": [ "<Role 1>", "<Role 2>", ... ]
        },
        "users": [ "<User 1>", "<User 2>", ... ]
      },
      // Additional Event Objects
    ]
  }
  ```

#### Accept Join Request

```http
PUT /api/event/addMember
```

| Parameter   | Type       | Description                   |
| :---------- | :--------- | :---------------------------- |
| `requestId` | `number` | **Required**. The join request's ID. |
| `status`    | `boolean` | **Required**. Status of the request (true for approved, false for rejected). |

**Response:**

- Status Code: 200 OK
- Body: JSON object with a success message.
  ```json
  {
    "message": "User with the userId: @<userId> was added as a member to the event"
  }
  ```

#### Join Event Request

```http
PUT /api/event/joinRequest
```

| Parameter   | Type       | Description                   |
| :---------- | :--------- | :---------------------------- |
| `eventId` | `number` | **Required**. The ID of the event to join. |

**Response:**

- Status Code: 200 OK
- Body: JSON object with a success message.
  ```json
  {
    "message": "You successfully requested adding you to the Event!"
  }
  ```

#### Get Join Requests

```http
POST /api/event/getJoinRequests
```

| Parameter   | Type       | Description                   |
| :---------- | :--------- | :---------------------------- |
| `eventId` | `number` | The ID of the event (optional). |

**Response:**

- Status Code: 200 OK
- Body: JSON object containing an array of join requests.
  ```json
  {
    "requests": [
      {
        "id": "<Request ID>",
        "userId": "<User ID>",
        "eventId": "<Event ID>",
        "status": "<Request Status>"
      },
      // Additional Request Objects
    ]
  }
  ```

#### Get User Events

```http
POST /api/event/getUser
```

| Parameter   | Type       | Description                   |
| :---------- | :--------- | :---------------------------- |
| `userId`  | `number` | The ID of the user (optional). |

**Response:**

- Status Code: 200 OK
- Body: JSON object containing a list of events.
  ```json
  {
    "events": [
      {
        "id": "<Event ID>",
        "title": "<Event Title>",
        "description": "<Event Description>",
        "price": <Event Price>,
        "startLocation": "<Start Location>",
        "endLocation": "<End Location>",
        "links": [ "<Link 1>", "<Link 2>", ... ],
        "eventCreator": {
          "id": "<User ID>",
          "username": "<Username>",
          "email": "<Email>",
          "roles": [ "<Role 1>", "<Role 2>", ... ]
        },
        "users": [ "<User 1>", "<User 2>", ... ]
      },
      // Additional Event Objects
    ]
  }
  ```

#### Get User Joined Events

```http
POST /api/event/getJoined
```

| Parameter   | Type       | Description                   |
| :---------- | :--------- | :---------------------------- |
| `userId`  | `number` | The ID of the user (optional). |

**Response:**

- Status Code: 200 OK
- Body: JSON object containing a list of events.
  ```json
  {
    "events": [
      {
        "id": "<Event ID>",
        "title": "<Event Title>",
        "description": "<Event Description>",
        "price": <Event Price>,
        "startLocation": "<Start Location>",
        "endLocation": "<End Location>",
        "links": [ "<Link 1>", "<Link 2>", ... ],
        "eventCreator": {
          "id": "<User ID>",
          "username": "<Username>",
          "email": "<Email>",
          "roles": [ "<Role 1>", "<Role 2>", ... ]
        },
        "users": [ "<User 1>", "<User 2>", ... ]
      },
      // Additional Event Objects
    ]
  }
  ```

#### Get Event Members

  ```http
POST /api/event/getMembers
```

| Parameter   | Type       | Description                   |
| :---------- | :--------- | :---------------------------- |
| `eventId` | `number` | **Required**. The ID of the event to retrieve members for. |

**Response:**

- Status Code: 200 OK
- Body: JSON object containing an array of event members.
  ```json
  {
    "eventMembers": [
      {
        "id": "<User ID>",
        "username": "<Username>",
        "email": "<Email>",
        "roles": [ "<Role 1>", "<Role 2>", ... ]
      },
      // Additional User Objects
    ]
  }
  ```
