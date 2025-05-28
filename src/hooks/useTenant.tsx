
import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { TenantService, Tenant } from '@/lib/tenant.service'
import { PackageService, Plan } from '@/lib/package.service'
import { DatabaseService } from '@/lib/database.service'

interface TenantContextType {
  tenant: Tenant | null
  plan: Plan | null
  tenantId: string | null
  loading: boolean
  error: string | null
  refreshTenantInfo: () => Promise<void>
}

const TenantContext = createContext<TenantContextType | undefined>(undefined)

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [tenant, setTenant] = useState<Tenant | null>(null)
  const [plan, setPlan] = useState<Plan | null>(null)
  const [tenantId, setTenantId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const dbService = new DatabaseService()
  const packageService = new PackageService(dbService)
  const tenantService = new TenantService(dbService, packageService)

  const refreshTenantInfo = async () => {
    if (!user?.user_metadata?.tenant_id) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      const currentTenantId = user.user_metadata.tenant_id
      setTenantId(currentTenantId)
      
      const [tenantInfo, planInfo] = await Promise.all([
        tenantService.getTenantInfo(currentTenantId),
        packageService.getTenantPackage(currentTenantId)
      ])
      
      setTenant(tenantInfo)
      setPlan(planInfo)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tenant info')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      refreshTenantInfo()
    } else {
      setTenant(null)
      setPlan(null)
      setTenantId(null)
      setLoading(false)
    }
  }, [user])

  const value = {
    tenant,
    plan,
    tenantId,
    loading,
    error,
    refreshTenantInfo,
  }

  return (
    <TenantContext.Provider value={value}>
      {children}
    </TenantContext.Provider>
  )
}

export function useTenant() {
  const context = useContext(TenantContext)
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider')
  }
  return context
}
