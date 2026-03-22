---
title: "Takutin - Platform Cerita Horor dengan Sistem Kolaborasi Penulis"
summary: "Platform web modern untuk membaca dan menulis cerita horor dengan sistem autentikasi lengkap. Pengguna dapat membaca tanpa login, sementara penulis terdaftar dapat mengunggah cerita, menyimpan draft, serta berinteraksi melalui komentar, like, dan bookmark. Dilengkapi fitur analytics untuk memantau performa setiap cerita."
date: "2026-03-20"
draft: false
tags:
  - Web Development
  - Blog Platform
demoUrl: "https://takutin.vercel.app"
repoUrl: ""
demoType: "website"
resultImage: "/images/projects/takutin/home-preview.png"
videoUrl: "https://www.tiktok.com/@alca.digihelp/video/7614090832525757704"
tools:
  - Next.js 14
  - TypeScript
  - TailwindCSS
  - Prisma
  - PostgreSQL
  - NextAuth.js
  - Vercel
techStack:
  - Next.js
  - TypeScript
  - TailwindCSS
  - Prisma ORM
  - PostgreSQL
  - NextAuth.js
processSteps:
  - "Perancangan arsitektur database dengan relasi user, stories, comments, likes, bookmarks"
  - "Implementasi autentikasi dengan NextAuth.js (Google OAuth dan credentials)"
  - "Pengembangan halaman publik untuk eksplorasi cerita tanpa login"
  - "Pembuatan dashboard penulis dengan fitur CRUD cerita"
  - "Implementasi sistem draft untuk menyimpan cerita belum publish"
  - "Pengembangan fitur interaksi (komentar, like, bookmark) dengan real-time update"
  - "Implementasi analytics per cerita (views, likes, comments, bookmark count)"
  - "Optimasi SEO untuk setiap cerita dengan metadata dinamis"
  - "Testing dan deployment ke Vercel"
features:
  - "Baca tanpa login: Eksplorasi semua cerita tanpa perlu registrasi"
  - "Autentikasi lengkap: Registrasi dan login dengan email atau Google OAuth"
  - "Dashboard penulis: Kelola semua cerita (published, draft, analytics)"
  - "Fitur interaksi: Komentar, like, dan bookmark/favorite cerita"
  - "Sistem draft: Simpan cerita sebagai draft sebelum dipublikasikan"
  - "Analytics per cerita: View count, like count, comment count, bookmark count"
  - "Profile user: Menampilkan statistik dan aktivitas penulis"
  - "Kategori cerita: Filter berdasarkan genre horor (mistis, thriller, urban legend)"
  - "Search & filter: Cari cerita berdasarkan judul, penulis, atau kategori"
  - "Responsive design: Akses optimal dari desktop hingga mobile"
deployment:
  platform: "Vercel"
  url: "https://takutin.vercel.app"
  status: "Production"
---

## Latar Belakang

Takutin adalah platform yang menghubungkan penulis cerita horor dengan pembaca yang menyukai genre ini. Banyak penulis horor berbakat di Indonesia yang kesulitan mendapatkan platform untuk membagikan karyanya, sementara pembaca kesulitan menemukan cerita horor berkualitas dalam satu tempat. Takutin hadir sebagai solusi dengan memberikan ruang bagi penulis untuk berkarya dan pembaca untuk menikmati cerita horor dari berbagai penulis.

## Fitur Utama

### 1. Mode Baca Tanpa Login (Public Access)

Pengguna dapat langsung membaca semua cerita yang telah dipublikasikan tanpa perlu registrasi. Fitur ini memudahkan pembaca untuk mengeksplorasi konten dan memutuskan apakah ingin bergabung sebagai penulis.

**Halaman Publik:**

- **Homepage**: Menampilkan cerita terbaru, paling populer, dan rekomendasi
- **Detail Cerita**: Konten lengkap dengan interaksi (komentar, like) hanya untuk pengguna login
- **Kategori**: Filter berdasarkan genre horor
- **Search**: Pencarian cerita berdasarkan judul atau penulis
- **Profile Penulis**: Menampilkan koleksi cerita dari penulis tertentu

### 2. Sistem Autentikasi

Registrasi dan login menggunakan NextAuth.js dengan dua metode:

