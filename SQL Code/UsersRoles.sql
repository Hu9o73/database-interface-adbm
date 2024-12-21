-- Create roles for different user types
CREATE ROLE spotify_admin;
CREATE ROLE spotify_manager;
CREATE ROLE spotify_analyst;
CREATE ROLE spotify_viewer;

-- Admin Role (Full access)
GRANT ALL PRIVILEGES ON artists TO spotify_admin;
GRANT ALL PRIVILEGES ON albums TO spotify_admin;
GRANT ALL PRIVILEGES ON songs TO spotify_admin;
GRANT ALL PRIVILEGES ON audio_features TO spotify_admin;
GRANT ALL PRIVILEGES ON chart_performance TO spotify_admin;

-- Manager Role (Can insert, update, delete, but not drop tables)
GRANT INSERT, UPDATE, DELETE, SELECT ON artists TO spotify_manager;
GRANT INSERT, UPDATE, DELETE, SELECT ON albums TO spotify_manager;
GRANT INSERT, UPDATE, DELETE, SELECT ON songs TO spotify_manager;
GRANT INSERT, UPDATE, DELETE, SELECT ON audio_features TO spotify_manager;
GRANT INSERT, UPDATE, DELETE, SELECT ON chart_performance TO spotify_manager;

-- Analyst Role (Can insert and update specific tables, read all)
GRANT INSERT, UPDATE, SELECT ON chart_performance TO spotify_analyst;
GRANT INSERT, UPDATE, SELECT ON audio_features TO spotify_analyst;
GRANT SELECT ON artists TO spotify_analyst;
GRANT SELECT ON albums TO spotify_analyst;
GRANT SELECT ON songs TO spotify_analyst;

-- Viewer Role (Read-only access)
GRANT SELECT ON artists TO spotify_viewer;
GRANT SELECT ON albums TO spotify_viewer;
GRANT SELECT ON songs TO spotify_viewer;
GRANT SELECT ON audio_features TO spotify_viewer;
GRANT SELECT ON chart_performance TO spotify_viewer;

--drop ROLE spotify_manager;
--drop ROLE spotify_analyst;
--drop ROLE spotify_viewer;
--drop role spotify_admin;

--drop user admin_user;
--drop user manager_user;
--drop user analyst_user;
--drop user regular_user;

--Create example users
CREATE USER admin_user IDENTIFIED BY "AdminPass123";
CREATE USER manager_user IDENTIFIED BY "MgrPass123";
CREATE USER analyst_user IDENTIFIED BY "AnalystPass123";
CREATE USER regular_user IDENTIFIED BY "UserPass123";

--Grant roles to users
GRANT spotify_admin TO admin_user;
GRANT spotify_manager TO manager_user;
GRANT spotify_analyst TO analyst_user;
GRANT spotify_viewer TO regular_user;

--Grant connection privileges
GRANT CREATE SESSION, CONNECT TO admin_user, manager_user, analyst_user, regular_user;