import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { updateProfile } from '../redux/authSlice';

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
  }, [user]);

  if (!user) {
    return <p className="text-center mt-20">Vui lòng đăng nhập</p>;
  }

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(updateProfile(form));
    alert('Cập nhật thông tin thành công!');
  };

  return (
    <div className="max-w-3xl mx-auto mt-16 bg-white rounded-3xl shadow-xl p-8">
      <h1 className="text-3xl font-black mb-8">👤 Hồ sơ người dùng</h1>

      <div className="flex items-center gap-6 mb-8">
        <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold uppercase">
          {user.name?.charAt(0)}
        </div>
        <div>
          <p className="text-xl font-bold">{user.name}</p>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input label="Tên người dùng" name="name" value={form.name} onChange={handleChange} />
        <Input label="Email" name="email" value={form.email} onChange={handleChange} />
        <Input label="Số điện thoại" name="phone" value={form.phone} onChange={handleChange} />
        <Input label="Địa chỉ" name="address" value={form.address} onChange={handleChange} />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold transition"
        >
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block mb-1 font-semibold text-gray-600">{label}</label>
      <input
        {...props}
        className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
}
