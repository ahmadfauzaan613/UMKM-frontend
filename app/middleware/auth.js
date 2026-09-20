/**
 * Auth Middleware
 * Protect routes that require authentication
 */

export default function ({ $auth, redirect, route }) {
  // Check if user is authenticated
  if (!$auth.loggedIn) {
    return redirect('/login')
  }
}
