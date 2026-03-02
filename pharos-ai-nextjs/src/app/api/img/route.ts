import { NextRequest, NextResponse } from 'next/server';

/**
 * Image proxy with aggressive caching.
 * GET /api/img?url=https://example.com/image.jpg
 * - Fetches image once, caches in memory for 1 hour
 * - Serves with long Cache-Control headers
 * - Prevents client from being rate-limited by image hosts
 */

interface CacheEntry {
  buffer: ArrayBuffer;
  contentType: string;
  ts: number;
}

const cache = new Map<string, CacheEntry>();
const TTL = 60 * 60 * 1000; // 1 hour
const MAX_CACHE = 500; // max cached images
const FETCH_TIMEOUT = 8000;

// Cleanup old entries periodically
function evict() {
  if (cache.size <= MAX_CACHE) return;
  const now = Date.now();
  // Delete oldest first
  const entries = Array.from(cache.entries())
    .sort((a, b) => a[1].ts - b[1].ts);
  while (cache.size > MAX_CACHE * 0.7) {
    const oldest = entries.shift();
    if (oldest) cache.delete(oldest[0]);
  }
  // Also delete expired
  for (const [key, entry] of cache) {
    if (now - entry.ts > TTL) cache.delete(key);
  }
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) {
    return new NextResponse('Missing ?url=', { status: 400 });
  }

  // Validate URL
  try {
    const parsed = new URL(url);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return new NextResponse('Invalid URL', { status: 400 });
    }
  } catch {
    return new NextResponse('Invalid URL', { status: 400 });
  }

  // Check cache
  const cached = cache.get(url);
  if (cached && Date.now() - cached.ts < TTL) {
    return new NextResponse(cached.buffer, {
      headers: {
        'Content-Type': cached.contentType,
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=7200',
        'X-Cache': 'HIT',
      },
    });
  }

  // Fetch
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        Referer: new URL(url).origin + '/',
      },
    });
    clearTimeout(timeout);

    if (!res.ok) {
      return new NextResponse(`Upstream ${res.status}`, { status: 502 });
    }

    const contentType = res.headers.get('content-type') ?? 'image/jpeg';
    const buffer = await res.arrayBuffer();

    // Cache it
    cache.set(url, { buffer, contentType, ts: Date.now() });
    evict();

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=7200',
        'X-Cache': 'MISS',
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'fetch failed';
    return new NextResponse(msg, { status: 502 });
  }
}
