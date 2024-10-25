import { useState } from 'react'
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

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('')
    const [category, setCategory] = useState('')
    const [sortOption, setSortOption] = useState('Relevance')
    const [isSearchVisible, setIsSearchVisible] = useState(false)

    const handleSearch = () => {
        console.log('Searching for:', searchQuery, 'in category:', category, 'sorted by:', sortOption)
        // Implement your search logic here
    }

    const toggleSearch = () => {
        setIsSearchVisible(!isSearchVisible)
        if (isSearchVisible) {
            handleSearch()
        }
    }

    return (
        <div className="w-full max-w-md mx-auto p-2 sm:hidden">
            <div className="flex flex-row items-center justify-between gap-2">
                <div className="flex-grow relative">
                    <div className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${isSearchVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
                        }`}>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger className="w-full focus:ring-1">
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
                    <div className={`transition-opacity duration-300 ease-in-out ${isSearchVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}>
                        <Input
                            type="text"
                            placeholder="Search posts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full"
                        />
                    </div>
                </div>

                <Button
                    size="icon"
                    onClick={toggleSearch}
                    className="transition-transform duration-300 ease-in-out hover:scale-105"
                >
                    {isSearchVisible ? (
                        <X className="h-4 w-4" />
                    ) : (
                        <SearchIcon className="h-4 w-4" />
                    )}
                    <span className="sr-only">{isSearchVisible ? 'Close Search' : 'Search'}</span>
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
                        <DropdownMenuItem onClick={() => setSortOption('Relevance')}>
                            Relevance
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortOption('Date (Newest)')}>
                            日付（最新順）
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortOption('Date (Oldest)')}>
                            日付（最古順）
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortOption('Title (A-Z)')}>
                            Title (A-Z)
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortOption('Title (Z-A)')}>
                            Title (Z-A)
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
