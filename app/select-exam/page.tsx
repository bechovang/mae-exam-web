"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, BookOpen, Clock, Target, AlertTriangle, Info, Loader2 } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Input } from "@/components/ui/input"
import { Select as UISelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

// Interface for the data structure expected from deX.json files
interface FetchedExamData {
  examId: string;
  title: string;
  description: string;
  questions?: any[];
}

// Manifest structure for available exam IDs
interface ExamsManifest {
  available: number[];
}

// Interface for the data structure used to render exam cards
interface ExamCardDisplayData {
  id: number; // Numeric ID, e.g., 1 for de1.json
  examIdToDisplay: string; // examId from JSON, or a placeholder
  titleToDisplay: string; // title from JSON, or a placeholder
  descriptionToDisplay: string; // description from JSON, or a placeholder
  isLoading: boolean; // True while attempting to fetch this specific exam
  isAvailable: boolean; // True if successfully loaded, false otherwise
  topics: string[];
  difficulties: string[];
  questionCount: number;
  modifiedAt: number;
}

const MAX_EXAMS_TO_CHECK = 50; // Allow up to 50 exams

export default function SelectPracticePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [studentName, setStudentName] = useState("")
  const [practiceSets, setPracticeSets] = useState<ExamCardDisplayData[]>([])
  const [allTopics, setAllTopics] = useState<string[]>([])
  const [allDifficulties, setAllDifficulties] = useState<string[]>([])

  // Controls
  const [searchText, setSearchText] = useState<string>("")
  const [topicFilter, setTopicFilter] = useState<string>("")
  const [difficultyFilter, setDifficultyFilter] = useState<string>("")
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "id-asc" | "id-desc" | "title-asc" | "title-desc">("id-asc")
  const [pageSize, setPageSize] = useState<number>(12)
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    const name = localStorage.getItem("studentName")
    if (!name) {
      router.push("/")
      return
    }
    setStudentName(name)

    // initialize preferences from URL or localStorage
    const prefsRaw = localStorage.getItem("select-exam:prefs")
    const prefs = prefsRaw ? JSON.parse(prefsRaw) : {}
    const pageParam = Number((searchParams && searchParams.get("page")) || prefs.page || 1)
    const sizeParam = Number((searchParams && searchParams.get("size")) || prefs.size || 12)
    const searchParam = ((searchParams && searchParams.get("search")) || prefs.search || "") as string
    const topicParam = ((searchParams && searchParams.get("topic")) || prefs.topic || "") as string
    const diffParam = ((searchParams && searchParams.get("difficulty")) || prefs.difficulty || "") as string
    const sortParam = ((searchParams && searchParams.get("sort")) || "id-asc") as
      | "newest" | "oldest" | "id-asc" | "id-desc" | "title-asc" | "title-desc"
    setPage(isNaN(pageParam) ? 1 : pageParam)
    setPageSize(isNaN(sizeParam) ? 12 : sizeParam)
    setSearchText(searchParam)
    setTopicFilter(topicParam)
    setDifficultyFilter(diffParam)
    setSortBy(sortParam)

  }, [router, searchParams]);

  // Load exam data once on mount (using manifest to avoid 404 spam)
  useEffect(() => {
    const loadAllExamData = async () => {
      try {
        // Try load manifest first
        let examIdsToTry: number[] = []
        try {
          const manifestResp = await fetch('/data/manifest.json', { cache: 'no-cache' })
          if (manifestResp.ok) {
            const manifest: ExamsManifest = await manifestResp.json()
            if (Array.isArray(manifest.available) && manifest.available.length > 0) {
              examIdsToTry = manifest.available
            }
          }
        } catch {}

        // Fallback: probe a smaller default range if no manifest
        if (examIdsToTry.length === 0) {
          examIdsToTry = Array.from({ length: Math.min(24, MAX_EXAMS_TO_CHECK) }, (_, i) => i + 1)
        }

        // Initial placeholder state for just the IDs we intend to load
        const initialPlaceholderSets: ExamCardDisplayData[] = examIdsToTry.map(id => ({
          id,
          examIdToDisplay: `de${id}`,
          titleToDisplay: `Đề ${id}`,
          descriptionToDisplay: 'Đang kiểm tra trạng thái...',
          isLoading: true,
          isAvailable: false,
          topics: [],
          difficulties: [],
          questionCount: 0,
          modifiedAt: 0,
        }))
        setPracticeSets(initialPlaceholderSets)

        // Fetch details for each available exam id
        const settledPromises = await Promise.allSettled(
          examIdsToTry.map(async (id) => {
            const response = await fetch(`/data/de${id}.json`, { cache: 'no-cache' })
            if (!response.ok) {
              throw new Error(`File de${id}.json not found or not accessible`)
            }
            const data: FetchedExamData = await response.json()
            const lastMod = response.headers.get('last-modified')
            const modifiedAt = lastMod ? new Date(lastMod).getTime() : 0
            const topicsSet = new Set<string>()
            const diffsSet = new Set<string>()
            if (Array.isArray(data.questions)) {
              for (const q of data.questions) {
                const t = (q && (q as any).topic) as string | undefined
                const d = (q && (q as any).difficulty) as string | undefined
                if (t) topicsSet.add(t)
                if (d) diffsSet.add(d)
              }
            }
            return {
              id,
              data,
              modifiedAt,
              topics: Array.from(topicsSet),
              difficulties: Array.from(diffsSet),
              questionCount: Array.isArray(data.questions) ? data.questions.length : 0,
            }
          })
        )

        const updatedSets = initialPlaceholderSets.map((placeholderSet, index) => {
          const result = settledPromises[index]
          if (result.status === 'fulfilled') {
            const loaded = result.value as unknown as {
              id: number;
              data: FetchedExamData;
              modifiedAt: number;
              topics: string[];
              difficulties: string[];
              questionCount: number;
            }
            return {
              id: placeholderSet.id,
              examIdToDisplay: loaded.data.examId,
              titleToDisplay: loaded.data.title,
              descriptionToDisplay: loaded.data.description,
              isLoading: false,
              isAvailable: true,
              topics: loaded.topics,
              difficulties: loaded.difficulties,
              questionCount: loaded.questionCount,
              modifiedAt: loaded.modifiedAt,
            }
          } else {
            return {
              ...placeholderSet,
              descriptionToDisplay: 'Dữ liệu đề thi không tồn tại.',
              isLoading: false,
              isAvailable: false,
              topics: [],
              difficulties: [],
              questionCount: 0,
              modifiedAt: 0,
            }
          }
        })
        setPracticeSets(updatedSets)

        // Aggregate filters
        const topicsAgg = new Set<string>()
        const diffsAgg = new Set<string>()
        for (const e of updatedSets) {
          if (e.isAvailable) {
            e.topics.forEach(t => t && topicsAgg.add(t))
            e.difficulties.forEach(d => d && diffsAgg.add(d))
          }
        }
        setAllTopics(Array.from(topicsAgg).sort())
        setAllDifficulties(Array.from(diffsAgg).sort())
      } catch (e) {
        // If something unexpected happens, keep current state
      }
    }

    loadAllExamData()
  }, [])

  const handleSelectPractice = (practice: ExamCardDisplayData) => {
    if (!practice.isAvailable || practice.isLoading) {
      // This case should ideally not be met if button is properly disabled
      alert("Đề luyện tập này hiện không có sẵn hoặc đang tải.");
      return;
    }
    localStorage.setItem("selectedPractice", practice.id.toString()) // Use numeric id
    router.push(`/practice/${practice.id}`)
  }

  // Derived list: filter, search, sort
  const filteredSorted = useMemo(() => {
    const term = searchText.trim().toLowerCase()
    let arr = practiceSets.filter(e => e.isAvailable && !e.isLoading)
    if (term) {
      arr = arr.filter(e =>
        e.examIdToDisplay.toLowerCase().includes(term) ||
        e.titleToDisplay.toLowerCase().includes(term) ||
        e.descriptionToDisplay.toLowerCase().includes(term)
      )
    }
    if (topicFilter) arr = arr.filter(e => e.topics.includes(topicFilter))
    if (difficultyFilter) arr = arr.filter(e => e.difficulties.includes(difficultyFilter))
    const parseId = (x: string, fallback: number) => {
      const m = x.match(/\d+/)
      return m ? parseInt(m[0], 10) : fallback
    }
    switch (sortBy) {
      case "newest":
        arr = [...arr].sort((a, b) => (b.modifiedAt || 0) - (a.modifiedAt || 0) || parseId(b.examIdToDisplay, b.id) - parseId(a.examIdToDisplay, a.id))
        break
      case "oldest":
        arr = [...arr].sort((a, b) => (a.modifiedAt || 0) - (b.modifiedAt || 0) || parseId(a.examIdToDisplay, a.id) - parseId(b.examIdToDisplay, b.id))
        break
      case "id-asc":
        arr = [...arr].sort((a, b) => a.id - b.id)
        break
      case "id-desc":
        arr = [...arr].sort((a, b) => b.id - a.id)
        break
      case "title-asc":
        arr = [...arr].sort((a, b) => a.titleToDisplay.localeCompare(b.titleToDisplay))
        break
      case "title-desc":
        arr = [...arr].sort((a, b) => b.titleToDisplay.localeCompare(a.titleToDisplay))
        break
      default:
        break
    }
    return arr
  }, [practiceSets, searchText, topicFilter, difficultyFilter, sortBy])

  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / Math.max(1, pageSize)))
  const currentPage = Math.min(Math.max(1, page), totalPages)
  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredSorted.slice(start, start + pageSize)
  }, [filteredSorted, currentPage, pageSize])

  // Persist and sync URL
  useEffect(() => {
    const params = new URLSearchParams()
    params.set("page", String(currentPage))
    params.set("size", String(pageSize))
    if (searchText) params.set("search", searchText)
    if (topicFilter) params.set("topic", topicFilter)
    if (difficultyFilter) params.set("difficulty", difficultyFilter)
    if (sortBy) params.set("sort", sortBy)
    router.push(`/select-exam?${params.toString()}`)
    localStorage.setItem("select-exam:prefs", JSON.stringify({ page: currentPage, size: pageSize, search: searchText, topic: topicFilter, difficulty: difficultyFilter, sort: sortBy }))
  }, [currentPage, pageSize, searchText, topicFilter, difficultyFilter, sortBy, router])

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-950 p-4">
      <div className="mx-auto w-full max-w-6xl">
        <Card className="mb-6 shadow-lg bg-white dark:bg-gray-800/30">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white relative">
            <CardTitle className="text-center text-2xl flex items-center justify-center gap-2">
              <Image src="/bechovang.webp" alt="Logo" width={32} height={32} className="rounded-full" />
              Nền tảng luyện tập toán học
            </CardTitle>
            <div className="absolute top-1/2 right-4 -translate-y-1/2">
              <ThemeToggle />
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Xin chào, {studentName}! 👋
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Chọn một bộ đề luyện tập để bắt đầu hành trình học toán của bạn
              </p>
              <div className="flex justify-center items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
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
            {/* Controls */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-3">
              <div className="md:col-span-5">
                <Input
                  placeholder="Tìm kiếm theo ID, tiêu đề, mô tả..."
                  value={searchText}
                  onChange={(e) => { setPage(1); setSearchText(e.target.value) }}
                />
              </div>
              <div className="md:col-span-2">
                <UISelect value={topicFilter} onValueChange={(v) => { setPage(1); setTopicFilter(v === "__ALL__" ? "" : v) }}>
                  <SelectTrigger className="w-full"><SelectValue placeholder="Chủ đề" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__ALL__">Tất cả chủ đề</SelectItem>
                    {allTopics.map(t => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </UISelect>
              </div>
              <div className="md:col-span-2">
                <UISelect value={difficultyFilter} onValueChange={(v) => { setPage(1); setDifficultyFilter(v === "__ALL__" ? "" : v) }}>
                  <SelectTrigger className="w-full"><SelectValue placeholder="Độ khó" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__ALL__">Tất cả độ khó</SelectItem>
                    {allDifficulties.map(d => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </UISelect>
              </div>
              <div className="md:col-span-1">
                <UISelect value={String(pageSize)} onValueChange={(v) => { setPage(1); setPageSize(Number(v)) }}>
                  <SelectTrigger className="w-full"><SelectValue placeholder="Kích thước" /></SelectTrigger>
                  <SelectContent>
                    {[8,12,24,48].map(s => (
                      <SelectItem key={s} value={String(s)}>{s}/trang</SelectItem>
                    ))}
                  </SelectContent>
                </UISelect>
              </div>
              <div className="md:col-span-2">
                <UISelect value={sortBy} onValueChange={(v) => { setPage(1); setSortBy(v as any) }}>
                  <SelectTrigger className="w-full"><SelectValue placeholder="Sắp xếp" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Mới nhất</SelectItem>
                    <SelectItem value="oldest">Cũ nhất</SelectItem>
                    <SelectItem value="id-asc">Tên file ↑</SelectItem>
                    <SelectItem value="id-desc">Tên file ↓</SelectItem>
                    <SelectItem value="title-asc">Title A→Z</SelectItem>
                    <SelectItem value="title-desc">Title Z→A</SelectItem>
                  </SelectContent>
                </UISelect>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pageItems.map((practice) => (
            <Card
              key={practice.id}
              className={`transition-all duration-300 border-2 flex flex-col ${
                practice.isAvailable && !practice.isLoading
                  ? 'bg-white dark:bg-gray-800/50 hover:shadow-xl hover:scale-105 hover:bg-blue-50 dark:hover:bg-gray-800 hover:border-blue-200 dark:hover:border-blue-600 cursor-pointer'
                  : 'opacity-70 bg-gray-100 dark:bg-gray-800/50 cursor-not-allowed'
              }`}
              onClick={() => practice.isAvailable && !practice.isLoading && handleSelectPractice(practice)}
            >
              <CardContent className="flex flex-col h-full p-6">
                <div className="flex items-start justify-between mb-4">
                  {practice.isAvailable ? 
                    <FileText className="h-8 w-8 text-blue-500 flex-shrink-0" /> : 
                    <AlertTriangle className="h-8 w-8 text-orange-400 flex-shrink-0" />
                  }
                </div>
                
                {practice.isLoading ? (
                  <div className="flex-grow flex flex-col items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    <p className="text-sm text-gray-500 mt-2">{practice.titleToDisplay}</p>
                    <p className="text-xs text-gray-400 mt-1">{practice.descriptionToDisplay}</p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1">
                      {practice.titleToDisplay}
                    </h3>
                    {practice.isAvailable && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                        <Info size={12} className="mr-1 text-gray-400"/> ID: {practice.examIdToDisplay}
                      </p>
                    )}
                    <p className={`text-gray-600 dark:text-gray-400 mb-3 flex-grow text-sm ${!practice.isAvailable ? 'italic' : ''}`}>
                      {practice.descriptionToDisplay}
                    </p>
                  </>
                )}
                
                <Button 
                  className={`mt-auto w-full ${
                  practice.isAvailable && !practice.isLoading
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                    : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                  }`}
                  disabled={!practice.isAvailable || practice.isLoading}
                >
                  {practice.isLoading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang tải...</>
                  ) : practice.isAvailable ? (
                    'Bắt đầu luyện tập'
                  ) : (
                    'Không có sẵn'
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination controls */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2 text-sm text-gray-600 dark:text-gray-400">
            <span>Trang {currentPage}/{totalPages} • Tổng {filteredSorted.length} đề</span>
            <div className="flex items-center gap-2">
              <span>Nhảy tới</span>
              <Input
                className="w-24"
                type="number"
                min={1}
                value={currentPage}
                onChange={(e) => {
                  const val = parseInt(e.target.value || "1", 10)
                  if (isNaN(val)) return
                  if (val < 1) { setPage(1); return }
                  if (val > totalPages) { setPage(totalPages); return }
                  setPage(val)
                }}
              />
            </div>
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setPage(Math.max(1, currentPage - 1)) }} />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2)).map(p => (
                <PaginationItem key={p}>
                  <PaginationLink href="#" isActive={p === currentPage} onClick={(e) => { e.preventDefault(); setPage(p) }}>
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setPage(Math.min(totalPages, currentPage + 1)) }} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            💡 Mẹo: Hãy thực hành thường xuyên để cải thiện kỹ năng toán học của bạn!
          </p>
        </div>
      </div>
    </div>
  )
}
