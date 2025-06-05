"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Lightbulb, 
  BookOpen,
  Trophy,
  Target,
  RotateCcw,
  Home
} from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import SimpleMath from "@/components/SimpleMath"
import { ThemeToggle } from "@/components/theme-toggle"

interface Question {
  id: number
  question: string
  image: string
  options: string[]
  correctAnswer: string
  explanation: string
  difficulty: string
  topic: string
  hints: string[]
}

interface PracticeData {
  examId: string
  title: string
  description: string
  questions: Question[]
}

interface PracticeClientProps {
  practiceId: string
}

interface QuestionResult {
  answered: boolean
  correct: boolean
  selectedAnswer: string
  timeSpent: number
}

export default function PracticeClient({ practiceId }: PracticeClientProps) {
  const router = useRouter()
  const [practiceData, setPracticeData] = useState<PracticeData | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({})
  const [questionResults, setQuestionResults] = useState<Record<number, QuestionResult>>({})
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now())
  const [totalTimeSpent, setTotalTimeSpent] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [practiceComplete, setPracticeComplete] = useState(false)
  const [showSummaryDialog, setShowSummaryDialog] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const studentName = localStorage.getItem("studentName")
    if (!studentName) {
      router.push("/")
      return
    }

    // Load practice data
    const loadPracticeData = async () => {
      try {
        const response = await fetch(`/data/de${practiceId}.json`)
        if (response.ok) {
          const data = await response.json()
          setPracticeData(data)
        } else {
          // Fallback to mock data if JSON file doesn't exist
          const mockData: PracticeData = {
            examId: `de${practiceId}`,
            title: `Luyện tập số ${practiceId}`,
            description: "Bài luyện tập toán học",
            questions: Array.from({ length: 10 }, (_, i) => ({
              id: i + 1,
              question: `Câu hỏi ${i + 1}: Solve for x`,
              image: `/images/de${practiceId}/${i + 1}.jpg`,
              options: ["A. Option 1", "B. Option 2", "C. Option 3", "D. Option 4"],
              correctAnswer: "B",
              explanation: "This is the explanation for the correct answer.",
              difficulty: "medium",
              topic: "Algebra",
              hints: ["Hint 1", "Hint 2"]
            }))
          }
          setPracticeData(mockData)
        }
      } catch (error) {
        console.error("Error loading practice data:", error)
      }
    }

    loadPracticeData()

    // Load saved progress
    const savedAnswers = localStorage.getItem(`practiceAnswers_${practiceId}`)
    const savedResults = localStorage.getItem(`practiceResults_${practiceId}`)
    const savedTime = localStorage.getItem(`practiceTime_${practiceId}`)
    
    if (savedAnswers) setUserAnswers(JSON.parse(savedAnswers))
    if (savedResults) setQuestionResults(JSON.parse(savedResults))
    if (savedTime) setTotalTimeSpent(Number(savedTime))

    // Start timer
    setQuestionStartTime(Date.now())
    timerRef.current = setInterval(() => {
      setTotalTimeSpent(prev => prev + 1)
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [practiceId, router])

  // Save progress to localStorage
  useEffect(() => {
    if (Object.keys(userAnswers).length > 0) {
      localStorage.setItem(`practiceAnswers_${practiceId}`, JSON.stringify(userAnswers))
    }
  }, [userAnswers, practiceId])

  useEffect(() => {
    if (Object.keys(questionResults).length > 0) {
      localStorage.setItem(`practiceResults_${practiceId}`, JSON.stringify(questionResults))
    }
  }, [questionResults, practiceId])

  useEffect(() => {
    localStorage.setItem(`practiceTime_${practiceId}`, totalTimeSpent.toString())
  }, [totalTimeSpent, practiceId])

  const handleAnswerSelect = (value: string) => {
    if (questionResults[currentQuestion + 1]?.answered) return // Already answered

    const currentTime = Date.now()
    const timeSpent = Math.floor((currentTime - questionStartTime) / 1000)
    const isCorrect = value === practiceData?.questions[currentQuestion].correctAnswer

    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion + 1]: value
    }))

    setQuestionResults(prev => ({
      ...prev,
      [currentQuestion + 1]: {
        answered: true,
        correct: isCorrect,
        selectedAnswer: value,
        timeSpent: timeSpent
      }
    }))

    setShowFeedback(true)
  }

  const goToNextQuestion = () => {
    if (practiceData && currentQuestion < practiceData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setQuestionStartTime(Date.now())
      setShowFeedback(false)
      setShowHints(false)
    } else {
      // Practice complete
      setPracticeComplete(true)
      setShowSummaryDialog(true)
    }
  }

  const goToPrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setQuestionStartTime(Date.now())
      setShowFeedback(false)
      setShowHints(false)
    }
  }

  const resetQuestion = () => {
    if (practiceData) {
      const questionId = currentQuestion + 1
      setUserAnswers(prev => {
        const newAnswers = { ...prev }
        delete newAnswers[questionId]
        return newAnswers
      })
      setQuestionResults(prev => {
        const newResults = { ...prev }
        delete newResults[questionId]
        return newResults
      })
      setShowFeedback(false)
      setShowHints(false)
      setQuestionStartTime(Date.now())
    }
  }

  const getStudyTip = () => {
    const result = questionResults[currentQuestion + 1]
    if (!result) return null

    if (result.correct) {
      if (result.timeSpent < 30) {
        return "🚀 Excellent! You solved this quickly. Try tackling more challenging problems!"
      } else if (result.timeSpent < 60) {
        return "👍 Good job! Your pace is solid. Keep practicing to improve speed."
      } else {
        return "✅ Correct! Take time to understand the concept to solve faster next time."
      }
    } else {
      if (result.timeSpent < 30) {
        return "🤔 Quick but incorrect. Slow down and read carefully."
      } else {
        return "📚 Take your time to understand the concept. Review the explanation below."
      }
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const calculateProgress = () => {
    if (!practiceData) return 0
    const answeredCount = Object.keys(questionResults).length
    return (answeredCount / practiceData.questions.length) * 100
  }

  const calculateScore = () => {
    const totalQuestions = Object.keys(questionResults).length
    const correctAnswers = Object.values(questionResults).filter(r => r.correct).length
    return { correct: correctAnswers, total: totalQuestions }
  }

  if (!practiceData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading practice session...</p>
      </div>
    )
  }

  const currentQuestionData = practiceData.questions[currentQuestion]
  const currentResult = questionResults[currentQuestion + 1]
  const studyTip = getStudyTip()
  const score = calculateScore()

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="mx-auto w-full max-w-4xl">

        {/* Header */}
        <Card className="mb-4 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                {practiceData.title}
              </CardTitle>
              <p className="text-blue-100 text-sm mt-1">{practiceData.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-1">
                <Clock className="h-4 w-4" />
                <span className="font-medium">{formatTime(totalTimeSpent)}</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-1">
                <Trophy className="h-4 w-4" />
                <span className="font-medium">{score.correct}/{score.total}</span>
              </div>
              <ThemeToggle />
            </div>
          </CardHeader>
          <CardContent className="pb-2 pt-4">
            <div className="mb-2 flex justify-between text-sm">
              <span>Câu hỏi {currentQuestion + 1} / {practiceData.questions.length}</span>
              <span>Hoàn thành: {score.total} / {practiceData.questions.length}</span>
            </div>
            <Progress value={calculateProgress()} className="h-2" />
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card className="mb-4 shadow-lg">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Badge variant={currentQuestionData.difficulty === 'easy' ? 'secondary' : 
                            currentQuestionData.difficulty === 'medium' ? 'default' : 'destructive'}>
                {currentQuestionData.difficulty === 'easy' ? 'Dễ' : 
                 currentQuestionData.difficulty === 'medium' ? 'Trung bình' : 'Khó'}
              </Badge>
              <Badge variant="outline">{currentQuestionData.topic}</Badge>
            </div>

            <div className="mb-6">
              <SimpleMath className="text-lg leading-relaxed">
                {currentQuestionData.question}
              </SimpleMath>
            </div>

            {/* Options */}
            <RadioGroup
              value={userAnswers[currentQuestion + 1] || ""}
              onValueChange={handleAnswerSelect}
              className="space-y-3"
              disabled={currentResult?.answered}
            >
              {currentQuestionData.options.map((option, index) => {
                const optionLetter = option.charAt(0)
                const isSelected = userAnswers[currentQuestion + 1] === optionLetter
                const isCorrect = optionLetter === currentQuestionData.correctAnswer
                const showResult = currentResult?.answered

                return (
                  <div
                    key={index}
                    className={`relative flex items-center space-x-3 rounded-lg border-2 p-4 transition-all ${
                      showResult
                        ? isCorrect
                          ? "border-green-500 bg-green-50"
                          : isSelected
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200"
                        : isSelected
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300 hover:bg-blue-25"
                    }`}
                  >
                    <RadioGroupItem
                      value={optionLetter}
                      id={`option-${index}`}
                      className="text-blue-600"
                    />
                    <Label
                      htmlFor={`option-${index}`}
                      className="flex-1 cursor-pointer"
                    >
                      <SimpleMath>{option}</SimpleMath>
                    </Label>
                    {showResult && isCorrect && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                )
              })}
            </RadioGroup>

            {/* Feedback Section */}
            {showFeedback && currentResult && (
              <div className="mt-6 space-y-4">
                <div className={`rounded-lg p-4 ${
                  currentResult.correct ? 'bg-green-50 border-l-4 border-green-400' : 'bg-red-50 border-l-4 border-red-400'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {currentResult.correct ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                    <span className={`font-semibold ${
                      currentResult.correct ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {currentResult.correct ? 'Chính xác!' : 'Chưa đúng'}
                    </span>
                    <span className="text-sm text-gray-600">
                      (Thời gian: {formatTime(currentResult.timeSpent)})
                    </span>
                  </div>
                  {studyTip && (
                    <p className="text-sm text-gray-700 mb-3">{studyTip}</p>
                  )}
                  
                  <div className="bg-white rounded-md p-3 border">
                    <h4 className="font-medium text-gray-800 mb-2">Giải thích:</h4>
                    <SimpleMath className="text-sm text-gray-700">
                      {currentQuestionData.explanation}
                    </SimpleMath>
                  </div>
                </div>
              </div>
            )}

            {/* Hints Section */}
            {!showFeedback && (
              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowHints(!showHints)}
                  className="flex items-center gap-2"
                >
                  <Lightbulb className="h-4 w-4" />
                  {showHints ? 'Ẩn gợi ý' : 'Xem gợi ý'}
                </Button>
              </div>
            )}

            {showHints && !showFeedback && (
              <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Gợi ý:
                </h4>
                <ul className="space-y-1 list-disc list-inside">
                  {currentQuestionData.hints.map((hint, index) => (
                    <li key={index} className="text-sm text-yellow-700">
                      <SimpleMath>{hint}</SimpleMath>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between bg-gray-50">
            <div className="flex gap-2">
              <Button variant="outline" onClick={goToPrevQuestion} disabled={currentQuestion === 0}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Câu trước
              </Button>
              {currentResult?.answered && (
                <Button variant="outline" onClick={resetQuestion} className="text-orange-600">
                  <RotateCcw className="mr-2 h-4 w-4" /> Làm lại
                </Button>
              )}
            </div>

            <Button onClick={goToNextQuestion} disabled={!currentResult?.answered}>
              {currentQuestion === practiceData.questions.length - 1 ? (
                <>Hoàn thành <Trophy className="ml-2 h-4 w-4" /></>
              ) : (
                <>Câu sau <ChevronRight className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* Question Navigation */}
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
          {practiceData.questions.map((_, index) => {
            const result = questionResults[index + 1]
            return (
              <Button
                key={index}
                variant={currentQuestion === index ? "default" : "outline"}
                className={`h-10 w-10 p-0 ${
                  currentQuestion === index ? "ring-2 ring-blue-500" : ""
                } ${
                  result?.answered
                    ? result.correct
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-red-500 text-white hover:bg-red-600"
                    : ""
                }`}
                onClick={() => {
                  setCurrentQuestion(index)
                  setQuestionStartTime(Date.now())
                  setShowFeedback(!!questionResults[index + 1]?.answered)
                  setShowHints(false)
                }}
              >
                {index + 1}
              </Button>
            )
          })}
        </div>

        {/* Summary Dialog */}
        <AlertDialog open={showSummaryDialog} onOpenChange={setShowSummaryDialog}>
          <AlertDialogContent className="max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Hoàn thành luyện tập!
              </AlertDialogTitle>
              <AlertDialogDescription className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {score.correct}/{score.total}
                  </div>
                  <div className="text-sm text-gray-600">
                    Tỷ lệ đúng: {Math.round((score.correct / score.total) * 100)}%
                  </div>
                  <div className="text-sm text-gray-600">
                    Thời gian: {formatTime(totalTimeSpent)}
                  </div>
                </div>
                <div className="text-sm">
                  {score.correct === score.total
                    ? "🎉 Xuất sắc! Bạn đã trả lời đúng tất cả câu hỏi!"
                    : score.correct / score.total >= 0.8
                    ? "👏 Tốt lắm! Bạn đã nắm vững kiến thức!"
                    : "💪 Tiếp tục luyện tập để cải thiện kết quả!"}
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col sm:flex-row gap-2">
              <AlertDialogCancel onClick={() => router.push("/select-exam")}>
                <Home className="mr-2 h-4 w-4" />
                Về trang chủ
              </AlertDialogCancel>
              <AlertDialogAction onClick={() => {
                // Reset practice
                localStorage.removeItem(`practiceAnswers_${practiceId}`)
                localStorage.removeItem(`practiceResults_${practiceId}`)
                localStorage.removeItem(`practiceTime_${practiceId}`)
                window.location.reload()
              }}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Luyện lại
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
} 