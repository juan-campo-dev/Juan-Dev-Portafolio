"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const CursorFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", updateMousePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
    }
  }, [])

  return (
    <motion.div
      className="fixed z-[9999] pointer-events-none rounded-full bg-neon-blue opacity-70 mix-blend-screen"
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
        width: "20px",
        height: "20px",
        transform: "translate(-50%, -50%)",
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  )
}

export default CursorFollower
