import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateProfile, clearError } from "../redux/authSlice";

export default function Profile() {
  const dispatch = useAppDispatch();
  const { user, successMessage } = useAppSelector(state => state.auth);

  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? ""
  });

  const [showPopup, setShowPopup] = useState(false);
  const [submitted, setSubmitted] = useState(false); 

  useEffect(() => {
    if (submitted && successMessage) {
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
        setSubmitted(false);
        dispatch(clearError()); 
      }, 2000);
    }
  }, [successMessage, submitted, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);        
    dispatch(updateProfile(form));
  };

  return (
    <div className="max-w-3xl mx-auto mt-16 bg-white rounded-3xl shadow-xl p-8">

      <h1 className="text-3xl font-black mb-6 text-center">
        Hồ sơ người dùng
      </h1>

      {/* POPUP SUCCESS — bottom center */}
      {showPopup && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 
                        bg-green-500 text-white px-5 py-3 
                        rounded-xl shadow-lg animate-fade-in">
           Cập nhật hồ sơ thành công!
        </div>
      )}

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

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input label="Tên người dùng" name="name"
               value={form.name}
               onChange={e => setForm({ ...form, name: e.target.value })} />

        <Input label="Email" name="email"
               value={form.email}
               onChange={e => setForm({ ...form, email: e.target.value })} />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500
                     text-white py-4 rounded-2xl font-bold transition">
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
}

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
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
