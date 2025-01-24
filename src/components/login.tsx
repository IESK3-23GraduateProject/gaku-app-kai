import { useState, useEffect } from "react";

export default function LoginComponent() {
  const [status, setStatus] = useState<
    "loading" | "success" | "greeting" | null
  >(null);
  const [username, setUsername] = useState("");
  const [logoutSuccess, setLogoutSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("logoutSuccess") === "true") {
      setLogoutSuccess(true);
      const url = new URL(window.location.href);
      url.searchParams.delete("logoutSuccess");
      window.history.replaceState({}, document.title, url.toString());
      setTimeout(() => setLogoutSuccess(false), 3000);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const userId = formData.get("UserId") as string;
    const pass = formData.get("pass") as string;

    setStatus("loading");

    try {
      const response = await fetch("http://localhost:3000/login/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, pass }),
      });

      const data = await response.json();

      if (data.success) {
        const sessionExpiration = new Date().getTime() + 30 * 60 * 1000;
        const sessionData = { userId, sessionExpiration };
        localStorage.setItem("userSession", JSON.stringify(sessionData));
        localStorage.setItem("userData", JSON.stringify(data.data[0]));

        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          setUsername(userData.user_name);
        }
        setStatus("success");

        setTimeout(() => {
          setStatus("greeting");
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        }, 1000);
      } else {
        setStatus(null);
        alert(data.message || "ログインに失敗しました。もう一度お試しください。");
      }
    } catch (error) {
      setStatus(null);
      alert("ログインエラーが発生しました。ネットワークを確認してください。");
    }
  };

  useEffect(() => {
    const sessionData = localStorage.getItem("userSession");
    if (sessionData) {
      const { sessionExpiration } = JSON.parse(sessionData);
      const currentTime = new Date().getTime();
      if (currentTime > sessionExpiration) {
        localStorage.removeItem("userSession");
        alert("セッションの有効期限が切れました。もう一度ログインしてください。");
        window.location.href = "/login";
      }
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {logoutSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white py-2 px-4 rounded-md shadow-md z-50 animate-fade">
          ログアウトを成功しました
        </div>
      )}
      {status && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          {status === "loading" && (
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
              <p className="text-lg font-bold text-blue-600">ログイン中...</p>
            </div>
          )}
          {status === "success" && (
            <p className="text-2xl font-bold text-green-500 animate-fade">
              ログインを成功しました
            </p>
          )}
          {status === "greeting" && (
            <p className="text-2xl font-bold text-blue-600 animate-fade">
              こんにちは、{username} さん
            </p>
          )}
        </div>
      )}

      <div
        className={`w-full max-w-md p-8 bg-white rounded-lg shadow-lg ${status ? "hidden" : ""}`}
      >
        <h2 className="text-sky-600 text-center text-2xl font-bold mb-6">
          ECC学生アプリ2.0
        </h2>
        <form name="form-login" className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="UserId"
              className="block text-sky-800 font-bold mb-2"
            >
              学籍番号(ID)
            </label>
            <input
              type="text"
              id="UserId"
              name="UserId"
              placeholder="学籍番号を入力してください"
              className="w-full px-4 py-2 border rounded-md bg-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>
          <div>
            <label htmlFor="pass" className="block text-sky-800 font-bold mb-2">
              パスワード
            </label>
            <input
              type="password"
              id="pass"
              name="pass"
              placeholder="パスワードを入力してください"
              className="w-full px-4 py-2 border rounded-md bg-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-sky-400 to-sky-500 text-white font-bold rounded-full hover:from-sky-500 hover:to-sky-600 transition duration-200"
            >
              ログイン &gt;
            </button>
          </div>
        </form>
        <div className="mt-4 text-center space-y-2">
            アプリのログイン出来ない方は事務局へ
          <br />
          <a
            href="/forgot-password"
            className="text-blue-600 text-sm hover:underline"
          >
            パスワードを忘れた方はこちら
          </a>
        </div>
      </div>
    </div>
  );
}
