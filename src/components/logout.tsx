import { useEffect } from "react";

export default function LogoutComponent() {
  useEffect(() => {
    const logoutProcess = async () => {
      try {
        // Debug: Simulate storing and clearing user token
        console.log("Simulating logout process...");
        localStorage.setItem("userToken", "EccUser"); // For testing purposes
        console.log("Before clearing:", localStorage.getItem("userToken"));

        // Clear user token
        localStorage.removeItem("userToken");
        console.log("After clearing:", localStorage.getItem("userToken"));

        // Redirect to login page with a toast
        console.log("Redirecting to /login...");
        setTimeout(() => {
          window.location.href = "/login?logoutSuccess=true";
        }, 1500); // Delay for spinner display
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    logoutProcess();
  }, []);

  return (
    // loading animation stil buggy
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
          <p className="text-lg font-bold text-blue-600">ログアウト中...</p>
        </div>
      </div>
    </div>
  );
}
