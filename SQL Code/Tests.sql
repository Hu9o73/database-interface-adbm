-- Tests



-- 1. Test update_song_popularity trigger
SELECT s.song_id, s.popularity, af.energy, af.danceability, af.valence
FROM songs s JOIN audio_features af ON s.song_id = af.song_id
WHERE s.song_id = 1;

UPDATE audio_features
SET energy = energy + 10,
    danceability = danceability + 10,
    valence = valence + 10
WHERE song_id = 1;

SELECT s.song_id, s.popularity, af.energy, af.danceability, af.valence
FROM songs s JOIN audio_features af ON s.song_id = af.song_id
WHERE s.song_id = 1;


-- 2. Test log_song_changes trigger
SELECT * FROM songs WHERE song_id = 1;

UPDATE songs
SET song_name = 'Updated Song Name',
    popularity = popularity + 5
WHERE song_id = 1;

SELECT * FROM song_update_log ORDER BY log_id DESC;

-- 3. Test maintain_album_consistency trigger
-- 1. First, check what artists exist and their IDs
SELECT artist_id, artist_name FROM artists;

-- 2. Insert a test artist and get its ID
INSERT INTO artists (artist_name, artist_genre)
VALUES ('Test Artist', 'Test Genre');

-- 3. Get the ID of the artist we just created
SELECT artist_id, artist_name FROM artists 
WHERE artist_name = 'Test Artist';

-- 4. Test invalid artist_id
INSERT INTO albums (album_name, release_date, artist_id)
VALUES ('Test Album', SYSDATE, 999999);

-- 5. Test future release date (use the correct artist_id X from step 3)
INSERT INTO albums (album_name, release_date, artist_id)
VALUES ('Test Album', SYSDATE + 100, 1030);

-- 6. Test valid insert (use the correct artist_id X from step 3)
INSERT INTO albums (album_name, release_date, artist_id)
VALUES ('Valid Test Album', SYSDATE, 1030);

-- 7. Clean up
ROLLBACK;


-- Test Function
-- Enable server output to see results
SET SERVEROUTPUT ON;



-- Test calculate_song_score
SELECT calculate_song_score(75, 545, 800) as score FROM dual;


-- Test get_artist_tier
DECLARE
    v_tier VARCHAR2(20);
BEGIN
    v_tier := get_artist_tier(42);
    DBMS_OUTPUT.PUT_LINE('Artist Tier: ' || v_tier);
END;
/


SELECT 
    s.song_id,
    af.danceability,
    af.energy,
    af.valence
FROM songs s
JOIN albums alb ON s.album_id = alb.album_id
JOIN artists art ON alb.artist_id = art.artist_id
JOIN audio_features af ON s.song_id = af.song_id
LEFT JOIN chart_performance cp ON s.song_id = cp.song_id
WHERE s.song_id IN (99, 42)
ORDER BY s.song_id;

-- Test calculate_song_similarity
DECLARE
    v_similarity NUMBER;
BEGIN
    v_similarity := calculate_song_similarity(99, 42);
    DBMS_OUTPUT.PUT_LINE('Similarity Score: ' || v_similarity || '%');
END;
/


--Test Procedure

-- Test update_artist_rankings
BEGIN
    update_artist_rankings();
    COMMIT;
END;
/

-- Check results
SELECT artist_name, artist_popularity 
FROM artists 
ORDER BY artist_popularity DESC;

-- Test find_similar_songs
-- Test Case 1: Find songs similar to song_id 1 with default threshold (80%)
BEGIN
    find_similar_songs(1);
END;
/

-- Test Case 2: Find songs similar to song_id 1 with lower threshold (70%)
BEGIN
    find_similar_songs(1, 70);
END;
/

-- Test generate_playlist_recommendations

-- Test the procedure with different parameters
DECLARE
    v_result_cursor SYS_REFCURSOR;
    v_song_name VARCHAR2(500);
    v_artist_name VARCHAR2(500);
    v_popularity NUMBER;
    v_energy NUMBER;
    v_danceability NUMBER;
    v_score NUMBER;
BEGIN
    -- Test Case 1: High energy dance music
    DBMS_OUTPUT.PUT_LINE('--- High Energy Dance Music ---');
    generate_playlist_recommendations(
        p_min_popularity => 70,    -- Popular songs
        p_energy_range => 800,     -- High energy
        p_danceability_range => 700,-- Good for dancing
        p_result_cursor => v_result_cursor
    );
    
    -- Print results
    LOOP
        FETCH v_result_cursor INTO v_song_name, v_artist_name, v_popularity, 
                                 v_energy, v_danceability, v_score;
        EXIT WHEN v_result_cursor%NOTFOUND;
        
        DBMS_OUTPUT.PUT_LINE(
            'Song: ' || v_song_name || 
            ' | Artist: ' || v_artist_name || 
            ' | Popularity: ' || v_popularity ||
            ' | Energy: ' || v_energy ||
            ' | Danceability: ' || v_danceability ||
            ' | Score: ' || v_score
        );
    END LOOP;
    
    CLOSE v_result_cursor;
    
    -- Test Case 2: Chill music
    DBMS_OUTPUT.PUT_LINE(CHR(10) || '--- Chill Music ---');
    generate_playlist_recommendations(
        p_min_popularity => 50,    -- Moderately popular songs
        p_energy_range => 400,     -- Lower energy
        p_danceability_range => 500,-- Moderate danceability
        p_result_cursor => v_result_cursor
    );
    
    -- Print results
    LOOP
        FETCH v_result_cursor INTO v_song_name, v_artist_name, v_popularity, 
                                 v_energy, v_danceability, v_score;
        EXIT WHEN v_result_cursor%NOTFOUND;
        
        DBMS_OUTPUT.PUT_LINE(
            'Song: ' || v_song_name || 
            ' | Artist: ' || v_artist_name || 
            ' | Popularity: ' || v_popularity ||
            ' | Energy: ' || v_energy ||
            ' | Danceability: ' || v_danceability ||
            ' | Score: ' || v_score
        );
    END LOOP;
    
    CLOSE v_result_cursor;
END;
/

