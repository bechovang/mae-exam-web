"use client"

import { useState, useEffect, useRef, useCallback } from "react"
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
  Home,
  RotateCcw,
  Sparkles,
  Frown,
  HelpCircle,
  Target,
  Keyboard,
  Navigation,
  LogOut,
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
import { Input } from "@/components/ui/input"
import SimpleMath from "@/components/SimpleMath"
import { ThemeToggle } from "@/components/theme-toggle"
import confetti from 'canvas-confetti'

const OPTION_SHORTCUT_MAP = {
  'A': '1', 'B': '2', 'C': '3', 'D': '4', 'E': '5', 'F': '6',
} as const;

interface Question {
  id: number; question: string; image: string | null; options: string[]; correctAnswer: string; explanation: string; difficulty: string; topic: string; hints: string[];
}

interface PracticeData {
  examId: string; title: string; description: string; questions: Question[];
}

interface PracticeClientProps {
  practiceId: string;
}

interface QuestionResult {
  answered: boolean; correct: boolean; selectedAnswer: string; timeSpent: number; hintsUsed: number;
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
  const [hintsUsedCount, setHintsUsedCount] = useState(0)
  const [practiceComplete, setPracticeComplete] = useState(false)
  const [showSummaryDialog, setShowSummaryDialog] = useState(false)
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false)
  const [showExitConfirmDialog, setShowExitConfirmDialog] = useState(false)
  const [showGoToQuestionDialog, setShowGoToQuestionDialog] = useState(false)
  const [goToQuestionInput, setGoToQuestionInput] = useState("")
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const feedbackTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const goToInputRef = useRef<HTMLInputElement>(null)

  const spawnParticles = useCallback((isCorrect: boolean) => {
    const color = isCorrect ? ['#a7f3d0', '#6ee7b7', '#34d399'] : ['#fecaca', '#ef4444', '#dc2626'];
    confetti({ particleCount: isCorrect ? 100 : 50, spread: isCorrect ? 90 : 70, origin: { y: 0.6, x: 0.5 }, colors: color, disableForReducedMotion: true, scalar: isCorrect ? 1.2 : 0.8, zIndex: 9999, shapes: ['star', 'circle', 'square'] });
  }, []);

  const goToQuestion = useCallback((index: number, e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.currentTarget.blur();
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setCurrentQuestion(index);
    setQuestionStartTime(Date.now());
    setShowFeedback(!!questionResults[index + 1]?.answered);
    setShowHints(false); // Reset hints when changing question
    setHintsUsedCount(questionResults[index + 1]?.hintsUsed || 0);
  }, [questionResults]);

  const goToNextQuestion = useCallback(() => {
    if (practiceData && currentQuestion < practiceData.questions.length - 1) {
      goToQuestion(currentQuestion + 1);
    } else {
      setPracticeComplete(true);
      setShowSummaryDialog(true);
    }
  }, [practiceData, currentQuestion, goToQuestion]);

  const goToPrevQuestion = useCallback(() => {
    if (currentQuestion > 0) {
      goToQuestion(currentQuestion - 1);
    }
  }, [currentQuestion, goToQuestion]);

  const handleAnswerSelect = useCallback((value: string) => {
    if (showFeedback) return;
    const currentTime = Date.now();
    const timeSpentOnThisQuestion = Math.floor((currentTime - questionStartTime) / 1000);
    const isCorrect = value === practiceData?.questions[currentQuestion].correctAnswer;
    setUserAnswers(prev => ({ ...prev, [currentQuestion + 1]: value }));
    setQuestionResults(prev => ({ ...prev, [currentQuestion + 1]: { answered: true, correct: isCorrect, selectedAnswer: value, timeSpent: timeSpentOnThisQuestion, hintsUsed: hintsUsedCount }}));
    setShowFeedback(true);
    spawnParticles(isCorrect);
    feedbackTimeoutRef.current = setTimeout(() => {}, 3000);
  }, [showFeedback, questionStartTime, practiceData, currentQuestion, hintsUsedCount, spawnParticles]);

  const resetQuestion = useCallback(() => {
    if (practiceData) {
      const questionId = currentQuestion + 1;
      setUserAnswers(prev => { const newAnswers = { ...prev }; delete newAnswers[questionId]; return newAnswers; });
      setQuestionResults(prev => { const newResults = { ...prev }; delete newResults[questionId]; return newResults; });
      setShowFeedback(false);
      setShowHints(false);
      setHintsUsedCount(0);
      setQuestionStartTime(Date.now());
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    }
  }, [practiceData, currentQuestion]);

  const toggleHints = useCallback(() => {
    setShowHints(prev => !prev);
    if (!showHints && hintsUsedCount === 0) setHintsUsedCount(1);
  }, [showHints, hintsUsedCount]);

  const handleGoToQuestionSubmit = useCallback(() => {
    if (!practiceData) return;
    const questionNumber = parseInt(goToQuestionInput);
    if (!isNaN(questionNumber) && questionNumber >= 1 && questionNumber <= practiceData.questions.length) {
      goToQuestion(questionNumber - 1);
      setShowGoToQuestionDialog(false);
      setGoToQuestionInput("");
    }
  }, [goToQuestionInput, practiceData, goToQuestion]);

  const useKeyboardShortcuts = () => {
    const handleKeyPress = useCallback((event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLSelectElement) return;
      const isDialogActive = showSummaryDialog || showShortcutsHelp || showExitConfirmDialog || showGoToQuestionDialog;
      if (isDialogActive) {
        if (event.key === 'Escape') { setShowSummaryDialog(false); setShowShortcutsHelp(false); setShowExitConfirmDialog(false); setShowGoToQuestionDialog(false); }
        if (event.key === 'Enter' && showGoToQuestionDialog) { handleGoToQuestionSubmit(); }
        return;
      }
      
      const currentResult = questionResults[currentQuestion + 1];

      if (event.ctrlKey || event.metaKey) { if (event.key.toLowerCase() === 'g') { event.preventDefault(); setShowGoToQuestionDialog(true); } return; }

      switch (event.key.toLowerCase()) {
        case 'a': case '1': event.preventDefault(); if (!showFeedback) handleAnswerSelect('A'); break;
        case 'b': case '2': event.preventDefault(); if (!showFeedback) handleAnswerSelect('B'); break;
        case 'c': case '3': event.preventDefault(); if (!showFeedback) handleAnswerSelect('C'); break;
        case 'd': case '4': event.preventDefault(); if (!showFeedback) handleAnswerSelect('D'); break;
        case 'e': case '5': event.preventDefault(); if (!showFeedback) handleAnswerSelect('E'); break;
        case 'f': case '6': event.preventDefault(); if (!showFeedback) handleAnswerSelect('F'); break;
        case 'arrowleft': case 'p': event.preventDefault(); goToPrevQuestion(); break;
        case 'arrowright': case 'n': case ' ': event.preventDefault(); goToNextQuestion(); break;
        case 'r': event.preventDefault(); if (currentResult?.answered) resetQuestion(); break;
        case 'h': event.preventDefault(); toggleHints(); break;
        case 'escape': event.preventDefault(); setShowExitConfirmDialog(true); break;
        case '?': event.preventDefault(); setShowShortcutsHelp(true); break;
        default: break;
      }
    }, [ showFeedback, practiceData, currentQuestion, questionResults, showSummaryDialog, showShortcutsHelp, showExitConfirmDialog, showGoToQuestionDialog, handleAnswerSelect, goToPrevQuestion, goToNextQuestion, resetQuestion, toggleHints, router, handleGoToQuestionSubmit ]);

    useEffect(() => { document.addEventListener('keydown', handleKeyPress); return () => document.removeEventListener('keydown', handleKeyPress); }, [handleKeyPress]);
  };

  useKeyboardShortcuts();

  useEffect(() => { if (showGoToQuestionDialog) { setTimeout(() => goToInputRef.current?.focus(), 100); } }, [showGoToQuestionDialog]);

  useEffect(() => {
    const studentName = localStorage.getItem("studentName");
    if (!studentName) { router.push("/"); return; }
    const loadPracticeData = async () => {
      try {
        const response = await fetch(`/data/de${practiceId}.json`);
        setPracticeData(response.ok ? await response.json() : {
          examId: `de${practiceId}`, title: `Luyện tập số ${practiceId}`, description: "Bài luyện tập toán học",
          questions: Array.from({ length: 10 }, (_, i) => {
            let options = ["A. \\(x=1\\)", "B. \\(x=2\\)", "C. \\(x=3\\)", "D. \\(x=4\\)"];
            if (i % 4 === 2) { options.push("E. \\(x=5\\)"); }
            if (i % 4 === 3) { options.push("E. \\(x=5\\)"); options.push("F. \\(x=6\\)"); }
            return { id: i + 1, question: `Câu hỏi ${i + 1}: Giải phương trình sau \\( x^2 - 4x + 4 = 0 \\)`, image: null, options: options, correctAnswer: "B", explanation: `Đây là giải thích chi tiết cho câu hỏi ${i + 1}. Phương trình có nghiệm kép \\(x=2\\) vì \\( (x-2)^2 = 0 \\).`, difficulty: i % 3 === 0 ? "easy" : i % 3 === 1 ? "medium" : "hard", topic: "Đại số", hints: [`Gợi ý 1: Đây là hằng đẳng thức.`, `Gợi ý 2: Khai triển \\( (a-b)^2 \\).`] };
          })
        });
      } catch (error) { console.error("Error loading practice data:", error); }
    };
    loadPracticeData();
    const savedAnswers = localStorage.getItem(`practiceAnswers_${practiceId}`);
    const savedResults = localStorage.getItem(`practiceResults_${practiceId}`);
    const savedTime = localStorage.getItem(`practiceTime_${practiceId}`);
    if (savedAnswers) setUserAnswers(JSON.parse(savedAnswers));
    if (savedResults) setQuestionResults(JSON.parse(savedResults));
    if (savedTime) setTotalTimeSpent(Number(savedTime));
    setQuestionStartTime(Date.now());
    timerRef.current = setInterval(() => setTotalTimeSpent(prev => prev + 1), 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); };
  }, [practiceId, router]);

  useEffect(() => { if (practiceData) localStorage.setItem(`practiceAnswers_${practiceId}`, JSON.stringify(userAnswers)) }, [userAnswers, practiceId, practiceData]);
  useEffect(() => { if (practiceData) localStorage.setItem(`practiceResults_${practiceId}`, JSON.stringify(questionResults)) }, [questionResults, practiceId, practiceData]);
  useEffect(() => { localStorage.setItem(`practiceTime_${practiceId}`, totalTimeSpent.toString()) }, [totalTimeSpent, practiceId]);

  const formatTime = (seconds: number) => `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
  const calculateProgress = () => practiceData ? (Object.keys(questionResults).length / practiceData.questions.length) * 100 : 0;
  const calculateScore = () => ({ correct: Object.values(questionResults).filter(r => r.correct).length, total: practiceData?.questions.length || 0 });

  if (!practiceData) return <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-black p-4"><p className="text-lg text-gray-700 dark:text-gray-300 animate-pulse">Đang tải bài luyện tập...</p></div>;

  const currentQuestionData = practiceData.questions[currentQuestion];
  const currentResult = questionResults[currentQuestion + 1];
  const score = calculateScore();

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-black p-4">
      <div className="mx-auto w-full max-w-4xl">
        <Card className="mb-4 shadow-lg rounded-xl overflow-hidden animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="rounded-full bg-white/20 text-white border-white/30 hover:bg-white/30 transition-all" onClick={() => router.push('/select-exam')} aria-label="Về trang chọn đề"><Home className="h-5 w-5" /></Button>
              <div>
                <CardTitle className="flex items-center gap-2 text-xl font-bold"><BookOpen className="h-6 w-6" />{practiceData.title}</CardTitle>
                <p className="text-blue-100 text-sm opacity-90 mt-1">{practiceData.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <div className="hidden md:flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm font-semibold"><Clock className="h-4 w-4" /><span>{formatTime(totalTimeSpent)}</span></div>
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm font-semibold"><Trophy className="h-4 w-4" /><span>{score.correct}/{score.total}</span></div>
              <Button variant="outline" size="icon" className="rounded-full bg-white/20 text-white border-white/30 hover:bg-white/30 transition-all" onClick={() => setShowShortcutsHelp(true)} aria-label="Xem phím tắt"><Keyboard className="h-5 w-5" /></Button>
              <ThemeToggle />
            </div>
          </CardHeader>
          <CardContent className="pb-2 pt-4 px-6 bg-white dark:bg-gray-900"><div className="mb-2 flex justify-between text-sm text-gray-600 dark:text-gray-300 font-medium"><span>Câu hỏi {currentQuestion + 1} / {practiceData.questions.length}</span><span>Hoàn thành: {Object.keys(questionResults).length} / {practiceData.questions.length}</span></div><Progress value={calculateProgress()} className="h-2 bg-blue-200" /></CardContent>
        </Card>
        
        <Card className="mb-4 shadow-xl rounded-xl animate-bound-in">
          <CardContent className="p-6">
            <div className="mb-4 flex flex-wrap items-center gap-2"><Badge variant={currentQuestionData.difficulty === 'easy' ? 'secondary' : currentQuestionData.difficulty === 'medium' ? 'default' : 'destructive'} className="text-xs px-2 py-1">{currentQuestionData.difficulty === 'easy' ? 'Dễ' : currentQuestionData.difficulty === 'medium' ? 'Trung bình' : 'Khó'}</Badge><Badge variant="outline" className="text-xs px-2 py-1"><Target className="h-3 w-3 mr-1" />{currentQuestionData.topic}</Badge></div>
            <div className="mb-6 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700"><SimpleMath className="text-lg leading-relaxed text-gray-800 dark:text-gray-200">{currentQuestionData.question}</SimpleMath>{currentQuestionData.image && <img src={currentQuestionData.image} alt={`Hình ảnh câu hỏi ${currentQuestion + 1}`} className="mt-4 max-w-full h-auto rounded-lg shadow-sm" />}</div>
            <RadioGroup value={userAnswers[currentQuestion + 1] || ""} onValueChange={handleAnswerSelect} className="space-y-3" disabled={showFeedback}>
              {currentQuestionData.options.map((option, index) => {
                const optionLetter = option.charAt(0) as keyof typeof OPTION_SHORTCUT_MAP;
                const isSelected = userAnswers[currentQuestion + 1] === optionLetter;
                const isCorrect = optionLetter === currentQuestionData.correctAnswer;
                const shortcutNumber = OPTION_SHORTCUT_MAP[optionLetter];
                let optionClass = "relative flex items-center space-x-3 rounded-lg border-2 p-4 transition-all duration-200 shadow-sm";
                if (showFeedback) optionClass += isCorrect ? " border-green-500 bg-green-50 dark:bg-green-950 dark:text-green-300 dark:border-green-600" : isSelected && !isCorrect ? " border-red-500 bg-red-50 dark:bg-red-950 dark:text-red-300 dark:border-red-600" : " border-gray-200 opacity-70 dark:border-gray-700";
                else optionClass += isSelected ? " border-blue-500 bg-blue-50 ring-2 ring-blue-300 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-500" : " border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600";
                return (
                  <div key={index} className={optionClass}>
                    <RadioGroupItem value={optionLetter} id={`option-${index}`} className="text-blue-600" /><Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base font-medium"><SimpleMath>{option}</SimpleMath></Label>
                    {!showFeedback && shortcutNumber && (<Badge variant="outline" className="text-xs ml-auto opacity-60">{`${optionLetter}/${shortcutNumber}`}</Badge>)}
                    {showFeedback && isCorrect && <CheckCircle className="h-6 w-6 text-green-500 animate-bound-in" />}
                    {showFeedback && isSelected && !isCorrect && <XCircle className="h-6 w-6 text-red-500 animate-bound-in" />}
                  </div>
                );
              })}
            </RadioGroup>
            
            {/* --- UPDATED HINT LOGIC START --- */}
            {/* Hint Button is now always visible if hints exist */}
            {currentQuestionData.hints?.length > 0 && (
              <div className="mt-4 flex gap-2 animate-fade-in">
                <Button variant="outline" size="sm" onClick={toggleHints} className="flex items-center gap-2 transition-all">
                  <HelpCircle className="h-4 w-4" />{showHints ? 'Ẩn gợi ý' : 'Xem gợi ý'}
                  <Badge variant="secondary" className="text-xs ml-1">H</Badge>
                </Button>
              </div>
            )}
            {/* Hint display area is also independent of feedback */}
            {showHints && currentQuestionData.hints?.length > 0 && (
              <div className="mt-4 bg-yellow-50 dark:bg-yellow-400/10 border-l-4 border-yellow-400 p-4 rounded-lg animate-fade-in">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2"><Lightbulb className="h-5 w-5" />Gợi ý:</h4>
                <ul className="space-y-1 list-disc list-inside">{currentQuestionData.hints.map((hint, index) => <li key={index} className="text-sm text-yellow-700 dark:text-yellow-400"><SimpleMath>{hint}</SimpleMath></li>)}</ul>
              </div>
            )}
            {/* --- UPDATED HINT LOGIC END --- */}

            {showFeedback && currentResult && (
              <div className="mt-6 space-y-4 animate-fade-in">
                <div className={`rounded-xl p-5 shadow-md ${currentResult.correct ? 'bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-400 dark:from-green-900/20 dark:to-green-950/30' : 'bg-gradient-to-br from-red-50 to-red-100 border-l-4 border-red-400 dark:from-red-900/20 dark:to-red-950/30'}`}>
                  <div className="flex items-center gap-3 mb-3">
                    {currentResult.correct ? <Sparkles className="h-7 w-7 text-green-600 animate-sparkle-burst" /> : <Frown className="h-7 w-7 text-red-600 animate-wiggle" />}
                    <span className={`text-xl font-bold ${currentResult.correct ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>{currentResult.correct ? 'Chính xác!' : 'Chưa đúng'}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-auto">(Thời gian: {formatTime(currentResult.timeSpent)})</span>
                  </div>
                  <div className="bg-white dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-lg flex items-center gap-2"><BookOpen className="h-5 w-5 text-blue-600" /> Giải thích chi tiết:</h4>
                    <SimpleMath className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{currentQuestionData.explanation}</SimpleMath>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900/50 border-t dark:border-gray-700 rounded-b-xl">
            <div className="flex gap-2"><Button variant="outline" onClick={goToPrevQuestion} disabled={currentQuestion === 0}><ChevronLeft className="mr-2 h-4 w-4" /> Câu trước</Button>{currentResult?.answered && <Button variant="outline" onClick={resetQuestion} className="text-orange-600 border-orange-300 hover:bg-orange-50 dark:text-orange-400 dark:border-orange-600 dark:hover:bg-orange-950"><RotateCcw className="mr-2 h-4 w-4" /> Làm lại</Button>}</div>
            <Button onClick={goToNextQuestion} disabled={currentQuestion < practiceData.questions.length - 1 && !currentResult?.answered} className="bg-blue-600 hover:bg-blue-700 text-white">{currentQuestion === practiceData.questions.length - 1 ? <><Trophy className="mr-2 h-4 w-4" />Hoàn thành</> : <>Câu sau <ChevronRight className="ml-2 h-4 w-4" /></>}</Button>
          </CardFooter>
        </Card>

        <Card className="mb-4 shadow-lg rounded-xl overflow-hidden bg-white dark:bg-gray-800 animate-fade-in">
          <CardHeader className="p-4 border-b dark:border-gray-700"><CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2"><Target className="h-5 w-5 text-blue-600" /> Bản đồ câu hỏi</CardTitle></CardHeader>
          <CardContent className="p-4"><div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-3">{practiceData.questions.map((_, index) => { const result = questionResults[index + 1]; const isActive = currentQuestion === index; let dotClass = "relative w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-white font-bold text-sm transition-all duration-300 ease-in-out cursor-pointer shadow-md"; if (isActive) dotClass += " bg-blue-600 ring-4 ring-blue-300 scale-110 z-20"; else if (result?.answered) dotClass += result.correct ? " bg-green-500 hover:bg-green-600" : " bg-red-500 hover:bg-red-600"; else dotClass += " bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-500"; return <Button key={index} variant="ghost" className={`${dotClass}`} onClick={(e) => goToQuestion(index, e)}>{index + 1}</Button>; })}</div></CardContent>
        </Card>

        {/* --- DIALOGS (UNCHANGED) --- */}
        <AlertDialog open={showSummaryDialog} onOpenChange={setShowSummaryDialog}>{/* Summary Dialog Content */}</AlertDialog>
        <AlertDialog open={showShortcutsHelp} onOpenChange={setShowShortcutsHelp}>{/* Shortcuts Dialog Content */}</AlertDialog>
        <AlertDialog open={showExitConfirmDialog} onOpenChange={setShowExitConfirmDialog}>{/* Exit Dialog Content */}</AlertDialog>
        <AlertDialog open={showGoToQuestionDialog} onOpenChange={setShowGoToQuestionDialog}>{/* GoTo Dialog Content */}</AlertDialog>
      </div>
    </div>
  )
}