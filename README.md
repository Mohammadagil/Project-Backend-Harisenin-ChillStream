# ChillStream API

REST API backend untuk aplikasi streaming film/series berlangganan — mengelola katalog film & episode, genre, paket langganan, transaksi order & pembayaran, serta watchlist pribadi tiap user.

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?logo=mysql&logoColor=white)

## Daftar Isi

- [Fitur](#fitur)
- [Tech Stack](#tech-stack)
- [Prasyarat](#prasyarat)
- [Instalasi](#instalasi)
- [Environment Variables](#environment-variables)
- [Script yang Tersedia](#script-yang-tersedia)
- [Struktur Proyek](#struktur-proyek)
- [Dokumentasi API](#dokumentasi-api)
- [Skema Database](#skema-database)
- [Roadmap](#roadmap)

## Fitur

- Manajemen katalog: Genre, Film/Series, dan Episode (CRUD penuh, relasi antar entity)
- Manajemen paket langganan (Package)
- Transaksi order & pencatatan pembayaran (Order, Payment)
- Watchlist pribadi per user (MyList), dengan pencegahan duplikat
- Autentikasi & otorisasi berbasis role (register/login, JWT, kontrol akses admin) — *dalam pengembangan*
- Kontrol akses konten premium berdasarkan status langganan aktif — *dalam pengembangan*

## Tech Stack

| Kategori | Teknologi |
|---|---|
| Runtime & Framework | Node.js, Express 5 |
| Database | MySQL |
| ORM | Prisma |
| Auth *(rencana)* | JWT (`jsonwebtoken`), `bcrypt` |
| Validasi *(rencana)* | Joi |
| Tooling | nodemon, Prisma Studio |

## Prasyarat

- Node.js 18+
- MySQL server (lokal atau remote) yang sudah berjalan
- npm

## Instalasi

```bash
# 1. Clone repository
git clone <url-repo-ini>
cd Tugas-Backend-2B-Harisenin-ChillStream

# 2. Install dependency
npm install

# 3. Salin dan sesuaikan environment variables
cp .env.example .env

# 4. Jalankan migration ke database
npx prisma migrate deploy

# 5. Generate Prisma Client
npx prisma generate

# 6. (Opsional) Isi data awal untuk keperluan testing
npm run seed

# 7. Jalankan development server
npm run dev
```

Server berjalan di `http://localhost:3000` (atau sesuai `PORT` di `.env`).

## Environment Variables

| Variabel | Deskripsi | Contoh |
|---|---|---|
| `DB_CONNECTION` | Driver database | `mysql` |
| `DB_HOST` | Host database | `127.0.0.1` |
| `DB_PORT` | Port database | `3306` |
| `DB_DATABASE` | Nama database | `streaming_app` |
| `DB_USERNAME` | Username database | `root` |
| `DB_PASSWORD` | Password database | *(kosongkan jika tanpa password)* |
| `DATABASE_URL` | Connection string untuk Prisma | `mysql://root:@127.0.0.1:3306/streaming_app` |
| `PORT` | Port server Express | `3000` |

## Script yang Tersedia

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Jalankan server dengan auto-reload (nodemon) |
| `npm start` | Jalankan server (production) |
| `npm run migrate` | Jalankan Prisma migration (development) |
| `npm run migrate:deploy` | Terapkan migration yang sudah ada (production/CI) |
| `npm run generate` | Generate Prisma Client dari schema |
| `npm run seed` | Isi database dengan data awal (Genre, Film, Episode, User dummy) |
| `npm run studio` | Buka Prisma Studio (GUI database di browser) |

## Struktur Proyek

```
prisma/
  schema.prisma       # definisi model & relasi database
  migrations/          # riwayat migration
  seed.js              # data awal untuk testing
src/
  index.js             # entry point: setup Express, mount routes, error handler
  config/
    prisma.js          # instance PrismaClient
  utils/
    ApiError.js         # error kustom dengan statusCode
  routes/               # definisi endpoint per resource
  controllers/          # menerima request, memanggil service, membentuk response
  services/             # logic bisnis & akses Prisma
  validators/           # skema validasi request (Joi) — menyusul
  middlewares/           # authenticate, authorize, validate — menyusul
```

## Dokumentasi API

Base URL: `/api`. Seluruh response mengikuti format berikut:

```json
{
  "message": "string",
  "data": "object | array | null",
  "status": "success | error"
}
```

### Genre

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/genres` | Daftar seluruh genre |
| `GET` | `/genres/:id` | Detail genre berdasarkan id |
| `POST` | `/genres` | Tambah genre baru |
| `PATCH` | `/genres/:id` | Ubah data genre |
| `DELETE` | `/genres/:id` | Hapus genre |

### Film

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/films` | Daftar seluruh film/series (beserta genre) |
| `GET` | `/films/:id` | Detail film berdasarkan id |
| `POST` | `/films` | Tambah film/series baru |
| `PATCH` | `/films/:id` | Ubah data film |
| `DELETE` | `/films/:id` | Hapus film |

### Episode

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/episodes` | Daftar episode (`?film_id=` untuk filter per film) |
| `GET` | `/episodes/:id` | Detail episode berdasarkan id |
| `POST` | `/episodes` | Tambah episode baru |
| `PATCH` | `/episodes/:id` | Ubah data episode |
| `DELETE` | `/episodes/:id` | Hapus episode |

### Package

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/packages` | Daftar seluruh paket langganan |
| `GET` | `/packages/:id` | Detail paket berdasarkan id |
| `POST` | `/packages` | Tambah paket baru |
| `PATCH` | `/packages/:id` | Ubah data paket |
| `DELETE` | `/packages/:id` | Hapus paket |

### MyList

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/mylists` | Daftar watchlist (`?user_id=` untuk filter per user) |
| `GET` | `/mylists/:id` | Detail entri watchlist |
| `POST` | `/mylists` | Tambah film ke watchlist (`409` jika sudah ada) |
| `DELETE` | `/mylists/:id` | Hapus dari watchlist |

### Order

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/orders` | Daftar order (`?user_id=` untuk filter per user) |
| `GET` | `/orders/:id` | Detail order |
| `POST` | `/orders` | Buat order baru |
| `PATCH` | `/orders/:id` | Ubah data/status order |
| `DELETE` | `/orders/:id` | Hapus order |

### Payment

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/payments` | Daftar pembayaran (`?order_id=` untuk filter per order) |
| `GET` | `/payments/:id` | Detail pembayaran |
| `POST` | `/payments` | Catat pembayaran untuk suatu order |
| `PATCH` | `/payments/:id` | Ubah status pembayaran |
| `DELETE` | `/payments/:id` | Hapus data pembayaran |

### Auth *(dalam pengembangan)*

| Method | Endpoint | Deskripsi | Auth |
|---|---|---|---|
| `POST` | `/auth/register` | Registrasi user baru | Tidak |
| `POST` | `/auth/login` | Login, mengembalikan JWT | Tidak |

## Skema Database

Terdiri dari 8 entity: `User`, `Package`, `Order`, `Payment`, `Genre`, `Film`, `Episode`, `MyList`, dengan relasi 1:N dan 1:1 sesuai kebutuhan bisnis (satu user banyak order, satu order satu payment, satu genre banyak film, dst). Dokumentasi perancangan lengkap (ERD notasi Chen & Crow's Foot, penjelasan indexing, tipe data, dan naming convention) tersedia terpisah dari repository ini.

## Roadmap

- [x] Perancangan database & migration
- [x] CRUD Genre, Film, Episode, Package
- [x] CRUD MyList, Order, Payment
- [ ] Validasi request (Joi) di seluruh endpoint
- [ ] Autentikasi: register & login (bcrypt + JWT)
- [ ] Role-based authorization (endpoint manajemen konten khusus admin)
- [ ] Kontrol akses konten premium berdasarkan status langganan aktif
- [ ] Testing menyeluruh (kasus sukses, validasi gagal, unauthorized, forbidden, not found)
