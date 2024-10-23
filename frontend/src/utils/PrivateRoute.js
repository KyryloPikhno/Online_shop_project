import { useEffect, useState } from "react"
import { Outlet, Navigate } from "react-router-dom"

import { authService } from "../services"

const PrivateRoute = () => {
  const [state, setState] = useState(true)

  useEffect(() => {
    const res = authService.getAccessToken()

    if (res) {
      setState(true)
    }
    if (!res) {
      setState(false)
    }
  }, [])

  return state ? <Outlet /> : <Navigate to="/login" />
}

export { PrivateRoute }
