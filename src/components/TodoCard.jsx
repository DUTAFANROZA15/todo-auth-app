import React from 'react';
import { useApp } from '../utils/AppContext';
import { getPriorityLabel, isOverdue } from '../data/todoData';
import { users } from '../data/todoData';

function TodoCard({ todo, onEdit, onShare, showToast }) {
  const { toggleTodo, deleteTodo, state } = useApp();

  const overdue = isOverdue(todo.deadline, todo.completed);
  const isOwner = todo.ownerId === state.currentUser?.id;

  const getSharedNames = () => {
    return todo.sharedWith
      .map((id) => users.find((u) => u.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  const handleToggle = () => {
    toggleTodo(todo.id);
    showToast(
      todo.completed ? 'Tugas ditandai belum selesai' : 'Tugas selesai! 🎉',
      'success'
    );
  };

  const handleDelete = () => {
    if (window.confirm('Yakin ingin menghapus tugas ini?')) {
      deleteTodo(todo.id);
      showToast('Tugas berhasil dihapus', 'error');
    }
  };

  return (
    <div
      className={`todo-card ${todo.completed ? 'completed' : ''} ${
        overdue ? 'overdue' : `priority-${todo.priority}`
      }`}
    >
      <div className="todo-card-header">
        <span className={`todo-title ${todo.completed ? 'done' : ''}`}>
          {todo.title}
        </span>
        <div className="todo-badges">
          <span className={`badge badge-${todo.priority}`}>
            {getPriorityLabel(todo.priority)}
          </span>
          {todo.sharedWith.length > 0 && (
            <span className="badge badge-shared">Dibagikan</span>
          )}
          {overdue && (
            <span className="badge badge-overdue">Terlambat!</span>
          )}
        </div>
      </div>

      {todo.description && (
        <p className="todo-description">{todo.description}</p>
      )}

      {todo.sharedWith.length > 0 && (
        <p className="todo-description" style={{ color: '#4f46e5' }}>
          👥 Dibagikan ke: {getSharedNames()}
        </p>
      )}

      <div className="todo-footer">
        <span className="todo-deadline">
          📅 Deadline: {new Date(todo.deadline).toLocaleDateString('id-ID')}
        </span>
        <div className="todo-actions">
          <button className="btn-done" onClick={handleToggle}>
            {todo.completed ? 'Batal' : '✓ Selesai'}
          </button>
          {isOwner && (
            <>
              <button className="btn-edit" onClick={() => onEdit(todo)}>
                ✏️ Edit
              </button>
              <button className="btn-share" onClick={() => onShare(todo)}>
                🔗 Bagikan
              </button>
              <button className="btn-delete" onClick={handleDelete}>
                🗑️ Hapus
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoCard;