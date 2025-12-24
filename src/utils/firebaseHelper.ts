export const transformFirebaseData = (data: any) => {
  if (!data) return [];
  
  // Nếu dữ liệu đã là Mảng (do json-server trả về) -> Trả về luôn, không cần sửa
  if (Array.isArray(data)) {
    return data;
  }
  
  // Nếu dữ liệu là Object (do Firebase trả về) -> Chuyển thành Mảng
  return Object.keys(data).map(key => ({
    id: key,
    ...data[key]
  }));
};