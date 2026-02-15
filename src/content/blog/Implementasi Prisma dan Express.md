---
title: "Implementasi Prisma dan Express"
summary: "Mengimplementasikan CRUD dengan Prisma dan Express pada sistem Login: Langkah Demi Langkah."
date: "Juli 21, 2024"
draft: false
tags:
- Backend
- API
- Database
---

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*2qv4I5DCIN_XE8cT6M_sFQ.png)

Hallo iedereen, pada kesempatan kali ini saya akan memberi cara untuk membuat sebuah sistem login dengan database juga pastinya, jadi tetap berfungsi seperti pada umunya untuk sistem loginnya, tetapi menggunakan fitur dari prisma dan express. sebelum menuju step by stepnya, kita cari tau definisi dari kedua alat ini.


Prisma
alat yang bernama prisma ini merupaka sebuah ORM (Object-Relational Mapping) mutakhir, digunakan untuk berinteraksi dengan basis data. Untuk fitur — fitur dari prisma ini meliputi:

 - Data Modeling: Prisma memungkinkan kita mendefinisikan skema basis data       menggunakan Prisma Schema Language (PSL), yang kemudian dapat digunakan untuk menghasilkan model TypeScript yang kuat.
 - Type Safety: Prisma menghasilkan kode TypeScript yang memungkinkan pengembang untuk mendapatkan keamanan tipe saat mengakses basis data.
 - Migration: Prisma menyediakan alat migrasi untuk memperbarui skema basis data dengan mudah seiring dengan perubahan kebutuhan aplikasi.
 - Querying: Prisma menyediakan API yang intuitif dan efisien untuk melakukan operasi CRUD (Create, Read, Update, Delete) di basis data.

dan prisma juga mendukung berbagai basis data seperti PostgreSQL, MySQL, SQLite, dan lainnya.

## Express

definisinya yaitu sebuah (framework) web untuk Node.js yang memudahkan pembuatan aplikasi web dan API. Untuk beberapa fitur sebagai berikut:

 - Middleware: Express menggunakan konsep middleware untuk menangani request dan response. Middleware adalah fungsi yang dieksekusi berurutan dan dapat memodifikasi request dan response.
 - Routing: Express menyediakan sistem routing yang kuat untuk menangani berbagai rute HTTP.

Dari kedua alat tempur kita ini, biasanya dikombinasikan untuk membangun aplikasi backend yang efisien dan terstruktur. Prisma menangani interaksi dengan basis data, sementara Express menangani routing dan logika aplikasi. **SEMOGA DEFINISI INI DIBACA YA BIAR NAMBAH WAWASAN. GA LANGSUNG BIKIN BIKIN PROGRAM AJA!!!**

---

## 1. Instalasi Pisma dan Express

Sebelum menginstall buat dulu folder untuk menyimpan semua file file code kita gaiis, bisa langsung copy saja code dibawah ini dan paste diterminal klean.

```
mkdir testprisma
cd testprisma
```
Setelah masuk kedalam folder proyek, lanjut kita install alat tempur yang akan digunakan dengan menulis bash seperti dibawah:

```
yarn add prisma @prisma/client 
yarn add express
npx prisma init
npm install express
npm install cors
```

## 2. Konfigurasi dan Migarsi Database

Setelah menjalankan perintah diatas, Ini akan membuat folder prisma dengan file `s`chema.prisma` di dalamnya serta file `.env` untuk konfigurasi database.

Ubah isi dari `schema.prisma` menjadi:

```mysql
datasource db {
  provider = "postgresql" // atau mysql/sqlite sesuai database yang digunakan
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id       Int    @id @default(autoincrement())
  email    String @unique
  password String
}
        
