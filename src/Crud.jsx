import { useState, useMemo, useCallback, useRef, useEffect } from "react";

// ── utils ──────────────────────────────────────────────────────────────────
const STORAGE_KEY = "notevault_notes";

function loadNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveNotes(notes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (e) {
    console.error("Gagal simpan:", e);
  }
}

function formatDate(ts) {
  return new Date(ts).toLocaleString("id-ID", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

// ── sub-components ─────────────────────────────────────────────────────────
function Toast({ message, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-yellow-400 text-blue-950 font-semibold text-sm px-4 py-3 rounded-xl shadow-lg shadow-yellow-400/30 animate-bounce">
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
      {message}
    </div>
  );
}

function DeleteModal({ note, onConfirm, onCancel }) {
  if (!note) return null;
  return (
    <div
      className="fixed inset-0 z-40 bg-black/70 flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <div
        className="bg-[#0f2040] border border-yellow-400 rounded-2xl p-6 w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9.303 3.376c-.866 1.5-.217 3.374-1.948 3.374H4.646c-1.73 0-2.813-1.874-1.948-3.374L10.052 3.378c.866-1.5 3.032-1.5 3.898 0l6.353 12.748zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <h2 className="text-yellow-400 font-bold text-base">Hapus Catatan?</h2>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">
          Catatan <span className="text-white font-semibold">"{note.title}"</span> akan dihapus permanen dari penyimpanan lokal.
        </p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm text-slate-400 border border-[#1e3a6e] hover:border-slate-400 hover:text-white rounded-lg transition-all"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm text-white font-semibold bg-red-500 hover:bg-red-600 rounded-lg transition-all flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="relative bg-[#0f2040] border border-[#1e3a6e] rounded-xl p-4 hover:border-yellow-400 hover:-translate-y-0.5 transition-all duration-200">
      {/* gold accent bar */}
      <div className="absolute left-0 top-4 w-[3px] h-9 bg-yellow-400 rounded-r" />

      <h3 className="font-semibold text-[15px] text-white leading-snug mb-2 break-words">
        {note.title}
      </h3>

      {note.body && (
        <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-wrap break-words line-clamp-5">
          {note.body}
        </p>
      )}

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#1e3a6e]">
        <span className="text-[11px] text-[#2d4f8a] flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {formatDate(note.updatedAt || note.createdAt)}
        </span>
        <div className="flex gap-1">
          <button
            onClick={() => onEdit(note)}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:bg-[#1e3a6e] hover:text-yellow-400 transition-all"
            title="Edit"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(note)}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:bg-red-500/15 hover:text-red-400 transition-all"
            title="Hapus"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── main component ─────────────────────────────────────────────────────────
export default function NoteVault() {
  const [notes, setNotes]       = useState(loadNotes);
  const [title, setTitle]       = useState("");
  const [body, setBody]         = useState("");
  const [editId, setEditId]     = useState(null);
  const [search, setSearch]     = useState("");
  const [toDelete, setToDelete] = useState(null);
  const [toast, setToast]       = useState(null);
  const fileRef                 = useRef();

  // Auto-save
  useEffect(() => { saveNotes(notes); }, [notes]);

  const showToast = useCallback((msg) => {
    setToast(null);
    setTimeout(() => setToast(msg), 10);
  }, []);

  // CRUD
  const handleSave = () => {
    if (!title.trim()) return;
    if (editId) {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === editId
            ? { ...n, title: title.trim(), body: body.trim(), updatedAt: Date.now() }
            : n
        )
      );
      showToast("Catatan diperbarui!");
      setEditId(null);
    } else {
      setNotes((prev) => [
        { id: Date.now(), title: title.trim(), body: body.trim(), createdAt: Date.now() },
        ...prev,
      ]);
      showToast("Catatan disimpan!");
    }
    setTitle(""); setBody("");
  };

  const handleEdit = (note) => {
    setEditId(note.id); setTitle(note.title); setBody(note.body);
  };

  const handleCancelEdit = () => { setEditId(null); setTitle(""); setBody(""); };

  const handleDelete = () => {
    setNotes((prev) => prev.filter((n) => n.id !== toDelete.id));
    setToDelete(null);
    showToast("Catatan dihapus.");
  };

  const handleClearAll = () => {
    if (window.confirm("Yakin hapus SEMUA catatan? Tidak bisa dikembalikan.")) {
      setNotes([]);
      showToast("Semua catatan dihapus.");
    }
  };

  // Export
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(notes, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "catatan-notevault.json"; a.click();
    URL.revokeObjectURL(url);
    showToast("File JSON berhasil diunduh!");
  };

  // Import
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (!Array.isArray(data)) throw new Error();
        setNotes((prev) => {
          const ids = new Set(prev.map((n) => n.id));
          return [...data.filter((n) => !ids.has(n.id)), ...prev];
        });
        showToast(`${data.length} catatan berhasil diimpor!`);
      } catch {
        showToast("File tidak valid!");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const filtered = useMemo(() =>
    notes
      .filter((n) =>
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.body.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => b.createdAt - a.createdAt),
    [notes, search]
  );

  const totalWords = useMemo(
    () => notes.reduce((acc, n) => acc + n.body.split(/\s+/).filter(Boolean).length, 0),
    [notes]
  );

  return (
    <div className="min-h-screen bg-[#0a1628] text-slate-100 font-sans">

      {/* ── HEADER ── */}
      <header className="bg-[#0f2040] border-b-2 border-yellow-400 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-blue-950" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white leading-none">NoteVault</h1>
            <p className="text-[11px] text-slate-400 mt-0.5">Data tersimpan otomatis di browser</p>
          </div>
        </div>
        <span className="bg-yellow-400 text-blue-950 text-xs font-bold px-3 py-1.5 rounded-full">
          {notes.length} Catatan
        </span>
      </header>

      {/* ── LAYOUT ── */}
      <div className="flex">

        {/* ── SIDEBAR ── */}
        <aside className="w-[320px] shrink-0 bg-[#0f2040] border-r border-[#1e3a6e] flex flex-col gap-4 p-5 sticky top-[69px] h-[calc(100vh-69px)] overflow-y-auto">

          {/* Label */}
          <div className="flex items-center gap-2 text-yellow-400 text-[11px] font-semibold uppercase tracking-widest">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
            </svg>
            {editId ? "Edit Catatan" : "Tambah Catatan"}
          </div>

          {/* Judul */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-400 font-medium">Judul *</label>
            <input
              className="w-full bg-[#0a1628] border border-[#1e3a6e] text-slate-100 placeholder-[#2d4f8a] rounded-lg px-3.5 py-2.5 text-sm outline-none transition-all focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
              placeholder="Judul catatan..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSave(); }}
            />
          </div>

          {/* Body */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-400 font-medium">Catatan / Notes</label>
            <textarea
              className="w-full bg-[#0a1628] border border-[#1e3a6e] text-slate-100 placeholder-[#2d4f8a] rounded-lg px-3.5 py-2.5 text-sm outline-none transition-all focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 resize-y min-h-[120px] leading-relaxed"
              placeholder="Tulis isi catatan di sini..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>

          {/* Simpan */}
          <button
            onClick={handleSave}
            disabled={!title.trim()}
            className="w-full bg-yellow-400 hover:bg-yellow-300 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-blue-950 font-bold text-sm py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
            {editId ? "Update Catatan" : "Simpan Catatan"}
          </button>

          {editId && (
            <button
              onClick={handleCancelEdit}
              className="w-full border border-[#1e3a6e] hover:border-yellow-400 hover:text-yellow-400 text-slate-400 font-medium text-sm py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Batal Edit
            </button>
          )}

          {/* Divider */}
          <div className="border-t border-[#1e3a6e]" />

          {/* Stats */}
          <div className="flex gap-2.5">
            {[["Catatan", notes.length], ["Kata", totalWords]].map(([label, value]) => (
              <div key={label} className="flex-1 bg-[#0a1628] border border-[#1e3a6e] rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-yellow-400">{value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-[#1e3a6e]" />

          {/* Data actions label */}
          <div className="flex items-center gap-2 text-yellow-400 text-[11px] font-semibold uppercase tracking-widest">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
            </svg>
            Data Lokal
          </div>

          <button
            onClick={handleExport}
            className="w-full border border-[#1e3a6e] hover:border-yellow-400 hover:text-yellow-400 text-slate-400 text-sm py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Export JSON
          </button>

          <button
            onClick={() => fileRef.current.click()}
            className="w-full border border-[#1e3a6e] hover:border-yellow-400 hover:text-yellow-400 text-slate-400 text-sm py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            Import JSON
            <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
          </button>

          <button
            onClick={handleClearAll}
            className="mt-auto w-full border border-red-900/50 hover:border-red-500 text-red-400 hover:text-red-300 text-sm py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
            Hapus Semua
          </button>
        </aside>

        {/* ── NOTES PANEL ── */}
        <main className="flex-1 bg-[#0d1b35] p-6 min-h-[calc(100vh-69px)]">
          {/* Panel header */}
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
              Semua Catatan ({filtered.length})
            </span>
            <div className="relative">
              <svg className="w-4 h-4 text-[#2d4f8a] absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z" />
              </svg>
              <input
                className="bg-[#0f2040] border border-[#1e3a6e] text-slate-100 placeholder-[#2d4f8a] text-sm rounded-lg pl-9 pr-4 py-2 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 w-52 transition-all"
                placeholder="Cari catatan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-3 py-24 select-none">
              <svg className="w-14 h-14 text-[#1e3a6e]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <p className="text-slate-500 text-[15px]">
                {search ? "Catatan tidak ditemukan" : "Belum ada catatan"}
              </p>
              <p className="text-sm text-[#1e3a6e]">
                {search ? "Coba kata kunci lain" : "Tambahkan catatan pertamamu di panel kiri"}
              </p>
            </div>
          )}

          {/* Grid */}
          {filtered.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEdit={handleEdit}
                  onDelete={setToDelete}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Modals & Toast */}
      <DeleteModal
        note={toDelete}
        onConfirm={handleDelete}
        onCancel={() => setToDelete(null)}
      />
      {toast && (
        <Toast key={toast + Date.now()} message={toast} onDone={() => setToast(null)} />
      )}
    </div>
  );
}