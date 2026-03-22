---
title: "Sistem Manajemen Payroll Terintegrasi dengan Google Apps Script"
summary: "Aplikasi web berbasis Google Apps Script untuk manajemen payroll yang terintegrasi dengan Google Sheets, fitur dashboard interaktif, CRUD data karyawan, log payroll otomatis, export PDF ke Google Drive, dan pengiriman email otomatis."
date: "2026-03-01"
draft: false
tags:
  - Web Development
demoUrl: "private"
repoUrl: ""
demoType: "website"
resultImage: "/images/projects/payroll/dashboard-preview.png"
videoUrl: "https://www.tiktok.com/@alca.digihelp/photo/7609709162850831623"
tools:
  - Google Apps Script
  - Google Sheets API
  - HTML/CSS/JavaScript
  - Chart.js
  - Google Drive API
  - Gmail API
processSteps:
  - "Perancangan struktur data pada Google Sheets (database karyawan, log payroll, template slip)"
  - "Pengembangan antarmuka web dengan HTML/CSS dan Google Apps Script sebagai backend"
  - "Implementasi dashboard interaktif menggunakan Chart.js untuk visualisasi data payroll"
  - "Pembuatan fitur CRUD (Create, Read, Update, Delete) data karyawan"
  - "Pengembangan sistem validasi input dan perhitungan payroll otomatis"
  - "Implementasi log payroll yang merekam setiap transaksi ke sheet terpisah"
  - "Pengembangan fitur export PDF dan upload otomatis ke Google Drive"
  - "Implementasi pengiriman email otomatis dengan template slip gaji"
  - "Testing dan debugging keseluruhan sistem"
features:
  - "Dashboard interaktif dengan grafik payroll bulanan, distribusi gaji, dan ringkasan data"
  - "CRUD lengkap untuk data karyawan (nama, jabatan, gaji pokok, tunjangan)"
  - "Form input payroll dengan validasi otomatis"
  - "Log payroll otomatis (timestamp, user, aksi, detail perubahan)"
  - "Generate slip gaji dalam format PDF"
  - "Upload otomatis PDF ke folder Google Drive terstruktur"
  - "Pengiriman email otomatis ke karyawan dengan lampiran slip gaji"
  - "Perhitungan otomatis potongan dan tunjangan berdasarkan aturan yang ditentukan"
  - "Rekap payroll bulanan dalam format sheet terpisah"
  - "Sistem autentikasi sederhana untuk akses aplikasi"
---

## Latar Belakang

Proyek ini dikembangkan untuk membantu perusahaan kecil dan menengah dalam mengelola proses payroll yang selama ini dilakukan secara manual menggunakan spreadsheet. Dengan memanfaatkan Google Apps Script, aplikasi web ini mengotomatisasi seluruh alur payroll mulai dari input data, perhitungan, hingga distribusi slip gaji melalui email.

## Arsitektur Sistem

Sistem ini dibangun sepenuhnya menggunakan ekosistem Google Workspace:

- **Google Sheets**: Database utama untuk menyimpan data karyawan, log payroll, dan template
- **Google Apps Script**: Backend untuk logika bisnis dan API endpoint
- **HTML/CSS/JS**: Frontend untuk antarmuka web aplikasi
- **Google Drive**: Penyimpanan arsip slip gaji dalam format PDF
- **Gmail API**: Pengiriman email otomatis dengan lampiran slip gaji

## Fitur Utama

### 1. Dashboard Interaktif

Dashboard menampilkan visualisasi data payroll dalam bentuk grafik:

- Grafik batang total gaji per bulan
- Diagram lingkar distribusi gaji per departemen
- Ringkasan jumlah karyawan, total gaji bulanan, dan rata-rata gaji
- Filter berdasarkan periode dan departemen

### 2. Manajemen Data Karyawan (CRUD)

Fitur untuk mengelola data master karyawan:

- **Create**: Menambah karyawan baru dengan data lengkap (NIK, nama, jabatan, gaji pokok, tunjangan)
- **Read**: Menampilkan daftar karyawan dengan fitur search dan filter
- **Update**: Mengedit data karyawan dengan validasi dan pencatatan log
- **Delete**: Menghapus data karyawan dengan konfirmasi dan log perubahan

### 3. Input Payroll dengan Validasi

Proses input payroll setiap periode:

- Validasi NIK karyawan (harus terdaftar)
- Validasi periode (tidak boleh duplikat per karyawan)
- Validasi jumlah hari kerja dan potongan
- Perhitungan otomatis:
  - Gaji prorata berdasarkan kehadiran
  - Potongan ketidakhadiran dan pinjaman
  - Tunjangan tetap dan tidak tetap
  - PPh 21 sederhana

