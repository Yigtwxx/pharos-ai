import { NextRequest, NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    Accept: 'application/rss+xml, application/xml, text/xml, */*',
  },
  customFields: {
    item: [
      ['media:content', 'mediaContent', { keepArray: false }],
      ['media:thumbnail', 'mediaThumbnail', { keepArray: false }],
      ['enclosure', 'enclosure', { keepArray: false }],
    ],
  },
});

/** In-memory cache: feedUrl → { data, ts } */
const cache = new Map<string, { data: FeedResult; ts: number }>();
const TTL = 5 * 60 * 1000; // 5 min

interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
  creator?: string;
  categories?: string[];
  isoDate?: string;
  imageUrl?: string;
}

/** Extract image URL from various RSS feed formats */
function extractImage(item: Record<string, unknown>): string | undefined {
  // media:content
  const mc = item.mediaContent as Record<string, unknown> | undefined;
  if (mc) {
    const url = (mc.$ as Record<string, string>)?.url ?? mc.url;
    if (typeof url === 'string' && url.startsWith('http')) return url;
  }
  // media:thumbnail
  const mt = item.mediaThumbnail as Record<string, unknown> | undefined;
  if (mt) {
    const url = (mt.$ as Record<string, string>)?.url ?? mt.url;
    if (typeof url === 'string' && url.startsWith('http')) return url;
  }
  // enclosure (type=image)
  const enc = item.enclosure as Record<string, unknown> | undefined;
  if (enc) {
    const url = (enc.$ as Record<string, string>)?.url ?? enc.url;
    const type = (enc.$ as Record<string, string>)?.type ?? enc.type ?? '';
    if (typeof url === 'string' && url.startsWith('http') && String(type).startsWith('image')) return url;
  }
  // content:encoded — look for first <img src="...">
  const content = item['content:encoded'] as string ?? item.content as string ?? '';
  if (content) {
    const match = content.match(/<img[^>]+src=["']([^"']+)["']/);
    if (match?.[1]?.startsWith('http')) return match[1];
  }
  return undefined;
}

interface FeedResult {
  feedId: string;
  feedTitle: string;
  items: FeedItem[];
  error?: string;
}

export async function GET(req: NextRequest) {
  const feedUrls = req.nextUrl.searchParams.get('feeds');
  const feedIds = req.nextUrl.searchParams.get('ids');

  if (!feedUrls && !feedIds) {
    return NextResponse.json({ error: 'Provide ?feeds=url1,url2 or ?ids=id1,id2' }, { status: 400 });
  }

  // If ids provided, resolve them to URLs from our feed list
  let urlsToFetch: { id: string; url: string }[] = [];

  if (feedIds) {
    const { RSS_FEEDS } = await import('@/data/rssFeeds');
    const ids = feedIds.split(',').map(s => s.trim());
    for (const id of ids) {
      const feed = RSS_FEEDS.find(f => f.id === id);
      if (feed) urlsToFetch.push({ id: feed.id, url: feed.url });
    }
  } else if (feedUrls) {
    urlsToFetch = feedUrls.split(',').map((u, i) => ({ id: `custom_${i}`, url: u.trim() }));
  }

  const results: FeedResult[] = await Promise.all(
    urlsToFetch.map(async ({ id, url }) => {
      // Check cache
      const cached = cache.get(url);
      if (cached && Date.now() - cached.ts < TTL) {
        return cached.data;
      }

      try {
        const feed = await parser.parseURL(url);
        const result: FeedResult = {
          feedId: id,
          feedTitle: feed.title ?? id,
          items: (feed.items ?? []).slice(0, 20).map(item => ({
            title: item.title ?? '(untitled)',
            link: item.link ?? '',
            pubDate: item.pubDate ?? item.isoDate ?? '',
            contentSnippet: (item.contentSnippet ?? '').slice(0, 300),
            creator: item.creator ?? item['dc:creator'] ?? undefined,
            categories: item.categories ?? [],
            isoDate: item.isoDate ?? undefined,
            imageUrl: extractImage(item as unknown as Record<string, unknown>),
          })),
        };
        cache.set(url, { data: result, ts: Date.now() });
        return result;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        return { feedId: id, feedTitle: id, items: [], error: msg };
      }
    }),
  );

  return NextResponse.json({ feeds: results }, {
    headers: { 'Cache-Control': 'public, max-age=120, stale-while-revalidate=300' },
  });
}
