-- Queries

-- 1. Complex query with joins and analytics: Most popular songs per artist with audio features
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

-- 2. Nested query: Artists with above average song popularity
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

-- 3. Window functions: Song popularity trends over time
SELECT 
   alb.release_date,
   s.song_name,
   s.popularity,
   AVG(s.popularity) OVER (
       ORDER BY alb.release_date 
       ROWS BETWEEN 30 PRECEDING AND 30 FOLLOWING
   ) as moving_avg_popularity
FROM songs s
JOIN albums alb ON s.album_id = alb.album_id
ORDER BY alb.release_date;

-- 4. Complex aggregation: Top artists by average song popularity and audio characteristics
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

-- 5. Subquery with analytics: Songs ranking within their popularity category
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
WHERE pc.popularity_category = 'Low'
ORDER BY pc.popularity_category, category_rank;

-- 6. Complex join with multiple conditions: High energy popular songs
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
