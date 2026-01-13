import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Lock, ArrowLeft, CheckCircle, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import type { RootState, AppDispatch } from "../redux/store";
import { changePassword, clearError } from "../redux/authSlice";

export default function ChangePassword() {
  const dispatch = useDispatch<AppDispatch>();
  
  const { loading, error, successMessage } = useSelector((state: RootState) => state.auth);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // State để chuyển đổi giao diện khi thành công
  const [isSuccessUI, setIsSuccessUI] = useState(false);

  // Xử lý thông báo từ Redux
  useEffect(() => {
    if (successMessage === "Đổi mật khẩu thành công!") {
      setIsSuccessUI(true);
      toast.success(successMessage);
      dispatch(clearError());
    }
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [successMessage, error, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate cơ bản tại Frontend
    if (newPassword.length < 6) {
      toast.error("Mật khẩu mới phải ít nhất 6 ký tự");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Xác nhận mật khẩu không khớp");
      return;
    }

    // Gọi Action Redux Thunk
    dispatch(changePassword({ oldPassword, newPassword }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 w-full max-w-md">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-6">
          <div className={`p-4 rounded-2xl mb-3 ${isSuccessUI ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}>
            {isSuccessUI ? <CheckCircle size={38} /> : <Lock size={38} />}
          </div>

          <h2 className="text-xl font-bold">
            {isSuccessUI ? "Đã đổi mật khẩu" : "Đổi mật khẩu"}
          </h2>

          <p className="text-gray-500 text-sm mt-1 text-center">
            {isSuccessUI
              ? "Mật khẩu của bạn đã được cập nhật thành công."
              : "Nhập mật khẩu hiện tại và mật khẩu mới của bạn."}
          </p>
        </div>

        {isSuccessUI ? (
          /* Giao diện khi thành công */
          <div className="space-y-4">
            <Link
              to="/profile"
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3.5 rounded-xl flex justify-center transition-colors"
            >
              Quay lại hồ sơ
            </Link>
          </div>
        ) : (
          /* Form đổi mật khẩu */
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Mật khẩu cũ */}
            <div className="relative">
              <input
                type={showOld ? "text" : "password"}
                placeholder="Mật khẩu hiện tại"
                className="w-full px-4 py-3.5 pr-11 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowOld(!showOld)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                {showOld ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Mật khẩu mới */}
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                placeholder="Mật khẩu mới"
                className="w-full px-4 py-3.5 pr-11 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Xác nhận mật khẩu mới */}
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Xác nhận mật khẩu mới"
                className="w-full px-4 py-3.5 pr-11 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Nút Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-blue-200 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transition-all"
            >
              {loading ? "Đang xử lý..." : "Lưu mật khẩu mới"}
            </button>

            {/* Nút Quay lại */}
            <div className="flex justify-center">
              <Link
                to="/profile"
                className="text-gray-500 hover:text-gray-900 font-semibold flex items-center gap-2 transition-colors"
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