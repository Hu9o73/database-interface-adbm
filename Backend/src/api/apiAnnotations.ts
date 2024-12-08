// Liveness
/**
 * @openapi
 * /api/liveness:
 *   get:
 *     summary: Check if the server is alive
 *     description: This endpoint checks if the API is alive and responsive.
 *     tags:
 *      - Utility
 *     responses:
 *       200:
 *         description: A message indicating that the API is alive.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "API is alive."
 */

// Current container
/**
 * @openapi
 * /api/database/current-container:
 *   get:
 *     summary: Get the current database container name
 *     description: Retrieves the name of the current Oracle database container (PDB or CDB) using the SYS_CONTEXT function.
 *     tags:
 *       - Database
 *     responses:
 *       200:
 *         description: Successfully retrieved the container name.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 containerName:
 *                   type: string
 *                   description: The name of the current database container.
 *                   example: PDB1
 *       404:
 *         description: Container name not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message when no container name is found.
 *                   example: Container name not found.
 *       500:
 *         description: Internal server error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message when an internal server error occurs.
 *                   example: An error occurred while fetching the container name.
 */


// Query 1
/**
 * @swagger
 * /api/database/most-popular-per-artist:
 *   get:
 *     summary: Get the top 3 most popular songs per artist
 *     description: Retrieves the top 3 most popular songs for each artist, based on the popularity ranking. Includes details like song name, popularity, and audio features (danceability, energy, and valence). Note; If the database contains less than 3 songs of a given artist, it'll return all the songs of said artist.
 *     tags:
 *       - Database
 *     responses:
 *       200:
 *         description: Successfully retrieved the top 3 most popular songs for each artist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ARTIST_NAME:
 *                         type: string
 *                         description: Name of the artist.
 *                       SONG_NAME:
 *                         type: string
 *                         description: Name of the song.
 *                       POPULARITY:
 *                         type: integer
 *                         description: Popularity score of the song.
 *                       DANCEABILITY:
 *                         type: number
 *                         format: float
 *                         description: Danceability score of the song (0-1 scale).
 *                       ENERGY:
 *                         type: number
 *                         format: float
 *                         description: Energy score of the song (0-1 scale).
 *                       VALENCE:
 *                         type: number
 *                         format: float
 *                         description: Valence score of the song (0-1 scale).
 *                       POPULARITY_RANK:
 *                         type: integer
 *                         description: Rank of the song based on popularity (1-3).
 *                   example:
 *                     [
 *                       {
 *                         "ARTIST_NAME": "Artist A",
 *                         "SONG_NAME": "Song 1",
 *                         "POPULARITY": 95,
 *                         "DANCEABILITY": 0.8,
 *                         "ENERGY": 0.7,
 *                         "VALENCE": 0.6,
 *                         "POPULARITY_RANK": 1
 *                       },
 *                       {
 *                         "ARTIST_NAME": "Artist B",
 *                         "SONG_NAME": "Song 2",
 *                         "POPULARITY": 90,
 *                         "DANCEABILITY": 0.75,
 *                         "ENERGY": 0.85,
 *                         "VALENCE": 0.55,
 *                         "POPULARITY_RANK": 2
 *                       }
 *                     ]
 *       404:
 *         description: No results found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message when no results are found.
 *                   example: "Query didn't yield any result."
 *       500:
 *         description: Internal server error occurred while fetching data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message for internal server errors.
 *                   example: "An error occurred."
 */


// Query 2
/**
 * @swagger
 * /api/database/artist-above-average-popularity:
 *   get:
 *     summary: Retrieve artists with above-average popularity.
 *     description: Fetches a list of artists whose average song popularity is higher than the global average song popularity. The response includes details about the artist, their average popularity, and the difference compared to the global average.
 *     tags:
 *       - Database
 *     responses:
 *       200:
 *         description: A list of artists with above-average popularity.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ARTIST_NAME:
 *                         type: string
 *                         description: Name of the artist.
 *                         example: "FIFTY FIFTY"
 *                       TOTAL_SONGS:
 *                         type: integer
 *                         description: Total number of songs by the artist.
 *                         example: 1
 *                       ARTIST_AVG_POPULARITY:
 *                         type: number
 *                         format: float
 *                         description: The average popularity of the artist's songs.
 *                         example: 97
 *                       GLOBAL_AVG_POPULARITY:
 *                         type: number
 *                         format: float
 *                         description: The global average song popularity across all songs.
 *                         example: 38.06
 *                       POPULARITY_DIFFERENCE:
 *                         type: number
 *                         format: float
 *                         description: The difference between the artist's average popularity and the global average.
 *                         example: 58.94
 *       404:
 *         description: No artists found with above-average popularity.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Query didn't yield any result."
 *       500:
 *         description: An error occurred while processing the query.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "An error occurred."
 */


// Query 3
/**
 * @swagger
 * /api/database/song-trend-over-time:
 *   get:
 *     summary: Retrieve song trends over time.
 *     description: Fetches a list of songs with their release date, popularity, and a moving average of popularity over a time window of 30 preceding and 30 following entries. The results are ordered by the release date.
 *     tags:
 *       - Songs
 *     responses:
 *       200:
 *         description: A list of songs with their release date, popularity, and moving average popularity.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       RELEASE_DATE:
 *                         type: string
 *                         format: date
 *                         description: The release date of the song.
 *                         example: "1956-03-23"
 *                       SONG_NAME:
 *                         type: string
 *                         description: Name of the song.
 *                         example: "Blue Suede Shoes"
 *                       POPULARITY:
 *                         type: integer
 *                         description: Popularity of the song.
 *                         example: 68
 *                       MOVING_AVG_POPULARITY:
 *                         type: number
 *                         format: float
 *                         description: The moving average popularity of the song within the defined time window.
 *                         example: 40.5806451612903
 *       404:
 *         description: No results found for the query.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Query didn't yield any result."
 *       500:
 *         description: An error occurred while processing the query.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "An error occurred."
 */


