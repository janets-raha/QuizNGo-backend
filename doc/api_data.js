define({ "api": [
  {
    "type": "POST",
    "url": "/quizz",
    "title": "Create a new quiz",
    "name": "addQuizz",
    "group": "Quizz",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Quiz name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Id of the quiz category</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"Facile\"",
              "\"Moyen\"",
              "\"Difficile\""
            ],
            "optional": false,
            "field": "difficulty",
            "description": "<p>Quiz difficulty level</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "bonus_time",
            "description": "<p>Max time in minutes to get bonus XPs</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "bonus_xp",
            "description": "<p>XPs amount if quiz done under bonus time</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "is_published",
            "defaultValue": "false",
            "description": "<p>Published status with default false</p>"
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
            "field": "id",
            "description": "<p>Id of the new quiz</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n    \"id\": \"5f8ee...382b7\"\n}",
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
            "field": "Error",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 XXX XXX\n{\n  \"XXX\": \"XXX\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/quizz/quizz.controller.ts",
    "groupTitle": "Quizz"
  },
  {
    "type": "delete",
    "url": "/quizz/:id",
    "title": "Delete one quiz",
    "name": "deleteQuizz",
    "group": "Quizz",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Quiz unique ID</p>"
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
            "field": "message",
            "description": "<p>&quot;Quiz successfully deleted&quot;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n        \"message\": \" Quiz successfully deleted\"\n}",
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
            "field": "Error",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 XXX XXX\n{\n  \"XXX\": \"XXX\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/quizz/quizz.controller.ts",
    "groupTitle": "Quizz"
  },
  {
    "type": "get",
    "url": "/quizz/published",
    "title": "Get all quizz with playcount (unreliable) and success ratio additional stats",
    "name": "getAllQuizzWithStats",
    "group": "Quizz",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Id &amp; Name of the quiz's category</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "difficulty",
            "description": "<p>Difficulty level of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bonus_time",
            "description": "<p>Max time in minutes to get bonus XPs</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bonus_xp",
            "description": "<p>XPs amount if quiz done under bonus time</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "avg_rating",
            "description": "<p>Average rating based on user's ratings</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "playcount",
            "description": "<p>UNRELIABLE (playcount of the quiz, but doesn't considers unregisred users games nor registred users multiple games)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "success_ratio",
            "description": "<p>Average success ratio based on users results</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "is_published",
            "description": "<p>TRUE : quiz is published, FALSE : quiz is NOT published</p>"
          },
          {
            "group": "Success 200",
            "type": "Timestamp",
            "optional": false,
            "field": "created_at",
            "description": "<p>Date of the quiz's creation</p>"
          },
          {
            "group": "Success 200",
            "type": "Timestamp",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Date of the quiz's last modification</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n       {\n           \"id\": \"5f7f4c46eb4a5b3d2eaa1e34\",\n           \"name\": \"Test avec 2 questions\",\n           \"category\": {\n               \"_id\": \"5f7f4bf1eb4a5b3d2eaa1e33\",\n               \"name\": \"Naxst JS\",\n               \"__v\": 0\n           },\n           \"difficulty\": \"Difficile\",\n           \"bonus_time\": 1,\n           \"bonus_xp\": 100,\n           \"avg_rating\": 3.3333333333333335,\n           \"playcount\": 6,\n           \"success_ratio\": 85,\n           \"is_published\": true,\n           \"created_at\": \"2020-10-09T14:07:17.769Z\",\n           \"updated_at\": \"2020-10-16T17:36:11.589Z\"\n       }\n     ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/quizz/quizz.controller.ts",
    "groupTitle": "Quizz"
  },
  {
    "type": "post",
    "url": "/quizz/search",
    "title": "Search quiz",
    "name": "searchAll",
    "group": "Quizz",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Search",
            "description": "<p>string</p>"
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
            "field": "id",
            "description": "<p>Id of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Id &amp; Name of the quiz's category</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "difficulty",
            "description": "<p>Difficulty level of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bonus_time",
            "description": "<p>Max time in minutes to get bonus XPs</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bonus_xp",
            "description": "<p>XPs amount if quiz done under bonus time</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "avg_rating",
            "description": "<p>Average rating based on user's ratings</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "is_published",
            "description": "<p>TRUE : quiz is published, FALSE : quiz is NOT published</p>"
          },
          {
            "group": "Success 200",
            "type": "Timestamp",
            "optional": false,
            "field": "created_at",
            "description": "<p>Date of the quiz's creation</p>"
          },
          {
            "group": "Success 200",
            "type": "Timestamp",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Date of the quiz's last modification</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n {\n         \"id\": \"5f7f3dac7a1445090cc23e75\",\n         \"name\": \"Nico Facile 2\",\n         \"category\": {\n             \"_id\": \"5f7efda4c828e01d223fd057\",\n             \"name\": \"Javascript\",\n             \"__v\": 0\n         },\n         \"difficulty\": \"Facile\",\n         \"bonus_time\": 10,\n         \"bonus_xp\": 100,\n         \"avg_rating\": 4.666666666666667,\n         \"is_published\": true,\n         \"created_at\": \"2020-10-08T16:26:20.517Z\",\n         \"updated_at\": \"2020-10-19T08:08:32.179Z\"\n       }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/quizz/quizz.controller.ts",
    "groupTitle": "Quizz"
  },
  {
    "type": "get",
    "url": "/quizz",
    "title": "Get all quizz",
    "name": "showAllQuiz",
    "group": "Quizz",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Id &amp; Name of the quiz's category</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "difficulty",
            "description": "<p>Difficulty level of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bonus_time",
            "description": "<p>Max time in minutes to get bonus XPs</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bonus_xp",
            "description": "<p>XPs amount if quiz done under bonus time</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "avg_rating",
            "description": "<p>Average rating based on user's ratings</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "is_published",
            "description": "<p>TRUE : quiz is published, FALSE : quiz is NOT published</p>"
          },
          {
            "group": "Success 200",
            "type": "Timestamp",
            "optional": false,
            "field": "created_at",
            "description": "<p>Date of the quiz's creation</p>"
          },
          {
            "group": "Success 200",
            "type": "Timestamp",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Date of the quiz's last modification</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n       {\n           \"id\": \"5f872...aa9f4\",\n           \"name\": \"My Wonderful Quiz\",\n           \"category\": {\n               \"_id\": \"5f7f4...a1e33\",\n               \"name\": \"Naxst JS\",\n           },\n           \"difficulty\": \"Moyen\",\n           \"bonus_time\": 1,\n           \"bonus_xp\": 100,\n           \"avg_rating\": 4.333333333333333,\n           \"is_published\": true,\n           \"created_at\": \"2020-10-14T16:50:43.383Z\",\n           \"updated_at\": \"2020-10-18T16:40:35.623Z\"\n       }\n     ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/quizz/quizz.controller.ts",
    "groupTitle": "Quizz"
  },
  {
    "type": "get",
    "url": "/quizz/:id",
    "title": "Get one quiz by Id",
    "name": "showOneQuizz",
    "group": "Quizz",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Quiz unique ID</p>"
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
            "field": "id",
            "description": "<p>Id of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Id &amp; Name of the quiz's category</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "difficulty",
            "description": "<p>Difficulty level of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bonus_time",
            "description": "<p>Max time in minutes to get bonus XPs</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bonus_xp",
            "description": "<p>XPs amount if quiz done under bonus time</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "avg_rating",
            "description": "<p>Average rating based on user's ratings</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "is_published",
            "description": "<p>TRUE : quiz is published, FALSE : quiz is NOT published</p>"
          },
          {
            "group": "Success 200",
            "type": "Timestamp",
            "optional": false,
            "field": "created_at",
            "description": "<p>Date of the quiz's creation</p>"
          },
          {
            "group": "Success 200",
            "type": "Timestamp",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Date of the quiz's last modification</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n       {\n           \"id\": \"5f7f4c46eb4a5b3d2eaa1e34\",\n           \"name\": \"Test avec 2 questions\",\n           \"category\": {\n               \"_id\": \"5f7f4bf1eb4a5b3d2eaa1e33\",\n               \"name\": \"Naxst JS\",\n               \"__v\": 0\n           },\n           \"difficulty\": \"Difficile\",\n           \"bonus_time\": 1,\n           \"bonus_xp\": 100,\n           \"avg_rating\": 3.3333333333333335,\n           \"is_published\": true,\n           \"created_at\": \"2020-10-09T14:07:17.769Z\",\n           \"updated_at\": \"2020-10-16T17:36:11.589Z\"\n       }\n     ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/quizz/quizz.controller.ts",
    "groupTitle": "Quizz"
  },
  {
    "type": "get",
    "url": "/quizz/published",
    "title": "Get all published quizz",
    "name": "showPublishedQuizz",
    "group": "Quizz",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Id &amp; Name of the quiz's category</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "difficulty",
            "description": "<p>Difficulty level of the quiz</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bonus_time",
            "description": "<p>Max time in minutes to get bonus XPs</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bonus_xp",
            "description": "<p>XPs amount if quiz done under bonus time</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "avg_rating",
            "description": "<p>Average rating based on user's ratings</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "is_published",
            "description": "<p>TRUE : quiz is published, FALSE : quiz is NOT published</p>"
          },
          {
            "group": "Success 200",
            "type": "Timestamp",
            "optional": false,
            "field": "created_at",
            "description": "<p>Date of the quiz's creation</p>"
          },
          {
            "group": "Success 200",
            "type": "Timestamp",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Date of the quiz's last modification</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n       {\n           \"id\": \"5f872...aa9f4\",\n           \"name\": \"My Wonderful Quiz\",\n           \"category\": {\n               \"_id\": \"5f7f4...a1e33\",\n               \"name\": \"Naxst JS\",\n           },\n           \"difficulty\": \"Moyen\",\n           \"bonus_time\": 1,\n           \"bonus_xp\": 100,\n           \"avg_rating\": 4.333333333333333,\n           \"is_published\": true,\n           \"created_at\": \"2020-10-14T16:50:43.383Z\",\n           \"updated_at\": \"2020-10-18T16:40:35.623Z\"\n       }\n     ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/quizz/quizz.controller.ts",
    "groupTitle": "Quizz"
  },
  {
    "type": "patch",
    "url": "/quizz/:id",
    "title": "Update an existing quiz",
    "name": "updateQuizz",
    "group": "Quizz",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Quiz unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Quiz name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "category",
            "description": "<p>Id of the quiz category</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"Facile\"",
              "\"Moyen\"",
              "\"Difficile\""
            ],
            "optional": true,
            "field": "difficulty",
            "description": "<p>Quiz difficulty level</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "bonus_time",
            "description": "<p>Max time in minutes to get bonus XPs</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "bonus_xp",
            "description": "<p>XPs amount if quiz done under bonus time</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "is_published",
            "defaultValue": "false",
            "description": "<p>Published status with default false</p>"
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
            "field": "message",
            "description": "<p>&quot;Quiz successfully updated&quot;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n        \"message\": \" Quiz successfully updated\"\n}",
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
            "field": "Error",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 XXX XXX\n{\n  \"XXX\": \"XXX\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/quizz/quizz.controller.ts",
    "groupTitle": "Quizz"
  },
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
