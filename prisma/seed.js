require("dotenv").config();
const prisma = require("../src/config/prisma");

async function main() {
  // password sementara plain text, akan diganti hash bcrypt di fase Auth (lewat endpoint register)
  await prisma.user.createMany({
    data: [
      { name: "Agil Rofiqul", email: "agil@example.com", password: "password123" },
      { name: "Rofiqul Zein", email: "rofiqul@example.com", password: "password123" },
    ],
    skipDuplicates: true,
  });

  await prisma.genre.createMany({
    data: [{ name: "Action" }, { name: "Comedy" }, { name: "Drama" }, { name: "Horror" }, { name: "Romance" }, { name: "Sci-Fi" }],
    skipDuplicates: true,
  });

  const genres = await prisma.genre.findMany();
  const genreId = (name) => genres.find((genre) => genre.name === name).id;

  const filmSeedData = [
    {
      genre_id: genreId("Sci-Fi"),
      title: "The Last Horizon",
      description: "Sekelompok penjelajah luar angkasa mencari planet baru untuk dihuni manusia.",
      poster: "https://picsum.photos/seed/the-last-horizon/400/600",
      release_year: 2023,
      access_type: 1,
      content_type: 0,
    },
    {
      genre_id: genreId("Romance"),
      title: "Loved by Chance",
      description: "Pertemuan tak terduga dua orang asing yang berubah menjadi kisah cinta.",
      poster: "https://picsum.photos/seed/loved-by-chance/400/600",
      release_year: 2022,
      access_type: 0,
      content_type: 0,
    },
    {
      genre_id: genreId("Action"),
      title: "Shadow Protocol",
      description: "Agen rahasia berpacu dengan waktu untuk menggagalkan konspirasi global.",
      poster: "https://picsum.photos/seed/shadow-protocol/400/600",
      release_year: 2024,
      access_type: 1,
      content_type: 1,
    },
    {
      genre_id: genreId("Comedy"),
      title: "Laugh Out Loud",
      description: "Kisah kocak sekelompok sahabat yang selalu terlibat masalah konyol.",
      poster: "https://picsum.photos/seed/laugh-out-loud/400/600",
      release_year: 2021,
      access_type: 0,
      content_type: 0,
    },
    {
      genre_id: genreId("Horror"),
      title: "The Silent House",
      description: "Sebuah keluarga menemukan rahasia mengerikan di rumah baru mereka.",
      poster: "https://picsum.photos/seed/the-silent-house/400/600",
      release_year: 2023,
      access_type: 1,
      content_type: 0,
    },
    {
      genre_id: genreId("Drama"),
      title: "Fractured Lives",
      description: "Perjalanan hidup beberapa keluarga yang saling terhubung lewat satu peristiwa.",
      poster: "https://picsum.photos/seed/fractured-lives/400/600",
      release_year: 2020,
      access_type: 0,
      content_type: 1,
    },
    {
      genre_id: genreId("Sci-Fi"),
      title: "Beyond the Stars",
      description: "Ekspedisi antariksa menghadapi ancaman tak terduga dari dimensi lain.",
      poster: "https://picsum.photos/seed/beyond-the-stars/400/600",
      release_year: 2025,
      access_type: 1,
      content_type: 1,
    },
    {
      genre_id: genreId("Comedy"),
      title: "Comedy Night Live",
      description: "Kumpulan kejadian lucu sehari-hari yang dikemas dalam gaya mockumentary.",
      poster: "https://picsum.photos/seed/comedy-night-live/400/600",
      release_year: 2024,
      access_type: 0,
      content_type: 0,
    },
  ];

  const existingFilms = await prisma.film.findMany();
  const missingFilms = filmSeedData.filter(
    (data) => !existingFilms.some((film) => film.title === data.title)
  );
  if (missingFilms.length > 0) {
    await prisma.film.createMany({ data: missingFilms });
  }

  const films = await prisma.film.findMany();
  const filmId = (title) => films.find((film) => film.title === title).id;

  const episodeSeedData = [
    // movie tunggal, 1 baris episode sebagai pemegang url_video
    {
      film_id: filmId("The Last Horizon"),
      title: "The Last Horizon",
      duration: 118,
      url_video: "https://cdn.example.com/videos/the-last-horizon.mp4",
      episode_number: 1,
    },
    {
      film_id: filmId("Loved by Chance"),
      title: "Loved by Chance",
      duration: 102,
      url_video: "https://cdn.example.com/videos/loved-by-chance.mp4",
      episode_number: 1,
    },
    {
      film_id: filmId("Laugh Out Loud"),
      title: "Laugh Out Loud",
      duration: 95,
      url_video: "https://cdn.example.com/videos/laugh-out-loud.mp4",
      episode_number: 1,
    },
    {
      film_id: filmId("The Silent House"),
      title: "The Silent House",
      duration: 110,
      url_video: "https://cdn.example.com/videos/the-silent-house.mp4",
      episode_number: 1,
    },
    {
      film_id: filmId("Comedy Night Live"),
      title: "Comedy Night Live",
      duration: 88,
      url_video: "https://cdn.example.com/videos/comedy-night-live.mp4",
      episode_number: 1,
    },
    // series, beberapa episode
    {
      film_id: filmId("Shadow Protocol"),
      title: "The Beginning",
      duration: 45,
      url_video: "https://cdn.example.com/videos/shadow-protocol-ep1.mp4",
      episode_number: 1,
    },
    {
      film_id: filmId("Shadow Protocol"),
      title: "Deep Cover",
      duration: 42,
      url_video: "https://cdn.example.com/videos/shadow-protocol-ep2.mp4",
      episode_number: 2,
    },
    {
      film_id: filmId("Shadow Protocol"),
      title: "Final Countdown",
      duration: 48,
      url_video: "https://cdn.example.com/videos/shadow-protocol-ep3.mp4",
      episode_number: 3,
    },
    {
      film_id: filmId("Fractured Lives"),
      title: "Broken Ties",
      duration: 50,
      url_video: "https://cdn.example.com/videos/fractured-lives-ep1.mp4",
      episode_number: 1,
    },
    {
      film_id: filmId("Fractured Lives"),
      title: "Crossroads",
      duration: 47,
      url_video: "https://cdn.example.com/videos/fractured-lives-ep2.mp4",
      episode_number: 2,
    },
    {
      film_id: filmId("Fractured Lives"),
      title: "Reconciliation",
      duration: 53,
      url_video: "https://cdn.example.com/videos/fractured-lives-ep3.mp4",
      episode_number: 3,
    },
    {
      film_id: filmId("Beyond the Stars"),
      title: "First Contact",
      duration: 44,
      url_video: "https://cdn.example.com/videos/beyond-the-stars-ep1.mp4",
      episode_number: 1,
    },
    {
      film_id: filmId("Beyond the Stars"),
      title: "The Anomaly",
      duration: 46,
      url_video: "https://cdn.example.com/videos/beyond-the-stars-ep2.mp4",
      episode_number: 2,
    },
    {
      film_id: filmId("Beyond the Stars"),
      title: "Point of No Return",
      duration: 49,
      url_video: "https://cdn.example.com/videos/beyond-the-stars-ep3.mp4",
      episode_number: 3,
    },
  ];

  const existingEpisodes = await prisma.episode.findMany();
  const missingEpisodes = episodeSeedData.filter(
    (data) =>
      !existingEpisodes.some(
        (episode) => episode.film_id === data.film_id && episode.episode_number === data.episode_number
      )
  );
  if (missingEpisodes.length > 0) {
    await prisma.episode.createMany({ data: missingEpisodes });
  }

  console.log("Seeding selesai.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
