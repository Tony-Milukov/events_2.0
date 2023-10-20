
### Event API

The Event API provides endpoints for managing events, including creating, retrieving, updating, and deleting events. It also supports user requests to join events.

#### Create Event

```http
PUT /api/event/create
```

| Parameter       | Type     | Description                                                |
|:----------------|:---------|:-----------------------------------------------------------|
| `title`         | `string` | **Required**. The title of the event.                      |
| `description`   | `string` | **Required**. Description of the event.                    |
| `price`         | `number` | **Required**. Price of the event.                          |
| `endLocation`   | `string` | **Required**. Location where the event ends.               |
| `startLocation` | `string` | Location where the event starts (optional).                |
| `links`         | `array`  | Array of JSON objects representing event links (optional). |
| `image`         | `file`   | Image of the event (optional).                             |

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
      "users": [ "<User 1>", "<User 2>", ... ],
      "userMemberOfEvent": <boolean>
      "userRequestedJoin": <boolean>
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
PUT /api/event/acceptRequest
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
            "id": 26,
            "status": false,
            "createdAt": "2023-10-17T07:28:17.198Z",
            "updatedAt": "2023-10-20T06:21:51.727Z",
            "userId": 3,
            "eventId": 102,
            "creatorId": 3,
            "event": {
                "id": 102,
                "title": "Test",
                "description": "test",
                "price": 100,
                "startLocation": "test",
                "endLocation": "test",
                "links": "[\"test.com\"]",
                "image": null,
                "createdAt": "2023-10-17T07:28:08.757Z",
                "updatedAt": "2023-10-17T07:28:08.757Z",
                "userId": 3
            },
            "user": {
                "id": 3,
                "email": "asd",
                "username": "romeo_oltean",
                "password": "$2b$09$Q95vuWaYX8Y.p/jNM32meewCq/hlLBflhZsx2ZTQ0rlYFajj2EAEy",
                "verified": null,
                "image": "3.webp",
                "description": "I am a java dev!",
                "createdAt": "2023-09-18T10:23:37.740Z",
                "updatedAt": "2023-10-20T06:11:02.135Z"
            }
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
#### Search Event by title

  ```http
POST /api/event/search/:value
```

| Parameter  | Type     | Description                                            |
|:-----------|:---------|:-------------------------------------------------------|
| `value`    | `string` | **Required**. The searching param                      |
| `pageSize` | `number` | **Required**. How many items have to be required       |
| `page`     | `number` | **Required**. Items for which page have to be rendered |
**Response:**

- Status Code: 200 OK
- Body: JSON object containing an array of events.
  ```json
  {
    "events": {
        "count": 1,
        "rows": [
            {
                "id": "<TaskId>",
                "title": "<TaskTitle>",
                "description": "<TaskDescr>",
                "price": "<TaskPrice>",
                "startLocation": "<TaskStartLoc>",
                "endLocation": "<TaskEndLoc>",
                "links": <TaskLinks>[],
                "image": null,
                "createdAt": "<TaskCreated>",
                "updatedAt": "<TaskUpdate>",
                "userId": "<User>.id"
            }
        ]
    }
  }


#### Create new Drive as Driver

  ```http
PUT /api/event/drive/
```

| Parameter  | Type     | Description                                            |
|:-----------|:---------|:-------------------------------------------------------|
| `eventId`    | `number` | **Required**. The eventId                    |
| `allSeats` | `number` | **Required**. How many seats are in your car? inclusive driver       |
| `availableSeats`     | `number` | how many seats are available, (default: allSeats -1 Driver) |
| `description`     | `string` | **Required** some text, description |

**Response:**
- Status Code: 200 OK
- Body: JSON object containing an object of new drive.
  ```json
  {
   "drive": {
        "id": 3,
        "eventId": 100,
        "driveId": 21,
        "description": "Volvo99",
        "allSeats": 5,
        "availableSeats": 4,
        "updatedAt": "2023-10-16T10:17:51.079Z",
        "createdAt": "2023-10-16T10:17:51.079Z"
    }
  }
  
  
#### Delete Drive as Driver

  ```http
POST /api/event/drive/delete
```
| Parameter  | Type     | Description                                      |
|:-----------|:---------|:-------------------------------------------------|
| `eventId`    | `number` | **Required one of params**. The eventId          |
| `driveId`     | `number` | **Required Required one of params** the drive Id |


**Response:**
- Status Code: 200 OK
  - Body: JSON object containing an message
    ```json
    {
    "message": 
        "Successfully deleted a drive possibility for you, you are not offending drive possibilities anymore"
    }
    
#### Join Drive as Member
###### only if you are the event member!
  ```http
PUT /api/event/drive/join
```

| Parameter  | Type     | Description                                                                      |
|:-----------|:---------|:---------------------------------------------------------------------------------|
| `driveId`     | `number` | **Required** the drive Id |


**Response:**
- Status Code: 200 OK
  - Body: JSON object containing an message
    ```json
    {
    "message": 
        "Successfully joined the drive"
    }


#### Leave the Drive as Member
###### only if you are the event member!

  ```http
PUT /api/event/drive/leave
```

| Parameter  | Type     | Description                                                                      |
|:-----------|:---------|:---------------------------------------------------------------------------------|
| `driveId`     | `number` | **Required** the drive Id |


**Response:**
- Status Code: 200 OK
  - Body: JSON object containing an message
    ```json
    {
    "message": 
        "Successfully leaved the drive"
    }
    
#### Get All drives for an event
###### only if you are the event member!

  ```http
POST /api/event/drive
```

| Parameter | Type     | Description                                                                     |
|:----------|:---------|:--------------------------------------------------------------------------------|
| `eventId` | `number` | **Required** the drive Id                                                       |


**Response:**
- Status Code: 200 OK
  - Body: JSON object containing an message
    ```json
    {
     "drivers": [
        {
            "id": <driveId>,
            "driverId":  <userId>,
            "description":  <some description>,
            "allSeats":  <all seats>,
            "availableSeats":  <avaliable seats>,
            "createdAt":  <createdAt>,
            "updatedAt":  <updatedAt>,
            "eventId": <eventId>
        }
    ]
}