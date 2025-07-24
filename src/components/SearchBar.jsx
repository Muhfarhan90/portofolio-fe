export default function SearchBar({ value, onChange }) {
  return (
    <div className="form-control mb-4 max-w-md">
      <input
        type="text"
        placeholder="Cari berdasarkan nama..."
        className="input input-bordered w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
