export default function Pagination({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-2">
      <p className="text-sm text-gray-600">
        Menampilkan {startItem} - {endItem} dari {totalItems} data
      </p>
      <div className="flex gap-2">
        <button
          className="btn btn-sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Sebelumnya
        </button>
        <span className="text-sm px-2">
          Halaman {currentPage} dari {totalPages}
        </span>
        <button
          className="btn btn-sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Selanjutnya
        </button>
      </div>
    </div>
  );
}
