"use client"; // Add this at the top

import { useAuth } from "../../context/RoleContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = (role: string) => {
    login(role);
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Login as:</h1>
      <button
        onClick={() => handleLogin("admin")}
        className="mb-2 p-2 bg-blue-500 text-white rounded"
      >
        Admin
      </button>
      <button
        onClick={() => handleLogin("editor")}
        className="mb-2 p-2 bg-green-500 text-white rounded"
      >
        Editor
      </button>
      <button
        onClick={() => handleLogin("viewer")}
        className="p-2 bg-yellow-500 text-white rounded"
      >
        Viewer
      </button>
    </div>
  );
}