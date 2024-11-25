// components/info-search/mobile.tsx
import { useStore } from '@nanostores/react'
import { SearchIcon, ArrowUpDown, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { searchQuery, selectedCategory, sortOption, isSearchVisible } from '@/lib/newsSearchStore'

export default function MobileSearchBar() {
    const $searchQuery = useStore(searchQuery)
    const $category = useStore(selectedCategory)
    const $isSearchVisible = useStore(isSearchVisible)

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        searchQuery.set(e.target.value)

        console.log('Search state updated:', { query: $searchQuery, })

    }

    const toggleSearch = () => {
        isSearchVisible.set(!$isSearchVisible)
        console.log("isSearchVisible", isSearchVisible.get())
    }

    return (
        <div className="w-full max-w-lg mx-auto py-2 md:hidden">
            <div className="flex flex-row items-center justify-center gap-2">
                <div className="flex-grow relative">
                    <div className={`absolute inset-0 transition-opacity duration-300 ease-in-out flex items-center ${$isSearchVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                        <Select
                            value={$category}
                            onValueChange={(value) => selectedCategory.set(value)}
                        >
                            <SelectTrigger className="w-full focus:ring-1 h-7 flex items-center">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">全てのお知らせ</SelectItem>
                                <SelectItem value="school">学校からの連絡</SelectItem>
                                <SelectItem value="teacher">担任からの連絡</SelectItem>
                                <SelectItem value="career">キャリアセンターより</SelectItem>
                                <SelectItem value="event">学校行事</SelectItem>
                                <SelectItem value="library">図書館からの連絡</SelectItem>
                                <SelectItem value="admin">事務局からの連絡</SelectItem>
                                <SelectItem value="circle">クラブ・サークル</SelectItem>
                                <SelectItem value="other">その他</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className={`transition-opacity duration-300 ease-in-out ${$isSearchVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <Input
                            type="text"
                            placeholder="Search posts..."
                            value={$searchQuery}
                            onChange={(e) => handleSearch(e)}
                            className="w-full h-9"
                        />
                    </div>
                </div>

                <Button
                    size="icon"
                    onClick={toggleSearch}
                    className="transition-transform duration-300 ease-in-out hover:scale-105"
                >
                    {$isSearchVisible ? (
                        <X className="h-4 w-4" />
                    ) : (
                        <SearchIcon className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                        {$isSearchVisible ? 'Close Search' : 'Search'}
                    </span>
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="transition-transform duration-300 ease-in-out hover:scale-105"
                        >
                            <ArrowUpDown className="h-4 w-4" />
                            <span className="sr-only">Sort</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => sortOption.set('Relevance')}>
                            Relevance
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => sortOption.set('Date (Newest)')}>
                            日付（最新順）
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => sortOption.set('Date (Oldest)')}>
                            日付（最古順）
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => sortOption.set('Title (A-Z)')}>
                            Title (A-Z)
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => sortOption.set('Title (Z-A)')}>
                            Title (Z-A)
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
