/**
 * Simple static authentication for admin panel
 * 
 * Credentials are stored in environment variables:
 * ADMIN_USERNAME and ADMIN_PASSWORD
 * 
 * For production, consider using a more secure authentication system.
 */

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

export function verifyCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  return sessionStorage.getItem('admin_authenticated') === 'true'
}

export function setAuthenticated(value: boolean): void {
  if (typeof window === 'undefined') return
  if (value) {
    sessionStorage.setItem('admin_authenticated', 'true')
  } else {
    sessionStorage.removeItem('admin_authenticated')
  }
}

export function logout(): void {
  setAuthenticated(false)
  if (typeof window !== 'undefined') {
    window.location.href = '/admin/login'
  }
}

