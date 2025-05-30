
import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useTenant } from './useTenant'
import { ProductService, Product } from '@/lib/product.service'
import { PackageService } from '@/lib/package.service'
import { DatabaseService } from '@/lib/database.service'
import { toast } from '@/hooks/use-toast'

export function useProducts(options: {
  category?: string
  sort_by?: string
  sort_order?: 'asc' | 'desc'
  page?: number
  limit?: number
} = {}) {
  const { tenantId } = useTenant()
  const queryClient = useQueryClient()
  
  const dbService = new DatabaseService()
  const packageService = new PackageService(dbService)
  const productService = new ProductService(dbService, packageService)

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', tenantId, options],
    queryFn: async () => {
      if (!tenantId) throw new Error('No tenant ID')
      console.log('Fetching products for tenant:', tenantId)
      const result = await productService.listProducts(tenantId, options)
      console.log('Products fetched:', result)
      return result
    },
    enabled: !!tenantId,
  })

  const addProductMutation = useMutation({
    mutationFn: async (productData: {
      name: string
      url: string
      price: number
      image_url?: string
      category?: string
      rating?: number
      review_count?: number
    }) => {
      if (!tenantId) throw new Error('No tenant ID')
      console.log('Adding product with data:', productData)
      const result = await productService.addProduct(tenantId, productData)
      console.log('Product added successfully:', result)
      return result
    },
    onSuccess: (data) => {
      console.log('Product add mutation successful:', data)
      queryClient.invalidateQueries({ queryKey: ['products', tenantId] })
      toast({
        title: "Başarılı",
        description: "Ürün başarıyla eklendi",
      })
    },
    onError: (error) => {
      console.error('Product add mutation error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu'
      toast({
        title: "Hata",
        description: errorMessage,
        variant: "destructive",
      })
    },
  })

  const deleteProductMutation = useMutation({
    mutationFn: (productId: string) => {
      if (!tenantId) throw new Error('No tenant ID')
      console.log('Deleting product:', productId)
      return productService.deleteProduct(tenantId, productId)
    },
    onSuccess: () => {
      console.log('Product delete mutation successful')
      queryClient.invalidateQueries({ queryKey: ['products', tenantId] })
      toast({
        title: "Başarılı",
        description: "Ürün başarıyla silindi",
      })
    },
    onError: (error) => {
      console.error('Product delete mutation error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu'
      toast({
        title: "Hata",
        description: errorMessage,
        variant: "destructive",
      })
    },
  })

  return {
    products: data?.products || [],
    total: data?.total || 0,
    isLoading,
    error,
    addProduct: addProductMutation.mutate,
    deleteProduct: deleteProductMutation.mutate,
    isAddingProduct: addProductMutation.isPending,
    isDeletingProduct: deleteProductMutation.isPending,
  }
}

export function useProduct(productId: string) {
  const { tenantId } = useTenant()
  
  const dbService = new DatabaseService()
  const packageService = new PackageService(dbService)
  const productService = new ProductService(dbService, packageService)

  return useQuery({
    queryKey: ['product', tenantId, productId],
    queryFn: () => {
      if (!tenantId) throw new Error('No tenant ID')
      return productService.getProduct(tenantId, productId)
    },
    enabled: !!tenantId && !!productId,
  })
}
