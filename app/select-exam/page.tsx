"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

export default function SelectExamPage() {
  const router = useRouter()
  const [studentName, setStudentName] = useState("")

  useEffect(() => {
    const name = localStorage.getItem("studentName")
    if (!name) {
      router.push("/")
      return
    }
    setStudentName(name)
  }, [router])

  const handleSelectExam = (examId: number) => {
    localStorage.setItem("selectedExam", examId.toString())
    router.push(`/exam/${examId}`)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 p-4">
      <div className="mx-auto w-full max-w-4xl">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Xin chào, {studentName}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600">Vui lòng chọn một đề thi để bắt đầu</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5].map((examId) => (
            <Card
              key={examId}
              className="cursor-pointer transition-all hover:shadow-md"
              onClick={() => handleSelectExam(examId)}
            >
              <CardContent className="flex flex-col items-center p-6">
                <FileText className="mb-4 h-12 w-12 text-blue-500" />
                <h3 className="text-xl font-medium">Đề {examId}</h3>
                <p className="mt-2 text-center text-sm text-gray-500">50 câu hỏi trắc nghiệm</p>
                <Button className="mt-4 w-full">Chọn đề này</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
