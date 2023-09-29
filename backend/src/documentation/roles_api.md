### Role API

The Role API provides endpoints for managing user roles.

#### Add User Role

To add a role to a user, you can use the following endpoint:

**HTTP Method:** PUT
**Route:** `/api/role/user`
**Authentication:** Required
**Request Body:**

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `userId`  | `number` | **Required**. User's ID     |
| `roleId`  | `number` | **Required**. Role's ID     |

**Response:**

- Status Code: 200 OK
- Body: Success message.

#### Create Role

To create a new role, you can use the following endpoint:

**HTTP Method:** PUT
**Route:** `/api/role/`
**Authentication:** Required
**Request Body:**

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `title`   | `string` | **Required**. Role's title  |

**Response:**

- Status Code: 200 OK
- Body: JSON object containing a success message and the created role's ID.
  ```json
  {
    "message": "Successfully created role with title: <roleTitle>",
    "roleId": "<roleId>"
  }
