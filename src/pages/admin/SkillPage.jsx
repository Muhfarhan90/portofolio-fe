import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "../../components/DataTable";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import ModalForm from "../../components/ModalForm";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const ITEMS_PER_PAGE = 10;

export default function SkillPage() {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    level: "",
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

  const fetchSkills = async (page = 1, perPage = 10, keyword = "") => {
    setIsLoading(true);
    try {
      const res = await axiosAuth.get(
        `/skills?page=${page}&per_page=${perPage}&search=${keyword}`
      );
      setSkills(res.data.data);
      setTotalItems(res.data.meta.total);
      setTotalPages(res.data.meta.last_page);
    } catch (error) {
      console.error("Gagal mengambil data skill:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills(currentPage, ITEMS_PER_PAGE, search);
  }, [currentPage, search]);

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      category: item.category,
      level: item.level,
    });
    setIsEdit(true);
    setEditingId(item.id);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin hapus skill ini?")) {
      await axiosAuth.delete(`/skills/${id}`);
      fetchSkills(currentPage, ITEMS_PER_PAGE, search);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await axiosAuth.put(`/skills/${editingId}`, formData);
      } else {
        await axiosAuth.post("/skills", formData);
      }
      setFormData({ name: "", category: "", level: "" });
      setIsEdit(false);
      setModalOpen(false);
      fetchSkills(currentPage, ITEMS_PER_PAGE, search);
    } catch (err) {
      console.error("Error menyimpan data:", err);
      alert("Gagal menyimpan data. Pastikan nama skill unik.");
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
        <h1 className="text-2xl font-bold">Manajemen Skill</h1>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          Tambah Skill
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
          headers={["#", "Nama", "Kategori", "Level"]}
          data={skills}
          onEdit={handleEdit}
          onDelete={handleDelete}
          renderRow={(item, index) => (
            <>
              <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
              <td>{item.name}</td>
              <td>{item.category ?? "-"}</td>
              <td>{item.level ?? "-"}</td>
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
        title={isEdit ? "Edit Skill" : "Tambah Skill"}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        isEdit={isEdit}
        formData={formData}
        setFormData={setFormData}
        fields={[
          {
            name: "name",
            label: "Nama Skill",
            type: "text",
            placeholder: "Contoh: React, Laravel",
            required: true,
          },
          {
            name: "category",
            label: "Kategori",
            type: "text",
            placeholder: "Contoh: Frontend, Backend",
            required: false,
          },
          {
            name: "level",
            label: "Level",
            type: "text",
            placeholder: "Contoh: Beginner, Intermediate, Expert",
            required: false,
          },
        ]}
      />
    </div>
  );
}