- **Email & Password**: Registrasi manual dengan validasi email
- **Google OAuth**: Login cepat menggunakan akun Google

**Fitur untuk User Terdaftar:**

- **Dashboard Penulis**: Kelola semua cerita (published & draft)
- **Profile Page**: Data diri dan statistik aktivitas
- **Bookmarks**: Daftar cerita yang difavoritkan
- **Riwayat Like**: Cerita yang telah di-like

### 3. Manajemen Cerita (CRUD + Draft)

Penulis dapat mengelola cerita dengan fleksibel:

**Tambah Cerita Baru:**

- Form dengan editor rich text (Markdown support)
- Upload gambar cover otomatis
- Pilih kategori dan tags
- Set status: Publish langsung atau Simpan sebagai Draft

**Draft System:**

- Simpan cerita yang belum selesai
- Edit draft kapan saja
- Draft hanya terlihat oleh penulis
- Publish draft menjadi cerita publik

**Edit Cerita:**

- Update konten, judul, atau gambar cover
- Riwayat perubahan tersimpan
- Tidak mempengaruhi data interaksi (likes, comments)

### 4. Fitur Interaksi

**Komentar:**

- Pengguna login dapat memberikan komentar pada cerita
- Balas komentar (thread)
- Edit dan hapus komentar sendiri
- Notifikasi komentar baru untuk penulis

**Like:**

- Satu klik untuk menyukai cerita
- Menampilkan jumlah like real-time
- Mencegah double like

**Bookmark/Favorite:**

- Simpan cerita ke daftar bacaan
- Akses cepat dari profile
- Tidak terpengaruh jika cerita dihapus

### 5. Analytics Profile

Setiap penulis memiliki dashboard analytics yang menampilkan:

**Statistik Per Cerita:**

- Total views
- Jumlah likes
- Jumlah komentar
- Jumlah bookmark
- Tanggal publish

**Statistik Akun:**

- Total cerita published
- Total cerita draft
- Total views keseluruhan
- Total likes diterima
- Engagement rate

**Visualisasi:**

- Grafik views per bulan
- Grafik performa cerita (like vs views)
- Insight cerita paling populer

## Challenges and Solutions

### Challenge 1: Real-time Analytics Update

**Problem**: Setiap view, like, dan bookmark perlu tercatat secara real-time untuk dashboard analytics. Update database setiap interaksi dapat membebani server.

**Solution**:

- Implementasi optimistic updates di client
- Batch processing untuk view count (update setiap 10 detik)
- Redis cache untuk mengurangi query database
- WebSocket untuk real-time notifikasi interaksi

### Challenge 2: Rich Text Editor Security

**Problem**: Editor rich text yang memungkinkan HTML injection dapat membahayakan keamanan platform.

**Solution**:

- Menggunakan TipTap editor dengan sanitasi konten
- Implementasi DOMPurify untuk membersihkan HTML
- Validasi konten di server sebelum disimpan
- Rate limiting untuk mencegah spam

### Challenge 3: Image Upload Management

**Problem**: Cover image yang diupload perlu dioptimasi untuk performa dan storage.

**Solution**:

- Upload ke Cloudinary dengan otomatis optimasi format
- Implementasi image lazy loading
- Responsive images dengan srcset
- Limit file size (max 2MB)

### Challenge 4: Preventing Content Plagiarism

**Problem**: Konten cerita dapat disalin oleh pengguna lain tanpa izin.

**Solution**:

- Disable right-click pada konten cerita
- Watermark pada gambar cover
- Sistem deteksi duplikasi konten
- DMCA protection notice

### Challenge 5: Multi-language Support

**Problem**: Konten yang tidak pantas atau melanggar aturan dapat diupload.

**Solution**:

- Filter kata kasar otomatis (kata kotor, SARA)
- Sistem report untuk pembaca
- Admin dashboard untuk moderasi
- Review manual untuk cerita baru (periode awal)

## Conclusion

Takutin berhasil menciptakan ekosistem yang menghubungkan penulis dan pembaca cerita horor di Indonesia. Dengan sistem yang memungkinkan pembaca eksplorasi tanpa login, sementara penulis memiliki kontrol penuh atas karya mereka melalui dashboard dan analytics, platform ini menjadi wadah yang ideal untuk pengembangan konten horor.
