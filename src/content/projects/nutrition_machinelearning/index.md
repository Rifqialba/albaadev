---
title: "Klasifikasi Status Gizi Balita Menggunakan Support Vector Machine dengan Optimasi Hyperparameter"
summary: "Implementasi model machine learning untuk klasifikasi status gizi balita menggunakan Support Vector Machine dengan perbandingan performa antara model standar dan model yang dioptimasi menggunakan Grid Search. Model ini dikembangkan sebagai bagian dari penelitian skripsi dengan data dari Puskesmas Griya Antapani."
date: "2026-02-20"
draft: false
tags:
  - Machine Learning
  - Python
demoUrl: "private"
repoUrl: "https://github.com/username/svm-gizi-balita"
demoType: "ml"
resultImage: "/images/projects/svm-gizi/confusion-matrix.png"
tools:
  - Python
  - Scikit-learn
  - Pandas
  - NumPy
  - Matplotlib
  - Seaborn
  - Jupyter Notebook
processSteps:
  - "Pengumpulan data dari Puskesmas Griya Antapani (data primer)"
  - "Preprocessing data: handling missing values, encoding, dan normalisasi"
  - "Penanganan class imbalance menggunakan SMOTE"
  - "Pembagian data training (80%) dan testing (20%)"
  - "Pelatihan model SVM standar sebagai baseline"
  - "Optimasi hyperparameter menggunakan Grid Search dengan 5-fold cross validation"
  - "Evaluasi dan perbandingan performa kedua model"
  - "Validasi hasil dengan confusion matrix dan classification report"
features:
  - "Klasifikasi 3 kelas status gizi: Gizi Buruk, Gizi Normal, Gizi Lebih"
  - "Perbandingan performa SVM standar vs SVM dengan optimasi"
  - "Penanganan class imbalance dengan SMOTE (Synthetic Minority Over-sampling Technique)"
  - "Grid Search untuk optimasi parameter C, gamma, dan kernel"
  - "Evaluasi dengan akurasi, precision, recall, dan f1-score"
modelMetrics:
  - name: "Akurasi SVM Standar"
    value: "92%"
    description: "Model baseline tanpa optimasi"
  - name: "Akurasi SVM Optimasi"
    value: "97%"
    description: "Model dengan Grid Search hyperparameter tuning"
  - name: "Precision (Optimasi)"
    value: "0.97"
    description: "Weighted average precision"
  - name: "Recall (Optimasi)"
    value: "0.97"
    description: "Weighted average recall"
  - name: "F1-Score (Optimasi)"
    value: "0.97"
    description: "Weighted average f1-score"
  - name: "Cross Validation Score"
    value: "96.5%"
    description: "5-fold cross validation pada model optimasi"
datasetInfo:
  name: "Dataset Status Gizi Balita"
  size: "1.033 records"
  source: "Puskesmas Griya Antapani, Bandung"
  description: "Dataset berisi data antropometri balita yang terdiri dari usia (bulan), berat badan (kg), tinggi badan (cm), dan jenis kelamin. Target klasifikasi terdiri dari 3 kelas: Gizi Buruk, Gizi Normal, dan Gizi Lebih."
---

## Latar Belakang

Proyek ini merupakan bagian dari penelitian skripsi saya yang berfokus pada penerapan machine learning untuk klasifikasi status gizi balita. Status gizi pada balita merupakan indikator penting yang mempengaruhi tumbuh kembang anak. Deteksi dini dan klasifikasi yang akurat sangat diperlukan untuk intervensi yang tepat waktu.

## Metodologi

### 1. Pengumpulan Data

Data dikumpulkan dari Puskesmas Griya Antapani, Bandung, dengan total 1.033 record balita. Data mencakup:

- Usia (bulan)
- Berat badan (kg)
- Tinggi badan (cm)
- Jenis kelamin
- Status gizi (target): Gizi Buruk, Gizi Normal, Gizi Lebih

### 2. Preprocessing Data

Tahap preprocessing yang dilakukan:

- Pembersihan data dari nilai yang hilang dan outlier
- Encoding variabel kategorikal (jenis kelamin)
- Normalisasi fitur menggunakan StandardScaler untuk menyeragamkan skala data

### 3. Penanganan Class Imbalance

Tantangan utama dalam dataset ini adalah ketidakseimbangan kelas, dimana kelas Gizi Buruk memiliki jumlah data yang sangat sedikit dibandingkan kelas lainnya. Untuk mengatasi hal ini, saya menerapkan teknik SMOTE (Synthetic Minority Over-sampling Technique) yang menghasilkan sampel sintetis untuk kelas minoritas sehingga distribusi kelas menjadi lebih seimbang.

### 4. Pembagian Data

