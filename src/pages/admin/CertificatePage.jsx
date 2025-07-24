import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "../../components/DataTable";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import ModalForm from "../../components/ModalForm";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const ITEMS_PER_PAGE = 10;

export default function CertificatePage() {
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    issued_date: "",
    certificate_url: "",
    description: "",
    is_active: false,
    image: null,
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

  const fetchCertificates = async (page = 1, perPage = 10, keyword = "") => {
    setIsLoading(true);
    try {
      const res = await axiosAuth.get(
        `/certificates?page=${page}&per_page=${perPage}&search=${keyword}`
      );
      setCertificates(res.data.data);
      setTotalItems(res.data.meta.total);
      setTotalPages(res.data.meta.last_page);
    } catch (error) {
      console.error("Gagal mengambil data sertifikat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates(currentPage, ITEMS_PER_PAGE, search);
  }, [currentPage, search]);

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      issuer: item.issuer,
      issued_date: item.issued_date,
      certificate_url: item.certificate_url,
      description: item.description,
      is_active: item.is_active,
      image: null, // Tidak pre-fill image
    });
    setIsEdit(true);
    setEditingId(item.id);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin hapus sertifikat ini?")) {
      await axiosAuth.delete(`/certificates/${id}`);
      fetchCertificates(currentPage, ITEMS_PER_PAGE, search);
    }
  };

  const handleSubmit = async () => {
    try {
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) form.append(key, formData[key]);
      });

      if (isEdit) {
        await axiosAuth.post(`/certificates/${editingId}?_method=PUT`, form);
      } else {
        await axiosAuth.post("/certificates", form);
      }

      setFormData({
        title: "",
        issuer: "",
        issued_date: "",
        certificate_url: "",
        description: "",
        is_active: false,
        image: null,
      });
      setIsEdit(false);
      setModalOpen(false);
      fetchCertificates(currentPage, ITEMS_PER_PAGE, search);
    } catch (err) {
      console.error("Gagal menyimpan sertifikat:", err);
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
        <h1 className="text-2xl font-bold">Manajemen Sertifikat</h1>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          Tambah Sertifikat
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
          headers={["#", "Judul", "Penerbit", "Tanggal", "Status"]}
          data={certificates}
          onEdit={handleEdit}
          onDelete={handleDelete}
          renderRow={(item, index) => (
            <>
              <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
              <td>{item.title}</td>
              <td>{item.issuer}</td>
              <td>{item.issued_date ?? "-"}</td>
              <td>{item.is_active ? "Aktif" : "Nonaktif"}</td>
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
        title={isEdit ? "Edit Sertifikat" : "Tambah Sertifikat"}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        isEdit={isEdit}
        formData={formData}
        setFormData={setFormData}
        isFormDataMultipart={true}
        fields={[
          {
            name: "title",
            label: "Judul Sertifikat",
            type: "text",
            required: true,
          },
          {
            name: "issuer",
            label: "Penerbit",
            type: "text",
            required: true,
          },
          {
            name: "issued_date",
            label: "Tanggal Diterbitkan",
            type: "date",
            required: false,
          },
          {
            name: "certificate_url",
            label: "URL Sertifikat",
            type: "text",
            required: false,
          },
          {
            name: "description",
            label: "Deskripsi",
            type: "textarea",
            required: false,
          },
          {
            name: "image",
            label: "Gambar Sertifikat",
            type: "file",
            required: false,
            accept: "image/*",
          },
          {
            name: "is_active",
            label: "Aktif?",
            type: "checkbox",
            required: false,
          },
        ]}
      />
    </div>
  );
}
