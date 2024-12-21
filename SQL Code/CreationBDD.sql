SHOW con_name;
ALTER SESSION SET CONTAINER=XEPDB1;


CREATE TABLE staging_spotify_songs (
    -- Identifiers
    track_uri VARCHAR2(255) NOT NULL,
    track_name VARCHAR2(500) NOT NULL,
    isrc VARCHAR2(50) NOT NULL,
    
    -- Artist Information
    artist_uris VARCHAR2(4000) NOT NULL,
    artist_names VARCHAR2(4000) NOT NULL,
    artist_genres VARCHAR2(4000),
    
    -- Album Information
    album_uri VARCHAR2(255) NOT NULL,
    album_name VARCHAR2(500) NOT NULL,
    album_artist_uris VARCHAR2(4000) NOT NULL,
    album_artist_names VARCHAR2(4000) NOT NULL,
    album_release_date VARCHAR2(50) NOT NULL,
    album_image_url VARCHAR2(4000),
    album_genres VARCHAR2(4000),
    
    -- Track Details
    disc_number NUMBER(38) NOT NULL,
    track_number NUMBER(38) NOT NULL,
    track_duration_ms NUMBER(38) NOT NULL,
    track_preview_url VARCHAR2(4000),
    explicit VARCHAR2(50) NOT NULL,
    popularity NUMBER(38),
    
    -- Metadata
    added_by VARCHAR2(255) NOT NULL,
    added_at VARCHAR2(50) NOT NULL,
    label VARCHAR2(255),
    copyrights VARCHAR2(4000),
    
    -- Audio Features
    danceability NUMBER(15),
    energy NUMBER(15),
    key_value NUMBER(38),
    loudness NUMBER(15),
    song_mode NUMBER(1),
    speechiness NUMBER(15),
    acousticness NUMBER(15),
    instrumentalness NUMBER(15),
    liveness NUMBER(15),
    valence NUMBER(15),
    tempo NUMBER(15),
    time_signature NUMBER(38),
    
    -- Constraints
    CONSTRAINT pk_staging_spotify PRIMARY KEY (track_uri),
    CONSTRAINT uq_track_name UNIQUE (track_name, album_name)  -- Added unique constraint for track name within an album
);


-- Create ARTISTS table
CREATE TABLE artists (
    artist_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    artist_name VARCHAR2(500) NOT NULL,
    artist_popularity NUMBER(38),
    artist_genre VARCHAR2(4000)
);

-- Create ALBUMS table
CREATE TABLE albums (
    album_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    album_name VARCHAR2(500) NOT NULL,
    release_date VARCHAR2(50),
    artist_id NUMBER,
    label VARCHAR2(255),
    CONSTRAINT fk_albums_artist 
        FOREIGN KEY (artist_id) 
        REFERENCES artists(artist_id)
);

-- Create SONGS table
CREATE TABLE songs (
    song_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    song_name VARCHAR2(500) NOT NULL,
    album_id NUMBER,
    duration_ms NUMBER(38),
    popularity NUMBER(38),
    explicit VARCHAR2(50),
    track_number NUMBER(38),
    isrc VARCHAR2(50),
    CONSTRAINT fk_songs_album 
        FOREIGN KEY (album_id) 
        REFERENCES albums(album_id)
);

-- Create AUDIO_FEATURES table
CREATE TABLE audio_features (
   feature_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   song_id NUMBER,
   danceability NUMBER(15),
   energy NUMBER(15), 
   key_value NUMBER(38),
   loudness NUMBER(15),
   song_mode NUMBER(1),
   speechiness NUMBER(15),
   acousticness NUMBER(15),
   instrumentalness NUMBER(15),
   liveness NUMBER(15),
   valence NUMBER(15),
   tempo NUMBER(15),
   time_signature NUMBER(38),
   CONSTRAINT fk_features_song 
       FOREIGN KEY (song_id) 
       REFERENCES songs(song_id)
);
-- Create CHART_PERFORMANCE table
CREATE TABLE chart_performance (
    performance_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    song_id NUMBER,
    added_at VARCHAR2(50),
    added_by VARCHAR2(255),
    CONSTRAINT fk_performance_song 
        FOREIGN KEY (song_id) 
        REFERENCES songs(song_id)
);


-- If you need to delete stuff to start over:

--truncate table audio_features;
--truncate table chart_performance;
--truncate table songs;
--truncate table albums;
--truncate table artists;

--drop table audio_features;
--drop table chart_performance;
--drop table songs;
--drop table albums;
--drop table artists;






-- Modify our INSERT to handle only non-null values
INSERT INTO artists (artist_name, artist_genre)
SELECT DISTINCT 
    TRIM(REGEXP_SUBSTR(artist_names, '[^,]+', 1, 1)) as artist_name,
    artist_genres
FROM staging_spotify_songs
WHERE artist_names IS NOT NULL 
AND TRIM(REGEXP_SUBSTR(artist_names, '[^,]+', 1, 1)) IS NOT NULL;

-- Insert data into ALBUMS table
INSERT INTO albums (album_name, release_date, artist_id, label)
SELECT DISTINCT 
    s.album_name,
    s.album_release_date,
    a.artist_id,
    s.label
FROM staging_spotify_songs s
JOIN artists a ON TRIM(REGEXP_SUBSTR(s.artist_names, '[^,]+', 1, 1)) = a.artist_name;

-- Insert data into SONGS table
INSERT INTO songs (song_name, album_id, duration_ms, popularity, explicit, track_number, isrc)
SELECT DISTINCT 
    s.track_name,
    a.album_id,
    s.track_duration_ms,
    s.popularity,
    s.explicit,
    s.track_number,
    s.isrc
FROM staging_spotify_songs s
JOIN albums a ON s.album_name = a.album_name;

-- Delete duplicate songs in the songs table
DELETE FROM songs
WHERE ROWID NOT IN (
    SELECT MIN(ROWID)
    FROM songs
    GROUP BY song_name
);


-- Insert data into AUDIO_FEATURES table
INSERT INTO audio_features (
    song_id, danceability, energy, key_value, loudness, song_mode,
    speechiness, acousticness, instrumentalness, liveness, valence,
    tempo, time_signature
)
SELECT DISTINCT
    s.song_id,
    st.danceability,
    st.energy,
    st.key_value,
    st.loudness,
    st.song_mode,
    st.speechiness,
    st.acousticness,
    st.instrumentalness,
    st.liveness,
    st.valence,
    st.tempo,
    st.time_signature
FROM staging_spotify_songs st
JOIN songs s ON st.track_name = s.song_name
    AND st.album_name = (SELECT album_name FROM albums WHERE album_id = s.album_id);

-- Insert data into CHART_PERFORMANCE table
INSERT INTO chart_performance (song_id, added_at, added_by)
SELECT DISTINCT
    s.song_id,
    TO_TIMESTAMP_TZ(st.added_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
    st.added_by
FROM staging_spotify_songs st
JOIN songs s ON st.track_name = s.song_name
    AND st.album_name = (SELECT album_name FROM albums WHERE album_id = s.album_id);
