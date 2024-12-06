import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    'XEPDB1',               // PDB
    'system',               // User
    'root',                 // Password 
    {
    host:'localhost',
    dialect:'oracle',
    port:1522,
    dialectOptions:{
        connectString: '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=localhost)(PORT=1522))(CONNECT_DATA=(SERVICE_NAME=XEPDB1)))',
    },
    logging: false,         // Suppressing the authentication query from the console output
});

export default sequelize;