```
Disini kita akan menggunakan postgresql, jika belum mengunduh silakan kunjungi situs resmi dari postgresql [disini](https://www.postgresql.org/download/).

Selanjutnya, sebelum kita mengubah file `.env` kita, jalankan dulu code dibawah ini untuk membuat user serta database yang akan digunakan. perhatikan juga komen pada setiap perintah dibawah. Jangan langsung copy pastekan.

```mysql
psql postgres    //tekan enter, lalu masukan perintah selnajutnya 
CREATE USER myuser WITH PASSWORD 'mypassword'; // silakan ubah jika mau
CREATE DATABASE mydatabase;
GRANT ALL PRIVILEGES ON DATABASE mydatabase TO myuser; 
ALTER USER myuser CREATEDB;
// jika sudah melakukan ketiga perintah diatas tulis ini lalu enter
\q
```
Setelah melakukan semua perintah diatas, selanjutnya terapkan migrasi

```mysql
yarn prisma migrate dev --name init
```

## 3. Implementasi CRUD dengan Prisma Client

 - Buat file CRUD

Sekarang masuk ke code editor kalian, disini saya menggunakan vscode. Buat file userController.js dan masukan code ini, digunakan untuk menghandle fungsi login.

```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fungsi untuk membuat pengguna baru
async function createUser(email, password) {
  return await prisma.user.create({
    data: {
      email,
      password,
    },
  });
}

// Fungsi untuk login pengguna
async function loginUser(email, password) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user && user.password === password) {
    return user; // Pengguna berhasil login
  } else {
    throw new Error('Invalid credentials'); // Gagal login
  }
}

module.exports = {
  createUser,
  loginUser,
};
```
 - Gunakan CRUD dalam aplikasi

Buat file dengan nama app.js dan masukan code dibawah ini, pastikan semua dependensi telah terinstall dan dapat dipanggil.

```javascript
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');  // Import cors
const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors({
    origin: '*', // Atau ganti dengan array link yang bisa mengakses
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
 }));


// Rute root
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Endpoint untuk registrasi
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.create({
            data: {
                email,
                password,
            },
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
});

// Endpoint untuk login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (user && user.password === password) {
            res.json(user);
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
```

## 4. Testing server

Jalankan code dengan menggunakan perintah dibawah ini, dan silakan kunjungi local address kalian yang tercantum pada terminal code editor, sesuaikan dengan nama file yang kalian buat.

```
node app.js
```

Jika tampilan page bertuliskan “server is running” tandanya endpoint root (‘/’) berjalan dengan baik, selanjutnya kita pastikan juga endpoint ‘/login’ dan endpoint ‘register/’ juga berfungsi dengan baik. Kita menggunakan postman untuk mengetes kedua endpoint tersebut, dengan cara

Untuk **/register:**

 - Method: POST
 - URL: http://localhost:3000/register
 - Body (JSON):

```
{
  "email": "test@example.com",
  "password": "password123"
}
```
Untuk **/login:**

 - Method: POST
 - URL: http://localhost:3000/login
 - Body (JSON):

```
{
  "email": "test@example.com",
  "password": "password123"
}
```

Jika tidak ada error maka akan menghasilkan output pada postman seperti gambar dibawah ini.

![1.1](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*v-BzicuqEAoyAfSO33ADAw.png)

---

setelah berhasil membuat akun pada endpoint /registrasi otomatis akan masuk kedalam database, kita bisa melihat sekaligus melakukan beberapa aksi seperti menghapus atau melakukan record pada database kita, karena kita disini membuat dengan prisma maka kita tinggal menuliskan perintah pada terminal pada code editor kita

```
npx prisma studio  
```

lalu akan otomatis masuk kedalam server local untuk melihat database yang kita sudah buat, tampilannya akan seperti ini

![1.1](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*am8lTLpZjbaCzoDLSBavxw.png)

langkah ini merupakan akhir dari artikel ini, dan dari program yang kita buat tadi khususnya untuk bagian backend kita bisa impprove dengan membuat bagian frontend untuk login dan register, serta mungkin bisa membuat aplikasi yang akan dijadikan aksi jika login berhasil, jika ada error atau pertanyaan bisa cantumkan dikolom komentar.👍🏻

---

Terima kasih untuk para pembaca artikel ini yang mungkin sedang belajar atau mencari ilmu baru tentang web development, semoga artikel ini bisa menjadi dorongan penuh agar bisa tetap semangat mencoba hal hal baru.

>A person who never made a mistake never tried anything new. — Albert Einstein

 copy
Implementasi Prisma dan Express