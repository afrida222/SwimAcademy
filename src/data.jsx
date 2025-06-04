export const CategoryList = [
    {
      id: 1,
      categoryName: 'All Levels',
    },
    {
      id: 2,
      categoryName: 'Beginner',
    },
    {
      id: 3,
      categoryName: 'Intermediate',
    },
    {
      id: 4,
      categoryName: 'Advanced',
    },
    {
      id: 5,
      categoryName: 'Kids',
    },
    {
      id: 6,
      categoryName: 'Adults',
    },
  ];

  export const BlogList = [
    {
      id: 1,
      title: 'Mastering Freestyle in 7 Days',
      category: 'Beginner',
      image:
        'https://media.istockphoto.com/id/1285601582/id/foto/sudut-pandang-drone-tepat-di-atas-instruktur-pelatih-kolam-renang-mengajarkan-keterampilan.jpg?s=1024x1024&w=is&k=20&c=B0fs25K8063-roKiIYzp7fA1oAeUEIYg7tPkUOLnpNQ=',
      createdAt: 'Apr 10, 2025',
      totalComments: 42,
    },
    {
      id: 2,
      title: 'Backstroke Basics for Kids',
      category: 'Kids',
      image:
        'https://media.istockphoto.com/id/2157947809/id/foto/asian-family-lifestyle-and-play-together-in-the-swimmingpool-on-summer-holiday-dad-and-kid.jpg?s=1024x1024&w=is&k=20&c=bzde4tvk4uQON4Khbltqm3htYNh5MODKBpuAon8BSZw=',
      createdAt: 'Apr 11, 2025',
      totalComments: 12,
    },
    {
      id: 3,
      title: 'Underwater Breathing Techniques',
      category: 'Intermediate',
      image:
        'https://images.unsplash.com/photo-1560090995-01632a28895b?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      createdAt: 'Apr 12, 2025',
      totalComments: 18,
    },
    {
      id: 4,
      title: 'Train Like a Pro: Advanced Drills',
      category: 'Advanced',
      image:
        'https://media.istockphoto.com/id/465383082/id/foto/perenang-wanita-di-kolam-renang.jpg?s=1024x1024&w=is&k=20&c=VxN_VvKvLsENzus4bpSLXYMI03YrARDYo-GHJP9ei6I=',
      createdAt: 'Apr 13, 2025',
      totalComments: 25,
    },
    {
      id: 5,
      title: 'Swim Safety Tips Every Parent Should Know',
      category: 'Kids',
      image:
        'https://media.istockphoto.com/id/812784992/id/foto/instruktur-dan-sekelompok-anak-anak-melakukan-latihan-di-dekat-kolam-renang.jpg?s=1024x1024&w=is&k=20&c=2t9MlL7R07hLqKY9HRXHGHi7NsFrm4wZiaEaY9GfOaE=',
      createdAt: 'Apr 14, 2025',
      totalComments: 31,
    },
    {
      id: 6,
      title: 'Adult Swimming: Breaking the Fear',
      category: 'Adults',
      image:
        'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      createdAt: 'Apr 15, 2025',
      totalComments: 17,
    },
  ];

  export const ProfileData = {
    profilePict:
      'https://plus.unsplash.com/premium_photo-1701030722601-123699cdb1ef?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Azka Garendra', // Nama pengguna bisa disesuaikan
    createdAt: '9 Maret, 2025', // Tanggal bergabung yang lebih sesuai
    blogPosted: 15, // Jumlah blog yang diposting bisa lebih relevan
    following: 250, // Pengguna yang diikuti
    follower: 1200, // Jumlah pengikut yang lebih relevan untuk SwimAcademy
  };

  export const trainingSchedule = [
    {
      id: 1,
      title: 'Basic Swimming Technique',
      coach: 'Coach Andi',
      date: 'Senin, 15 Mei 2023',
      time: '08:00 - 10:00 WIB',
      location: 'Kolam Renang A, Jakarta',
      level: 'Pemula',
      image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      booked: true,
    },
    {
      id: 2,
      title: 'Advanced Freestyle',
      coach: 'Coach Rina',
      date: 'Rabu, 17 Mei 2023',
      time: '16:00 - 18:00 WIB',
      location: 'Kolam Renang B, Jakarta',
      level: 'Lanjutan',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      booked: true,
    },
    {
      id: 3,
      title: 'Butterfly Stroke Mastery',
      coach: 'Coach Budi',
      date: 'Jumat, 19 Mei 2023',
      time: '10:00 - 12:00 WIB',
      location: 'Kolam Renang C, Jakarta',
      level: 'Expert',
      image: 'https://images.unsplash.com/photo-1600965962102-9d260a2a0a2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      booked: true,
    },
  ];

  export const categories = [
    { id: 1, name: 'Semua' },
    { id: 2, name: 'Pemula' },
    { id: 3, name: 'Lanjutan' },
    { id: 4, name: 'Anak-anak' },
    { id: 5, name: 'Dewasa' },
    { id: 6, name: 'Kompetitif' },
  ];
