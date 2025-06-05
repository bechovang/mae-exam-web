"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, BookOpen, Clock, Target, AlertTriangle } from "lucide-react"

interface PracticeSet {
  id: number;
  title: string;
  description: string;
  questions: number; // Approximate number of questions or specific if known
  difficulty: string;
  topics: string[];
  dataAvailable: boolean;
}

export default function SelectPracticePage() {
  const router = useRouter()
  const [studentName, setStudentName] = useState("")

  // Define practice sets based on available JSON data
  const practiceData: PracticeSet[] = [
    {
      id: 1,
      title: "Luyện tập Toán học cơ bản",
      description: "Đạo hàm, tích phân và hàm số (Sử dụng de1.json)",
      questions: 10, // From de1.json
      difficulty: "Trung bình",
      topics: ["Derivatives", "Integration", "Functions", "Limits", "Absolute Value"],
      dataAvailable: true,
    },
    {
      id: 2,
      title: "Luyện tập Đại số nâng cao",
      description: "Phương trình và bất phương trình (Sử dụng de2.json)",
      questions: 5, // From de2.json
      difficulty: "Khó",
      topics: ["Quadratic Equations", "Rational Functions", "Absolute Value", "Factoring"],
      dataAvailable: true,
    },
    {
      id: 3,
      title: "Luyện tập Hình học (Chưa có dữ liệu)",
      description: "Tọa độ và vectơ trong mặt phẳng",
      questions: 12,
      difficulty: "Dễ",
      topics: ["Geometry", "Vectors", "Coordinates"],
      dataAvailable: false, // Mark as unavailable
    },
    {
      id: 4,
      title: "Luyện tập Xác suất (Chưa có dữ liệu)",
      description: "Xác suất và thống kê cơ bản",
      questions: 8,
      difficulty: "Trung bình",
      topics: ["Probability", "Statistics"],
      dataAvailable: false, // Mark as unavailable
    },
    {
      id: 5,
      title: "Luyện tập Tổng hợp (Chưa có dữ liệu)",
      description: "Ôn tập các chủ đề toán học",
      questions: 20,
      difficulty: "Khó",
      topics: ["Mixed Topics", "Review"],
      dataAvailable: false, // Mark as unavailable
    }
  ]

  useEffect(() => {
    const name = localStorage.getItem("studentName")
    if (!name) {
      router.push("/")
      return
    }
    setStudentName(name)
  }, [router])

  const handleSelectPractice = (practice: PracticeSet) => {
    if (!practice.dataAvailable) {
      alert("Bộ đề luyện tập này hiện chưa có dữ liệu. Vui lòng chọn bộ đề khác.");
      return;
    }
    localStorage.setItem("selectedPractice", practice.id.toString())
    router.push(`/practice/${practice.id}`)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Dễ": return "text-green-600 bg-green-100"
      case "Trung bình": return "text-yellow-600 bg-yellow-100"
      case "Khó": return "text-red-600 bg-red-100"
      default: return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="mx-auto w-full max-w-6xl">
        <Card className="mb-6 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardTitle className="text-center text-2xl flex items-center justify-center gap-2">
              <BookOpen className="h-6 w-6" />
              Nền tảng luyện tập toán học
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Xin chào, {studentName}! 👋
              </h2>
              <p className="text-gray-600 mb-4">
                Chọn một bộ đề luyện tập để bắt đầu hành trình học toán của bạn
              </p>
              <div className="flex justify-center items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  <span>Feedback tức thì</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Không giới hạn thời gian</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>Giải thích chi tiết</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {practiceData.map((practice) => (
            <Card
              key={practice.id}
              className={`cursor-pointer transition-all duration-300 border-2 
                ${practice.dataAvailable 
                  ? 'hover:shadow-xl hover:scale-105 hover:bg-blue-50 hover:border-blue-200'
                  : 'opacity-60 bg-gray-100 cursor-not-allowed'}`}
              onClick={() => handleSelectPractice(practice)}
            >
              <CardContent className="flex flex-col h-full p-6">
                <div className="flex items-start justify-between mb-4">
                  {practice.dataAvailable ? 
                    <FileText className="h-8 w-8 text-blue-500 flex-shrink-0" /> : 
                    <AlertTriangle className="h-8 w-8 text-orange-400 flex-shrink-0" />
                  }
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(practice.difficulty)}`}>
                    {practice.difficulty}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {practice.title}
                </h3>
                
                <p className="text-gray-600 mb-3 flex-grow text-sm">
                  {practice.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Số câu hỏi:</span>
                    <span className="font-semibold text-blue-600">{practice.questions} câu</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {practice.topics.map((topic, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Button 
                  className={`mt-4 w-full 
                  ${practice.dataAvailable 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                    : 'bg-gray-300 cursor-not-allowed'}`}
                  disabled={!practice.dataAvailable}
                  onClick={(e) => {
                    if (!practice.dataAvailable) e.stopPropagation(); // Prevent card click if disabled
                    // handleSelectPractice is called by Card's onClick
                  }}
                >
                  {practice.dataAvailable ? 'Bắt đầu luyện tập' : 'Chưa có dữ liệu'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            💡 Mẹo: Hãy thực hành thường xuyên để cải thiện kỹ năng toán học của bạn!
          </p>
        </div>
      </div>
    </div>
  )
}
