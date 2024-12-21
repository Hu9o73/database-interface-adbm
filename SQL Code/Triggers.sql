-- 1. Trigger for updating song popularity when audio features change
CREATE OR REPLACE TRIGGER update_song_popularity
AFTER UPDATE OF energy, danceability, valence ON audio_features
FOR EACH ROW
BEGIN
   UPDATE songs
   SET popularity = popularity + CASE
       WHEN :NEW.energy > :OLD.energy THEN 2
       WHEN :NEW.danceability > :OLD.danceability THEN 2
       WHEN :NEW.valence > :OLD.valence THEN 1
       ELSE -1
   END
   WHERE song_id = :NEW.song_id;
END;
/



-- Trigger 2: Log song updates
CREATE TABLE song_update_log (
   log_id NUMBER GENERATED ALWAYS AS IDENTITY,
   song_id NUMBER,
   old_name VARCHAR2(500),
   new_name VARCHAR2(500),
   old_popularity NUMBER,
   new_popularity NUMBER,
   update_date TIMESTAMP
);

CREATE OR REPLACE TRIGGER log_song_changes
AFTER UPDATE ON songs
FOR EACH ROW
BEGIN
   INSERT INTO song_update_log (
       song_id, old_name, new_name, 
       old_popularity, new_popularity, update_date
   )
   VALUES (
       :OLD.song_id, :OLD.song_name, :NEW.song_name,
       :OLD.popularity, :NEW.popularity, SYSTIMESTAMP
   );
END;
/


-- Trigger 3: Ensure album consistency
CREATE OR REPLACE TRIGGER maintain_album_consistency
BEFORE INSERT OR UPDATE ON albums
FOR EACH ROW
DECLARE
   v_artist_exists NUMBER;
BEGIN
   SELECT COUNT(*) INTO v_artist_exists
   FROM artists WHERE artist_id = :NEW.artist_id;
   
   IF v_artist_exists = 0 THEN
       RAISE_APPLICATION_ERROR(-20001, 'Referenced artist does not exist');
   END IF;
   
   IF :NEW.release_date > SYSDATE THEN
       RAISE_APPLICATION_ERROR(-20002, 'Release date cannot be in the future');
   END IF;
END;
/
