import { useState } from "react";
import {
  Calendar,
  Home,
  Inbox,
  Menu,
  BookOpen,
  NotebookPen,
  Sprout,
  Phone,
  Link,
  Users,
  LogOut,
  Laptop2,
  SquareUser,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NotificationBar from "./notificationBar";

export default function Header({ title }: { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    {
      title: "ホーム",
      url: "/home",
      icon: Home,
    },
    {
      title: "お知らせ",
      url: "/",
      icon: Inbox,
    },
    {
      title: "学校行事",
      url: "/school_events",
      icon: Calendar,
    },
    {
      title: "出席状態確認",
      url: "/attendance",
      icon: Laptop2,
    },
    {
      title: "欠席届",
      url: "/absent_forms",
      icon: BookOpen,
    },
    {
      title: "HANDBOOK",
      url: "/handbook",
      icon: NotebookPen,
    },
    {
      title: "理念",
      url: "/philosophy",
      icon: Sprout,
    },
    {
      title: "連絡先",
      url: "/address",
      icon: Phone,
    },
    {
      title: "リンク集",
      url: "/listpage",
      icon: Link,
    },
    {
      title: "教職員図鑑",
      url: "/teacher",
      icon: Users,
    },
    {
      title: "プロファイル",
      url: "/profile",
      icon: SquareUser,
    },
    {
      title: "ログアウト",
      url: "logout",
      icon: LogOut,
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-10 h-12 backdrop-blur-sm bg-background/95 supports-[backdrop-filter]:bg-background/80 border-b flex items-center justify-between px-4 md:hidden">
      <div className="container mx-auto h-12 flex items-center justify-between">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              className="mr-auto hover:bg-secondary"
            >
              <Menu className="h-5 w-5 " />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <SheetHeader>
              <SheetTitle>メニュー</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col space-y-4 mt-4">
              {menuItems.map((item, index) => (
                <a
                  href={item.url}
                  key={index}
                  className={`flex items-center justify-start gap-2 px-2 py-1 rounded-lg transition-colors ${item.title === "ログアウト"
                    ? "bg-blue-500 text-white font-bold hover:bg-blue-600 w-fit"
                    : "text-[#3f3f46] hover:bg-secondary"
                    }`}
                  onClick={toggleMenu}
                >
                  <item.icon strokeWidth={1} />
                  <span className="font-normal">{item.title}</span>
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
          <span className="text-sm font-bold p-2">{title}</span>
        </div>
        {/* ECC Logo with Hover */}
        <div className="flex items-center gap-4">
          <NotificationBar />
          <a
            href="/profile"
            className="relative group flex items-center"
            aria-label="プロファイルへ"
          >
            <img
              src="/src/components/img/ECClogo.png"
              alt="ECC Logo"
              className="h-8 w-8 rounded-md"
            />
          </a>
        </div>
      </div>
    </header>
  );
}
