import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateProfile, clearError } from "../redux/authSlice";

export default function Profile() {
  const dispatch = useAppDispatch();
  const { user, successMessage } = useAppSelector(state => state.auth);

  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    if (submitted && successMessage) {
      setOpenPopup(true);
      setSubmitted(false);

      setTimeout(() => {
        dispatch(clearError());
      }, 2000);
    }
  }, [submitted, successMessage, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    dispatch(updateProfile(form));
  };

  return (
    <>
      <div className="max-w-3xl mx-auto mt-16 bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-3xl font-black mb-6 text-center">
          Hồ sơ người dùng
        </h1>

        {/* Avatar */}
        <div className="flex items-center gap-6 mb-8 justify-center">
          <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600
                          flex items-center justify-center text-3xl font-bold uppercase">
            {user?.name?.charAt(0) ?? "U"}
          </div>

          <div className="text-center">
            <p className="text-xl font-bold">{user?.name ?? "No name"}</p>
            <p className="text-gray-500">{user?.email ?? "No email"}</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Tên người dùng"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />

          <Input
            label="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500
                       text-white py-4 rounded-2xl font-bold transition">
            Lưu thay đổi
          </button>

          <p className="text-center mt-4">
            <Link
              to="/change-password"
              className="text-blue-600 font-semibold hover:underline"
            >
              Thay đổi mật khẩu
            </Link>
          </p>
        </form>
      </div>

      {/* POPUP THÔNG BÁO THÀNH CÔNG */}
      {openPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-[320px] text-center animate-fade-in">

            <div className="mx-auto bg-green-100 text-green-600
                            w-14 h-14 flex items-center justify-center rounded-full mb-3">
              <CheckCircle size={34} />
            </div>

            <h3 className="text-lg font-bold">Cập nhật thành công</h3>
            <p className="text-gray-500 text-sm mt-1">
              Hồ sơ của bạn đã được lưu.
            </p>

            <button
              onClick={() => setOpenPopup(false)}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl">
              Đóng
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function Input({ label, ...props }:
  { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block mb-1 font-semibold text-gray-600">{label}</label>
      <input
        {...props}
        className="w-full px-4 py-3 rounded-xl border
                   focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
}
