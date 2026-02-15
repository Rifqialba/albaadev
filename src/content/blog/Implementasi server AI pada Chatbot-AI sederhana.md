---
title: "Implementasi server AI pada Chatbot-AI sederhana "
summary: "Cara Membangun dan Menghubungkan Backend AI ke Antarmuka Chatbot."
date: "Juli 17, 2024"
draft: false
tags:
- Artificial Intelegnt
- API
- Web Development
---

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*nYxPkHkNInTPIaq7)

‘Ciao a tutti’, ini adalah artikel lanjutan dari artikel saya yang berjudul ara Membuat & Mengakses API AI Groq dari Sebuah Server’. Jadi sebelum lanjut membaca artikel [ini](https://albaporto.vercel.app/blog/konfigurasi-dan-implementasi-ai-groq), silakan akses dan pahami terlebih dahulu artikel sebelumnya yang dapat dibuka melalui link ‘ini’. Terima kasih :)

> AI is not a threat to our jobs, but an opportunity to make our work more meaningful.” — Fei-Fei Li

Sesuai judul artikel ini, disini kita akan membuat sebuah website sederhana yang dimana akan mengintegrasikan server yang sudah dibuat sebelumnya, sehingga bisa memaksimalkan fitur chatbot-AI pada website. Langsung saja ke koding mengkodingnya 🔥.

1. Buat bagian FE (Front End)

Pada kali ini saya akan membuat menggunakan html,css sederhana saja tidak memerlukan framework dan lain - lain. Jika ingin menggunakan code dari saya silakan mengunjungi repository [ini](https://github.com/Rifqialba/chatbot).

2. Integrasi server kedalam code (Back End)

Point utama pada artikel ini adalah pada langkah ke 2, jadi untuk membuat suatu chatbot yang telah terintegrasi dengan server yang kita miliki cukup sederhana, dan disini saya hanya menggunakan javascript sederhana.

```html
<form id="chat-form">
      <input class="todo-input" type="text" id="user-input" placeholder="letakan pertanyaan...">
      <button class="todo-btn" type="submit">Send</button>
</form>
```

dipastikan pada code html mengandung button yang akan meng-trigger untuk membuat method post kepada server. Dan fungsi akan dibuat menggunakan code javascript ini

```javascript
function sendChatMessage(message) {
        const url = 'https://"your_server"/v1/chat';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: message }), 
        })
            .then(response => response.json())
            .then(data => {
                const botMessage = data.response; 
                if (botMessage) {
                    appendBotMessage(botMessage);
                } else {
                    appendErrorMessage();
                }
            })
            .catch(error => {
                console.error('Error sending message:', error);
                appendErrorMessage();
            });
    }
```

Pada code diatas, membuat sebuah fungsi yang digunakan untuk mengirim pesan pengguna ke server AI menggunakan metode POST, lalu menambahkan pesan bot atau pesan error ke dalam chat berdasarkan respons yang diterima dari server. Untuk struktur fungsi tidak perlu sama persis yang terpenting hanya bagian ini.

```javascript
method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: message }), 
        
```

3. Test / Debugging

Tampilan dari chatbot yang telah kita buat akan seperti ini, langsung saja kita coba untuk membuat pertanyaan, dan lihat respon dari server.

![1.0](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*X7gYDl54gJra8IVk-gMl1Q.png)

Gambar menunjukan tampilan awal pada saat website diakses, terdapat placeholder untuk memasukan pesan (prompt) dan tombol send untuk mengirim kepada server, pastikan server dapat diakses agar tidak terjadi kendala seperti gambar dibawah

![1.1](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*X7gYDl54gJra8IVk-gMl1Q.png)

Jika server merespon dengan baik, akan mengirimkan respon atau pesan setelah prompt yang user kirimkan, contoh respon dari server akan seperti gambar dibawah ini.

![1.2](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*cA2qIU-8C5VMP0NgadSrEw.png)

Kalian dapat memodifikasi code dari repositori yang sudah saya berikan diawal artikel, bisa dengan menambahkan fitur yang berguna untuk user misalnya, login atau membuat beberapa model AI yang di-integrasikan dengan server yang berbeda sehingga user bisa memilih respon dari AI versi lain. Setelah memaksimalkan semua fitur, proyek ini bisa kalian jadikan portfolio ataupun bisa kalian perjual belikan pada website jual beli program. Jadi tidak ada salahnya untuk mencoba dari hal-hal sederhana membuat program sederhana seperti ini.

---

Semoga artikel ini bisa berguna untuk kalian yang baru mulai belajar tentang IT, mulailah dari membuat hal — hal sederhana seperti ini untuk mengasah dari segi error solving atau fundamental. Tetap semangat dan jika ada pertanyaan atau request harus membuat artikel lain bisa tinggalkan komen pada artikel ini.
