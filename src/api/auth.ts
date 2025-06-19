export async function loginApi(id: string, password: string): Promise<string> {
  // 실제 서비스에서는 백엔드 API 연동
  if (id === "admin" && password === "admin123") {
    return new Promise((resolve) => setTimeout(() => resolve("fake-jwt-token-123456"), 500));
  } else {
    return Promise.reject("ID 또는 비밀번호가 틀렸습니다.");
  }
}
