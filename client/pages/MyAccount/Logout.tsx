import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      await logout();
      navigate("/login");
    };
    doLogout();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-[10px] border border-[#d9d9d9] p-8">
        <p className="text-gray-500">Logging out...</p>
      </div>
    </div>
  );
}