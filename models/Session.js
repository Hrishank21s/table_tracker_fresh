const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

class Session {
    static async create(tableId, userId) {
        const result = await pool.query(
            'INSERT INTO sessions (table_id, start_time, created_by) VALUES ($1, NOW(), $2) RETURNING *',
            [tableId, userId]
        );
        return result.rows[0];
    }

    static async end(id, playerCount) {
        const result = await pool.query(
            `UPDATE sessions 
             SET end_time = NOW(),
                 player_count = $2,
                 total_amount = (
                     SELECT EXTRACT(EPOCH FROM (NOW() - start_time)) / 60 * rate_per_minute 
                     FROM tables WHERE id = table_id
                 )
             WHERE id = $1 
             RETURNING *`,
            [id, playerCount]
        );
        return result.rows[0];
    }

    static async getTableHistory(tableId) {
        const result = await pool.query(
            'SELECT * FROM sessions WHERE table_id = $1 ORDER BY start_time DESC LIMIT 10',
            [tableId]
        );
        return result.rows;
    }
}

module.exports = Session;
