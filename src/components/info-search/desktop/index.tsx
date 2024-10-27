import { useState } from 'react'
import { SearchIcon, ArrowUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const categories = [
    { value: 'all', label: '全てのお知らせ' },
    { value: 'school', label: '学校からの連絡' },
    { value: 'teacher', label: '担任からの連絡' },
    { value: 'career', label: 'キャリアセンターより' },
    { value: 'event', label: '学校行事' },
    { value: 'library', label: '図書館からの連絡' },
    { value: 'admin', label: '事務局からの連絡' },
    { value: 'circle', label: 'クラブ・サークル' },
    { value: 'other', label: 'その他' },
]

export default function DesktopSearchBar() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [sortOption, setSortOption] = useState('Relevance')

    const handleSearch = () => {
        console.log('Searching for:', searchQuery, 'in category:', selectedCategory, 'sorted by:', sortOption)
        // Implement your search logic here
    }

    return (
        <div className="flex flex-row items-center justify-between gap-2 px-2">
            <div className="hidden md:flex flex-wrap items-center flex-grow gap-2">
                <div className="flex flex-wrap gap-2 max-w-screen-lg">
                    {categories.map((category) => (
                        <Button
                            key={category.value}
                            variant={selectedCategory === category.value ? "default" : "outline"}
                            size="xs"
                            onClick={() => setSelectedCategory(category.value)}
                            className="rounded-full"
                        >
                            {category.label}
                        </Button>
                    ))}
                </div>

            </div>
        </div>
    )
}
