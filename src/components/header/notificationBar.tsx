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

  useEffect(() => {
    const fetchStudentNewsData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/student-mentions`);
        const data: Notification[] = await response.json();
        setNotifications(data);
        const unread = data.filter((notification) => !notification.is_mention_read).length;
        setUnreadCount(unread);
      } catch (error) {
        console.error("Error fetching notifications:", error);
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
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.student_news_id}
                    className={`flex items-center justify-between p-2 border rounded-lg cursor-pointer hover:bg-secondary relative`}
                    onClick={() => handleNotificationClick(notification.student_news_id)}
                  >
                    <div className="flex items-start gap-2">
                      <CheckCircle
                        className={`h-5 w-5 ${
                          notification.is_mention_read ? "text-gray-400" : "text-green-500"
                        }`}
                      />
                      <div>
                        <h3 className="text-sm font-bold">{notification.title}</h3>
                        <p className="text-xs text-gray-500">{notification.news_contents}</p>
                      </div>
                    </div>
                    {!notification.is_mention_read && (
                      <div className="absolute top-1 right-1 h-2 w-2 bg-green-500 rounded-full"></div>
                    )}
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
