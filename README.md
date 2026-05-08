# ✅ Todo Auth App — Aplikasi To-Do List dengan Autentikasi

> Tugas Bab 11: Kualitas Perangkat Lunak — Pengantar Rekayasa Perangkat Lunak

![React](https://img.shields.io/badge/React-18-blue) ![Jest](https://img.shields.io/badge/Coverage-84%25-green) ![ESLint](https://img.shields.io/badge/ESLint-8-yellow) ![CI](https://img.shields.io/badge/CI-GitHub_Actions-teal) ![SonarCloud](https://img.shields.io/badge/SonarCloud-Passed-brightgreen) ![Quality Gate](https://img.shields.io/badge/Quality_Gate-Passed-brightgreen)

## Deskripsi Proyek

Todo Auth App adalah aplikasi catatan tugas harian berbasis web yang dibangun menggunakan React.js sebagai studi kasus implementasi kualitas perangkat lunak. Aplikasi ini mendukung **multi-user**, **prioritas tugas**, **deadline**, dan **fitur berbagi tugas antar pengguna**.

Proyek ini mendemonstrasikan penerapan prinsip *Shift-Left Testing*, *Static Analysis*, dan pipeline *DevSecOps* dalam siklus pengembangan perangkat lunak modern.

## Anggota Kelompok

| Nama | NIM |
|------|-----|
| Duta Fanroza | 24343005 |
| Firnanda Rizky Pratama Mt | 24343008 |

## Fitur Aplikasi

- 🔐 Autentikasi pengguna multi-user (Login/Logout)
- ✅ Manajemen tugas lengkap (Tambah, Edit, Hapus, Selesai)
- 🔴🟡🟢 Sistem prioritas tugas (Tinggi, Sedang, Rendah)
- 📅 Manajemen deadline dengan deteksi tugas terlambat
- 🔗 Fitur berbagi tugas antar pengguna
- 🔍 Filter dan pencarian tugas secara real-time
- 📊 Statistik ringkasan tugas (Total, Selesai, Terlambat)
- 🔔 Notifikasi toast untuk feedback pengguna

## Teknologi

| Kategori | Teknologi |
|----------|-----------|
| Frontend | React 18, Context API, useReducer |
| Testing | Jest 29, @testing-library/react |
| Linting | ESLint 8 + plugin React & React Hooks |
| CI/CD | GitHub Actions |
| SAST | Semgrep |
| SCA | npm audit |
| Quality Gate | SonarCloud |

## Struktur Proyek

```
todo-auth-app/
├── .github/workflows/
│   └── devsecops-pipeline.yml   # CI/CD Pipeline
├── src/
│   ├── components/              # Navbar, Toast, TodoCard, TodoModal, ShareModal
│   ├── pages/                   # LoginPage, TodoPage
│   ├── utils/
│   │   ├── todoReducer.js       # Pure function — business logic
│   │   └── AppContext.js        # Global state context
│   ├── data/
│   │   └── todoData.js          # Data tugas & helper functions
│   ├── styles/
│   │   └── global.css           # Stylesheet global
│   ├── todoReducer.test.js      # 12 unit tests reducer
│   ├── todoData.test.js         # 11 unit tests data
│   └── TodoCard.test.js         # 10 unit tests component
├── sonar-project.properties     # Konfigurasi SonarCloud
├── .eslintrc.json               # Konfigurasi ESLint
└── package.json
```

## Cara Menjalankan

### Prasyarat

- Node.js versi 16 atau lebih baru
- npm versi 8 atau lebih baru

### Instalasi & Menjalankan Aplikasi

```bash
git clone https://github.com/DUTAFANROZA15/todo-auth-app.git
cd todo-auth-app
npm install --legacy-peer-deps
npm start
```

Aplikasi akan berjalan di `http://localhost:3000`

### Akun untuk Login

| Username | Password | Nama |
|----------|----------|------|
| duta | 123456 | Duta Fanroza |
| rizky | 123456 | Firnanda Rizky Pratama |
| admin | admin123 | Administrator |

### Menjalankan Test

```bash
npm test                  # Jalankan semua unit test
npm run test:coverage     # Jalankan test + laporan coverage
npm run lint              # Cek kualitas kode dengan ESLint
```

## Pipeline DevSecOps

Pipeline CI/CD otomatis berjalan pada setiap *push* ke branch `master` dengan tahapan berikut:

| Tahap | Tool | Fungsi |
|-------|------|--------|
| 1. Lint & Unit Test | ESLint + Jest | Kualitas kode dan coverage minimum 80% |
| 2. SAST | Semgrep | Deteksi kerentanan pada source code |
| 3. SCA | npm audit | Deteksi kerentanan pada dependencies |
| 4. SonarCloud | SonarCloud | Analisis kualitas kode menyeluruh |
| 5. Build | react-scripts | Build production (hanya di branch master) |

## Coverage Target

| Metrik | Target | Aktual |
|--------|--------|--------|
| Lines | 80% | ✅ 84% |
| Branches | 75% | ✅ 81% |
| Functions | 80% | ✅ 100% |
| Statements | 80% | ✅ 100% |

## Hasil SonarCloud

| Metrik | Sebelum | Sesudah |
|--------|---------|---------|
| Quality Gate | ❌ Failed | ✅ Passed |
| Security Rating | C | A |
| Reliability Rating | A | A |
| Maintainability Rating | A | A |
| Security Hotspots | 4 | 0 |
| Coverage | 17% | 84% |
| Duplications | 0.0% | 0.0% |

---

*Universitas Negeri Padang — Program Studi Informatika — 2026*