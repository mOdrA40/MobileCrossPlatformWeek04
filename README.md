# Aplikasi Manajemen Kontak

## Deskripsi Aplikasi
Aplikasi Manajemen Kontak adalah aplikasi mobile yang dikembangkan menggunakan teknologi React Native dan Expo. Aplikasi ini memungkinkan pengguna untuk mengelola daftar kontak mereka dengan berbagai fitur seperti pencarian, pemfilteran, pengurutan, dan pengelompokan kontak berdasarkan kategori.

## Teknologi yang Digunakan
- **React Native**: Framework untuk pengembangan aplikasi mobile cross-platform
- **Expo**: Platform untuk memudahkan pengembangan aplikasi React Native
- **TypeScript**: Bahasa pemrograman yang menambahkan fitur static typing pada JavaScript
- **React Native Paper**: Library untuk komponen UI dengan design Material
- **React Native Animatable**: Library untuk animasi UI
- **Expo Linear Gradient**: Library untuk membuat gradien warna
- **React Context API**: Untuk manajemen state aplikasi

## Fitur Aplikasi
1. **Tampilan Daftar Kontak**: Menampilkan daftar kontak dengan foto, nama, email, nomor telepon, dan lokasi
2. **Pencarian Kontak**: Mencari kontak berdasarkan nama atau email
3. **Pengurutan Kontak**: Mengurutkan kontak berdasarkan nama (alfabetis) atau berdasarkan waktu (terbaru)
4. **Pengelompokan Kategori**: Mengelompokkan kontak berdasarkan kategori
5. **Favorit**: Menandai kontak sebagai favorit dan menampilkan hanya kontak favorit
6. **Animasi**: Efek animasi untuk meningkatkan pengalaman pengguna

## Struktur Aplikasi
- `src/`: Direktori utama kode sumber
  - `assets/`: Berisi aset aplikasi seperti data JSON
  - `components/`: Komponen-komponen UI yang reusable
  - `context/`: Context untuk manajemen state aplikasi
  - `hooks/`: Custom hooks untuk logika aplikasi
  - `screens/`: Layar/halaman utama aplikasi
  - `types/`: Definisi tipe TypeScript
  - `utils/`: Fungsi-fungsi helper

## Cara Menggunakan Aplikasi

### Prasyarat
- Node.js (versi terbaru)
- npm atau yarn
- Expo CLI

### Tahapan Instalasi
1. Clone repositori ini ke komputer lokal
2. Buka terminal dan arahkan ke direktori aplikasi
3. Jalankan perintah untuk menginstal dependensi:
   ```
   npm install
   ```
   atau jika menggunakan yarn:
   ```
   yarn install
   ```

### Menjalankan Aplikasi
1. Jalankan perintah untuk memulai aplikasi:
   ```
   npm start
   ```
   atau
   ```
   expo start
   ```
2. Scan QR code menggunakan aplikasi Expo Go pada perangkat mobile Anda, atau jalankan di emulator

### Petunjuk Penggunaan
1. **Mencari Kontak**: Gunakan kolom pencarian di bagian atas untuk mencari kontak berdasarkan nama atau email
2. **Mengurutkan Kontak**: Tekan tombol opsi (ikon titik tiga) dan pilih pengurutan berdasarkan nama atau terbaru
3. **Mengelompokkan Kontak**: Tekan tombol opsi dan aktifkan "Kelompokkan berdasarkan Kategori"
4. **Melihat Hanya Favorit**: Tekan ikon bintang di header untuk melihat kontak favorit saja
5. **Menambah/Menghapus Favorit**: Tekan ikon bintang pada kartu kontak untuk menambahkan atau menghapus dari favorit

## Pengembangan Lanjutan
Aplikasi ini dapat dikembangkan lebih lanjut dengan menambahkan fitur-fitur berikut:
- Menambahkan kontak baru
- Mengedit kontak yang sudah ada
- Menghapus kontak
- Sinkronisasi dengan kontak telepon
- Fungsi pencadangan dan pemulihan data

## Kontribusi
Kontribusi untuk perbaikan dan pengembangan aplikasi ini sangat diterima. Silakan buat pull request atau laporkan masalah melalui issue tracker.
