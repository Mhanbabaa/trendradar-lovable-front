
import { DatabaseService } from './database.service'
import { PackageService } from './package.service'

export interface Product {
  id: string
  tenant_id: string
  name: string
  url: string
  price: number
  image_url?: string
  category?: string
  rating?: number
  review_count?: number
  created_at: string
  last_updated: string
}

export interface PriceHistory {
  id: string
  tenant_id: string
  product_id: string
  old_price: number
  new_price: number
  change_percentage: number
  timestamp: string
}

export class ProductService {
  private dbService: DatabaseService
  private packageService: PackageService
  
  constructor(dbService: DatabaseService, packageService: PackageService) {
    this.dbService = dbService
    this.packageService = packageService
  }
  
  async addProduct(tenantId: string, productData: {
    name: string
    url: string
    price: number
    image_url?: string
    category?: string
    rating?: number
    review_count?: number
  }): Promise<Product> {
    // Check package limit
    const canAddProduct = await this.packageService.checkProductLimit(tenantId)
    
    if (!canAddProduct) {
      throw new Error('Package product limit reached')
    }
    
    // Save product
    const product = await this.dbService.saveTenantData<Product>('products', tenantId, {
      ...productData,
      created_at: new Date().toISOString(),
      last_updated: new Date().toISOString()
    })
    
    return product
  }
  
  async listProducts(
    tenantId: string,
    options: {
      category?: string
      sort_by?: string
      sort_order?: 'asc' | 'desc'
      page?: number
      limit?: number
    } = {}
  ): Promise<{ products: Product[]; total: number }> {
    const {
      category,
      sort_by = 'created_at',
      sort_order = 'desc',
      page = 1,
      limit = 10
    } = options
    
    let query = this.dbService.getTenantData<Product>('products', tenantId)
    
    if (category) {
      query = this.dbService.getTenantData<Product>('products', tenantId, { category })
    }
    
    const products = await query
    const total = await this.dbService.countTenantData('products', tenantId, category ? { category } : {})
    
    // Simple sorting and pagination (would be better done in SQL)
    const sorted = products.sort((a, b) => {
      const aVal = a[sort_by as keyof Product]
      const bVal = b[sort_by as keyof Product]
      
      if (sort_order === 'asc') {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })
    
    const start = (page - 1) * limit
    const end = start + limit
    const paginated = sorted.slice(start, end)
    
    return { products: paginated, total }
  }
  
  async getProduct(tenantId: string, productId: string): Promise<Product> {
    const products = await this.dbService.getTenantData<Product>('products', tenantId, { id: productId })
    
    if (!products || products.length === 0) {
      throw new Error('Product not found')
    }
    
    return products[0]
  }
  
  async updateProduct(
    tenantId: string,
    productId: string,
    updateData: Partial<Product>
  ): Promise<Product> {
    const product = await this.dbService.updateTenantData<Product>(
      'products',
      tenantId,
      productId,
      {
        ...updateData,
        last_updated: new Date().toISOString()
      }
    )
    
    return product
  }
  
  async deleteProduct(tenantId: string, productId: string): Promise<void> {
    await this.dbService.deleteTenantData('products', tenantId, productId)
  }
  
  async getPriceHistory(tenantId: string, productId: string): Promise<PriceHistory[]> {
    return await this.dbService.getTenantData<PriceHistory>('price_history', tenantId, { product_id: productId })
  }
  
  async addPriceHistory(
    tenantId: string,
    productId: string,
    oldPrice: number,
    newPrice: number
  ): Promise<PriceHistory> {
    const changePercentage = ((newPrice - oldPrice) / oldPrice) * 100
    
    return await this.dbService.saveTenantData<PriceHistory>('price_history', tenantId, {
      product_id: productId,
      old_price: oldPrice,
      new_price: newPrice,
      change_percentage: changePercentage,
      timestamp: new Date().toISOString()
    })
  }
}
