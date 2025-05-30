
export default async function handler(req: Request): Promise<Response> {
  console.log('🌐 Scrape API called - Method:', req.method);
  console.log('🌐 Request URL:', req.url);
  console.log('🌐 Request headers:', Object.fromEntries(req.headers.entries()));
  
  if (req.method !== 'POST') {
    console.log('❌ Invalid method:', req.method);
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    })
  }

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    })
  }

  try {
    const contentType = req.headers.get('content-type') || '';
    console.log('📥 Content-Type:', contentType);
    
    if (!contentType.includes('application/json')) {
      console.log('❌ Invalid content-type:', contentType);
      return new Response(JSON.stringify({ error: 'Content-Type must be application/json' }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }

    const body = await req.json()
    const { url } = body
    console.log('📥 Request body:', { url });

    if (!url || !url.includes('trendyol.com')) {
      console.log('❌ Invalid URL validation failed:', url);
      return new Response(JSON.stringify({ error: 'Invalid URL' }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }

    // Extract product ID from URL
    console.log('🔍 Extracting content ID from URL:', url);
    const contentIdMatch = url.match(/-p-(\d+)/)
    if (!contentIdMatch) {
      console.log('❌ Could not extract product ID from URL');
      return new Response(JSON.stringify({ error: 'Could not extract product ID from URL' }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }

    const contentId = contentIdMatch[1]
    console.log('✅ Extracted content ID:', contentId);

    // Fetch the product page
    console.log('🌐 Fetching product page...');
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'tr-TR,tr;q=0.8,en-US;q=0.5,en;q=0.3',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      }
    })

    console.log('📡 Fetch response status:', response.status, response.statusText);

    if (!response.ok) {
      console.log('❌ Failed to fetch product page:', response.status);
      throw new Error(`Failed to fetch product page: ${response.status} ${response.statusText}`)
    }

    const html = await response.text()
    console.log('📄 HTML fetched, length:', html.length);

    // Extract JSON-LD data
    console.log('🔍 Looking for JSON-LD data...');
    const jsonLdMatch = html.match(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/s)
    if (!jsonLdMatch) {
      console.log('❌ Could not find JSON-LD data in HTML');
      console.log('📄 HTML preview (first 500 chars):', html.substring(0, 500));
      throw new Error('Could not find product data')
    }

    console.log('✅ Found JSON-LD data, parsing...');
    const productData = JSON.parse(jsonLdMatch[1])
    console.log('📦 Parsed product data type:', productData['@type']);

    if (productData['@type'] !== 'Product') {
      console.log('❌ Invalid product data type:', productData['@type']);
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

    console.log('✅ Extracted product info:', product);

    return new Response(JSON.stringify({ product }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })

  } catch (error) {
    console.error('💥 Scraping error:', error)
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Failed to scrape product data',
      details: error instanceof Error ? error.stack : undefined
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }
}
