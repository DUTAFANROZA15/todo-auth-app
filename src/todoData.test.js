import { findUser, getPriorityLabel, isOverdue, users, initialTodos } from '../src/data/todoData';

// ===== TEST findUser =====
test('findUser: berhasil menemukan user yang valid', () => {
  const user = findUser('duta', '123456');
  expect(user).not.toBeNull();
  expect(user.name).toBe('Duta Fanroza');
});

test('findUser: mengembalikan null jika password salah', () => {
  const user = findUser('duta', 'wrongpassword');
  expect(user).toBeNull();
});

test('findUser: mengembalikan null jika username tidak ada', () => {
  const user = findUser('userpalsu', '123456');
  expect(user).toBeNull();
});

// ===== TEST getPriorityLabel =====
test('getPriorityLabel: mengembalikan label yang benar untuk high', () => {
  expect(getPriorityLabel('high')).toBe('Tinggi');
});

test('getPriorityLabel: mengembalikan label yang benar untuk medium', () => {
  expect(getPriorityLabel('medium')).toBe('Sedang');
});

test('getPriorityLabel: mengembalikan label yang benar untuk low', () => {
  expect(getPriorityLabel('low')).toBe('Rendah');
});

// ===== TEST isOverdue =====
test('isOverdue: tugas yang sudah lewat deadline dianggap terlambat', () => {
  const result = isOverdue('2020-01-01', false);
  expect(result).toBe(true);
});

test('isOverdue: tugas yang sudah selesai tidak dianggap terlambat', () => {
  const result = isOverdue('2020-01-01', true);
  expect(result).toBe(false);
});

test('isOverdue: tugas dengan deadline masa depan tidak terlambat', () => {
  const result = isOverdue('2099-12-31', false);
  expect(result).toBe(false);
});

// ===== TEST data users =====
test('users: jumlah user tersedia minimal 3', () => {
  expect(users.length).toBeGreaterThanOrEqual(3);
});

// ===== TEST initialTodos =====
test('initialTodos: data awal tugas tersedia', () => {
  expect(initialTodos.length).toBeGreaterThan(0);
});