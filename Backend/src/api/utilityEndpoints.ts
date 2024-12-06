import express, {Router, Request, Response} from 'express'
import sequelize from '../ConfigFiles/dbConfig';

const router = Router()


router.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});
  
router.get('/api/liveness', (req: Request, res: Response) =>{
    const answer = "API is alive."
    res.json(answer);
})

router.get('/api/database/current-container', (req: Request, res: Response) => {
    sequelize
        .query(
            `SELECT SYS_CONTEXT('USERENV', 'CON_NAME') AS container_name FROM DUAL;`
        )
        .then(([results]: any) => {
            if (results && results.length > 0) {
                res.status(200).json({ containerName: results[0].CONTAINER_NAME });
            } else {
                res.status(404).json({error: 'Container name not found.' });
            }
          })
          .catch((error) => {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'An error occurred while fetching the container name.' });
          });
});

export default router;