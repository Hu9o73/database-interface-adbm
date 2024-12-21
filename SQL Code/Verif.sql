SELECT 'Songs' as table_name, COUNT(*) as count FROM songs
UNION ALL
SELECT 'Audio Features', COUNT(*) FROM audio_features
UNION ALL
SELECT 'Chart Performance', COUNT(*) FROM chart_performance
UNION ALL
SELECT'Staging_Spotify_songs', COUNT(*) FROM staging_spotify_songs;




SELECT DISTINCT
    s.song_name,
    s.song_id,
    a.artist_name
FROM artists a
JOIN albums al on a.artist_id=al.artist_id
JOIN songs s on s.album_id=al.album_id
WHERE UPPER(a.artist_name) LIKE UPPER('%Nathaniel%');