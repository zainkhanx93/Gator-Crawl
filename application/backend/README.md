# API Docs
- Structure files by specified components i.e. Users component, Product component, etc
- Follow naming convention `component.function.js` for files
  - ex: `user.model.js`, `user.controller.js`
- Routes should only contain **plural** nouns, not verbs 
    ```javascript
    // Good
    GET method localhost:8080/api/users/3

    // Bad
    GET method localhost:8080/addNewUser
    ```
- Routes should start off with service type. Ex: `/auth/login` or `/api/user/3` Services include
  - Auth
  - API

# Databse Config
1. Run `npm install` to install dependencies.
2. Make a file named `db.config.js` inside of `backend/config`
3. Follow the format to create settings for the database
```javascript
module.exports = {
  HOST: "localhost",
  USER: {{Specified user of mysql server. Usually "root"}},
  PASSWORD: {{Your Pass for user}},
  DB: {{Name of DB}},
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
```

