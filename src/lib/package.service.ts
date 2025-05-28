
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
  tenant_id: string
  plan_id: string
  start_date: string
  end_date: string
  status: string
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
    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('*, plans(*)')
      .eq('tenant_id', tenantId)
      .eq('status', 'active')
      .single()
    
    if (subError) {
      // Return default plan if no subscription found
      const { data: defaultPlan, error: planError } = await supabase
        .from('plans')
        .select('*')
        .eq('name', 'Başlangıç')
        .single()
      
      if (planError) throw new Error(`Default plan fetch error: ${planError.message}`)
      return defaultPlan as Plan
    }
    
    return subscription.plans as Plan
  }
  
  async checkProductLimit(tenantId: string): Promise<boolean> {
    const packageInfo = await this.getTenantPackage(tenantId)
    
    // Get current product count
    const productCount = await this.dbService.countTenantData('products', tenantId)
    
    // Check against package limit (-1 means unlimited)
    if (packageInfo.product_limit === -1) return true
    
    return productCount < packageInfo.product_limit
  }
  
  hasFeature(packageInfo: Plan, feature: string): boolean {
    return packageInfo.features?.[feature] === true
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
        return -1 // Unlimited
      default:
        return 1
    }
  }
}
