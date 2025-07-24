import { Pencil, Trash2 } from "lucide-react";

export default function DataTable({
  headers,
  data,
  onEdit,
  onDelete,
  renderRow,
}) {
  return (
    <div className="overflow-x-auto bg-base-100 rounded-xl shadow-md">
      <table className="table w-full">
        <thead className="bg-primary text-primary-content">
          <tr>
            {headers.map((head, i) => (
              <th key={i} className="text-sm font-bold">
                {head}
              </th>
            ))}
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length ? (
            data.map((item, index) => (
              <tr key={item.id} className="hover">
                {renderRow(item, index)}
                <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-warning text-white"
                    onClick={() => onEdit(item)}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className="btn btn-sm btn-error text-white"
                    onClick={() => onDelete(item.slug)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length + 1} className="text-center py-4">
                Tidak ada data.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
