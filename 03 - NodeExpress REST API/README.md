# Environment variable (local)

> create a database in mongoDB with 2 collection: **users, places**

> paste below variable to file **nodemon.js** and insert value correct with your mongoDB config

```
{
    "env": {
        "DB_USER": "your_mongo_username",
        "DB_PASSWORD": "your_mongo_password",
        "DB_NAME": "your_mongo_dbName",
        "JWT_SECRET_KEY": "your_secrete_key" 
    }
}
```
> **JWT_SECRET_KEY** can be any value