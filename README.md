# Streaming Film & Series Backend

**Status: Setup & Database Design** — cakupan saat ini baru mencakup rancangan basis data dan kerangka server Express (belum ada endpoint/fitur bisnis seperti auth, katalog film, order, atau watchlist).

Backend REST API untuk aplikasi streaming film/series berlangganan. Sistem akan mengelola data user, paket langganan, transaksi order & pembayaran, katalog film/series beserta genre dan episodenya, serta watchlist pribadi tiap user. Dokumen ini mencatat langkah pembuatan project dari 0 sampai kondisi terkini, phase demi phase.

## Stack

- Node.js + Express.js
- MySQL
- Prisma ORM + Prisma CLI (schema, migration, client)
- TablePlus & DBeaver (GUI client database, untuk visualisasi tabel & relasi)
- Laragon (Database Server)
- Git + GitHub

Direncanakan ditambahkan pada phase-phase berikutnya (belum diinstall):

- bcrypt (hash password)
- jsonwebtoken (JWT auth)
- Joi / library validasi lain (validasi request body)
- Postman (testing endpoint)

## Flow (request masuk) — rencana arsitektur

Struktur folder (`controllers/`, `services/`, `routes/`, `validators/`, `middlewares/`, `models/`) sudah disiapkan, tapi masih kosong. Alur yang direncanakan:

```
Client / Postman
      ↓
Route
      ↓
Validator          (cek bentuk req.body)
      ↓
Auth Middleware     (verifyToken — khusus endpoint terproteksi)
      ↓
Controller          (terima req/res, panggil service)
      ↓
Service              (logic bisnis)
      ↓
Prisma Client
      ↓
MySQL
      ↓
JSON Response
```

## Struktur Folder Saat Ini

```
prisma/
  schema.prisma
  migrations/
src/
  app.js            (setup express, middleware global, health-check route)
  server.js         (entry point, listen port)
  config/
    prisma.js       (instance PrismaClient)
  controllers/      (kosong)
  services/         (kosong)
  routes/           (kosong)
  validators/       (kosong)
  middlewares/      (kosong)
  models/           (kosong)
```

---

## PHASE 0 — Requirements & Perancangan Basis Data

### 1. Requirements gathering

Menentukan entitas dan aturan bisnis: User, Package, Order, Payment, Genre, Film, Episode, MyList — beserta relasinya (lihat dokumentasi perancangan basis data terpisah).

### 2. Desain ERD

ERD dibuat dalam notasi Chen dan Crow's Foot, mendefinisikan 8 entitas utama beserta primary key, foreign key, dan kardinalitas relasi (1:N dan 1:1).

### 3. Init project & Git

```bash
git init
npm init -y
```

### 4. Install dependency dasar

```bash
npm install express cors dotenv @prisma/client
npm install -D nodemon prisma
```

### 5. Setup Prisma & datasource

```bash
npx prisma init
```

`.env` / `.env.example`:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=streaming_app
DB_USERNAME=root
DB_PASSWORD=

DATABASE_URL="mysql://root:@127.0.0.1:3306/streaming_app"

PORT=3000
```

`.gitignore`:

```
node_modules
.env

/generated/prisma
```

### 6. Definisikan schema di `prisma/schema.prisma`

Menuliskan 8 model (Genre, Film, Episode, User, Package, Order, MyList, Payment) lengkap dengan tipe data, relasi, index single/composite, dan unique constraint sesuai hasil desain di langkah 1–2.

### 7. Migration ke MySQL

```bash
npx prisma migrate dev --name init
npx prisma generate
```

Diverifikasi lewat TablePlus (cek struktur tabel) dan DBeaver (cek diagram relasi antar tabel).

### 8. Buat kerangka server Express

```bash
mkdir -p src/config src/controllers src/services src/routes src/validators src/middlewares src/models
```

`src/app.js` — setup Express, `cors`, `express.json()`, dan 1 endpoint health-check (`GET /`).

`src/server.js` — load `.env`, jalankan `app.listen()`.

`src/config/prisma.js` — export instance `PrismaClient` tunggal untuk dipakai di seluruh service.

### 9. Update `package.json` scripts

```json
"scripts": {
  "start": "node src/server.js",
  "dev": "nodemon src/server.js",
  "migrate": "prisma migrate dev",
  "migrate:deploy": "prisma migrate deploy",
  "generate": "prisma generate",
  "studio": "prisma studio"
}
```

### 10. Perbaikan pasca-review

- Menambahkan `UNIQUE` constraint pada `Genre.name` (migration `add_unique_genre_name`) untuk mencegah data genre duplikat.

---

## Roadmap Selanjutnya (belum dikerjakan)

**Phase 1 — Modul tanpa dependency (independen)**
Genre (CRUD), Package (CRUD), User (register + login, hash password, JWT).

**Phase 2 — Modul dengan 1 level FK**
Film (CRUD, validasi `genre_id`), Order (create order, riwayat order per user).

**Phase 3 — Modul dengan FK ke phase 2**
Episode (CRUD per `film_id`), Payment (dibuat mengikuti Order, relasi 1:1).

**Phase 4 — Fitur lintas-tabel**
MyList (watchlist, cegah duplikat), access control (cek langganan aktif sebelum mengizinkan streaming konten premium).

**Phase 5 — Hardening**
Validator input tiap endpoint, middleware auth & error handler global, testing manual via Postman.
