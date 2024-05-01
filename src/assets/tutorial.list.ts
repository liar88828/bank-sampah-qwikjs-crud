export const listTutorial = {
  page: [
    {
      title: "Cara Menginpukkan Material Sampah",
      href: "/tutorial/sampah-masuk/profile?no=0",
    },

    {
      title: "Cara Menyerahkan Material Sampah",
      href: "/tutorial/sampah-menyerahkan/lihat-profile?no=0",
    },

    {
      title: "Cara Menukarkan Material Sampah",
      href: "/tutorial/sampah-menukarkan/lihat-profile?no=0",
    },
    {
      title: "Cara mengizinkan dan Mengambil Material Sampah",
      href: "/tutorial/sampah-masuk",
    },
  ],

  material: [
    {
      title: "Lihat Profile User",
      text: "Berikut adalah halaman untuk melihat profile anda. Silakan klik tombol *Material* untuk melihat daftar sampah.",
      link: {
        before: "/tutorial",
        current: "/tutorial/sampah-masuk/profile?no=0",
        after: "/tutorial/sampah-masuk/lihat?no=1",
      },
    },
    {
      title: "Lihat Material Sampah",
      text: "Berikut adalah tabel untuk melihat daftar sampah. Silakan klik tombol *Create* untuk menambahkan daftar sampah baru.",
      link: {
        before: "/tutorial/sampah-masuk/lihat/?no=0",
        current: "/tutorial/sampah-masuk/lihat?no=1",
        after: "/tutorial/sampah-masuk/selesai?no=2",
      },
    },
    {
      title: "Form Material Sampah",
      text: " Berikut adalah formulir untuk memasukkan material sampah. Harap pastikan semua isian formulir telah terisi dengan benar sebelum menekan tombol *Create*.",
      link: {
        before: "/tutorial/sampah-masuk/form/?no=1",
        current: "/tutorial/sampah-masuk/selesai?no=2",
        after: "/tutorial/sampah-masuk/selesai?no=3",
      },
    },
    {
      title: "Selesai Material Sampah",
      text: "Setelah Anda mengisi formulir dengan benar, sistem akan mengarahkan Anda kembali ke menu tabel material. Di sana, Anda akan dapat melihat bahwa data Anda telah berhasil tercatat dengan status 'Process'.",

      link: {
        before: "/tutorial/sampah-masuk/form/?no=2",
        current: "/tutorial/sampah-masuk/selesai?no=3",
        after: "/tutorial/",
      },
    },
  ],

  penyerahan: [
    {
      title: "Lihat Profile",
      text: "Untuk menyerahkan sampah, Anda dapat melakukan langkah berikut:",
      list: [
        "Buka menu profil Anda.",
        'Temukan dan tekan tombol "Penyerahan" pada bagian "Total Information".',
        "Ikuti petunjuk yang diberikan untuk menyelesaikan proses penyerahan sampah.",
      ],
      link: {
        before: "/tutorial",
        current: "/tutorial/sampah-menyerahkan/lihat-profile/?no=0",
        after: "/tutorial/sampah-menyerahkan/table-penyerahan?no=1&page=0",
      },
    },

    {
      title: "Table Penyerahan",
      text: " Berikut adalah formulir untuk memasukkan material sampah. Harap pastikan semua isian formulir telah terisi dengan benar sebelum menekan tombol *Create*.",
      link: {
        before: "/tutorial/sampah-menyerahkan/lihat-profile/?no=0",
        current: "/tutorial/sampah-menyerahkan/table-penyerahan?no=1&page=0",
        after: "/tutorial/sampah-menyerahkan/create-penyerahan?no=2&page=0",
      },
    },

    {
      title: "Create Penyerahan",
      text: "Setelah Anda mengisi formulir dengan benar, sistem akan mengarahkan Anda kembali ke menu tabel material. Di sana, Anda akan dapat melihat bahwa data Anda telah berhasil tercatat dengan status 'Process'.",
      link: {
        before: "/tutorial/sampah-menyerahkan/create-penyerahan?no=1&page=0",
        current: "/tutorial/sampah-menyerahkan/create-penyerahan?no=2&page=0",

        after: "/tutorial/sampah-menyerahkan/table-penyerahan-2?no=3&page=0",
      },
    },

    {
      title: "Table Penyerahan",
      text: "Setelah Anda mengisi formulir dengan benar, sistem akan mengarahkan Anda kembali ke menu tabel material. Di sana, Anda akan dapat melihat bahwa data Anda telah berhasil tercatat dengan status 'Process'.",
      link: {
        before: "/tutorial/sampah-menyerahkan/create-penyerahan?no=2&page=0",
        current: "/tutorial/sampah-menyerahkan/table-penyerahan-2?no=3&page=0",

        after: "/tutorial/sampah-menyerahkan/selesai-penyerahan?no=4&page=0",
      },
    },

    {
      title: "Selesai Penyerahan",
      text: "Setelah Anda mengisi formulir dengan benar, sistem akan mengarahkan Anda kembali ke menu tabel material. Di sana, Anda akan dapat melihat bahwa data Anda telah berhasil tercatat dengan status 'Process'.",
      link: {
        before: "/tutorial/sampah-menyerahkan/table-penyerahan-2?no=3&page=0",
        current: "/tutorial/sampah-menyerahkan/selesai-penyerahan?no=4&page=0",

        after: "/tutorial/",
      },
    },
  ],

  penukaran: [
    {
      title: "Lihat Profile",
      text: "Untuk menukarkan sampah, Anda dapat melakukan langkah berikut:",
      list: [
        "Buka menu profil Anda.",
        'Temukan dan tekan tombol "penukaran" pada bagian "Total Information".',
        "Ikuti petunjuk yang diberikan untuk menyelesaikan proses penukaran sampah.",
      ],
      link: {
        before: "/tutorial",
        current: "/tutorial/sampah-menukarkan/lihat-profile/?no=0",

        after: "/tutorial/sampah-menukarkan/table-penukaran?no=1&page=0",
      },
    },

    {
      title: "Table penukaran",
      text: " Berikut adalah formulir untuk memasukkan material sampah. Harap pastikan semua isian formulir telah terisi dengan benar sebelum menekan tombol *Create*.",
      link: {
        before: "/tutorial/sampah-menukarkan/lihat-profile/?no=0",
        current: "/tutorial/sampah-menukarkan/table-penukaran?no=1&page=0",
        after: "/tutorial/sampah-menukarkan/create-penukaran?no=2&page=0",
      },
    },

    {
      title: "Create penukaran",
      text: "Setelah Anda mengisi formulir dengan benar, sistem akan mengarahkan Anda kembali ke menu tabel material. Di sana, Anda akan dapat melihat bahwa data Anda telah berhasil tercatat dengan status 'Process'.",
      link: {
        before: "/tutorial/sampah-menukarkan/create-penukaran?no=1&page=0",
        current: "/tutorial/sampah-menukarkan/create-penukaran?no=2&page=0",

        after: "/tutorial/sampah-menukarkan/table-penukaran-2?no=3&page=0",
      },
    },

    {
      title: "Table penukaran",
      text: "Setelah Anda mengisi formulir dengan benar, sistem akan mengarahkan Anda kembali ke menu tabel material. Di sana, Anda akan dapat melihat bahwa data Anda telah berhasil tercatat dengan status 'Process'.",
      link: {
        before: "/tutorial/sampah-menukarkan/create-penukaran?no=2&page=0",
        after: "/tutorial/sampah-menukarkan/selesai-penukaran?no=4&page=0",
        current: "/tutorial/sampah-menukarkan/table-penukaran-2?no=3&page=0",
      },
    },

    {
      title: "Selesai penukaran",
      text: "Setelah Anda mengisi formulir dengan benar, sistem akan mengarahkan Anda kembali ke menu tabel material. Di sana, Anda akan dapat melihat bahwa data Anda telah berhasil tercatat dengan status 'Process'.",
      link: {
        before: "/tutorial/sampah-menukarkan/table-penukaran-2?no=3&page=0",
        after: "/tutorial/",
        current: "/tutorial/sampah-menukarkan/selesai-penukaran?no=4&page=0",
      },
    },
  ],
}
