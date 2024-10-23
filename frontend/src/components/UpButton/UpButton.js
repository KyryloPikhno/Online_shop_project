import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import { useState, useEffect } from "react"

import css from "./UpButton.module.css"

const UpButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <button className={isVisible ? css.visible : css.noVisible} onClick={scrollToTop}>
      <KeyboardArrowUpIcon fontSize="inherit" color="inherit" />
    </button>
  )
}

export { UpButton }
