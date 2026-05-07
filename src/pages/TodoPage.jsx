import React, { useState } from 'react';
import { useApp } from '../utils/AppContext';
import { isOverdue } from '../data/todoData';
import Navbar from '../components/Navbar';
import TodoCard from '../components/TodoCard';
import TodoModal from '../components/TodoModal';
import ShareModal from '../components/ShareModal';
import Toast from '../components/Toast';

function TodoPage() {
  const { getMyTodos } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [shareData, setShareData] = useState(null);
  const [toast, setToast] = useState({ message: '', type: '' });
  const [filter, setFilter] = useState({
    priority: 'all',
    status: 'all',
    search: '',
  });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast({ message: '', type: '' });
  };

  const handleEdit = (todo) => {
    setEditData(todo);
    setIsModalOpen(true);
  };

  const handleShare = (todo) => {
    setShareData(todo);
    setIsShareOpen(true);
  };

  const handleAddNew = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const todos = getMyTodos();

  const filteredTodos = todos.filter((todo) => {
    const matchPriority =
      filter.priority === 'all' || todo.priority === filter.priority;
    const matchStatus =
      filter.status === 'all' ||
      (filter.status === 'completed' && todo.completed) ||
      (filter.status === 'active' && !todo.completed) ||
      (filter.status === 'overdue' && isOverdue(todo.deadline, todo.completed));
    const matchSearch =
      todo.title.toLowerCase().includes(filter.search.toLowerCase()) ||
      todo.description.toLowerCase().includes(filter.search.toLowerCase());
    return matchPriority && matchStatus && matchSearch;
  });

  const totalTodos = todos.length;
  const completedTodos = todos.filter((t) => t.completed).length;
  const overdueTodos = todos.filter((t) => isOverdue(t.deadline, t.completed)).length;

  return (
    <>
      <Navbar />
      <div className="todo-container">

        {/* Statistik */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {[
            { label: 'Total Tugas', value: totalTodos, color: '#4f46e5' },
            { label: 'Selesai', value: completedTodos, color: '#22c55e' },
            { label: 'Terlambat', value: overdueTodos, color: '#ef4444' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: 'white',
                padding: '16px 24px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                borderTop: `4px solid ${stat.color}`,
                flex: '1',
                minWidth: '120px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '28px', fontWeight: '700', color: stat.color }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '13px', color: '#888' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="todo-header">
          <h2>📋 Daftar Tugas Saya</h2>
          <button className="btn-add" onClick={handleAddNew}>
            ➕ Tambah Tugas
          </button>
        </div>

        {/* Filter */}
        <div className="filter-bar">
          <input
            type="text"
            placeholder="🔍 Cari tugas..."
            value={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          />
          <select
            value={filter.priority}
            onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
          >
            <option value="all">Semua Prioritas</option>
            <option value="high">🔴 Tinggi</option>
            <option value="medium">🟡 Sedang</option>
            <option value="low">🟢 Rendah</option>
          </select>
          <select
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          >
            <option value="all">Semua Status</option>
            <option value="active">Aktif</option>
            <option value="completed">Selesai</option>
            <option value="overdue">Terlambat</option>
          </select>
        </div>

        {/* Daftar Tugas */}
        <div className="todo-list">
          {filteredTodos.length === 0 ? (
            <div className="empty-state">
              <p style={{ fontSize: '48px' }}>📭</p>
              <p>Tidak ada tugas yang ditemukan</p>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                onEdit={handleEdit}
                onShare={handleShare}
                showToast={showToast}
              />
            ))
          )}
        </div>
      </div>

      {/* Modal Tambah/Edit */}
      <TodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editData={editData}
        showToast={showToast}
      />

      {/* Modal Share */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        todo={shareData}
        showToast={showToast}
      />

      {/* Toast Notifikasi */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />
    </>
  );
}

export default TodoPage;