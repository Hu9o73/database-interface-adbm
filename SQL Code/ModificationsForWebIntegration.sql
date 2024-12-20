DECLARE
    v_result_cursor SYS_REFCURSOR;
    v_song_name VARCHAR2(500);
    v_artist_name VARCHAR2(500);
    v_popularity NUMBER;
    v_energy NUMBER;
    v_danceability NUMBER;
    v_score NUMBER;
BEGIN
    -- Call the stored procedure
    generate_playlist_recommendations(
        p_min_popularity => 70,    -- Popular songs
        p_energy_range => 800,     -- High energy
        p_danceability_range => 700,-- Good for dancing
        p_result_cursor => v_result_cursor
    );

    -- Fetch and print the result set using a loop
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

DROP TABLE song_recommendation_table;
DROP TYPE song_recommendation;

CREATE OR REPLACE TYPE song_recommendation FORCE AS OBJECT (
    song_name VARCHAR2(500),
    artist_name VARCHAR2(500),
    popularity NUMBER,
    energy NUMBER,
    danceability NUMBER,
    score NUMBER
);


CREATE OR REPLACE TYPE song_recommendation_table AS TABLE OF song_recommendation;

DROP FUNCTION generate_playlist_recommendations;

CREATE OR REPLACE FUNCTION generate_playlist_recommendations_func (
    p_min_popularity IN NUMBER,
    p_energy_range IN NUMBER,
    p_danceability_range IN NUMBER
) RETURN song_recommendation_table AS
    v_result song_recommendation_table := song_recommendation_table();
BEGIN
    FOR rec IN (
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
        FETCH FIRST 10 ROWS ONLY
    ) LOOP
        v_result.extend;
        v_result(v_result.count) := song_recommendation(
            rec.song_name,
            rec.artist_name,
            rec.popularity,
            rec.energy,
            rec.danceability,
            rec.song_score
        );
    END LOOP;

    RETURN v_result;
END;
/


SELECT * 
FROM TABLE(generate_playlist_recommendations_func(70, 800, 700));
