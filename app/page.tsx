"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"

interface Student {
  id: string
  name: string
}

export default function LoginPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [customName, setCustomName] = useState("")
  const [students, setStudents] = useState<Student[]>([])
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([])
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    // In a real app, this would be fetched from an API
    const studentData: Student[] = [
      { id: "SV001", name: "Nguyễn Văn An" },
      { id: "SV002", name: "Trần Thị Bình" },
      { id: "SV003", name: "Phạm Minh Châu" },
      { id: "SV004", name: "Lê Hoàng Dũng" },
      { id: "SV005", name: "Hoàng Thị Em" },
      { id: "SV006", name: "Vũ Quang Huy" },
      { id: "SV007", name: "Đặng Thị Hương" },
      { id: "SV008", name: "Ngô Bá Khá" },
      { id: "SV009", name: "Đinh Thị Linh" },
      { id: "SV010", name: "Bùi Quốc Minh" },
    ]
    setStudents(studentData)
  }, [])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredStudents([])
      setShowDropdown(false)
      return
    }

    const filtered = students.filter((student) => student.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredStudents(filtered)
    setShowDropdown(filtered.length > 0)
  }, [searchTerm, students])

  const handleStudentSelect = (student: Student) => {
    setSearchTerm(student.name)
    setShowDropdown(false)
  }

  const handleStartExam = () => {
    const studentName = searchTerm.trim() || customName.trim()
    if (studentName) {
      // Save student name to localStorage
      localStorage.setItem("studentName", studentName)
      router.push("/select-exam")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Đăng nhập làm bài thi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Tìm tên sinh viên"
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => {
                    if (filteredStudents.length > 0) {
                      setShowDropdown(true)
                    }
                  }}
                />
              </div>

              {showDropdown && (
                <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
                  <ul className="max-h-60 overflow-auto py-1">
                    {filteredStudents.map((student) => (
                      <li
                        key={student.id}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                        onClick={() => handleStudentSelect(student)}
                      >
                        {student.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-sm text-gray-500">HOẶC</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Nhập tên của bạn"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
            />
          </div>

          <Button className="w-full" onClick={handleStartExam} disabled={!searchTerm && !customName}>
            Bắt đầu
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
