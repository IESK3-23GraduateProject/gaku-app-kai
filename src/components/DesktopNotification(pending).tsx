// src/components/DesktopNotification.tsx
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

type Notification = {
  student_news_id: number;
  title: string;
  is_mention_read: boolean;
  mention_read_at: string | null;
  publish_at: string;
  news_contents: string;
};

export default function DesktopNotification() {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchStudentNewsData = async () => {
      try {
        const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/student-mentions`);
        const data: Notification[] = await response.json();
        const unread = data.filter((notification) => !notification.is_mention_read).length;
        setUnreadCount(unread);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchStudentNewsData();
  }, []);

  const handleBellClick = () => {
    // Redirect to homepage with query to show unread news
    window.location.href = "/?filter=unread";
  };

  return (
    <button
      className="relative p-2 focus:outline-none"
      aria-label="Notifications"
      onClick={handleBellClick}
    >
      <Bell className="h-6 w-6" />
      {unreadCount > 0 && (
        <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border border-white"></div>
      )}
    </button>
  );
}
