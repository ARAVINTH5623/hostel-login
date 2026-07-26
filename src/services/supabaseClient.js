import { createClient } from '@supabase/supabase-js'

export const SUPABASE_URL = 'https://dxtnjfizdafgdcjpvvhl.supabase.co'
export const SUPABASE_REST_URL = 'https://dxtnjfizdafgdcjpvvhl.supabase.co/rest/v1/'
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4dG5qZml6ZGFmZ2RjanB2dmhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MjAxNTAwMDAwMH0.mock-key'

// Initialize Supabase Client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
})

// REST API Service helper with live status check & local store fallback
export class SupabaseApiService {
  static async checkHealth() {
    try {
      const response = await fetch(`${SUPABASE_REST_URL}`, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
      })
      return {
        status: response.status < 500 ? 'online' : 'offline',
        statusCode: response.status,
        url: SUPABASE_REST_URL
      }
    } catch (err) {
      return {
        status: 'demo_mode',
        error: err.message,
        url: SUPABASE_REST_URL
      }
    }
  }

  static async fetchTableData(tableName) {
    try {
      const response = await fetch(`${SUPABASE_REST_URL}${tableName}?select=*`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        }
      })
      if (response.ok) {
        return await response.json()
      }
      throw new Error(`HTTP ${response.status}`)
    } catch (err) {
      // Return null to allow fallback to local reactive mock state
      return null
    }
  }
}
