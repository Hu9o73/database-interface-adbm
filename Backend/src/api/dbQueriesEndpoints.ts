import express, {Router, Request, Response} from 'express'
import sequelize from '../ConfigFiles/dbConfig';

const router = Router()

router.get('/api/database/most-popular-per-artist', (req: Request, res: Response) => {
    sequelize
        .query(
            `
            WITH RankedSongs AS (
                SELECT 
                    art.artist_name,
                    s.song_name,
                    s.popularity,
                    af.danceability,
                    af.energy,
                    af.valence,
                    RANK() OVER (PARTITION BY art.artist_id ORDER BY s.popularity DESC) as popularity_rank
                FROM artists art
                JOIN albums alb ON art.artist_id = alb.artist_id 
                JOIN songs s ON alb.album_id = s.album_id
                JOIN audio_features af ON s.song_id = af.song_id
            )
            SELECT * FROM RankedSongs
            WHERE popularity_rank <= 3;
            `
        )
        .then(([results]: any) => {
            if (results && results.length > 0) {
                res.status(200).json({ results });
            } else {
                res.status(404).json({error: "Query didn't yield any result." });
            }
          })
          .catch((error) => {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'An error occurred.' });
          });
});

export default router;