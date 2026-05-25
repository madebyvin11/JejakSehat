import { useState, useEffect } from "react";

export default function NotesUploader() {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);

  // Load data dari localStorage saat pertama kali dibuka
  useEffect(() => {
    const data = localStorage.getItem("notes-data");

    if (data) {
      setSavedNotes(JSON.parse(data));
    }
  }, []);

  // Simpan ke localStorage
  const saveToLocal = (updatedData) => {
    localStorage.setItem("notes-data", JSON.stringify(updatedData));
  };

  // Tambah note
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !notes) return;

    const newNote = {
      id: Date.now(),
      title,
      notes,
    };

    const updatedNotes = [newNote, ...savedNotes];

    setSavedNotes(updatedNotes);
    saveToLocal(updatedNotes);

    setTitle("");
    setNotes("");
  };

  // Hapus note
  const deleteNote = (id) => {
    const filtered = savedNotes.filter((note) => note.id !== id);

    setSavedNotes(filtered);
    saveToLocal(filtered);
  };

  return (
    <div className="min-h-screen bg-[#071739] text-white p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 mb-2">
          Notes Upload
        </h1>

        <p className="text-gray-300 mb-8">
          Simpan judul dan catatan langsung di browser tanpa server.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#0b2454] p-6 rounded-3xl shadow-2xl border border-yellow-400/20"
        >
          <div className="mb-5">
            <label className="block mb-2 text-yellow-300 font-semibold">
              Judul
            </label>

            <input
              type="text"
              placeholder="Masukkan judul..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 rounded-2xl bg-[#102d67] border border-transparent focus:border-yellow-400 outline-none transition-all"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-yellow-300 font-semibold">
              Notes
            </label>

            <textarea
              placeholder="Tulis notes..."
              rows="5"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-4 rounded-2xl bg-[#102d67] border border-transparent focus:border-yellow-400 outline-none transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            className="bg-yellow-400 text-[#071739] font-bold px-6 py-3 rounded-2xl hover:scale-105 transition-transform"
          >
            Upload Notes
          </button>
        </form>

        {/* List Notes */}
        <div className="mt-10 grid gap-5">
          {savedNotes.length === 0 ? (
            <div className="text-center text-gray-400 py-10">
              Belum ada notes disimpan.
            </div>
          ) : (
            savedNotes.map((note) => (
              <div
                key={note.id}
                className="bg-[#0b2454] p-5 rounded-3xl border border-yellow-400/10 shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-yellow-300">
                      {note.title}
                    </h2>

                    <p className="text-gray-300 mt-3 whitespace-pre-wrap">
                      {note.notes}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteNote(note.id)}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl text-sm font-semibold transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}