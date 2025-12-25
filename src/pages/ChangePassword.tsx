import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Lock, ArrowLeft, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      toast.error("Mật khẩu mới phải ít nhất 6 ký tự");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Xác nhận mật khẩu không khớp");
      return;
    }

    setLoading(true);

    // Giả lập API
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      toast.success("Đổi mật khẩu thành công!");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 w-full max-w-md">

        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-100 text-blue-600 p-4 rounded-2xl mb-3">
            {success ? <CheckCircle size={38} /> : <Lock size={38} />}
          </div>

          <h2 className="text-xl font-bold">
            {success ? "Đã đổi mật khẩu" : "Đổi mật khẩu"}
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            {success
              ? "Mật khẩu của bạn đã được cập nhật."
              : "Nhập mật khẩu hiện tại và mật khẩu mới."}
          </p>
        </div>

        {success ? (
          <Link
            to="/profile"
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3.5 rounded-xl flex justify-center"
          >
            Quay lại hồ sơ
          </Link>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="password"
              placeholder="Mật khẩu hiện tại"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Mật khẩu mới"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Xác nhận mật khẩu mới"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-blue-200 shadow-lg disabled:opacity-70"
            >
              {loading ? "Đang cập nhật..." : "Lưu mật khẩu mới"}
            </button>

            <div className="flex justify-center">
              <Link
                to="/profile"
                className="text-gray-500 hover:text-gray-900 font-semibold flex items-center gap-2"
              >
                <ArrowLeft size={16} /> Quay lại hồ sơ
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
