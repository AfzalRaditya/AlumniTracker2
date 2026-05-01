# Alumni Tracker

Alumni Tracker adalah sebuah aplikasi web yang dirancang untuk memetakan dan mengelola data alumni kampus Universitas Muhammadiyah Malang (UMM). Aplikasi ini memudahkan pencarian alumni berdasarkan status verifikasi, tahun masuk, nama, dan detail lainnya.

## Fitur Utama

- **Autentikasi (Login)**: Keamanan akses menggunakan sistem login.
- **Dashboard Data Alumni**: Menampilkan statistik dan daftar keseluruhan data alumni.
- **Pencarian & Filter**: Mencari data berdasarkan Nama, NIM, Program Studi, Status, atau Tahun.
- **Pengurutan (Sorting)**: Mengurutkan data berdasarkan tahun masuk untuk mempermudah analisis.
- **Data Detail Alumni**: Melihat riwayat lengkap dan detail dari masing-masing alumni.
- **Kategori Validasi**: Memisahkan alumni yang datanya sudah tervalidasi dan yang belum (Tidak Valid).

## Teknologi yang Digunakan

- **Frontend**: React.js dengan Vite
- **Styling**: CSS / Vanilla CSS dengan pendekatan desain modern
- **Icons**: Lucide React
- **Backend / Database**: JSON Files / Supabase (terintegrasi)

## Instalasi dan Menjalankan Proyek Secara Lokal

1. Pastikan Anda sudah menginstal Node.js di komputer Anda.
2. Lakukan *clone* repositori ini:
   ```bash
   git clone https://github.com/AfzalRaditya/AlumniTracker2.git
   ```
3. Masuk ke dalam direktori proyek:
   ```bash
   cd AlumniTracker2
   ```
4. Instal semua *dependencies*:
   ```bash
   npm install
   ```
5. Jalankan *development server*:
   ```bash
   npm run dev
   ```
6. Buka aplikasi di browser (biasanya di `http://localhost:5173/`).

---

## Tabel Pengujian Sistem (Test Scenarios)

Berikut adalah hasil pengujian fungsionalitas sistem. Semua fungsi telah diuji dan berjalan dengan baik sesuai spesifikasi kebutuhan perangkat lunak (Rekayasa Kebutuhan).

| ID Test | Skenario Pengujian | Hasil yang Diharapkan | Status |
| :--- | :--- | :--- | :--- |
| **TC-001** | Mengakses halaman Login dengan kredensial yang valid. | Sistem mengizinkan akses dan mengarahkan pengguna ke halaman Dashboard. | ✅ Berhasil |
| **TC-002** | Mengakses halaman Login dengan kredensial yang salah. | Sistem menampilkan pesan error dan tetap di halaman Login. | ✅ Berhasil |
| **TC-003** | Menampilkan daftar data alumni di Dashboard. | Tabel data memuat secara acak berdasarkan keragaman tahun (jika tidak diurutkan). | ✅ Berhasil |
| **TC-004** | Melakukan pencarian menggunakan keyword (Nama, NIM). | Tabel hanya menampilkan baris yang relevan dengan keyword. | ✅ Berhasil |
| **TC-005** | Menggunakan fitur urutkan data (Sorting). | Data di tabel otomatis terurut berdasarkan Tahun Masuk (Tertua/Termuda). | ✅ Berhasil |
| **TC-006** | Mengganti tab dari "Terverifikasi" ke "Tidak Valid". | Tabel memperbarui data sesuai dengan dataset yang dipilih. | ✅ Berhasil |
| **TC-007** | Mengklik tombol "Detail" pada salah satu baris alumni. | Sistem mengarahkan ke halaman Detail Alumni lengkap dari alumni tersebut. | ✅ Berhasil |
| **TC-008** | Mengklik tombol "Kembali" dari halaman Detail. | Sistem kembali ke halaman Dashboard tanpa kehilangan sesi. | ✅ Berhasil |
| **TC-009** | Mengklik tombol "Keluar" (Logout). | Sesi berakhir dan sistem mengarahkan kembali ke halaman Login. | ✅ Berhasil |

---

*Dikembangkan untuk pemenuhan tugas Mata Kuliah Rekayasa Kebutuhan.*
