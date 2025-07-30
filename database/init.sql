-- Create Tables

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(10) NOT NULL CHECK (role IN ('admin', 'staff'))
);

CREATE TABLE tables (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    rate_per_minute DECIMAL(10,2) NOT NULL,
    is_active BOOLEAN DEFAULT false,
    page_type VARCHAR(10) NOT NULL CHECK (page_type IN ('snooker', 'pool'))
);

CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    table_id INTEGER REFERENCES tables(id),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP,
    total_amount DECIMAL(10,2),
    player_count INTEGER DEFAULT 1,
    created_by INTEGER REFERENCES users(id)
);

-- Insert default admin user
INSERT INTO users (username, password, role) 
VALUES ('admin', '$2a$10$yourhashedpassword', 'admin');

-- Insert default tables
INSERT INTO tables (name, rate_per_minute, page_type) VALUES
('Snooker Table 1', 3.00, 'snooker'),
('Snooker Table 2', 4.00, 'snooker'),
('Snooker Table 3', 4.50, 'snooker'),
('Pool Table 1', 2.00, 'pool'),
('Pool Table 2', 2.00, 'pool'),
('Pool Table 3', 2.50, 'pool');
