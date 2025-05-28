
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
    queryFn: () => {
      if (!tenantId) throw new Error('No tenant ID')
      return productService.listProducts(tenantId, options)
    },
    enabled: !!tenantId,
  })

  const addProductMutation = useMutation({
    mutationFn: (productData: {
      name: string
      url: string
      price: number
      image_url?: string
      category?: string
      rating?: number
      review_count?: number
    }) => {
      if (!tenantId) throw new Error('No tenant ID')
      return productService.addProduct(tenantId, productData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', tenantId] })
      toast({
        title: "Başarılı",
        description: "Ürün başarıyla eklendi",
      })
    },
    onError: (error) => {
      toast({
        title: "Hata",
        description: error.message,
        variant: "destructive",
      })
    },
  })

  const deleteProductMutation = useMutation({
    mutationFn: (productId: string) => {
      if (!tenantId) throw new Error('No tenant ID')
      return productService.deleteProduct(tenantId, productId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', tenantId] })
      toast({
        title: "Başarılı",
        description: "Ürün başarıyla silindi",
      })
    },
    onError: (error) => {
      toast({
        title: "Hata",
        description: error.message,
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
