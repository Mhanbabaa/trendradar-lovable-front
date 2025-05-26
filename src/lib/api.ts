
import { supabase } from '@/integrations/supabase/client'

const API_BASE_URL = 'https://haaspugoeefuabwubbdh.supabase.co/functions/v1/api'

// Get auth token for API calls
async function getAuthToken() {
  const { data: { session } } = await supabase.auth.getSession()
  return session?.access_token
}

// Generic API call function
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const token = await getAuthToken()
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
      ...options.headers,
    },
  })
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }))
    throw new Error(error.error || 'API request failed')
  }
  
  return response.json()
}

// Auth API
export const authAPI = {
  register: (data: {
    email: string
    password: string
    full_name: string
    company_name: string
    company_sector: string
    phone: string
  }) => apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  login: (email: string, password: string) => apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }),

  resetPassword: (email: string) => apiCall('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  }),
}

// Products API
export const productsAPI = {
  list: (params?: {
    page?: number
    limit?: number
    category_id?: string
  }) => {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.append('page', params.page.toString())
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    if (params?.category_id) searchParams.append('category_id', params.category_id)
    
    return apiCall(`/products?${searchParams.toString()}`)
  },

  get: (id: string) => apiCall(`/products/${id}`),

  create: (data: {
    url: string
    category_id?: string
  }) => apiCall('/products', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  update: (id: string, data: {
    is_active?: boolean
  }) => apiCall(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  delete: (id: string) => apiCall(`/products/${id}`, {
    method: 'DELETE',
  }),
}

// Alerts API
export const alertsAPI = {
  list: () => apiCall('/alerts'),

  create: (data: {
    product_id: string
    alert_type: string
    threshold: number
    condition: string
  }) => apiCall('/alerts', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  update: (id: string, data: {
    threshold?: number
    condition?: string
    is_active?: boolean
  }) => apiCall(`/alerts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  delete: (id: string) => apiCall(`/alerts/${id}`, {
    method: 'DELETE',
  }),
}

// Reports API
export const reportsAPI = {
  list: () => apiCall('/reports'),

  create: (data: {
    report_type: string
    name: string
    parameters: object
    schedule?: string
  }) => apiCall('/reports', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  generate: (id: string, parameters?: object) => apiCall(`/reports/${id}/generate`, {
    method: 'POST',
    body: JSON.stringify({ parameters }),
  }),
}

// Dashboard API
export const dashboardAPI = {
  getSummary: () => apiCall('/dashboard/summary'),
  getActivities: (limit?: number) => apiCall(`/dashboard/activities${limit ? `?limit=${limit}` : ''}`),
  getPriceChanges: (days?: number) => apiCall(`/dashboard/price-changes${days ? `?days=${days}` : ''}`),
}

// Users API
export const usersAPI = {
  getProfile: () => apiCall('/users/profile'),
  updateProfile: (data: {
    full_name?: string
    company_name?: string
    company_sector?: string
    phone?: string
  }) => apiCall('/users/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  getSubscription: () => apiCall('/users/subscription'),
  updateSubscription: (data: {
    plan_id: string
    payment_method?: string
    auto_renew?: boolean
  }) => apiCall('/users/subscription', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  getNotificationSettings: () => apiCall('/users/notifications'),
  updateNotificationSettings: (data: {
    email_alerts?: boolean
    push_alerts?: boolean
    sms_alerts?: boolean
    weekly_summary?: boolean
    system_notifications?: boolean
  }) => apiCall('/users/notifications', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
}

// Plans API
export const plansAPI = {
  list: () => apiCall('/plans'),
}
