const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

class Table {
    static async getAll() {
        const result = await pool.query('SELECT * FROM tables ORDER BY id');
        return result.rows;
    }

    static async getByType(pageType) {
        const result = await pool.query('SELECT * FROM tables WHERE page_type = $1', [pageType]);
        return result.rows;
    }

    static async updateRate(id, newRate) {
        const result = await pool.query(
            'UPDATE tables SET rate_per_minute = $1 WHERE id = $2 RETURNING *',
            [newRate, id]
        );
        return result.rows[0];
    }

    static async toggleActive(id, isActive) {
        const result = await pool.query(
            'UPDATE tables SET is_active = $1 WHERE id = $2 RETURNING *',
            [isActive, id]
        );
        return result.rows[0];
    }
}

module.exports = Table;
