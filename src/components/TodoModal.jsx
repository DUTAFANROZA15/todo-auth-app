import React, { useState, useEffect } from 'react';
import { useApp } from '../utils/AppContext';

function TodoModal({ isOpen, onClose, editData, showToast }) {
  const { addTodo, editTodo } = useApp();

  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    deadline: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title,
        description: editData.description,
        priority: editData.priority,
        deadline: editData.deadline,
      });
    } else {
      setForm({ title: '', description: '', priority: 'medium', deadline: '' });
    }
    setError('');
  }, [editData, isOpen]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.title.trim()) {
      setError('Judul tugas tidak boleh kosong!');
      return;
    }
    if (!form.deadline) {
      setError('Deadline tidak boleh kosong!');
      return;
    }

    if (editData) {
      editTodo(editData.id, form);
      showToast('Tugas berhasil diperbarui ✏️', 'success');
    } else {
      addTodo(form);
      showToast('Tugas baru berhasil ditambahkan ✅', 'success');
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{editData ? '✏️ Edit Tugas' : '➕ Tambah Tugas Baru'}</h3>

        <div className="form-group">
          <label>Judul Tugas</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Masukkan judul tugas..."
          />
        </div>

        <div className="form-group">
          <label>Deskripsi</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Masukkan deskripsi tugas..."
          />
        </div>

        <div className="form-group">
          <label>Prioritas</label>
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="high">🔴 Tinggi</option>
            <option value="medium">🟡 Sedang</option>
            <option value="low">🟢 Rendah</option>
          </select>
        </div>

        <div className="form-group">
          <label>Deadline</label>
          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Batal</button>
          <button className="btn-submit" onClick={handleSubmit}>
            {editData ? 'Simpan Perubahan' : 'Tambah Tugas'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoModal;