CARA MENJALANKAN WEBSITE UNDANGAN AZMY & SELA

1. Install XAMPP.
2. Jalankan Apache dan MySQL.
3. Salin folder ini ke:
   C:\xampp\htdocs\undangan
4. Buka http://localhost/phpmyadmin
5. Klik Import dan pilih database.sql.
6. Pastikan database undangan_azmy_sela dan tabel rsvp sudah dibuat.
7. Buka website:
   http://localhost/undangan/
8. Isi form RSVP untuk menguji penyimpanan data.
9. Lihat data RSVP di phpMyAdmin > undangan_azmy_sela > rsvp.

PENGATURAN MYSQL DEFAULT XAMPP:
Host: localhost
Database: undangan_azmy_sela
Username: root
Password: kosong

Jika MySQL XAMPP kamu menggunakan password root, ubah $pass di koneksi.php.
