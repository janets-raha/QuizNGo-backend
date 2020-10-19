define({ "api": [
  {
    "type": "post",
    "url": "/users",
    "title": "Create new user",
    "name": "CreateNewUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User unique name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User unique email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password with 6 char min..</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": true,
            "field": "favorites",
            "description": "<p>User favorite quiz.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "score",
            "defaultValue": "0",
            "description": "<p>User total XPs.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"admin\"",
              "\"user\""
            ],
            "optional": true,
            "field": "role",
            "defaultValue": "user",
            "description": "<p>User status.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "favorites",
            "description": "<p>Favorites of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "score",
            "description": "<p>Score of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "role",
            "description": "<p>Status of the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"name\": \"John\",\n  \"email\": \"john@john.com\",\n  \"favorites\" : [],\n  \"score\" : 0,\n  \"role\": \"user\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotAcceptableException.",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 406 Not Acceptable\n{\n  \"error\": \"Email must be unique\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/users/users.controller.ts",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "/users/admin/:id",
    "title": "Delete user",
    "name": "DeleteUser",
    "group": "User",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>UserNotFound</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/users/users.controller.ts",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/admin",
    "title": "Get all registered users",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "GetAllUser",
    "group": "User",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[{\n  \"name\": \"John\",\n  \"email\": \"john@john.com\",\n  \"favorites\" : [],\n  \"score\" : 30,\n  \"role\": \"user\"\n},\n{\n  \"name\": \"Jane\",\n  \"email\": \"jane@jane.com\",\n  \"favorites\" : [],\n  \"score\" : 60,\n  \"role\": \"admin\"\n}]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"unauthorized\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/users/users.controller.ts",
    "groupTitle": "User"
  },
  {
    "type": "patch",
    "url": "/users/:id",
    "title": "Update user",
    "name": "UpdateUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>User unique email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": "<p>User password with 6 char min..</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": true,
            "field": "favorites",
            "description": "<p>User favorite quiz.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "score",
            "defaultValue": "0",
            "description": "<p>User total XPs.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  message : \"User successfully updated !\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotAcceptableException.",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/users/users.controller.ts",
    "groupTitle": "User"
  },
  {
    "type": "patch",
    "url": "/users/admin/:id",
    "title": "Update user (admin)",
    "name": "UpdateUserAdm",
    "group": "User",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>User unique email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": "<p>User password with 6 char min..</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": true,
            "field": "favorites",
            "description": "<p>User favorite quiz.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "score",
            "defaultValue": "0",
            "description": "<p>User total XPs.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"admin\"",
              "\"user\""
            ],
            "optional": true,
            "field": "role",
            "defaultValue": "user",
            "description": "<p>User status.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotAcceptableException.",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/users/users.controller.ts",
    "groupTitle": "User"
  }
] });
