import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "../../components/DataTable";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import ModalForm from "../../components/ModalForm";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const ITEMS_PER_PAGE = 10;

export default function EducationPage() {
  const [educations, setEducations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    institution: "",
    degree: "",
    major: "",
    start_year: "",
    end_year: "",
    location: "",
    gpa: "",
    is_current: false,
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

  const fetchEducations = async (page = 1, perPage = 10, keyword = "") => {
    setIsLoading(true);
    try {
      const res = await axiosAuth.get(
        `/educations?page=${page}&per_page=${perPage}&search=${keyword}`
      );
      setEducations(res.data.data);
      setTotalItems(res.data.meta.total);
      setTotalPages(res.data.meta.last_page);
    } catch (error) {
      console.error("Gagal mengambil data pendidikan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEducations(currentPage, ITEMS_PER_PAGE, search);
  }, [currentPage, search]);

  const handleEdit = (item) => {
    setFormData({
      institution: item.institution,
      degree: item.degree,
      major: item.major,
      start_year: item.start_year,
      end_year: item.end_year,
      location: item.location,
      gpa: item.gpa,
      is_current: item.is_current,
      description: item.description,
    });
    setIsEdit(true);
    setEditingId(item.id);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin hapus data pendidikan ini?")) {
      await axiosAuth.delete(`/educations/${id}`);
      fetchEducations(currentPage, ITEMS_PER_PAGE, search);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await axiosAuth.put(`/educations/${editingId}`, formData);
      } else {
        await axiosAuth.post("/educations", formData);
      }

      setFormData({
        institution: "",
        degree: "",
        major: "",
        start_year: "",
        end_year: "",
        location: "",
        gpa: "",
        is_current: false,
        description: "",
      });
      setIsEdit(false);
      setModalOpen(false);
      fetchEducations(currentPage, ITEMS_PER_PAGE, search);
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
        <h1 className="text-2xl font-bold">Manajemen Pendidikan</h1>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          Tambah Pendidikan
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
          headers={["#", "Institusi", "Jurusan", "Periode", "Aktif"]}
          data={educations}
          onEdit={handleEdit}
          onDelete={handleDelete}
          renderRow={(item, index) => (
            <>
              <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
              <td>{item.institution}</td>
              <td>{item.major ?? "-"}</td>
              <td>
                {item.start_year} -{" "}
                {item.is_current ? "Sekarang" : item.end_year ?? "-"}
              </td>
              <td>{item.is_current ? "Ya" : "Tidak"}</td>
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
        title={isEdit ? "Edit Pendidikan" : "Tambah Pendidikan"}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        isEdit={isEdit}
        formData={formData}
        setFormData={setFormData}
        fields={[
          {
            name: "institution",
            label: "Nama Institusi",
            type: "text",
            required: true,
          },
          {
            name: "degree",
            label: "Gelar",
            type: "text",
            required: false,
          },
          {
            name: "major",
            label: "Jurusan",
            type: "text",
            required: false,
          },
          {
            name: "start_year",
            label: "Tahun Mulai",
            type: "number",
            required: false,
          },
          {
            name: "end_year",
            label: "Tahun Selesai",
            type: "number",
            required: false,
          },
          {
            name: "location",
            label: "Lokasi",
            type: "text",
            required: false,
          },
          {
            name: "gpa",
            label: "IPK",
            type: "number",
            step: "0.01",
            required: false,
          },
          {
            name: "is_current",
            label: "Masih Belajar?",
            type: "checkbox",
            required: false,
          },
          {
            name: "description",
            label: "Deskripsi",
            type: "textarea",
            required: false,
          },
        ]}
      />
    </div>
  );
}
