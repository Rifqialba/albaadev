---
title: "Konfigurasi dan Implementasi AI Groq"
summary: "Cara Membuat & Mengakses API AI Groq dari Sebuah Server."
date: "Juli 8, 2024"
draft: false
tags:
- Artificial Intelegnt
- API
- Web Development
---

Halo semuanya! Terima kasih telah berkunjung ke artikel ini. Pada kesempatan kali ini, saya akan berbagi tentang cara membuat & mengakses API AI-Groq dari sebuah server. AI Groq adalah teknologi yang luar biasa dalam dunia kecerdasan buatan, dan saya akan menunjukkan langkah-langkah sederhana untuk memanfaatkan potensinya.

> Tantangan hidup bukanlah untuk bertahan hidup, tetapi untuk berkembang dengan penuh gairah dan tujuan. — Maya Angelou

saya akan buat menjadi 2 bagian pada tutorial kali ini, bagian pertama untuk membuat API itu sendiri tetapi masih dalam server lokal, dan bagian kedua kita akan upload API ini dan diasumsikan sebagai server yang akan diakses untuk dikembangkan lagi dalam proyek lain. Yuk, kita mulai!

▪️ Bagian 1
Membuat akun Groq

untuk membuat akun Groq silakan kunjungi situ “ini” sign-up dan login menggunakan akun yang telah di daftarkan, setelah masuk kedalam akun. klik menu api keys dan klik creat API Key seperti pada gambar dibawa.

