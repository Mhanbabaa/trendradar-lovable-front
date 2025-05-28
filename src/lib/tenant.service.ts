
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
    try {
      // Create admin user first with tenant info in metadata
      const { data: user, error: userError } = await supabase.auth.signUp({
        email: adminUser.email,
        password: adminUser.password,
        options: {
          data: {
            full_name: adminUser.name,
            company_name: tenantData.name,
            role: 'admin'
          }
        }
      })
      
      if (userError || !user.user) {
        console.error('User creation error:', userError)
        throw new Error(`User creation error: ${userError?.message || 'Unknown error'}`)
      }
      
      // Create profile record
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .insert({
          user_id: user.user.id,
          company_name: tenantData.name,
          industry: 'E-commerce'
        })
        .select()
        .single()
      
      if (profileError) {
        console.error('Profile creation error:', profileError)
      }
      
      // Create default subscription (trial)
      try {
        const { data: defaultPlan } = await supabase
          .from('plans')
          .select('*')
          .eq('name', 'Başlangıç')
          .single()
        
        if (defaultPlan && user.user) {
          await supabase
            .from('subscriptions')
            .insert({
              user_id: user.user.id,
              plan_id: defaultPlan.id,
              payment_status: 'paid',
              is_trial: true,
              start_date: new Date().toISOString(),
              end_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() // 14 days trial
            })
        }
      } catch (error) {
        console.error('Error creating default subscription:', error)
      }
      
      return { 
        tenant: { 
          id: user.user.id, 
          name: tenantData.name, 
          email: tenantData.email, 
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          is_active: true 
        }, 
        user 
      }
    } catch (error) {
      console.error('Error in createTenant:', error)
      throw error
    }
  }
  
  async getTenantInfo(tenantId: string): Promise<Tenant> {
    try {
      // Try to get tenant info from profiles
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', tenantId)
        .single()
      
      if (error || !profile) {
        console.error('Error getting tenant info:', error)
        // Fallback: create tenant info from user data
        return {
          id: tenantId,
          name: 'Default Tenant',
          email: 'tenant@example.com',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          is_active: true
        }
      }
      
      return {
        id: tenantId,
        name: profile.company_name || 'Default Tenant',
        email: 'tenant@example.com',
        created_at: profile.created_at,
        updated_at: profile.updated_at,
        is_active: true
      } as Tenant
    } catch (error) {
      console.error('Error getting tenant info:', error)
      // Return fallback tenant info
      return {
        id: tenantId,
        name: 'Default Tenant',
        email: 'tenant@example.com',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_active: true
      }
    }
  }
  
  async getTenantUsers(tenantId: string): Promise<TenantUser[]> {
    try {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', tenantId)
      
      if (error || !profiles) {
        console.error('Error fetching tenant users:', error)
        return []
      }
      
      return profiles.map((profile: any) => ({
        id: profile.user_id,
        tenant_id: profile.user_id,
        email: 'user@example.com',
        name: profile.company_name || 'User',
        role: 'user',
        created_at: profile.created_at,
        updated_at: profile.updated_at
      })) as TenantUser[]
    } catch (error) {
      console.error('Error in getTenantUsers:', error)
      return []
    }
  }
  
  async canAddUser(tenantId: string): Promise<boolean> {
    try {
      const packageInfo = await this.packageService.getTenantPackage(tenantId)
      const maxUsers = this.packageService.getMaxUsers(packageInfo)
      
      if (maxUsers === -1) return true // Unlimited
      
      const currentUsers = await this.getTenantUsers(tenantId)
      return currentUsers.length < maxUsers
    } catch (error) {
      console.error('Error checking user limit:', error)
      return false
    }
  }
}
