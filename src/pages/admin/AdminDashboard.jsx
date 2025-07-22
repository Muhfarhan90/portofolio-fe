import AdminLayout from "../../layouts/AdminLayout";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">
        Selamat datang di CMS Portfolio
      </h1>
      <p className="text-base text-gray-600">
        Gunakan menu di sidebar kiri untuk mengelola konten portofolio Anda
        seperti Projects, Skills, Certificates, dan lainnya.
      </p>
    </AdminLayout>
  );
}
