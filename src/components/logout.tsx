import { useEffect } from "react";

export default function LogoutComponent() {
  useEffect(() => {
    const logoutProcess = async () => {
      try {
        // Debugging: Logging token status before and after logout
        console.debug("Starting logout process...");
        console.debug("Before clearing userSession:", localStorage.getItem("userSession"));

        // Clear the user session from localStorage
        localStorage.removeItem("userSession");
        localStorage.removeItem("userData");

        console.debug("After clearing userSession:", localStorage.getItem("userSession"));

        // Redirect to login page with a logout success flag
        setTimeout(() => {
          console.debug("Redirecting to /login...");
          window.location.href = "/login?logoutSuccess=true";
        }, 1500); // Show spinner for 1.5 seconds before redirecting
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    logoutProcess();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        {/* Loading Animation */}
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
          <p className="text-lg font-bold text-blue-600">ログアウト中...</p>
        </div>
      </div>
    </div>
  );
}
