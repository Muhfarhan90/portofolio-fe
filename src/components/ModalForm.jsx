export default function ModalForm({
  title,
  open,
  onClose,
  onSubmit,
  fields = [],
  formData,
  setFormData,
  isEdit = false,
}) {
  if (!open) return null;

  const handleChange = (e, name) => {
    const { value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="modal modal-open backdrop-blur-sm">
      <div className="modal-box rounded-2xl shadow-xl border border-neutral-200">
        <h3 className="font-semibold text-lg text-gray-800 mb-4">{title}</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="space-y-5"
        >
          {fields.map((field) => (
            <div className="form-control" key={field.name}>
              <label className="label text-gray-700 font-medium mb-1">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(e, field.name)}
                  className="textarea textarea-bordered w-full"
                  placeholder={field.placeholder || ""}
                  required={field.required}
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(e, field.name)}
                  className="input input-bordered w-full"
                  placeholder={field.placeholder || ""}
                  required={field.required}
                />
              )}
            </div>
          ))}

          <div className="modal-action justify-end gap-2">
            <button type="submit" className="btn btn-primary">
              {isEdit ? "Update" : "Simpan"}
            </button>
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
