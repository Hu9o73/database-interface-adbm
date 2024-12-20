-- Stored Procedure 1: Stored procedure to update artist rankings
CREATE OR REPLACE PROCEDURE update_artist_rankings AS
BEGIN
   MERGE INTO artists a
   USING (
       SELECT 
           art.artist_id,
           AVG(calculate_song_score(s.popularity, af.energy, af.danceability)) as artist_score
       FROM artists art
       JOIN albums alb ON art.artist_id = alb.artist_id
       JOIN songs s ON alb.album_id = s.album_id
       JOIN audio_features af ON s.song_id = af.song_id
       GROUP BY art.artist_id
   ) scores
   ON (a.artist_id = scores.artist_id)
   WHEN MATCHED THEN UPDATE SET
       a.artist_popularity = scores.artist_score;
   COMMIT;
END;
/


-- Stored Procedure 2: Find similar songs
CREATE OR REPLACE PROCEDURE find_similar_songs(
   p_song_id IN NUMBER,
   p_threshold IN NUMBER DEFAULT 80
) IS
BEGIN
   FOR song_rec IN (
       SELECT 
           s.song_name,
           art.artist_name,
           calculate_song_similarity(p_song_id, s.song_id) as similarity_score
       FROM songs s
       JOIN albums alb ON s.album_id = alb.album_id
       JOIN artists art ON alb.artist_id = art.artist_id
       WHERE s.song_id != p_song_id
       AND calculate_song_similarity(p_song_id, s.song_id) >= p_threshold
       ORDER BY similarity_score DESC
   ) LOOP
       DBMS_OUTPUT.PUT_LINE(
           song_rec.song_name || ' by ' || 
           song_rec.artist_name || ' - ' || 
           song_rec.similarity_score || '% similar'
       );
   END LOOP;
END;
/


-- Stored Procedure 3: Generate playlist recommendations based on audio features
CREATE OR REPLACE PROCEDURE generate_playlist_recommendations (
   p_min_popularity IN NUMBER,
   p_energy_range IN NUMBER,
   p_danceability_range IN NUMBER,
   p_result_cursor OUT SYS_REFCURSOR
) AS
BEGIN
   OPEN p_result_cursor FOR
       WITH similar_songs AS (
           SELECT 
               s.song_id,
               s.song_name,
               art.artist_name,
               s.popularity,
               af.energy,
               af.danceability,
               calculate_song_score(s.popularity, af.energy, af.danceability) as song_score
           FROM songs s
           JOIN albums alb ON s.album_id = alb.album_id
           JOIN artists art ON alb.artist_id = art.artist_id
           JOIN audio_features af ON s.song_id = af.song_id
           WHERE s.popularity >= p_min_popularity
           AND af.energy BETWEEN (p_energy_range - 10) AND (p_energy_range + 10)
           AND af.danceability BETWEEN (p_danceability_range - 10) AND (p_danceability_range + 10)
       )
       SELECT 
           song_name,
           artist_name,
           popularity,
           energy,
           danceability,
           song_score
       FROM similar_songs
       ORDER BY song_score DESC
       FETCH FIRST 10 ROWS ONLY;
END;
/