import React from 'react';
import { useApp } from '../utils/AppContext';
import { users } from '../data/todoData';

function ShareModal({ isOpen, onClose, todo, showToast }) {
  const { shareTodo, state } = useApp();

  if (!isOpen || !todo) return null;

  const otherUsers = users.filter((u) => u.id !== state.currentUser?.id);

  const handleShare = (userId) => {
    if (todo.sharedWith.includes(userId)) {
      showToast('Tugas sudah dibagikan ke user ini', 'error');
      return;
    }
    shareTodo(todo.id, userId);
    showToast('Tugas berhasil dibagikan 🔗', 'success');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>🔗 Bagikan Tugas</h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
          Pilih pengguna yang ingin melihat tugas: <strong>{todo.title}</strong>
        </p>

        {otherUsers.map((user) => (
          <div
            key={user.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              border: '1px solid #eee',
              borderRadius: '8px',
              marginBottom: '8px',
            }}
          >
            <span style={{ fontWeight: '600' }}>👤 {user.name}</span>
            {todo.sharedWith.includes(user.id) ? (
              <span style={{ color: '#22c55e', fontSize: '13px' }}>
                ✓ Sudah dibagikan
              </span>
            ) : (
              <button className="btn-share" onClick={() => handleShare(user.id)}>
                Bagikan
              </button>
            )}
          </div>
        ))}

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Tutup</button>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;