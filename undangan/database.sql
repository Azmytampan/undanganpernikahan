CREATE DATABASE IF NOT EXISTS undangan_azmy_sela
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE undangan_azmy_sela;

CREATE TABLE IF NOT EXISTS rsvp (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    attendance ENUM('Hadir', 'Tidak Hadir') NOT NULL,
    message TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
