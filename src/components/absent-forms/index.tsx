import { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { DatePicker } from '../date-picker'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '../ui/input'

// Absence Form Component
export const AbsenceForm = () => {
    const [type, setType] = useState('')
    const [reason, setReason] = useState('')
    const [date, setDate] = useState<Date | undefined>(undefined)

    const handleSubmit = () => {
        // Add submission logic here
        console.log('Absence Form Submitted', { type, reason, date })
    }

    return (
        <div className="bg-white rounded-lg px-2 pb-8">
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-1">欠席・遅刻・早退連絡</h3>
                <p className="text-gray-500">Submit your notification</p>
            </div>

            <div className="space-y-6">
                <div className="flex items-center">
                    <Label className="text-base min-w-32">学籍番号</Label>
                    <p className="text-base ml-auto">2222222</p>
                </div>

                <div className="flex items-center">
                    <Label className="text-base min-w-32">名前</Label>
                    <p className="text-base ml-auto">John Doe</p>
                </div>
                <div className="flex items-center">
                    <Label className="text-base min-w-32">名前(カナ)</Label>
                    <p className="text-base ml-auto">ジョン ドウ</p>
                </div>

                <div className="flex items-center">
                    <Label className="text-base min-w-32">メールアドレス</Label>
                    <p className="text-base ml-auto">JohnDoe@Email.com</p>
                </div>

                <div className="flex items-center">
                    <Label className="text-base min-w-32">所属クラス</Label>
                    <p className="text-base ml-auto">SK3A</p>
                </div>

                <div className="space-y-2">
                    <Label className="text-base">年月日</Label>
                    <DatePicker
                        selected={date}
                        onSelect={setDate}
                        placeholder="日付を選択"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-base">種別選択</Label>
                    <Select value={type} onValueChange={(value) => {
                        setType(value)
                        if (value !== "leaving-early") {
                            setReason('')
                        }
                    }}>
                        <SelectTrigger className="w-full h-7">
                            <SelectValue placeholder="種別選択" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="absent">欠席</SelectItem>
                            <SelectItem value="late">遅刻</SelectItem>
                            <SelectItem value="train-delay">電車遅延</SelectItem>
                            <SelectItem value="leaving-early">早退</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {type === "leaving-early" && (
                    <div className="space-y-2">
                        <Label className="text-base">その理由(早退を選択した場合)</Label>
                        <Select value={reason} onValueChange={setReason}>
                            <SelectTrigger className="w-full h-7">
                                <SelectValue placeholder="その理由" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="sick">体調不良</SelectItem>
                                <SelectItem value="wounded">怪我</SelectItem>
                                <SelectItem value="other">その他</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                )}

                <div className="space-y-2">
                    <Label className="text-base">その他の連絡</Label>
                    <Input className="w-full" onChange={(e) => setReason(e.target.value)} />
                </div>
            </div>

            <div className="mt-8">
                <Button
                    className="w-32 bg-black text-white hover:bg-gray-800"
                    onClick={handleSubmit}
                >
                    Save Changes
                </Button>
            </div>
        </div>
    )
}

// Official Absence Form Component
export const OfficialAbsenseForm = () => {
    const [companyName, setCompanyName] = useState('')
    const [location, setLocation] = useState('')
    const [type, setType] = useState('')
    const [content, setContent] = useState('')
    const [interviewDate, setInterviewDate] = useState<Date | undefined>(undefined)
    const [additionalNotes, setAdditionalNotes] = useState('')

    const handleSubmit = () => {
        // Add submission logic here
        console.log('Official Absence Form Submitted', {
            companyName,
            type,
            location,
            content,
            interviewDate,
            additionalNotes
        })
    }

    return (
        <div className="bg-white rounded-lg px-2 pb-8">
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-1">就職公欠届の申請</h3>
                <p className="text-gray-500">Submit your job-related absence request</p>
            </div>
            <div className="space-y-6">
                <div className="flex items-center">
                    <Label className="text-base min-w-32">学籍番号</Label>
                    <p className="text-base ml-auto">2222222</p>
                </div>

                <div className="flex items-center">
                    <Label className="text-base min-w-32">名前</Label>
                    <p className="text-base ml-auto">John Doe</p>
                </div>

                <div className="flex items-center">
                    <Label className="text-base min-w-32">名前(カナ)</Label>
                    <p className="text-base ml-auto">ジョン ドウ</p>
                </div>

                <div className="flex items-center">
                    <Label className="text-base min-w-32">メールアドレス</Label>
                    <p className="text-base ml-auto">JohnDoe@Email.com</p>
                </div>

                <div className="flex items-center">
                    <Label className="text-base min-w-32">所属クラス</Label>
                    <p className="text-base ml-auto">SK3A</p>
                </div>

                <div className="space-y-2">
                    <Label className="text-base">実施形態</Label>
                    <Select value={type} onValueChange={setType}>
                        <SelectTrigger className="w-full h-7">
                            <SelectValue placeholder="実施形態を選択" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="web">Web</SelectItem>
                            <SelectItem value="on-site">対面</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label className="text-base">場所</Label>
                    <Select value={location} onValueChange={setLocation}>
                        <SelectTrigger className="w-full h-7">
                            <SelectValue placeholder="場所を選択" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="home">自宅</SelectItem>
                            <SelectItem value="school">学校</SelectItem>
                            <SelectItem value="company">企業</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label className="text-base">内容</Label>
                    <Select value={content} onValueChange={setContent}>
                        <SelectTrigger className="w-full h-7">
                            <SelectValue placeholder="内容を選択" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="info-session">説明会</SelectItem>
                            <SelectItem value="internship">インターンシップ</SelectItem>
                            <SelectItem value="test">筆記試験</SelectItem>
                            <SelectItem value="interview">面接</SelectItem>
                            <SelectItem value="test-interview">筆記試験＋面接</SelectItem>
                            <SelectItem value="consult">面談</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label className="text-base">会社名</Label>
                    <Input
                        className="w-full"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="面接を受ける会社名を入力"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-base">面接日</Label>
                    <DatePicker
                        selected={interviewDate}
                        onSelect={setInterviewDate}
                        placeholder="面接日を選択"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-base">その他の連絡</Label>
                    <Input
                        className="w-full"
                        value={additionalNotes}
                        onChange={(e) => setAdditionalNotes(e.target.value)}
                    />
                </div>

                {/* Handle File Upload later */}

                <div className="mt-8">
                    <Button
                        className="w-32 bg-black text-white hover:bg-gray-800"
                        onClick={handleSubmit}
                    >
                        申請する
                    </Button>
                </div>
            </div>
        </div>
    )
}

// Main Component with Navigation
export default function AbsentFormsComponent() {
    const [activeSection, setActiveSection] = useState("absence")

    return (
        <div className="max-w-screen-xl mx-auto">
            <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:space-x-8">
                <aside className="w-full lg:w-64 mt-3 lg:mt-0">
                    <nav className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-1">
                        <Button
                            variant={activeSection === "absence" ? "secondary" : "ghost"}
                            className="flex-1 lg:flex-none justify-start text-sm lg:text-base font-normal py-1.5 lg:py-2 h-auto"
                            onClick={() => setActiveSection("absence")}
                        >
                            欠席・遅刻・早退連絡
                        </Button>
                        <Button
                            variant={activeSection === "officialAbsense" ? "secondary" : "ghost"}
                            className="flex-1 lg:flex-none justify-start text-sm lg:text-base font-normal py-1.5 lg:py-2 h-auto"
                            onClick={() => setActiveSection("officialAbsense")}
                        >
                            就職公欠届の申請
                        </Button>
                    </nav>
                </aside>
                <main className="flex-1">
                    {activeSection === "absence" && <AbsenceForm />}
                    {activeSection === "officialAbsense" && <OfficialAbsenseForm />}
                </main>
            </div>
        </div>
    )
}
