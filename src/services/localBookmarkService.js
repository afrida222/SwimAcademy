let bookmarks = [
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

export const getBookmarks = async () => {
  return bookmarks;
};

export const addBookmark = async (newBookmark) => {
  const id = Date.now().toString(); // Generate simple ID
  bookmarks = [...bookmarks, { ...newBookmark, id }];
  return id;
};

export const updateBookmark = async (id, updatedData) => {
  bookmarks = bookmarks.map(item => 
    item.id === id ? { ...item, ...updatedData } : item
  );
};

export const deleteBookmark = async (id) => {
  bookmarks = bookmarks.filter(item => item.id !== id);
};

// Untuk simulasi realtime updates
let listeners = [];

export const subscribeToBookmarks = (callback) => {
  listeners.push(callback);
  // Panggil callback pertama kali dengan data saat ini
  callback(bookmarks);
  
  // Fungsi unsubscribe
  return () => {
    listeners = listeners.filter(l => l !== callback);
  };
};

const notifyListeners = () => {
  listeners.forEach(callback => callback(bookmarks));
};