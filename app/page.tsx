"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion" // Thêm thư viện animation

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Computer, BrainCircuit, Server, BarChart3, User } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LoginPage() {
  const router = useRouter()
  const [name, setName] = useState("")

  const handleStartPractice = () => {
    // Nếu không nhập tên, sẽ lấy tên mặc định. Sau đó chuyển trang.
    const studentName = name.trim() || "Người dùng ẩn danh"
    localStorage.setItem("studentName", studentName)
    router.push("/select-exam")
  }

  // Cấu hình cho animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Hiệu ứng xuất hiện lần lượt cho các item con
      },
    },
  }

  // Cấu hình cho animation item
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-gray-50 to-slate-100 dark:from-gray-900 dark:via-slate-950 dark:to-black p-4 overflow-hidden">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        {/* Header Section */}
        <div className="text-center mb-8 relative">
          <div className="absolute top-0 right-0">
            <ThemeToggle />
          </div>
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
          >
            <Image
              src="/bechovang.webp"
              alt="TechLearn Logo"
              width={64}
              height={64}
              className="mx-auto mb-4"
            />
          </motion.div>
          <motion.h1
            className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Bechovang Platform
          </motion.h1>
          <motion.p
            className="text-gray-600 dark:text-gray-400"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Web ôn tập các môn lý thuyết ngành CNTT
          </motion.p>
        </div>

        {/* Features Section */}
        <motion.div
          className="grid grid-cols-3 gap-4 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center" variants={itemVariants}>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-2">
              <BrainCircuit className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Câu hỏi đa dạng</p>
          </motion.div>
          <motion.div className="text-center" variants={itemVariants}>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-2">
              <Server className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Ngân hàng đề lớn</p>
          </motion.div>
          <motion.div className="text-center" variants={itemVariants}>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-2">
              <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Có lời giải chi tiết</p>
          </motion.div>
        </motion.div>

        {/* Login Card */}
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        >
        <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">Bắt đầu ôn tập</CardTitle>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Nhập tên của bạn để tiếp tục</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Nhập tên của bạn (hoặc bỏ trống)..."
                className="pl-10 h-12 border-2 focus:border-blue-500 transition-colors"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleStartPractice()}
              />
            </div>
            
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-12 text-base font-medium shadow-lg transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/30"
                onClick={handleStartPractice}
              >
                <Computer className="mr-2 h-5 w-5" />
                Bắt đầu học
              </Button>
            </motion.div>

          </CardContent>
        </Card>
        </motion.div>

        {/* Footer */}
        <motion.div 
            className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
        >
          <p>💡 Giúp việc luyện đề thi một cách hiệu quả.</p>
        </motion.div>
      </motion.div>
    </div>
  )
}