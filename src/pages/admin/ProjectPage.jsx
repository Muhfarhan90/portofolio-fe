import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "../../components/DataTable";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import ModalForm from "../../components/ModalForm";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const ITEMS_PER_PAGE = 10;

export default function ProjectPage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({ title: "", description: "" });
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

  useEffect(() => {
    fetchProjects(currentPage, ITEMS_PER_PAGE, search);
  }, [currentPage, search]);

  const fetchProjects = async (page = 1, perPage = 10, keyword = "") => {
    setIsLoading(true);
    try {
      const res = await axiosAuth.get(
        `/projects?page=${page}&per_page=${perPage}&search=${keyword}`
      );
      setProjects(res.data.data);
      setTotalItems(res.data.meta.total);
      setTotalPages(res.data.meta.last_page);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({ title: item.title, description: item.description, tech_stack: item.tech_stack, repo_url: item.repo_url, live_url: item.live_url });
    setIsEdit(true);
    setEditingId(item.slug);
    setModalOpen(true);
  };

  const handleDelete = async (slug) => {
    if (confirm("Yakin hapus?")) {
      await axiosAuth.delete(`/projects/${slug}`);
      fetchProjects(currentPage, ITEMS_PER_PAGE, search);
    }
  };

  const handleSubmit = async () => {
    if (isEdit) {
      await axiosAuth.put(`/projects/${editingId}`, formData);
    } else {
      await axiosAuth.post("/projects", formData);
    }
    setFormData({ title: "", description: "" });
    setIsEdit(false);
    setModalOpen(false);
    fetchProjects(currentPage, ITEMS_PER_PAGE, search);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manajemen Project</h1>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          Tambah Project
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
          headers={["#", "Judul", "Deskripsi"]}
          data={projects}
          onEdit={handleEdit}
          onDelete={handleDelete}
          renderRow={(item, index) => (
            <>
              <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
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
        title={isEdit ? "Edit Project" : "Tambah Project"}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        isEdit={isEdit}
        formData={formData}
        setFormData={setFormData}
        fields={[
          {
            name: "title",
            label: "Judul",
            type: "text",
            placeholder: "Masukkan judul project",
            required: true,
          },
          {
            name: "description",
            label: "Deskripsi",
            type: "textarea",
            placeholder: "Masukkan deskripsi singkat",
            required: true,
            },
          {
            name: "tech_stack",
            label: "Tech Stack",
            type: "string",
            placeholder: "Masukkan tech stack yang digunakan",
            required: false,
            },
            {
                name: "repo_url",
                label: "Repo URL",
                type: "string",
                placeholder: "Masukkan repo url projek anda",
                required: false,
            },
            {
                name: "live_url", 
                label: "Live URL",
                type: "string",
                placeholder: "Masukkan live url projek anda",
                required: false,
            },
            {
                name: "image",
                label: "Image",
                type: "file",
                required: false,
            }

        ]}
      />
    </div>
  );
}
