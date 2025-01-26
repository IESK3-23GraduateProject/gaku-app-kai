import { useEffect, useState } from "react";
import { Bell, CheckCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Notification = {
  student_news_id: number;
  title: string;
  is_mention_read: boolean;
  mention_read_at: string | null;
  publish_at: string;
  news_contents: string;
};

export default function NotificationBar() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudentNewsData = async () => {
      try {
        // Retrieve user data from localStorage
        const storedUserData = localStorage.getItem("userData");
        if (!storedUserData) {
          setError("User data not found. Please log in.");
          return;
        }

        const userData = JSON.parse(storedUserData);
        const userId = userData.student_user_id;

        // Fetch notifications for the user
        const response = await fetch(`http://localhost:3000/student-mentions?userId=${userId}`);
        if (!response.ok) throw new Error("Failed to fetch notifications");

        const data: Notification[] = await response.json();
        setNotifications(data);

        // Count unread notifications
        const unread = data.filter((notification) => !notification.is_mention_read).length;
        setUnreadCount(unread);
      } catch (error: any) {
        console.error("Error fetching notifications:", error);
        setError(error.message || "Error fetching notifications");
      }
    };

    fetchStudentNewsData();
  }, []);

  const handleNotificationClick = (id: number) => {
    window.location.href = `http://localhost:4321/news/${id}`;
  };

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <div className="relative">
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </Button>
            {unreadCount > 0 && (
              <div className="absolute top-1 right-0 translate-x-1/2 -translate-y-1/2 h-3 w-3 bg-green-500 rounded-full border border-white"></div>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-background">
          <div className="p-4">
            <h2 className="text-sm font-semibold mb-2">Notifications</h2>
            <div className="space-y-2">
              {error ? (
                <p className="text-sm text-red-500">{error}</p>
              ) : notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.student_news_id}
                    className={`flex items-center justify-between p-2 border rounded-lg cursor-pointer hover:bg-secondary relative`}
                    onClick={() => handleNotificationClick(notification.student_news_id)}
                  >
                    <div className="flex items-start gap-2">
                      <CheckCircle
                        className={`h-5 w-5 ${notification.is_mention_read ? "text-gray-400" : "text-green-500"
                          }`}
                      />
                      <div>
                        <h3 className="text-sm font-bold">
                          {notification.title}
                        </h3>
                        <p className="text-xs text-gray-500">
                          公開日: {new Date(notification.publish_at).toLocaleDateString("ja-JP")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No notifications available.</p>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