Data dibagi menjadi data training (80%) dan data testing (20%) menggunakan metode stratified sampling untuk mempertahankan proporsi kelas pada kedua set data.

### 5. Pelatihan Model

**SVM Standar**
Model SVM awal dilatih menggunakan parameter default sebagai baseline untuk melihat performa awal model.

**Optimasi Hyperparameter**
Proses optimasi dilakukan menggunakan Grid Search dengan 5-fold cross validation untuk mencari kombinasi parameter terbaik:

- Parameter C: mengatur tingkat regularisasi
- Gamma: mengatur pengaruh satu titik data terhadap model
- Kernel: jenis fungsi kernel (rbf, poly, sigmoid)

### 6. Evaluasi Model

Evaluasi dilakukan dengan membandingkan performa kedua model menggunakan:

- Akurasi: persentase prediksi yang benar
- Precision: ketepatan prediksi positif
- Recall: kemampuan menangkap kelas positif
- F1-Score: keseimbangan precision dan recall
- Confusion Matrix: visualisasi prediksi per kelas

## Hasil dan Pembahasan

### Perbandingan Performa Model

| Metrik               | SVM Standar | SVM Optimasi |
| -------------------- | ----------- | ------------ |
| Akurasi              | 92%         | 97%          |
| Precision (weighted) | 0.92        | 0.97         |
| Recall (weighted)    | 0.92        | 0.97         |
| F1-Score (weighted)  | 0.92        | 0.97         |

Model SVM dengan optimasi hyperparameter berhasil meningkatkan akurasi sebesar 5% dibandingkan model standar, mencapai 97% pada data testing. Peningkatan ini menunjukkan bahwa pemilihan parameter yang tepat sangat mempengaruhi performa model SVM.

### Analisis Kesalahan

Berdasarkan confusion matrix, kesalahan klasifikasi paling banyak terjadi antara kelas Gizi Normal dan Gizi Lebih, yang disebabkan oleh:

- Overlap fitur antara kedua kelas pada batas ambang tertentu
- Keterbatasan fitur yang digunakan (belum mencakup faktor lain seperti riwayat penyakit)

## Challenges and Solutions

### Challenge 1: Class Imbalance

**Problem**: Kelas Gizi Buruk memiliki jumlah data yang sangat sedikit dibandingkan kelas Gizi Normal dan Gizi Lebih. Hal ini menyebabkan model cenderung bias terhadap kelas mayoritas dan sulit mengklasifikasikan kelas minoritas dengan baik.

**Solution**: Menerapkan teknik SMOTE (Synthetic Minority Over-sampling Technique) yang menghasilkan sampel sintetis untuk kelas Gizi Buruk. Dengan SMOTE, distribusi kelas menjadi lebih seimbang dan model mampu belajar karakteristik kelas minoritas dengan lebih baik.

### Challenge 2: Hyperparameter Tuning

**Problem**: Parameter SVM (C, gamma, kernel) memiliki pengaruh signifikan terhadap performa model namun sulit ditentukan secara manual.

**Solution**: Mengimplementasikan Grid Search dengan 5-fold cross validation untuk mencari kombinasi parameter optimal secara sistematis. Proses ini memastikan model mendapatkan parameter terbaik berdasarkan data training.

### Challenge 3: Interpretasi Model

**Problem**: SVM sering dianggap sebagai black-box model sehingga sulit menjelaskan bagaimana model membuat keputusan.

**Solution**: Menggunakan analisis feature importance dan visualisasi decision boundary untuk memahami faktor apa yang paling berpengaruh dalam klasifikasi status gizi balita.

## Conclusion

Proyek skripsi ini berhasil mengimplementasikan model klasifikasi status gizi balita menggunakan Support Vector Machine dengan optimasi hyperparameter. Hasil yang dicapai menunjukkan:

1. **Peningkatan Performa Signifikan**: Model SVM dengan optimasi mencapai akurasi 97%, meningkat 5% dari model standar (92%)
2. **Solusi Class Imbalance**: Penerapan SMOTE efektif menangani ketidakseimbangan kelas pada dataset
3. **Kontribusi Praktis**: Model dapat digunakan sebagai alat bantu bagi tenaga kesehatan dalam mengklasifikasikan status gizi balita secara lebih cepat dan konsisten

### Rencana Pengembangan

1. Implementasi model dalam bentuk aplikasi web sederhana untuk memudahkan akses bagi petugas puskesmas
2. Pengembangan dengan algoritma lain (Random Forest, XGBoost) untuk perbandingan performa
3. Penambahan fitur seperti riwayat imunisasi, ASI eksklusif, dan faktor sosioekonomi untuk meningkatkan akurasi
4. Validasi dengan data baru dari puskesmas lain untuk menguji generalisasi model
