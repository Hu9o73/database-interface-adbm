import {Router, Request, Response} from 'express'
import sequelize from '../ConfigFiles/dbConfig';
import { QueryTypes } from 'sequelize';
import oracledb from 'oracledb';

const router = Router()

// Query 1
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

// Query 2
router.get('/api/database/artist-above-average-popularity', (req: Request, res: Response) => {
    sequelize
        .query(
            `
            SELECT 
                art.artist_name,
                COUNT(s.song_id) as total_songs,
                ROUND(AVG(s.popularity), 2) as artist_avg_popularity,
                ROUND((SELECT AVG(popularity) FROM songs), 2) as global_avg_popularity,
                ROUND(AVG(s.popularity) - (SELECT AVG(popularity) FROM songs), 2) as popularity_difference
            FROM artists art
            JOIN albums alb ON art.artist_id = alb.artist_id
            JOIN songs s ON alb.album_id = s.album_id
            GROUP BY art.artist_name
            HAVING AVG(s.popularity) > (
                SELECT AVG(popularity) FROM songs
            )
            ORDER BY artist_avg_popularity DESC;
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

// Query 3
router.get('/api/database/song-trend-over-time', (req: Request, res: Response) => {
    sequelize
        .query(
            `
            SELECT 
                alb.release_date,
                s.song_name,
                s.popularity,
                ROUND(AVG(s.popularity) OVER (
                    ORDER BY alb.release_date 
                    ROWS BETWEEN 30 PRECEDING AND 30 FOLLOWING
                ),2) as moving_avg_popularity
            FROM songs s
            JOIN albums alb ON s.album_id = alb.album_id
            ORDER BY alb.release_date;
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

// Query 4
router.get('/api/database/top-artists', (req: Request, res: Response) => {
    sequelize
        .query(
            `
            SELECT 
                art.artist_name,
                COUNT(DISTINCT s.song_id) as total_songs,
                ROUND(AVG(s.popularity), 2) as avg_popularity,
                ROUND(AVG(af.danceability), 3) as avg_danceability,
                ROUND(AVG(af.energy), 3) as avg_energy,
                ROUND(AVG(af.valence), 3) as avg_valence,
                MAX(s.popularity) as top_song_popularity,
                MIN(s.popularity) as lowest_song_popularity
            FROM artists art
            JOIN albums alb ON art.artist_id = alb.artist_id
            JOIN songs s ON alb.album_id = s.album_id
            JOIN audio_features af ON s.song_id = af.song_id
            GROUP BY art.artist_name
            HAVING COUNT(DISTINCT s.song_id) >= 5
            ORDER BY avg_popularity DESC;
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

// Query 5
router.get('/api/database/song-rank-within-category', (req: Request, res: Response) => {
    
    const category = req.query.category as string;

    // Validate the category to ensure it's one of the allowed values
    const allowedCategories = ['High', 'Medium', 'Low'];
    if (!allowedCategories.includes(category)) {
        res.status(400).json({ error: 'Invalid category. Must be High, Medium, or Low.' });
        return;
    }
    
    sequelize
        .query(
            `
            WITH popularity_categories AS (
            SELECT song_id, song_name,
                CASE 
                    WHEN popularity >= 80 THEN 'High'
                    WHEN popularity >= 50 THEN 'Medium'
                    ELSE 'Low'
                END as popularity_category
            FROM songs
            )
            SELECT 
                pc.popularity_category,
                s.song_name,
                art.artist_name,
                s.popularity,
                af.energy,
                af.danceability,
                RANK() OVER (PARTITION BY pc.popularity_category ORDER BY s.popularity DESC) as category_rank
            FROM popularity_categories pc
            JOIN songs s ON pc.song_id = s.song_id
            JOIN albums alb ON s.album_id = alb.album_id
            JOIN artists art ON alb.artist_id = art.artist_id
            JOIN audio_features af ON s.song_id = af.song_id
            WHERE pc.popularity_category = :category
            ORDER BY pc.popularity_category, category_rank;
            `,
            {
                replacements: {category}
            }
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

// Query 6
router.get('/api/database/popular-high-energy', (req: Request, res: Response) => {
    sequelize
        .query(
            `
            SELECT 
                s.song_name,
                art.artist_name,
                af.energy,
                af.danceability,
                s.popularity
            FROM songs s
            JOIN albums alb ON s.album_id = alb.album_id
            JOIN artists art ON alb.artist_id = art.artist_id
            JOIN audio_features af ON s.song_id = af.song_id
            WHERE af.energy > 600 
            AND s.popularity > 75
            ORDER BY s.popularity DESC;

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





// Procedure 3
router.get('/api/database/recommendations', (req: Request, res: Response) => {
    
    // Extract the parameters from the query string
    const minPop = parseInt(req.query.minPop as string);
    const energy = parseInt(req.query.energy as string);
    const danceability = parseInt(req.query.danceability as string);

    // Validate the parameters to ensure they are numbers
    if (isNaN(minPop) || isNaN(energy) || isNaN(danceability)) {
        res.status(400).json({ error: 'Invalid parameters. All parameters must be numbers.' });
        return;
    }

    // Execute the query with the provided parameters
    sequelize
        .query(
            `SELECT * 
            FROM TABLE(generate_playlist_recommendations_func(:param1, :param2, :param3))`,
            {
                replacements: { param1: minPop, param2: energy, param3: danceability },
                type: QueryTypes.SELECT,
            }
        )
        .then((results) => {
            if (results && results.length > 0) {
                res.status(200).json({ results });
            } else {
                res.status(404).json({ error: 'No results found.' });
            }
        })
        .catch((error) => {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'An error occurred while executing the query.' });
        });
});


export default router;