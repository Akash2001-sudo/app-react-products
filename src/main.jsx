import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProviderComponent } from './context/ThemeContext'
import { AuthProviderComponent } from './context/AuthContext'
import { BrowserRouter as Router } from 'react-router-dom'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
})

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProviderComponent>
        <AuthProviderComponent>
          <Router>
            <App />
          </Router>
        </AuthProviderComponent>
      </ThemeProviderComponent>
    </QueryClientProvider>
  </React.StrictMode>
)
