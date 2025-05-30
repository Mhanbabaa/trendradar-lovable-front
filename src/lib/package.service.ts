import { DatabaseService } from './database.service'
import { supabase } from '@/integrations/supabase/client'

export interface Plan {
  id: string
  name: string
  description: string
  price_monthly: number
  price_yearly: number
  product_limit: number
  update_frequency: string
  features: Record<string, any>
  is_active: boolean
}

export interface Subscription {
  id: string
  user_id: string
  plan_id: string
  start_date: string
  end_date: string
  payment_status: string
  auto_renew: boolean
  is_trial: boolean
  plans: Plan
}

export class PackageService {
  private dbService: DatabaseService
  
  constructor(dbService: DatabaseService) {
    this.dbService = dbService
  }
  
  async getTenantPackage(tenantId: string): Promise<Plan> {
    try {
      console.log('Getting tenant package for:', tenantId)
      
      // Try to get active subscription first using direct query with proper syntax
      const { data: subscription, error: subError } = await supabase
        .from('subscriptions')
        .select(`
          *,
          plans (*)
        `)
        .eq('user_id', tenantId)
        .eq('payment_status', 'paid')
        .maybeSingle()
      
      console.log('Subscription query result:', subscription, 'Error:', subError)
      
      if (!subError && subscription && (subscription as any).plans) {
        console.log('Found active subscription with plan:', (subscription as any).plans)
        return (subscription as any).plans as Plan
      }
      
      // Fallback: Return Admin plan if no subscription found
      const { data: adminPlan, error: adminPlanError } = await supabase
        .from('plans')
        .select('*')
        .eq('name', 'Admin')
        .maybeSingle()
      
      if (!adminPlanError && adminPlan) {
        console.log('Using Admin plan as fallback:', adminPlan)
        return adminPlan as Plan
      }
      
      // Final fallback: Return default plan
      const { data: defaultPlan, error: planError } = await supabase
        .from('plans')
        .select('*')
        .eq('name', 'Başlangıç')
        .maybeSingle()
      
      if (!planError && defaultPlan) {
        console.log('Using default plan as fallback:', defaultPlan)
        return defaultPlan as Plan
      }
      
      console.log('No plans found, using hardcoded fallback')
      // Return a basic fallback plan
      return {
        id: 'default',
        name: 'Başlangıç',
        description: 'Başlangıç Paketi',
        price_monthly: 199,
        price_yearly: 1990,
        product_limit: 10,
        update_frequency: 'daily',
        features: {
          basic_reports: true,
          price_tracking: true,
          sentiment_analysis: false,
          category_analysis: false,
          comprehensive_reports: false,
          api_access: false,
          real_time_updates: false,
          unlimited_history: false
        },
        is_active: true
      }
    } catch (error) {
      console.error('Error in getTenantPackage:', error)
      // Return basic fallback plan
      return {
        id: 'fallback',
        name: 'Başlangıç',
        description: 'Başlangıç Paketi',
        price_monthly: 199,
        price_yearly: 1990,
        product_limit: 10,
        update_frequency: 'daily',
        features: {
          basic_reports: true,
          price_tracking: true
        },
        is_active: true
      }
    }
  }
  
  async checkProductLimit(tenantId: string): Promise<boolean> {
    try {
      console.log('Checking product limit for tenant:', tenantId)
      
      const packageInfo = await this.getTenantPackage(tenantId)
      console.log('Package info for limit check:', packageInfo)
      
      // Get current product count
      const { count, error } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', tenantId)
      
      if (error) {
        console.error('Error counting products:', error)
        return false
      }
      
      const productCount = count || 0
      console.log('Current product count:', productCount, 'Limit:', packageInfo.product_limit)
      
      // Check against package limit (-1 means unlimited)
      if (packageInfo.product_limit === -1 || packageInfo.product_limit >= 999999) {
        console.log('Unlimited products allowed')
        return true
      }
      
      const canAdd = productCount < packageInfo.product_limit
      console.log('Can add product:', canAdd)
      return canAdd
    } catch (error) {
      console.error('Error checking product limit:', error)
      return false
    }
  }
  
  hasFeature(packageInfo: Plan, feature: string): boolean {
    if (!packageInfo.features) return false
    return packageInfo.features[feature] === true
  }
  
  getDataCollectionFrequency(packageInfo: Plan): string {
    switch (packageInfo.update_frequency) {
      case 'daily':
        return '0 0 * * *' // Daily at midnight
      case '8hours':
        return '0 */8 * * *' // Every 8 hours
      case 'hourly':
        return '0 * * * *' // Every hour
      case '15minutes':
        return '*/15 * * * *' // Every 15 minutes
      default:
        return '0 0 * * *' // Default to daily
    }
  }
  
  getDataRetentionPeriod(packageInfo: Plan): number {
    switch (packageInfo.name) {
      case 'Başlangıç':
        return 30 // 1 month
      case 'Profesyonel':
        return 90 // 3 months
      case 'İşletme':
        return 365 // 12 months
      case 'Kurumsal':
      case 'Admin':
        return -1 // Unlimited
      default:
        return 30
    }
  }
  
  getMaxUsers(packageInfo: Plan): number {
    switch (packageInfo.name) {
      case 'Başlangıç':
      case 'Profesyonel':
        return 1
      case 'İşletme':
        return 5
      case 'Kurumsal':
      case 'Admin':
        return -1 // Unlimited
      default:
        return 1
    }
  }
}
