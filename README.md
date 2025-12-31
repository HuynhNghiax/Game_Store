# 🎮 GameStore - Nền tảng thương mại điện tử Game

![Banner](https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop)

[![React](https://img.shields.io/badge/React-18.x-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux-Toolkit-purple?logo=redux)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Realtime_DB-orange?logo=firebase)](https://firebase.google.com/)
[![Vite](https://img.shields.io/badge/Vite-Build_Tool-646CFF?logo=vite)](https://vitejs.dev/)

> **GameStore** là một dự án Front-end mô phỏng cửa hàng bán game bản quyền. Dự án tập trung vào việc áp dụng các kỹ thuật nâng cao của React Ecosystem như TypeScript, Redux Toolkit, Lazy Loading và kiến trúc Hybrid Backend.

---

## 🚀 Demo Trực Tiếp (Live Preview)

Trải nghiệm dự án tại đây:

### 👉 [BẤM VÀO ĐÂY ĐỂ XEM DEMO](https://huynhnghiax.github.io/Game_Store/)

---

## ✨ Tính năng nổi bật

### 1. Hệ thống "Hybrid Backend" thông minh 🧠
Đây là điểm đặc biệt nhất của dự án. Hệ thống tự động nhận diện môi trường để chuyển đổi nguồn dữ liệu:
* **Môi trường Dev (Local):** Sử dụng `Json-Server` để phản hồi nhanh, dễ dàng debug và sửa đổi dữ liệu mẫu. Dữ liệu trả về dạng Array.
* **Môi trường Production (GitHub Pages):** Tự động chuyển sang `Firebase Realtime Database` để đảm bảo dữ liệu trực tuyến, truy cập mọi lúc mọi nơi. Dữ liệu trả về dạng Object được adapter xử lý tự động.

### 2. Chức năng người dùng
* **Authentication:** Đăng ký và Đăng nhập (Data được đồng bộ lên Firebase).
* **Giỏ hàng (Cart):** Thêm/Xóa sản phẩm, tính tổng tiền. Dữ liệu lưu `LocalStorage` giúp trải nghiệm nhanh tức thì.
* **Yêu thích (Wishlist):** Lưu các game quan tâm vào danh sách riêng.
* **Lịch sử đơn hàng:** Xem lại các game đã mua và thời gian mua.

### 3. Trải nghiệm & Giao diện
* **Tìm kiếm:** Tìm kiếm game theo tên (Debounce Search).
* **Responsive:** Giao diện tương thích hoàn toàn trên Mobile, Tablet và Desktop.
* **Hiệu suất:** Tối ưu hóa tốc độ tải trang với Vite và Lazy Loading Components.

---

## 📸 Ảnh chụp màn hình (Screenshots)

| Trang chủ | Giỏ hàng |
| --- | --- |
| ![Home](https://scontent.fsgn24-2.fna.fbcdn.net/v/t1.15752-9/607981768_2894952540716067_8961944891577832026_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=9f807c&_nc_ohc=bqvll6hVouwQ7kNvwHNb0rh&_nc_oc=AdmbhROUgdkkWrTXMHV0j57hILJ7ZvO6d0CnrdzoiHpvUYhzD8kejerTwFcuKkQQHA0&_nc_zt=23&_nc_ht=scontent.fsgn24-2.fna&oh=03_Q7cD4QHUQhE9d6yBhxdZlJjPN65yrRvjL4sKjAXPdBwNrh0iFg&oe=697CAF10) | ![Category](https://scontent.fsgn24-2.fna.fbcdn.net/v/t1.15752-9/607013788_3915709358720424_2910925806216743065_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=9f807c&_nc_ohc=gaXn2oB9AfUQ7kNvwEO0y9L&_nc_oc=Admqd79P_5PEzPGANeLTziBPew2w2oo6p9bKF71EjOa6auz_hQTuc-Qa5EAt9vLioyQ&_nc_zt=23&_nc_ht=scontent.fsgn24-2.fna&oh=03_Q7cD4QFWm-_2xyJTbvswNvj3C6r2qR_A_p68MbtpnuPVNrW9eA&oe=697CC794) |
---

## 🛠 Công nghệ sử dụng

| Hạng mục | Công nghệ | Chi tiết |
| --- | --- | --- |
| **Core** | React JS, TypeScript | Component-based, Type safety |
| **Build Tool** | Vite | Tốc độ build cực nhanh |
| **State Mngt** | Redux Toolkit | Quản lý Global State (Cart, User, Products) |
| **Styling** | Tailwind CSS v4 | Utility-first CSS framework |
| **Icons** | Lucide React | Bộ icon hiện đại, nhẹ |
| **Routing** | React Router DOM | Xử lý điều hướng, Protected Routes |
| **Deploy** | GitHub Pages | Hosting tĩnh miễn phí |

---

## 💻 Hướng dẫn cài đặt (Run Locally)

Nếu bạn muốn chạy dự án này trên máy cá nhân, hãy làm theo các bước sau:

### Bước 1: Clone dự án
```bash
git clone [https://github.com/](https://github.com/)[TEN_GITHUB_CUA_BAN]/[TEN_REPO_CUA_BAN].git
cd [TEN_REPO_CUA_BAN]
```

### Bước 2: Cài đặt thư viện
```bash
npm install
```

### Bước 3: Cấu hình môi trường
Tạo file `.env` tại thư mục gốc và thêm nội dung sau để chạy Json-Server:
```properties
VITE_API_URL=http://localhost:3000
VITE_SERVER_TYPE=json-server
```

### Bước 4: Khởi chạy
Bạn cần mở **2 Terminal** riêng biệt:

**Terminal 1 (Chạy Server giả lập):**
```bash
npx json-server --watch db.json --port 3000
```

**Terminal 2 (Chạy React App):**
```bash
npm run dev
```

Truy cập `http://localhost:5173` để xem kết quả.

---

## 📂 Cấu trúc thư mục

```text
src/
├── components/      # Các thành phần giao diện (Header, GameCard, Sidebar...)
├── pages/           # Các trang chính (Home, Login, Cart, NotFound...)
├── redux/           # Redux Store, Slices (Logic xử lý dữ liệu)
├── routers/         # Cấu hình đường dẫn và Lazy loading modules
├── types/           # Định nghĩa TypeScript Interfaces (User, Game, Order...)
├── utils/           # Các hàm hỗ trợ (Format tiền, Adapter Firebase...)
├── App.tsx          # Component gốc
└── main.tsx         # Điểm khởi đầu ứng dụng
```

---

## 🤝 Liên hệ

Dự án được thực hiện bởi **[TÊN CỦA BẠN]**.
Nếu bạn thấy dự án hữu ích, hãy để lại cho mình 1 ⭐ nhé!

* GitHub: [[Link Profile GitHub](https://github.com/HuynhNghiax)]
* Email: [nghianoel2k4@gmail.com]