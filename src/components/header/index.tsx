import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function MobileHeader() {
    return (
        <header className="fixed top-0 left-0 right-0 h-12 backdrop-blur-sm bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b flex items-center justify-between px-4 sm:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu" className="mr-auto">
                <Menu className="h-5 w-5" />
            </Button>
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
                <span className="ml-2 text-sm font-extrabold">ECCコンピュータ専門学校</span>
            </div>
        </header>
    )
}
