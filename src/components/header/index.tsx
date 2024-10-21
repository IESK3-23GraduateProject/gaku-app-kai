import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const toggleMenu = () => setIsOpen(!isOpen);
    const menuItem = ["ホーム", 'お知らせ', '学校行事', '出席状態確認', 'HANDBOOK', '理念', '連絡先', 'リンク集', '教職員図鑑']

    return (
        <header className="fixed top-0 left-0 right-0 h-12 backdrop-blur-sm bg-background/95 supports-[backdrop-filter]:bg-[#0EA5E9]/80 border-b flex items-center justify-between px-4 sm:hidden">
            <div className="container mx-auto h-12 flex items-center justify-between">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" aria-label="Open menu" className="mr-auto hover:bg-transparent">
                            <Menu className="h-5 w-5 text-white" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                        <nav className="flex flex-col space-y-4 mt-4">
                            <a href="#" className="text-md font-medium text-primary underline-offset-4 hover:underline" onClick={toggleMenu}>
                                ホーム
                            </a>
                            <a href="#" className="text-md font-medium text-primary underline-offset-4 hover:underline" onClick={toggleMenu}>
                                お知らせ
                            </a>
                            <a href="#" className="text-md font-medium text-primary underline-offset-4 hover:underline" onClick={toggleMenu}>
                                学校行事
                            </a>
                            <a href="#" className="text-md font-medium text-primary underline-offset-4 hover:underline" onClick={toggleMenu}>
                                出席状態確認
                            </a>
                            <a href="#" className="text-md font-medium text-primary underline-offset-4 hover:underline" onClick={toggleMenu}>
                                HANDBOOK
                            </a>
                            <a href="#" className="text-md font-medium text-primary underline-offset-4 hover:underline" onClick={toggleMenu}>
                                理念
                            </a>
                            <a href="#" className="text-md font-medium text-primary underline-offset-4 hover:underline" onClick={toggleMenu}>
                                連絡先
                            </a>
                            <a href="#" className="text-md font-medium text-primary underline-offset-4 hover:underline" onClick={toggleMenu}>
                                リンク集
                            </a>
                            <a href="#" className="text-md font-medium text-primary underline-offset-4 hover:underline" onClick={toggleMenu}>
                                教職員図鑑
                            </a>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
                    <span className="ml-2 text-sm font-bold text-white">ホーム</span>
                </div>
            </div>
        </header>
    )
}