### 4. Log Payroll Otomatis

Setiap transaksi payroll dicatat secara otomatis ke sheet terpisah dengan informasi:

- Timestamp
- User yang melakukan
- Jenis aksi (insert, update, delete)
- Detail perubahan (before dan after)
- ID karyawan dan periode

### 5. Generate dan Export PDF

Fitur pembuatan slip gaji otomatis:

- Format slip gaji yang rapi dan profesional
- Detail perhitungan lengkap (gaji pokok, tunjangan, potongan, total)
- Tanda tangan digital dan QR code verifikasi
- Nama file: `[NIK]_[Nama]_[Periode].pdf`
- Upload otomatis ke folder Google Drive dengan struktur tahun/bulan

### 6. Automasi Pengiriman Email

Setelah PDF berhasil di-generate:

- Email dikirim ke alamat karyawan
- Subject: "Slip Gaji [Periode] - [Nama Karyawan]"
- Body email personalisasi dengan salam dan informasi singkat
- Lampiran file PDF slip gaji
- CC ke HRD dan arsip
- Log pengiriman email tercatat di sheet terpisah

## Alur Kerja Sistem

```
Admin login ke aplikasi web
                ↓
Dashboard menampilkan ringkasan data payroll terkini
                ↓
Admin input payroll untuk periode berjalan:

Pilih karyawan dari dropdown

Input jumlah hari kerja

Input potongan (jika ada)
                ↓
Sistem melakukan validasi dan perhitungan otomatis
                ↓
Admin konfirmasi data
                ↓
Sistem menyimpan data ke sheet master payroll
                ↓
Sistem mencatat log payroll
                ↓
Sistem generate PDF slip gaji
                ↓
Sistem upload PDF ke Google Drive
                ↓
Sistem kirim email ke karyawan dengan lampiran PDF
                ↓
Notifikasi sukses ditampilkan ke admin
```

## Manfaat Implementasi

### Sebelum Menggunakan Sistem

- Proses payroll manual dengan Excel (3-4 hari kerja)
- Resiko kesalahan perhitungan tinggi
- Tidak ada arsip terstruktur
- Pengiriman slip gaji manual (print dan distribusi)
- Sulit tracking histori perubahan

### Setelah Menggunakan Sistem

- Proses payroll hanya 30 menit
- Akurasi perhitungan 100% dengan validasi
- Arsip slip gaji otomatis di Google Drive
- Pengiriman email otomatis dan cepat
- Log perubahan lengkap untuk audit

## Challenges and Solutions

### Challenge 1: Keterbatasan Eksekusi Google Apps Script

**Problem**: Google Apps Script memiliki batas waktu eksekusi 6 menit dan quota harian. Untuk data payroll ratusan karyawan, proses batch bisa melebihi batas.

**Solution**:

- Implementasi processing batch dengan chunk (10-15 karyawan per eksekusi)
- Menggunakan triggers waktu untuk memproses antrian
- Menyimpan status proses di sheet untuk resume jika gagal

### Challenge 2: Validasi Data Real-time

**Problem**: Validasi input payroll memerlukan pengecekan ke sheet master yang bisa lambat jika data besar.

**Solution**:

- Caching data karyawan menggunakan Cache Service
- Implementasi validasi client-side dengan JavaScript
- Pengecekan duplikat periodik menggunakan query yang dioptimasi

### Challenge 3: Format PDF yang Konsisten

**Problem**: Generate PDF dengan format yang rapi dan konsisten sulit dilakukan karena keterbatasan HTML/CSS di Google Apps Script.

**Solution**:

- Menggunakan template HTML dengan CSS inline
- Implementasi media print CSS untuk format cetak
- Testing ekstensif untuk berbagai ukuran layar
- Fallback format untuk perangkat mobile

### Challenge 4: Keamanan Akses

**Problem**: Aplikasi web perlu diakses oleh HRD dan admin dengan tingkat akses berbeda.

**Solution**:

- Implementasi autentikasi dengan session token
- Role-based access control (admin dan user)
- Enkripsi data sensitif sebelum disimpan
- Log aktivitas untuk audit trail

## Conclusion

Proyek Sistem Manajemen Payroll Terintegrasi ini berhasil mengotomatisasi seluruh proses payroll yang sebelumnya memakan waktu berhari-hari menjadi hanya 30 menit per periode. Dengan dashboard interaktif, validasi otomatis, log lengkap, dan distribusi slip gaji via email, sistem ini telah diimplementasikan pada 3 perusahaan mitra dengan total lebih dari 200 karyawan.