// Query 4
/**
 * @swagger
 * /api/database/top-artists:
 *   get:
 *     summary: Retrieve top artists and statistics.
 *     description: |
 *       This endpoint retrieves statistical information for artists who have at least 5 songs in the database.
 *       It includes:
 *       - Total number of songs.
 *       - Average popularity (rounded to 2 decimals).
 *       - Average danceability, energy, and valence (rounded to 3 decimals).
 *       - Popularity of the most and least popular songs.
 *     tags:
 *       - Database
 *     responses:
 *       200:
 *         description: Successfully retrieved artist song trends.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ARTIST_NAME:
 *                         type: string
 *                         description: Name of the artist.
 *                         example: "Dua Lipa"
 *                       TOTAL_SONGS:
 *                         type: integer
 *                         description: Total number of songs by the artist.
 *                         example: 5
 *                       AVG_POPULARITY:
 *                         type: number
 *                         format: float
 *                         description: Average popularity of the artist's songs (rounded to 2 decimals).
 *                         example: 74.2
 *                       AVG_DANCEABILITY:
 *                         type: number
 *                         format: float
 *                         description: Average danceability of the artist's songs (rounded to 3 decimals).
 *                         example: 0.690
 *                       AVG_ENERGY:
 *                         type: number
 *                         format: float
 *                         description: Average energy of the artist's songs (rounded to 3 decimals).
 *                         example: 0.686
 *                       AVG_VALENCE:
 *                         type: number
 *                         format: float
 *                         description: Average valence of the artist's songs (rounded to 3 decimals).
 *                         example: 0.496
 *                       TOP_SONG_POPULARITY:
 *                         type: integer
 *                         description: Popularity of the artist's most popular song.
 *                         example: 84
 *                       LOWEST_SONG_POPULARITY:
 *                         type: integer
 *                         description: Popularity of the artist's least popular song.
 *                         example: 65
 *       404:
 *         description: No results found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating no results were found.
 *                   example: "Query didn't yield any result."
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message for a server-side issue.
 *                   example: "An error occurred."
 */


// Query 5
/**
 * @swagger
 * /api/database/song-rank-within-category:
 *   get:
 *     summary: Retrieve song rankings within popularity categories.
 *     description: |
 *       This endpoint retrieves songs classified into popularity categories (`High`, `Medium`, `Low`) based on their popularity scores.
 *       It includes:
 *       - Song name, artist name, popularity score, energy, and danceability.
 *       - Ranking of songs within their respective categories, ordered by popularity.
 *       - Results are filtered for the `Low` popularity category.
 *     tags:
 *       - Database
 *     responses:
 *       200:
 *         description: Successfully retrieved song rankings within categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       POPULARITY_CATEGORY:
 *                         type: string
 *                         description: The popularity category of the song (`High`, `Medium`, `Low`).
 *                         example: "Low"
 *                       SONG_NAME:
 *                         type: string
 *                         description: Name of the song.
 *                         example: "Waiting Game"
 *                       ARTIST_NAME:
 *                         type: string
 *                         description: Name of the artist.
 *                         example: "Parson James"
 *                       POPULARITY:
 *                         type: integer
 *                         description: Popularity score of the song.
 *                         example: 49
 *                       ENERGY:
 *                         type: integer
 *                         description: Energy level of the song.
 *                         example: 307
 *                       DANCEABILITY:
 *                         type: integer
 *                         description: Danceability level of the song.
 *                         example: 393
 *                       CATEGORY_RANK:
 *                         type: integer
 *                         description: Rank of the song within its popularity category.
 *                         example: 1
 *       404:
 *         description: No results found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating no results were found.
 *                   example: "Query didn't yield any result."
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message for a server-side issue.
 *                   example: "An error occurred."
 */


// Query 6
/**
 * @swagger
 * /api/database/popular-high-energy:
 *   get:
 *     summary: Retrieve highly popular and energetic songs.
 *     description: |
 *       This endpoint retrieves songs with an energy level above 600 and a popularity score above 75.
 *       The results are sorted by popularity in descending order and include song name, artist name, energy, danceability, and popularity.
 *     tags:
 *       - Database
 *     responses:
 *       200:
 *         description: Successfully retrieved popular and energetic songs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       SONG_NAME:
 *                         type: string
 *                         description: The name of the song.
 *                         example: "Flowers"
 *                       ARTIST_NAME:
 *                         type: string
 *                         description: The name of the artist.
 *                         example: "Miley Cyrus"
 *                       ENERGY:
 *                         type: integer
 *                         description: The energy level of the song.
 *                         example: 681
 *                       DANCEABILITY:
 *                         type: integer
 *                         description: The danceability level of the song.
 *                         example: 707
 *                       POPULARITY:
 *                         type: integer
 *                         description: The popularity score of the song.
 *                         example: 96
 *       404:
 *         description: No results found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating no results were found.
 *                   example: "Query didn't yield any result."
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message for a server-side issue.
 *                   example: "An error occurred."
 */





