export function decodeToken(token: string) {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((char) => {
      return '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
  
    return JSON.parse(jsonPayload)
}

export function formatDate(date: string) {
  const newData = new Date(date)
  const day = newData.getDate().toString().padStart(2, '0')
  const month = (newData.getMonth() + 1).toString().padStart(2, '0')
  const year = newData.getFullYear().toString()
  
  return `${day}-${month}-${year}`
}

export function getToken() {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
    ?.split('=')[1]
}

export function getUser() {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith('user='))
    ?.split('=')
}