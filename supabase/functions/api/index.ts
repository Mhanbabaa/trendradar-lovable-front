
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const url = new URL(req.url)
    const path = url.pathname.replace('/functions/v1/api/', '')
    const segments = path.split('/')

    // Get authorization header
    const authHeader = req.headers.get('Authorization')
    let user = null
    
    if (authHeader) {
      const { data: { user: authUser }, error } = await supabaseClient.auth.getUser(
        authHeader.replace('Bearer ', '')
      )
      if (!error) user = authUser
    }

    console.log(`API Request: ${req.method} /${path}`)

    // Route handlers
    switch (segments[0]) {
      case 'auth':
        return await handleAuth(req, supabaseClient, segments.slice(1))
      case 'products':
        return await handleProducts(req, supabaseClient, user, segments.slice(1))
      case 'alerts':
        return await handleAlerts(req, supabaseClient, user, segments.slice(1))
      case 'reports':
        return await handleReports(req, supabaseClient, user, segments.slice(1))
      case 'dashboard':
        return await handleDashboard(req, supabaseClient, user, segments.slice(1))
      case 'users':
        return await handleUsers(req, supabaseClient, user, segments.slice(1))
      case 'plans':
        return await handlePlans(req, supabaseClient, user, segments.slice(1))
      default:
        return new Response(JSON.stringify({ error: 'Not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }
  } catch (error) {
    console.error('API Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

// Auth handlers
async function handleAuth(req: Request, supabase: any, segments: string[]) {
  const body = await req.json().catch(() => ({}))
  
  switch (segments[0]) {
    case 'register':
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: body.email,
        password: body.password,
        options: {
          data: {
            full_name: body.full_name,
            company_name: body.company_name,
            company_sector: body.company_sector,
            phone: body.phone,
          }
        }
      })
      
      if (signUpError) {
        return new Response(JSON.stringify({ error: signUpError.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      
      return new Response(JSON.stringify({ user: signUpData.user }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
      
    case 'login':
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: body.email,
        password: body.password,
      })
      
      if (signInError) {
        return new Response(JSON.stringify({ error: signInError.message }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      
      return new Response(JSON.stringify({ 
        user: signInData.user,
        session: signInData.session 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
      
    case 'reset-password':
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(body.email)
      
      if (resetError) {
        return new Response(JSON.stringify({ error: resetError.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      
      return new Response(JSON.stringify({ message: 'Password reset email sent' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
      
    default:
      return new Response(JSON.stringify({ error: 'Auth endpoint not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
  }
}

// Products handlers
async function handleProducts(req: Request, supabase: any, user: any, segments: string[]) {
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  switch (req.method) {
    case 'GET':
      if (segments.length === 0) {
        // List products
        const url = new URL(req.url)
        const page = parseInt(url.searchParams.get('page') || '1')
        const limit = parseInt(url.searchParams.get('limit') || '10')
        const categoryId = url.searchParams.get('category_id')
        
        let query = supabase
          .from('products')
          .select('*, categories(name), product_data(price, rating, review_count)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .range((page - 1) * limit, page * limit - 1)
          
        if (categoryId) {
          query = query.eq('category_id', categoryId)
        }
        
        const { data, error } = await query
        
        if (error) {
          return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          })
        }
        
        return new Response(JSON.stringify({ products: data }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      } else {
        // Get single product
        const productId = segments[0]
        const { data, error } = await supabase
          .from('products')
          .select('*, categories(name), product_data(*), reviews(*)')
          .eq('id', productId)
          .eq('user_id', user.id)
          .single()
          
        if (error) {
          return new Response(JSON.stringify({ error: error.message }), {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          })
        }
        
        return new Response(JSON.stringify({ product: data }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      
    case 'POST':
      const body = await req.json()
      
      // Extract product info from Trendyol URL (mock implementation)
      const productInfo = await extractProductInfo(body.url)
      
      const { data, error } = await supabase
        .from('products')
        .insert({
          user_id: user.id,
          trendyol_id: productInfo.trendyol_id,
          name: productInfo.name,
          url: body.url,
          category_id: body.category_id || productInfo.category_id,
          seller: productInfo.seller,
        })
        .select()
        .single()
        
      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      
      return new Response(JSON.stringify({ product: data }), {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
      
    case 'PUT':
      if (segments.length === 0) {
        return new Response(JSON.stringify({ error: 'Product ID required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      
      const updateBody = await req.json()
      const productId = segments[0]
      
      const { data: updateData, error: updateError } = await supabase
        .from('products')
        .update({
          is_active: updateBody.is_active,
          last_updated: new Date().toISOString(),
        })
        .eq('id', productId)
        .eq('user_id', user.id)
        .select()
        .single()
        
      if (updateError) {
        return new Response(JSON.stringify({ error: updateError.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      
      return new Response(JSON.stringify({ product: updateData }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
      
    case 'DELETE':
      if (segments.length === 0) {
        return new Response(JSON.stringify({ error: 'Product ID required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      
      const deleteProductId = segments[0]
      
      const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .eq('id', deleteProductId)
        .eq('user_id', user.id)
        
      if (deleteError) {
        return new Response(JSON.stringify({ error: deleteError.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      
      return new Response(JSON.stringify({ message: 'Product deleted successfully' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
      
    default:
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
  }
}

// Alerts handlers
async function handleAlerts(req: Request, supabase: any, user: any, segments: string[]) {
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  switch (req.method) {
    case 'GET':
      if (segments.length === 0) {
        // List alerts
        const { data, error } = await supabase
          .from('alerts')
          .select('*, products(name)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          
        if (error) {
          return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          })
        }
        
        return new Response(JSON.stringify({ alerts: data }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      break
      
    case 'POST':
      const body = await req.json()
      
      const { data, error } = await supabase
        .from('alerts')
        .insert({
          user_id: user.id,
          product_id: body.product_id,
          alert_type: body.alert_type,
          threshold: body.threshold,
          condition: body.condition,
        })
        .select()
        .single()
        
      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      
      return new Response(JSON.stringify({ alert: data }), {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
  }
  
  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

// Reports handlers
async function handleReports(req: Request, supabase: any, user: any, segments: string[]) {
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  switch (req.method) {
    case 'GET':
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        
      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      
      return new Response(JSON.stringify({ reports: data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
      
    case 'POST':
      const body = await req.json()
      
      const { data, error } = await supabase
        .from('reports')
        .insert({
          user_id: user.id,
          report_type: body.report_type,
          name: body.name,
          parameters: body.parameters,
          schedule: body.schedule,
        })
        .select()
        .single()
        
      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      
      return new Response(JSON.stringify({ report: data }), {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
  }
  
  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

// Dashboard handlers
async function handleDashboard(req: Request, supabase: any, user: any, segments: string[]) {
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  switch (segments[0]) {
    case 'summary':
      // Get dashboard summary data
      const { data: products } = await supabase
        .from('products')
        .select('id')
        .eq('user_id', user.id)
        .eq('is_active', true)
        
      const { data: alerts } = await supabase
        .from('alerts')
        .select('id')
        .eq('user_id', user.id)
        .eq('is_active', true)
        
      return new Response(JSON.stringify({
        tracked_products: products?.length || 0,
        active_alerts: alerts?.length || 0,
        price_changes_24h: 0, // This would be calculated from actual data
        new_reviews_24h: 0,   // This would be calculated from actual data
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
      
    default:
      return new Response(JSON.stringify({ error: 'Dashboard endpoint not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
  }
}

// Users handlers
async function handleUsers(req: Request, supabase: any, user: any, segments: string[]) {
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  switch (segments[0]) {
    case 'profile':
      if (req.method === 'GET') {
        // Get user profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single()
          
        return new Response(JSON.stringify({ 
          user: user,
          profile: profile 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      break
      
    case 'subscription':
      if (req.method === 'GET') {
        // Get user subscription
        const { data: subscription } = await supabase
          .from('subscriptions')
          .select('*, plans(*)')
          .eq('user_id', user.id)
          .single()
          
        return new Response(JSON.stringify({ subscription }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      break
  }
  
  return new Response(JSON.stringify({ error: 'User endpoint not found' }), {
    status: 404,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

// Plans handlers
async function handlePlans(req: Request, supabase: any, user: any, segments: string[]) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('plans')
      .select('*')
      .eq('is_active', true)
      .order('price_monthly', { ascending: true })
      
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    
    return new Response(JSON.stringify({ plans: data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
  
  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

// Helper function to extract product info from Trendyol URL
async function extractProductInfo(url: string) {
  // This is a mock implementation
  // In real scenario, you would scrape the Trendyol page or use their API
  const trendyolId = url.split('/').pop()?.split('-').pop() || 'unknown'
  
  return {
    trendyol_id: trendyolId,
    name: 'Örnek Ürün', // Would be extracted from actual page
    seller: 'Örnek Satıcı', // Would be extracted from actual page
    category_id: null, // Would be determined from actual page
  }
}
