
import { supabase } from '@/integrations/supabase/client'

export class DatabaseService {
  async getTenantData<T>(
    table: string, 
    tenantId: string, 
    query: Record<string, any> = {}
  ): Promise<T[]> {
    const { data, error } = await supabase
      .from(table as any)
      .select('*')
      .eq('tenant_id', tenantId)
      .match(query)
    
    if (error) throw new Error(`Data fetch error: ${error.message}`)
    
    return data as T[]
  }
  
  async saveTenantData<T>(
    table: string, 
    tenantId: string, 
    data: Record<string, any>
  ): Promise<T> {
    const dataWithTenant = {
      ...data,
      tenant_id: tenantId
    }
    
    const { data: result, error } = await supabase
      .from(table as any)
      .insert(dataWithTenant)
      .select()
      .single()
    
    if (error) throw new Error(`Data save error: ${error.message}`)
    
    return result as T
  }
  
  async updateTenantData<T>(
    table: string, 
    tenantId: string, 
    id: string, 
    data: Record<string, any>
  ): Promise<T> {
    const { data: result, error } = await supabase
      .from(table as any)
      .update(data)
      .eq('id', id)
      .eq('tenant_id', tenantId)
      .select()
      .single()
    
    if (error) throw new Error(`Data update error: ${error.message}`)
    
    return result as T
  }
  
  async deleteTenantData(
    table: string, 
    tenantId: string, 
    id: string
  ): Promise<void> {
    const { error } = await supabase
      .from(table as any)
      .delete()
      .eq('id', id)
      .eq('tenant_id', tenantId)
    
    if (error) throw new Error(`Data delete error: ${error.message}`)
  }
  
  async countTenantData(
    table: string, 
    tenantId: string, 
    query: Record<string, any> = {}
  ): Promise<number> {
    const { count, error } = await supabase
      .from(table as any)
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', tenantId)
      .match(query)
    
    if (error) throw new Error(`Count error: ${error.message}`)
    
    return count || 0
  }
}
