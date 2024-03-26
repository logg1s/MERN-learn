import { useEffect, useState, useCallback } from 'react'

export default function useAuth() {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(false)
  const [expire, setExpire] = useState(null)
  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem('userData')
  }, [])
  const login = useCallback(
    (uid, token, exprTime) => {
      fetch('http://localhost:8000/api/users/checkValidToken', {
        method: 'POST',
        body: JSON.stringify({
          userId: uid,
          expire: exprTime
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error login')
          }
          setToken(token)
          setUserId(uid)
          localStorage.setItem(
            'userData',
            JSON.stringify({
              userId: uid,
              token,
              expire: exprTime
            })
          )
          setExpire(exprTime)
        })
        .catch(() => {
          logout()
        })
    },
    [logout]
  )

  useEffect(() => {
    const checkLocalStorage = () => {
      const storageData = JSON.parse(localStorage.getItem('userData') || null)
      storageData &&
      storageData.userId &&
      storageData.token &&
      storageData.expire &&
      new Date(storageData.expire) > new Date()
        ? login(
            storageData.userId,
            storageData.token,
            new Date(storageData.expire)
          )
        : logout()
    }
    checkLocalStorage()

    window.addEventListener('storage', checkLocalStorage)
    return () => {
      window.removeEventListener('storage', HashChangeEvent)
    }
  }, [login, logout])

  useEffect(() => {
    const remainingTime = new Date(expire) - new Date()
    if (token && expire) {
      const logoutTimer = setTimeout(logout, remainingTime)
      return () => clearTimeout(logoutTimer)
    }
  }, [token, expire, logout])

  return { token, login, logout, userId }
}
