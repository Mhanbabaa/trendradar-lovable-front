
import { supabase } from '@/integrations/supabase/client'

export class DatabaseService {
  async getTenantData<T>(
    table: string, 
    tenantId: string, 
    query: Record<string, any> = {}
  ): Promise<T[]> {
    try {
      let baseQuery = supabase.from(table as any).select('*')
      
      // Add tenant_id filter if tenantId is provided
      if (tenantId) {
        // Use user_id for products table, tenant_id for others
        const filterColumn = table === 'products' ? 'user_id' : 'tenant_id'
        baseQuery = baseQuery.eq(filterColumn, tenantId)
      }
      
      // Apply additional query filters
      Object.keys(query).forEach(key => {
        baseQuery = baseQuery.eq(key, query[key])
      })
      
      const { data, error } = await baseQuery
      
      if (error) {
        console.error(`Database query error for table ${table}:`, error)
        throw new Error(`Data fetch error: ${error.message}`)
      }
      
      return (data || []) as T[]
    } catch (error) {
      console.error(`Error in getTenantData for table ${table}:`, error)
      return []
    }
  }
  
  async saveTenantData<T>(
    table: string, 
    tenantId: string, 
    data: Record<string, any>
  ): Promise<T> {
    try {
      // Use user_id for products table, tenant_id for others
      const idColumn = table === 'products' ? 'user_id' : 'tenant_id'
      const dataWithTenant = {
        ...data,
        [idColumn]: tenantId
      }
      
      const { data: result, error } = await supabase
        .from(table as any)
        .insert(dataWithTenant)
        .select()
        .single()
      
      if (error) {
        console.error(`Database insert error for table ${table}:`, error)
        throw new Error(`Data save error: ${error.message}`)
      }
      
      return result as T
    } catch (error) {
      console.error(`Error in saveTenantData for table ${table}:`, error)
      throw error
    }
  }
  
  async updateTenantData<T>(
    table: string, 
    tenantId: string, 
    id: string, 
    data: Record<string, any>
  ): Promise<T> {
    try {
      // Use user_id for products table, tenant_id for others
      const idColumn = table === 'products' ? 'user_id' : 'tenant_id'
      
      const { data: result, error } = await supabase
        .from(table as any)
        .update(data)
        .eq('id', id)
        .eq(idColumn, tenantId)
        .select()
        .single()
      
      if (error) {
        console.error(`Database update error for table ${table}:`, error)
        throw new Error(`Data update error: ${error.message}`)
      }
      
      return result as T
    } catch (error) {
      console.error(`Error in updateTenantData for table ${table}:`, error)
      throw error
    }
  }
  
  async deleteTenantData(
    table: string, 
    tenantId: string, 
    id: string
  ): Promise<void> {
    try {
      // Use user_id for products table, tenant_id for others
      const idColumn = table === 'products' ? 'user_id' : 'tenant_id'
      
      const { error } = await supabase
        .from(table as any)
        .delete()
        .eq('id', id)
        .eq(idColumn, tenantId)
      
      if (error) {
        console.error(`Database delete error for table ${table}:`, error)
        throw new Error(`Data delete error: ${error.message}`)
      }
    } catch (error) {
      console.error(`Error in deleteTenantData for table ${table}:`, error)
      throw error
    }
  }
  
  async countTenantData(
    table: string, 
    tenantId: string, 
    query: Record<string, any> = {}
  ): Promise<number> {
    try {
      let baseQuery = supabase.from(table as any).select('*', { count: 'exact', head: true })
      
      if (tenantId) {
        // Use user_id for products table, tenant_id for others
        const filterColumn = table === 'products' ? 'user_id' : 'tenant_id'
        baseQuery = baseQuery.eq(filterColumn, tenantId)
      }
      
      Object.keys(query).forEach(key => {
        baseQuery = baseQuery.eq(key, query[key])
      })
      
      const { count, error } = await baseQuery
      
      if (error) {
        console.error(`Database count error for table ${table}:`, error)
        return 0
      }
      
      return count || 0
    } catch (error) {
      console.error(`Error in countTenantData for table ${table}:`, error)
      return 0
    }
  }
  
  // Direct supabase access for complex queries
  get client() {
    return supabase
  }
}
