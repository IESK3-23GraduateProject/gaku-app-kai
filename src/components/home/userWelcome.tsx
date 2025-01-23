// src/components/UserWelcome.tsx
import { useState, useEffect } from "react";
import { getUserData } from "@/lib/userManager";

export default function UserWelcome() {
  const [userName, setUserName] = useState<string>("ユーザー");

  useEffect(() => {
    const userData = getUserData();
    if (userData?.user_name) {
      setUserName(userData.user_name);
    }
  }, []);

  return (
    <h1 className="text-lg font-bold mb-6 text-center">
      こんにちは、{userName}さん
    </h1>
  );
}
