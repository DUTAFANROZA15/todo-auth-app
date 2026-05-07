function uuidv4() {
  return 'id-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
}

// Data user untuk login
export const users = [
  { id: 1, username: 'duta', password: '123456', name: 'Duta Fanroza' },
  { id: 2, username: 'rizky', password: '123456', name: 'Firnanda Rizky Pratama' },
  { id: 3, username: 'admin', password: 'admin123', name: 'Administrator' },
];

// Data tugas awal
export const initialTodos = [
  {
    id: uuidv4(),
    title: 'Belajar React.js',
    description: 'Mempelajari dasar-dasar React termasuk hooks dan context',
    priority: 'high',
    deadline: '2026-05-10',
    completed: false,
    ownerId: 1,
    sharedWith: [2],
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Mengerjakan Tugas RPL',
    description: 'Menyelesaikan tugas mingguan bab 11 tentang kualitas perangkat lunak',
    priority: 'high',
    deadline: '2026-05-08',
    completed: false,
    ownerId: 1,
    sharedWith: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Olahraga Pagi',
    description: 'Jogging 30 menit di sekitar kampus',
    priority: 'low',
    deadline: '2026-05-07',
    completed: true,
    ownerId: 2,
    sharedWith: [],
    createdAt: new Date().toISOString(),
  },
];

// Helper: cari user berdasarkan username dan password
export function findUser(username, password) {
  return users.find(
    (u) => u.username === username && u.password === password
  ) || null;
}

// Helper: ambil label prioritas
export function getPriorityLabel(priority) {
  const labels = { high: 'Tinggi', medium: 'Sedang', low: 'Rendah' };
  return labels[priority] || priority;
}

// Helper: cek apakah deadline sudah lewat
export function isOverdue(deadline, completed) {
  if (completed) return false;
  return new Date(deadline) < new Date();
}