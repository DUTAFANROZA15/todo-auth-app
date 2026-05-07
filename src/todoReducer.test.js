import { todoReducer, initialState } from '../src/utils/todoReducer';

// Data dummy untuk testing
const mockUser = { id: 1, username: 'duta', name: 'Duta Fanroza' };

const mockTodo = {
  id: 'todo-123',
  title: 'Belajar React',
  description: 'Mempelajari hooks',
  priority: 'high',
  deadline: '2026-12-31',
  completed: false,
  ownerId: 1,
  sharedWith: [],
  createdAt: new Date().toISOString(),
};

const stateWithUser = {
  ...initialState,
  currentUser: mockUser,
  isAuthenticated: true,
  todos: [mockTodo],
};

// ===== TEST LOGIN =====
test('LOGIN: user berhasil login', () => {
  const action = { type: 'LOGIN', payload: mockUser };
  const result = todoReducer(initialState, action);
  expect(result.isAuthenticated).toBe(true);
  expect(result.currentUser).toEqual(mockUser);
});

// ===== TEST LOGOUT =====
test('LOGOUT: user berhasil logout', () => {
  const action = { type: 'LOGOUT' };
  const result = todoReducer(stateWithUser, action);
  expect(result.isAuthenticated).toBe(false);
  expect(result.currentUser).toBeNull();
});

// ===== TEST SET_TODOS =====
test('SET_TODOS: berhasil mengisi daftar todos', () => {
  const todos = [mockTodo];
  const action = { type: 'SET_TODOS', payload: todos };
  const result = todoReducer(initialState, action);
  expect(result.todos).toHaveLength(1);
  expect(result.todos[0].title).toBe('Belajar React');
});

// ===== TEST ADD_TODO =====
test('ADD_TODO: berhasil menambah tugas baru', () => {
  const action = {
    type: 'ADD_TODO',
    payload: {
      title: 'Tugas Baru',
      description: 'Deskripsi tugas',
      priority: 'medium',
      deadline: '2026-12-31',
      sharedWith: [],
    },
  };
  const result = todoReducer(stateWithUser, action);
  expect(result.todos).toHaveLength(2);
  expect(result.todos[1].title).toBe('Tugas Baru');
  expect(result.todos[1].completed).toBe(false);
  expect(result.todos[1].ownerId).toBe(1);
});

// ===== TEST DELETE_TODO =====
test('DELETE_TODO: berhasil menghapus tugas', () => {
  const action = { type: 'DELETE_TODO', payload: 'todo-123' };
  const result = todoReducer(stateWithUser, action);
  expect(result.todos).toHaveLength(0);
});

// ===== TEST TOGGLE_TODO (completed -> false) =====
test('TOGGLE_TODO: berhasil menandai tugas selesai', () => {
  const action = { type: 'TOGGLE_TODO', payload: 'todo-123' };
  const result = todoReducer(stateWithUser, action);
  expect(result.todos[0].completed).toBe(true);
});

// ===== TEST TOGGLE_TODO (completed -> true) =====
test('TOGGLE_TODO: berhasil membatalkan tugas selesai', () => {
  const completedState = {
    ...stateWithUser,
    todos: [{ ...mockTodo, completed: true }],
  };
  const action = { type: 'TOGGLE_TODO', payload: 'todo-123' };
  const result = todoReducer(completedState, action);
  expect(result.todos[0].completed).toBe(false);
});

// ===== TEST EDIT_TODO =====
test('EDIT_TODO: berhasil mengedit tugas', () => {
  const action = {
    type: 'EDIT_TODO',
    payload: {
      id: 'todo-123',
      data: { title: 'Judul Baru', priority: 'low' },
    },
  };
  const result = todoReducer(stateWithUser, action);
  expect(result.todos[0].title).toBe('Judul Baru');
  expect(result.todos[0].priority).toBe('low');
});

// ===== TEST SHARE_TODO =====
test('SHARE_TODO: berhasil berbagi tugas ke user lain', () => {
  const action = {
    type: 'SHARE_TODO',
    payload: { todoId: 'todo-123', userId: 2 },
  };
  const result = todoReducer(stateWithUser, action);
  expect(result.todos[0].sharedWith).toContain(2);
});

// ===== TEST SHARE_TODO duplikat =====
test('SHARE_TODO: tidak duplikat jika sudah dibagikan', () => {
  const sharedState = {
    ...stateWithUser,
    todos: [{ ...mockTodo, sharedWith: [2] }],
  };
  const action = {
    type: 'SHARE_TODO',
    payload: { todoId: 'todo-123', userId: 2 },
  };
  const result = todoReducer(sharedState, action);
  expect(result.todos[0].sharedWith).toHaveLength(1);
});

// ===== TEST DEFAULT =====
test('DEFAULT: mengembalikan state yang sama jika action tidak dikenal', () => {
  const action = { type: 'UNKNOWN_ACTION' };
  const result = todoReducer(stateWithUser, action);
  expect(result).toEqual(stateWithUser);
});