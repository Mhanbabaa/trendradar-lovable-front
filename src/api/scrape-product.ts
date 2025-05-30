
export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  try {
    const { url } = await req.json()

    if (!url || !url.includes('trendyol.com')) {
      return new Response(JSON.stringify({ error: 'Invalid URL' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Extract product ID from URL
    const contentIdMatch = url.match(/-p-(\d+)/)
    if (!contentIdMatch) {
      return new Response(JSON.stringify({ error: 'Could not extract product ID from URL' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
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

    return new Response(JSON.stringify({ product }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Scraping error:', error)
    return new Response(JSON.stringify({ error: 'Failed to scrape product data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
