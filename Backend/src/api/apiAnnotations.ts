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
 *                       artist_name:
 *                         type: string
 *                         description: Name of the artist.
 *                       song_name:
 *                         type: string
 *                         description: Name of the song.
 *                       popularity:
 *                         type: integer
 *                         description: Popularity score of the song.
 *                       danceability:
 *                         type: number
 *                         format: float
 *                         description: Danceability score of the song (0-1 scale).
 *                       energy:
 *                         type: number
 *                         format: float
 *                         description: Energy score of the song (0-1 scale).
 *                       valence:
 *                         type: number
 *                         format: float
 *                         description: Valence score of the song (0-1 scale).
 *                       popularity_rank:
 *                         type: integer
 *                         description: Rank of the song based on popularity (1-3).
 *                   example:
 *                     [
 *                       {
 *                         "artist_name": "Artist A",
 *                         "song_name": "Song 1",
 *                         "popularity": 95,
 *                         "danceability": 0.8,
 *                         "energy": 0.7,
 *                         "valence": 0.6,
 *                         "popularity_rank": 1
 *                       },
 *                       {
 *                         "artist_name": "Artist B",
 *                         "song_name": "Song 2",
 *                         "popularity": 90,
 *                         "danceability": 0.75,
 *                         "energy": 0.85,
 *                         "valence": 0.55,
 *                         "popularity_rank": 2
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