
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { url } = req.body

    if (!url || !url.includes('trendyol.com')) {
      return res.status(400).json({ error: 'Invalid URL' })
    }

    // Extract product ID from URL
    const contentIdMatch = url.match(/-p-(\d+)/)
    if (!contentIdMatch) {
      return res.status(400).json({ error: 'Could not extract product ID from URL' })
    }

    const contentId = contentIdMatch[1]

    // Fetch the product page
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch product page')
    }

    const html = await response.text()

    // Extract JSON-LD data
    const jsonLdMatch = html.match(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/s)
    if (!jsonLdMatch) {
      throw new Error('Could not find product data')
    }

    const productData = JSON.parse(jsonLdMatch[1])

    if (productData['@type'] !== 'Product') {
      throw new Error('Invalid product data')
    }

    // Extract product information
    const product = {
      name: productData.name || 'Unknown Product',
      price: parseFloat(productData.offers?.price || '0'),
      image_url: productData.image?.contentUrl?.[0] || '',
      sku: productData.sku || contentId,
      brand: productData.brand?.name || 'Unknown Brand',
      description: productData.description || '',
      rating: productData.aggregateRating?.ratingValue || 0,
      review_count: productData.aggregateRating?.reviewCount || 0,
      merchant_id: '',
      content_id: contentId
    }

    return res.status(200).json({ product })

  } catch (error) {
    console.error('Scraping error:', error)
    return res.status(500).json({ error: 'Failed to scrape product data' })
  }
}
