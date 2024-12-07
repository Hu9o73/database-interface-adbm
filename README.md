# Spotify's worst copy

Front/Back-end small project to make the interactions with an oracle database easier.

## How to make this work ?

- Copy the repository on your computer.

### Database

- Informations coming soon...

### Backend

- Make sure you have a working Oracle pluggable database on your PC.
    - For more info, check : [Oracle - SQL Developer](https://www.oracle.com/database/sqldeveloper/)
    - In `src/ConfigFiles/dbConfig.ts` update the `PBD`, `User`, `password`, `port` and `connectString` according to your Oracle setup.
- Open up a Terminal (Windows Powershell)
- After navigating inside of the Backend file:
    - Type `npm install` to download all the dependecies.
    - Type `npm start` to start the server on port 3000.
- If successful, the terminal should output that the server is running on port 3000 and that the connection has been established to the DB.
- You can now access `localhost:3000/api-docs` to check the backend's api documentation.
- `localhost:3000/api/liveness` will return OK if the server is running.

### Frontend

- In another Terminal window, navigate to the Frontend File:
    - Type `npm install` to download all the dependencies.
    - Type `npm start`to start the app on port 4200
- If successful, you can access `localhost:4200` to use the app as a website.


## Note:
App made to get hands-on experience with Angular, NodeJs, HTML, Typescript, Bootstrap and Oracle database interactions.
