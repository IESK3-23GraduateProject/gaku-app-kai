import { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { DatePicker } from '../date-picker'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '../ui/input'

export default function AbsentFormsComponent() {
    const [activeSection, setActiveSection] = useState("absence")
    const [type, setType] = useState('')
    const [reason, setReason] = useState('')

    const AbsenceForm = () => (
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
                    <Label className="text-base min-w-32">Name</Label>
                    <p className="text-base ml-auto">John Doe</p>
                </div>

                <div className="flex items-center">
                    <Label className="text-base min-w-32">所属クラス</Label>
                    <p className="text-base ml-auto">SK3A</p>
                </div>

                <div className="space-y-2">
                    <Label className="text-base">年月日</Label>
                    <DatePicker />
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
                        <Label className="text-base">その理由(早退を選択)</Label>
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
                    <Input className="w-full " />
                </div>
            </div>

            <div className="mt-8">
                <Button className="w-32 bg-black text-white hover:bg-gray-800">
                    Save Changes
                </Button>
            </div>
        </div>
    )

    const NotificationsForm = () => (
        <div className="bg-white rounded-lg p-8">
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-1">就職公欠届の申請</h3>
                <p className="text-gray-500">Submit your job-related absence request</p>
            </div>
            <div className="space-y-6">
                {/* Job-related absence form content */}
            </div>
        </div>
    )

    return (
        <div className="max-w-screen-xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row lg:space-x-8">
                <aside className="w-full lg:w-64 mb-6 lg:mb-0">
                    <nav className="space-y-1">
                        <Button
                            variant={activeSection === "absence" ? "secondary" : "ghost"}
                            className="w-full justify-start text-base font-normal"
                            onClick={() => setActiveSection("absence")}
                        >
                            欠席・遅刻・早退連絡
                        </Button>
                        <Button
                            variant={activeSection === "notifications" ? "secondary" : "ghost"}
                            className="w-full justify-start text-base font-normal"
                            onClick={() => setActiveSection("notifications")}
                        >
                            就職公欠届の申請
                        </Button>
                    </nav>
                </aside>
                <main className="flex-1">
                    {activeSection === "absence" && <AbsenceForm />}
                    {activeSection === "notifications" && <NotificationsForm />}
                </main>
            </div>
        </div>
    )
}
