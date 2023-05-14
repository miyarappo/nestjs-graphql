import jwtDecode from "jwt-decode"
import { useEffect, useState } from "react"

export const useAuth = () => {
  const [authInfo, setAuthInfo] = useState<{
    checked: boolean
    isAuthenticated: boolean
  }>({checked: false, isAuthenticated: false})

  useEffect(() => {
    const token = localStorage.getItem("token")
    try {
      if(token) {
        const decoedToken = jwtDecode<Payload>(token)
        if (decoedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem("token")
          setAuthInfo({checked: true, isAuthenticated: false})
        } else {
          setAuthInfo({checked: true, isAuthenticated: true})
        }
      } else {
        setAuthInfo({checked: true, isAuthenticated: false})
      }
    } catch (error) {
      setAuthInfo({checked: true, isAuthenticated: false})
    }
  }, [])

  return authInfo
}
