import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoCard from './components/TodoCard';

// Mock AppContext
jest.mock('./utils/AppContext', () => ({
  useApp: () => ({
    toggleTodo: jest.fn(),
    deleteTodo: jest.fn(),
    state: { currentUser: { id: 1, name: 'Duta Fanroza' } },
  }),
}));

const mockTodo = {
  id: 'todo-123',
  title: 'Belajar React',
  description: 'Mempelajari hooks',
  priority: 'high',
  deadline: '2099-12-31',
  completed: false,
  ownerId: 1,
  sharedWith: [],
};

const mockShowToast = jest.fn();
const mockOnEdit = jest.fn();
const mockOnShare = jest.fn();

test('TodoCard: menampilkan judul tugas', () => {
  render(
    <TodoCard
      todo={mockTodo}
      onEdit={mockOnEdit}
      onShare={mockOnShare}
      showToast={mockShowToast}
    />
  );
  expect(screen.getByText('Belajar React')).toBeInTheDocument();
});

test('TodoCard: menampilkan deskripsi tugas', () => {
  render(
    <TodoCard
      todo={mockTodo}
      onEdit={mockOnEdit}
      onShare={mockOnShare}
      showToast={mockShowToast}
    />
  );
  expect(screen.getByText('Mempelajari hooks')).toBeInTheDocument();
});

test('TodoCard: menampilkan badge prioritas', () => {
  render(
    <TodoCard
      todo={mockTodo}
      onEdit={mockOnEdit}
      onShare={mockOnShare}
      showToast={mockShowToast}
    />
  );
  expect(screen.getByText('Tinggi')).toBeInTheDocument();
});

test('TodoCard: tombol selesai bisa diklik', () => {
  render(
    <TodoCard
      todo={mockTodo}
      onEdit={mockOnEdit}
      onShare={mockOnShare}
      showToast={mockShowToast}
    />
  );
  const btn = screen.getByText('✓ Selesai');
  fireEvent.click(btn);
  expect(mockShowToast).toHaveBeenCalled();
});

test('TodoCard: tombol edit tampil jika owner', () => {
  render(
    <TodoCard
      todo={mockTodo}
      onEdit={mockOnEdit}
      onShare={mockOnShare}
      showToast={mockShowToast}
    />
  );
  expect(screen.getByText('✏️ Edit')).toBeInTheDocument();
});

test('TodoCard: tombol edit tidak tampil jika bukan owner', () => {
  const sharedTodo = { ...mockTodo, ownerId: 2 };
  render(
    <TodoCard
      todo={sharedTodo}
      onEdit={mockOnEdit}
      onShare={mockOnShare}
      showToast={mockShowToast}
    />
  );
  expect(screen.queryByText('✏️ Edit')).not.toBeInTheDocument();
});

test('TodoCard: menampilkan badge dibagikan jika ada sharedWith', () => {
  const sharedTodo = { ...mockTodo, sharedWith: [2] };
  render(
    <TodoCard
      todo={sharedTodo}
      onEdit={mockOnEdit}
      onShare={mockOnShare}
      showToast={mockShowToast}
    />
  );
  expect(screen.getByText('Dibagikan')).toBeInTheDocument();
});

test('TodoCard: menampilkan badge terlambat jika overdue', () => {
  const overdueTodo = { ...mockTodo, deadline: '2020-01-01' };
  render(
    <TodoCard
      todo={overdueTodo}
      onEdit={mockOnEdit}
      onShare={mockOnShare}
      showToast={mockShowToast}
    />
  );
  expect(screen.getByText('Terlambat!')).toBeInTheDocument();
});

test('TodoCard: tombol bagikan bisa diklik', () => {
  render(
    <TodoCard
      todo={mockTodo}
      onEdit={mockOnEdit}
      onShare={mockOnShare}
      showToast={mockShowToast}
    />
  );
  const btn = screen.getByText('🔗 Bagikan');
  fireEvent.click(btn);
  expect(mockOnShare).toHaveBeenCalledWith(mockTodo);
});

test('TodoCard: tombol edit bisa diklik', () => {
  render(
    <TodoCard
      todo={mockTodo}
      onEdit={mockOnEdit}
      onShare={mockOnShare}
      showToast={mockShowToast}
    />
  );
  const btn = screen.getByText('✏️ Edit');
  fireEvent.click(btn);
  expect(mockOnEdit).toHaveBeenCalledWith(mockTodo);
});