# Spotify's worst copy

Front/Back-end small project to make the interactions with an oracle database easier.

## How to make this work ?

- Copy the repository on your computer.

### Database

- Make sure you have Oracle and a working PBD on your computer.
- Open the `SQL Code/CreationBDD` file.
- Create the table called `staging_spotify_songs`.
    - This table will let us convert the .csv file into a huge table, later split into the tables we'll use 
    - Right click on the table, then `import data`, import the file `Dataset.csv`
    - Next until you're asked to match the csv columns name to the table's names.
- Go on with the dataset creation (using the corresponding SQL file)
    - Other tables will be created using the data in `staging_spotify_songs`
- Then create the functions, procedures, triggers, etc...
- You can either explore the dataset purely using SQL commands, or run the code inside of `SQL Code/ModificationsForWebIntegration.sql` to adapt some procedures to match sequelize's requisits.
- After running the code, you can go on with the interface creation (it's way easier !)

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
Part of a database management course. Feel free to contact me if you have questions about running this project. (It might be my hardest repo to install)
