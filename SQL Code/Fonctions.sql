-- Stored Function 1: Calculate song score
CREATE OR REPLACE FUNCTION calculate_song_score(
   p_popularity IN NUMBER,
   p_energy IN NUMBER,
   p_danceability IN NUMBER
) RETURN NUMBER IS
   v_score NUMBER;
BEGIN
   v_score := (p_popularity * 0.5) + (p_energy * 0.025) + (p_danceability * 0.025);
   RETURN ROUND(v_score, 2);
END;
/


-- Stored Function 2: Get artist popularity tier
CREATE OR REPLACE FUNCTION get_artist_tier(
   p_artist_id IN NUMBER
) RETURN VARCHAR2 IS
   v_avg_popularity NUMBER;
BEGIN
   SELECT AVG(s.popularity)
   INTO v_avg_popularity
   FROM artists art
   JOIN albums alb ON art.artist_id = alb.artist_id
   JOIN songs s ON alb.album_id = s.album_id
   WHERE art.artist_id = p_artist_id;
   
   RETURN CASE
       WHEN v_avg_popularity >= 75 THEN 'Platinum'
       WHEN v_avg_popularity >= 60 THEN 'Gold'
       WHEN v_avg_popularity >= 45 THEN 'Silver'
       ELSE 'Bronze'
   END;
END;
/


-- Stored Function 3: Calculate audio feature similarity
CREATE OR REPLACE FUNCTION calculate_song_similarity(
   p_song_id1 IN NUMBER,
   p_song_id2 IN NUMBER
) RETURN NUMBER IS
   v_similarity NUMBER;
   v_features1 audio_features%ROWTYPE;
   v_features2 audio_features%ROWTYPE;
BEGIN
   SELECT * INTO v_features1 FROM audio_features WHERE song_id = p_song_id1;
   SELECT * INTO v_features2 FROM audio_features WHERE song_id = p_song_id2;
   
   v_similarity := 1000 - (
       ABS(v_features1.danceability - v_features2.danceability) +
       ABS(v_features1.energy - v_features2.energy) +
       ABS(v_features1.valence - v_features2.valence)
   ) / 3;
   
   RETURN ROUND(v_similarity/10 , 2);
END;
/