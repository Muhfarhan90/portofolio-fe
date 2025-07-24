import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "../../components/DataTable";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import ModalForm from "../../components/ModalForm";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const ITEMS_PER_PAGE = 10;

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    company_name: "",
    role: "",
    start_date: "",
    end_date: "",
    description: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const token = localStorage.getItem("auth_token");
  const axiosAuth = axios.create({
    baseURL: API_URL,
    headers: { Authorization: `Bearer ${token}` },
  });

  const fetchExperiences = async (page = 1, perPage = 10, keyword = "") => {
    setIsLoading(true);
    try {
      const res = await axiosAuth.get(
        `/experiences?page=${page}&per_page=${perPage}&search=${keyword}`
      );
      setExperiences(res.data.data);
      setTotalItems(res.data.meta.total);
      setTotalPages(res.data.meta.last_page);
    } catch (error) {
      console.error("Gagal mengambil data experience:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences(currentPage, ITEMS_PER_PAGE, search);
  }, [currentPage, search]);

  const handleEdit = (item) => {
    setFormData({
      company_name: item.company_name,
      role: item.role,
      start_date: item.start_date,
      end_date: item.end_date,
      description: item.description,
    });
    setIsEdit(true);
    setEditingId(item.id);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin hapus pengalaman ini?")) {
      await axiosAuth.delete(`/experiences/${id}`);
      fetchExperiences(currentPage, ITEMS_PER_PAGE, search);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await axiosAuth.put(`/experiences/${editingId}`, formData);
      } else {
        await axiosAuth.post("/experiences", formData);
      }
      setFormData({
        company_name: "",
        role: "",
        start_date: "",
        end_date: "",
        description: "",
      });
      setIsEdit(false);
      setModalOpen(false);
      fetchExperiences(currentPage, ITEMS_PER_PAGE, search);
    } catch (err) {
      console.error("Gagal menyimpan data:", err);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manajemen Pengalaman</h1>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          Tambah Pengalaman
        </button>
      </div>

      <SearchBar value={search} onChange={setSearch} />

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-3 gap-4 items-center border-b py-2"
            >
              <div className="skeleton h-4 w-10"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-3/4"></div>
            </div>
          ))}
        </div>
      ) : (
        <DataTable
          headers={["#", "Perusahaan", "Role", "Tanggal", "Deskripsi"]}
          data={experiences}
          onEdit={handleEdit}
          onDelete={handleDelete}
          renderRow={(item, index) => (
            <>
              <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
              <td>{item.company_name}</td>
              <td>{item.role}</td>
              <td>
                {item.start_date} s/d {item.end_date ?? "Sekarang"}
              </td>
              <td>{item.description ?? "-"}</td>
            </>
          )}
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
      />

      <ModalForm
        title={isEdit ? "Edit Pengalaman" : "Tambah Pengalaman"}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        isEdit={isEdit}
        formData={formData}
        setFormData={setFormData}
        fields={[
          {
            name: "company_name",
            label: "Nama Perusahaan",
            type: "text",
            placeholder: "Contoh: Google",
            required: true,
          },
          {
            name: "role",
            label: "Jabatan",
            type: "text",
            placeholder: "Contoh: Software Engineer",
            required: true,
          },
          {
            name: "start_date",
            label: "Tanggal Mulai",
            type: "date",
            required: false,
          },
          {
            name: "end_date",
            label: "Tanggal Selesai",
            type: "date",
            required: false,
          },
          {
            name: "description",
            label: "Deskripsi",
            type: "textarea",
            placeholder: "Tuliskan deskripsi singkat...",
            required: false,
          },
        ]}
      />
    </div>
  );
}
