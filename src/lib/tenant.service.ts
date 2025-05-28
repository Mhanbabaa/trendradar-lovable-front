
import { DatabaseService } from './database.service'
import { PackageService } from './package.service'
import { supabase } from '@/integrations/supabase/client'

export interface Tenant {
  id: string
  name: string
  email: string
  created_at: string
  updated_at: string
  is_active: boolean
}

export interface TenantUser {
  id: string
  tenant_id: string
  email: string
  name: string
  role: string
  created_at: string
  updated_at: string
}

export class TenantService {
  private dbService: DatabaseService
  private packageService: PackageService
  
  constructor(dbService: DatabaseService, packageService: PackageService) {
    this.dbService = dbService
    this.packageService = packageService
  }
  
  async createTenant(
    tenantData: {
      name: string
      email: string
    },
    adminUser: {
      email: string
      password: string
      name: string
    }
  ): Promise<{ tenant: Tenant; user: any }> {
    // Create tenant
    const { data: tenant, error: tenantError } = await supabase
      .from('tenants' as any)
      .insert({
        name: tenantData.name,
        email: tenantData.email
      })
      .select()
      .single()
    
    if (tenantError) throw new Error(`Tenant creation error: ${tenantError.message}`)
    
    // Create admin user with tenant_id in metadata
    const { data: user, error: userError } = await supabase.auth.signUp({
      email: adminUser.email,
      password: adminUser.password,
      options: {
        data: {
          full_name: adminUser.name,
          company_name: tenantData.name,
          tenant_id: tenant.id,
          role: 'admin'
        }
      }
    })
    
    if (userError) {
      // Cleanup tenant if user creation failed
      await supabase.from('tenants' as any).delete().eq('id', tenant.id)
      throw new Error(`User creation error: ${userError.message}`)
    }
    
    // Create default subscription (trial)
    const { data: defaultPlan } = await supabase
      .from('plans')
      .select('*')
      .eq('name', 'Başlangıç')
      .single()
    
    if (defaultPlan) {
      await supabase
        .from('subscriptions')
        .insert({
          tenant_id: tenant.id,
          plan_id: defaultPlan.id,
          status: 'active',
          is_trial: true,
          start_date: new Date().toISOString(),
          end_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() // 14 days trial
        })
    }
    
    return { tenant: tenant as Tenant, user }
  }
  
  async getTenantInfo(tenantId: string): Promise<Tenant> {
    const { data: tenant, error } = await supabase
      .from('tenants' as any)
      .select('*')
      .eq('id', tenantId)
      .single()
    
    if (error) throw new Error(`Tenant fetch error: ${error.message}`)
    
    return tenant as Tenant
  }
  
  async getTenantUsers(tenantId: string): Promise<TenantUser[]> {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*, users:user_id(*)')
      .eq('tenant_id', tenantId)
    
    if (error) throw new Error(`Users fetch error: ${error.message}`)
    
    return profiles.map(profile => ({
      id: profile.user_id,
      tenant_id: profile.tenant_id,
      email: profile.users?.email || '',
      name: profile.users?.user_metadata?.full_name || '',
      role: profile.users?.user_metadata?.role || 'user',
      created_at: profile.created_at,
      updated_at: profile.updated_at
    })) as TenantUser[]
  }
  
  async canAddUser(tenantId: string): Promise<boolean> {
    const packageInfo = await this.packageService.getTenantPackage(tenantId)
    const maxUsers = this.packageService.getMaxUsers(packageInfo)
    
    if (maxUsers === -1) return true // Unlimited
    
    const currentUsers = await this.getTenantUsers(tenantId)
    return currentUsers.length < maxUsers
  }
}
