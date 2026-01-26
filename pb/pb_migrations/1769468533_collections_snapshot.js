/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
    const snapshot = [
        {
            "id": "7jo5p6lzwwht0s5",
            "created": "2023-11-28 13:26:13.623Z",
            "updated": "2026-01-26 22:54:14.232Z",
            "name": "courses",
            "type": "base",
            "system": false,
            "schema": [
                {
                    "system": false,
                    "id": "csvb459g",
                    "name": "title",
                    "type": "text",
                    "required": true,
                    "presentable": false,
                    "unique": false,
                    "options": {
                        "min": null,
                        "max": null,
                        "pattern": ""
                    }
                },
                {
                    "system": false,
                    "id": "x0j4d4zz",
                    "name": "description",
                    "type": "text",
                    "required": false,
                    "presentable": false,
                    "unique": false,
                    "options": {
                        "min": null,
                        "max": null,
                        "pattern": ""
                    }
                },
                {
                    "system": false,
                    "id": "gxm3bevg",
                    "name": "assignees",
                    "type": "relation",
                    "required": false,
                    "presentable": false,
                    "unique": false,
                    "options": {
                        "collectionId": "_pb_users_auth_",
                        "cascadeDelete": false,
                        "minSelect": null,
                        "maxSelect": null,
                        "displayFields": null
                    }
                },
                {
                    "system": false,
                    "id": "sthpp3h3",
                    "name": "assign_to_everyone",
                    "type": "bool",
                    "required": false,
                    "presentable": false,
                    "unique": false,
                    "options": {}
                }
            ],
            "indexes": [],
            "listRule": "@request.auth.id != \"\" && assignees.id ?= @request.auth.id && id ?= @collection.lessons.course.id",
            "viewRule": "@request.auth.id != \"\" && assignees.id ?= @request.auth.id && id ?= @collection.lessons.course.id",
            "createRule": null,
            "updateRule": null,
            "deleteRule": null,
            "options": {}
        },
        {
            "id": "b36lt0a0v5anqh3",
            "created": "2023-11-28 13:41:06.970Z",
            "updated": "2026-01-26 22:54:14.235Z",
            "name": "lessons",
            "type": "base",
            "system": false,
            "schema": [
                {
                    "system": false,
                    "id": "wdsxai2y",
                    "name": "course",
                    "type": "relation",
                    "required": false,
                    "presentable": false,
                    "unique": false,
                    "options": {
                        "collectionId": "7jo5p6lzwwht0s5",
                        "cascadeDelete": false,
                        "minSelect": null,
                        "maxSelect": 1,
                        "displayFields": null
                    }
                },
                {
                    "system": false,
                    "id": "gzmejhtp",
                    "name": "title",
                    "type": "text",
                    "required": true,
                    "presentable": false,
                    "unique": false,
                    "options": {
                        "min": null,
                        "max": null,
                        "pattern": ""
                    }
                },
                {
                    "system": false,
                    "id": "cjtumftq",
                    "name": "video",
                    "type": "file",
                    "required": false,
                    "presentable": false,
                    "unique": false,
                    "options": {
                        "mimeTypes": [
                            "video/mp4",
                            "video/x-ms-wmv",
                            "video/quicktime",
                            "video/3gpp"
                        ],
                        "thumbs": [],
                        "maxSelect": 1,
                        "maxSize": 2147483648,
                        "protected": false
                    }
                },
                {
                    "system": false,
                    "id": "bidfp7ks",
                    "name": "thumbnail",
                    "type": "file",
                    "required": false,
                    "presentable": false,
                    "unique": false,
                    "options": {
                        "mimeTypes": [
                            "image/jpeg",
                            "image/png",
                            "image/svg+xml",
                            "image/gif",
                            "image/webp"
                        ],
                        "thumbs": [],
                        "maxSelect": 1,
                        "maxSize": 20971520,
                        "protected": false
                    }
                },
                {
                    "system": false,
                    "id": "giyugoaq",
                    "name": "captions",
                    "type": "file",
                    "required": false,
                    "presentable": false,
                    "unique": false,
                    "options": {
                        "mimeTypes": [
                            "text/vtt"
                        ],
                        "thumbs": [],
                        "maxSelect": 1,
                        "maxSize": 10485760,
                        "protected": false
                    }
                },
                {
                    "system": false,
                    "id": "qtejv6lm",
                    "name": "summary",
                    "type": "text",
                    "required": false,
                    "presentable": false,
                    "unique": false,
                    "options": {
                        "min": null,
                        "max": null,
                        "pattern": ""
                    }
                },
                {
                    "system": false,
                    "id": "plloys8j",
                    "name": "downloads",
                    "type": "file",
                    "required": false,
                    "presentable": false,
                    "unique": false,
                    "options": {
                        "mimeTypes": [],
                        "thumbs": [],
                        "maxSelect": 50,
                        "maxSize": 1073741824,
                        "protected": false
                    }
                },
                {
                    "system": false,
                    "id": "7crg1sxk",
                    "name": "content",
                    "type": "editor",
                    "required": false,
                    "presentable": false,
                    "unique": false,
                    "options": {
                        "convertUrls": false
                    }
                },
                {
                    "system": false,
                    "id": "jt9rhsd6",
                    "name": "videoLocal",
                    "type": "text",
                    "required": false,
                    "presentable": false,
                    "unique": false,
                    "options": {
                        "min": null,
                        "max": null,
                        "pattern": ""
                    }
                },
                {
                    "system": false,
                    "id": "cfvrxceh",
                    "name": "videoRemoteUrl",
                    "type": "url",
                    "required": false,
                    "presentable": false,
                    "unique": false,
                    "options": {
                        "exceptDomains": [],
                        "onlyDomains": []
                    }
                }
            ],
            "indexes": [],
            "listRule": "@request.auth.id != \"\" && course.assignees.id ?= @request.auth.id",
            "viewRule": "@request.auth.id != \"\" && course.assignees.id ?= @request.auth.id",
            "createRule": null,
            "updateRule": null,
            "deleteRule": null,
            "options": {}
        },
        {
            "id": "0p3zwlmhocgdrly",
            "created": "2024-01-17 07:04:46.666Z",
            "updated": "2026-01-26 22:54:14.157Z",
            "name": "progress",
            "type": "base",
            "system": false,
            "schema": [
                {
                    "system": false,
                    "id": "xvuqs5n0",
                    "name": "assignee",
                    "type": "relation",
                    "required": true,
                    "presentable": false,
                    "unique": false,
                    "options": {
                        "collectionId": "_pb_users_auth_",
                        "cascadeDelete": true,
                        "minSelect": null,
                        "maxSelect": 1,
                        "displayFields": null
                    }
                },
                {
                    "system": false,
                    "id": "rni0h1ie",
                    "name": "status",
                    "type": "select",
                    "required": true,
                    "presentable": false,
                    "unique": false,
                    "options": {
                        "maxSelect": 1,
                        "values": [
                            "Not Started",
                            "In Progress",
                            "Completed"
                        ]
                    }
                },
                {
                    "system": false,
                    "id": "ofhioiwz",
                    "name": "course",
                    "type": "relation",
                    "required": true,
                    "presentable": false,
                    "unique": false,
                    "options": {
                        "collectionId": "7jo5p6lzwwht0s5",
                        "cascadeDelete": true,
                        "minSelect": null,
                        "maxSelect": 1,
                        "displayFields": null
                    }
                }
            ],
            "indexes": [],
            "listRule": "@request.auth.id != \"\" && assignee = @request.auth.id",
            "viewRule": "@request.auth.id != \"\" && assignee = @request.auth.id",
            "createRule": null,
            "updateRule": "@request.auth.id != \"\" && assignee = @request.auth.id && @request.data.course:isset = false && @request.data.assignee:isset = false",
            "deleteRule": null,
            "options": {}
        },
        {
            "id": "ob9j5k247n4n8t7",
            "created": "2024-01-25 16:34:23.216Z",
            "updated": "2026-01-26 22:54:14.196Z",
            "name": "resources",
            "type": "base",
            "system": false,
            "schema": [
                {
                    "system": false,
                    "id": "gsvtzcno",
                    "name": "name",
                    "type": "text",
                    "required": true,
                    "presentable": false,
                    "unique": false,
                    "options": {
                        "min": null,
                        "max": null,
                        "pattern": ""
                    }
                },
                {
                    "system": false,
                    "id": "euhjshie",
                    "name": "link",
                    "type": "url",
                    "required": true,
                    "presentable": false,
                    "unique": false,
                    "options": {
                        "exceptDomains": [],
                        "onlyDomains": []
                    }
                }
            ],
            "indexes": [],
            "listRule": "@request.auth.id != \"\"",
            "viewRule": "@request.auth.id != \"\"",
            "createRule": null,
            "updateRule": null,
            "deleteRule": null,
            "options": {}
        },
        {
            "id": "yaoytodp8g23zu3",
            "created": "2024-01-26 08:04:08.380Z",
            "updated": "2026-01-26 22:54:14.224Z",
            "name": "lesson_faqs",
            "type": "base",
            "system": false,
            "schema": [
                {
                    "system": false,
                    "id": "6nbuaxni",
                    "name": "lesson",
                    "type": "relation",
                    "required": false,
                    "presentable": false,
                    "unique": false,
                    "options": {
                        "collectionId": "b36lt0a0v5anqh3",
                        "cascadeDelete": true,
                        "minSelect": null,
                        "maxSelect": null,
                        "displayFields": null
                    }
                },
                {
                    "system": false,
                    "id": "gce0igsy",
                    "name": "question",
                    "type": "text",
                    "required": true,
                    "presentable": false,
                    "unique": false,
                    "options": {
                        "min": null,
                        "max": null,
                        "pattern": ""
                    }
                },
                {
                    "system": false,
                    "id": "eczwmw0l",
                    "name": "answer",
                    "type": "text",
                    "required": true,
                    "presentable": false,
                    "unique": false,
                    "options": {
                        "min": null,
                        "max": null,
                        "pattern": ""
                    }
                }
            ],
            "indexes": [],
            "listRule": "@request.auth.id != \"\" && lesson.course.assignees.id ?= @request.auth.id",
            "viewRule": "@request.auth.id != \"\" && lesson.course.assignees.id ?= @request.auth.id",
            "createRule": null,
            "updateRule": null,
            "deleteRule": null,
            "options": {}
        },
        {
            "id": "cflmwtgulbeuubc",
            "created": "2024-01-26 08:12:18.347Z",
            "updated": "2026-01-26 22:54:14.228Z",
            "name": "lesson_resources",
            "type": "base",
            "system": false,
            "schema": [
                {
                    "system": false,
                    "id": "wndfjyrc",
                    "name": "lesson",
                    "type": "relation",
                    "required": false,
                    "presentable": false,
                    "unique": false,
                    "options": {
                        "collectionId": "b36lt0a0v5anqh3",
                        "cascadeDelete": true,
                        "minSelect": null,
                        "maxSelect": null,
                        "displayFields": null
                    }
                },
                {
                    "system": false,
                    "id": "cqlkaxpp",
                    "name": "name",
                    "type": "text",
                    "required": true,
                    "presentable": false,
                    "unique": false,
                    "options": {
                        "min": null,
                        "max": null,
                        "pattern": ""
                    }
                },
                {
                    "system": false,
                    "id": "vqxeowol",
                    "name": "link",
                    "type": "url",
                    "required": true,
                    "presentable": false,
                    "unique": false,
                    "options": {
                        "exceptDomains": [],
                        "onlyDomains": []
                    }
                }
            ],
            "indexes": [],
            "listRule": "@request.auth.id != \"\" && lesson.course.assignees.id ?= @request.auth.id",
            "viewRule": "@request.auth.id != \"\" && lesson.course.assignees.id ?= @request.auth.id",
            "createRule": null,
            "updateRule": null,
            "deleteRule": null,
            "options": {}
        },
        {
            "id": "_pb_users_auth_",
            "created": "2026-01-26 22:54:13.925Z",
            "updated": "2026-01-26 22:54:14.070Z",
            "name": "users",
            "type": "auth",
            "system": false,
            "schema": [],
            "indexes": [],
            "listRule": "id = @request.auth.id",
            "viewRule": "id = @request.auth.id",
            "createRule": null,
            "updateRule": null,
            "deleteRule": null,
            "options": {
                "allowEmailAuth": true,
                "allowOAuth2Auth": false,
                "allowUsernameAuth": true,
                "exceptEmailDomains": null,
                "manageRule": null,
                "minPasswordLength": 8,
                "onlyEmailDomains": null,
                "onlyVerified": false,
                "requireEmail": false
            }
        }
    ];

    const collections = snapshot.map((item) => new Collection(item));

    return Dao(db).importCollections(collections, true, null);
}, (db) => {
    return null;
})