![alt text](https://miro.medium.com/v2/resize%3Afit%3A1400/format%3Awebp/1%2AaF28hb-qp7ZFRn9nfSA8uw.png)
> jika akun baru maka tidak akan ada API Key seperti digambar

jika sudah mendapatkan API Key pastikan salin dan simpan pada note atau dimanapun, karena tidak akan bisa melihat API Key kita lagi.

2. Membuat API Groq untuk server local

step ke-2 kita akan mengimplementasikan API Key yang sudah didapatkan untuk kita jadikan API kita sendiri dan kita jalankan diserver lokal kita, untuk bahasa yang saya gunakan kali ini adalah python 3.9

siapkan folder dan file untuk menyimpan program dan code-codenya, disini saya tidak akan menejelaskan setiap code yang diberikan, jadi mohon pelajari sendiri 😆

![alt text](https://miro.medium.com/v2/resize%3Afit%3A1260/format%3Awebp/1%2AzVS32tdHx8VqglqD3vtmUQ.png)
>siapkan beberapa file dasar untuk membuat program pada python seperti biasa.
- app.py akan berisi code lengkap untuk program pembuatan API dan harus dipastikan libary yang dibutuhkan sudah terinstall dengan rapih, disarankan menggunakan virtual environment.


```python
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from groq import Groq
```
```python
# Load environment variables from .env file
load_dotenv()
app = Flask(__name__)
CORS(app)
client = Groq(api_key=os.getenv("API_KEY"))
port = int(os.getenv("PORT", 3000))
@app.route('/v1/ai', methods=['POST'])
def chat_completion():
    try:
        data = request.get_json()
        message_content = data.get("content")
        if not message_content:
            return jsonify({"error": "Content field is required"}), 400
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": message_content,
                }
            ],
            model="llama3-8b-8192",
        )
        response = chat_completion.choices[0].message.content
        return jsonify({"response": response}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
if __name__ == '__main__':
    app.run(debug=True, port=port)
```

- jika belum menginstall, silakan salin dan tempel sintaks dibawah ini
```python
pip install flask
pip install flask_cors
pip install python_dotenv
pip install groq
//bisa juga menggunakan pip3, sesuaikan versi python kalian
```

- .env akan berisi API_KEY dan PORT, kedua variabel itu akan dipanggil pada file app.py diatas. pastikan file .env seperti dibawah ini
```sql
env
API_KEY={api_key_kamu} //inputkan tanpa menggunakan {}
PORT=5000
```

- Untuk file .ignore adalah file optional tetapi biasanya dibuat untuk meminimalisir file berisi data penting yang tidak akan dipush kedalam github.

3. run command dibawah ini pada terminal untuk mengakses localhost, pastikan terminal juga sudah berada pada folder program.

```python
python3 your_file.py
//atau bisa juga
python your_file.py
//seusaikan saya pada versi python yang anda gunakan
```
jika error tidak ditemukan dan sudah ada informasi Running on http://127.0.0.1:5000, maka API sudah berhasil dibuat dan kita bisa tes menggunakan software postman.

4. test API-Groq menggunakan Postman

jika belum mempunyai software ini silakan unduh melalui website resmi postman “ini”, buat akun lalu login kedalam postman. pastikan untuk menyesuaikan method pada postman dan tambahkan “v1/ai” pada url endpoint, atau sesuaikan yang kalian definisikan pada route, sesuaikan juga pengetesan dengan cara seperti gambar dibawah.

![alt text](https://miro.medium.com/v2/resize%3Afit%3A1400/format%3Awebp/1%2AHp2qDhWVsIm-mWL__P6Mcw.png)

>pastikan memilih raw dan JSON pada bagian Body

jika respon yang dihasilkan seperti diatas atau tidak memiliki error maka kita telah sukses membuat API-Groq. Kalo error gimana min? coba bisa tanyakan pada stuckoverflow dan AI yang tersedia!.

▪️ Bagian 2
1. Buat file vercel.json

simpan file tersebut pada folder program dan ikuti saja sintaks seperti dibawah ini dan pastikan menyesuaikan dari segi penamaan file utama dan letak file utama.

```json
{
  "version": 2,
  "builds": [
    {
      "src": "app.py", //sesuaikan file .py kalian
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "app.py"
    }
  ]
}
```
2. Buat repository di Github

buat repository public di Github, dan silakan push semua program yang telah dibuat dengan cara menyalin semua code git dibawah ini dan jangan lupa disesuaikan dengan link repo kalian.

```sql
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Rifqialba/groq-ai.git 
git push -u origin main

```
3. Hosting melalui vercel

untuk melakukan hosting menggunakan vercel, pertama kita harus mempunyai akun vercel yang terintegrasi dengan akun github yang digunakan untuk menyimpan program sebelumnya. silakan kunjungi website vercel [ini](https://vercel.com) dan buat akun jika belum mempunyai.

setelah login, kita klik bagian add new lalu pilih project, maka tampilan website akan seperti dibawah ini


![alt text](https://miro.medium.com/v2/resize%3Afit%3A1400/format%3Awebp/1%2Ajzzur0Yym1PRdUy0WNjsOQ.png)

lalu import repo yang sebelumnya sudah dibuat, pastikan sesuai dengan nama repository yang menyimpan folder program API. Untuk konfigurasi bisa dilihat pada gambar dibawah ini dan klik Deploy.

![alt text](https://miro.medium.com/v2/resize%3Afit%3A1400/format%3Awebp/1%2AHSswZ794AwzG_qHEs-xwxQ.png)
>  sesuaikan value dari variabel API_KEY dan PORT yang kalian simpan pada file .env

jika tidak ada error, maka kita telah selesai menghosting program kita, dan kita bisa asumsikan bahwa website ini bisa dijadikan server yang dapat dengan mudah untuk diakses.

4. Testing ulang

kita akan melakukan test kembali pada API kita tetapi berbeda dengan sebelumnya, sekarang url yang digunakan adalah alamat website yang sudah kita hosting sebelumnya pada vercel, biasanya alamat website akan sama seperti nama repository, dan belakangnya akan diberi domain .vercel.app

![alt text](https://miro.medium.com/v2/resize%3Afit%3A1400/format%3Awebp/1%2AAXHLhR3l9aaEFCbPtDo8WQ.png)
>jalan lupa menambahkan v1/ai pada url endpoint

jika respon yang ditampilakan seperti diatas atau sesuai dengan prompt yang kalian buat maka sudah dipastikan server berjalan dengan sempurna, dan server ini juga bisa dikembangkan lagi. pada artikel selanjutnya saya akan memberikan tentang cara menggunakan server yang telah kita buat lalu diimplementasikan pada chatbot. 😆

>Artificial intelligence is the new electricity. — Andrew Ng

Terima kasih sudah mengikuti tutorial ini! Sekarang kalian sudah tahu cara mengakses API AI Groq dari server kalian sendiri. Semoga panduan ini membantu kalian dalam proyek-proyek AI kalian. Jangan ragu untuk mencoba lebih banyak fitur dan eksplorasi lebih lanjut. jika ada pertanyaan atau ingin berbagi pengalaman, silakan tinggalkan komentar. Selamat berkarya dan semoga sukses!