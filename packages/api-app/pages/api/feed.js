// Next.js API route: GET /api/feed
// Query params:
//   hashtags - comma separated list (default: family,kids,nyc)
//   limit    - max items to return (default: 25)
//   mode     - "mock" (default) or "instagram"
import axios from "axios";
import instagram from "../../services/instagram";

const cache = new Map(); // simple in-memory cache: key -> {ts, ttl, data}

function getCache(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expireAt) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCache(key, data, ttlSec = 120) {
  cache.set(key, { data, expireAt: Date.now() + ttlSec * 1000 });
}

export default async function handler(req, res) {
  try {
    const q = req.query.hashtags || "family,kids,nyc";
    const hashtags = q
      .split(",")
      .map((h) => h.trim())
      .filter(Boolean);
    const limit = Math.min(100, parseInt(req.query.limit || "25", 10));
    const mode = (req.query.mode || "mock").toLowerCase();
    const cacheTtl = parseInt(process.env.FEED_CACHE_TTL || "120", 10);

    const cacheKey = `feed:${mode}:${hashtags.join(",")}:${limit}`;

    const cached = getCache(cacheKey);
    if (cached) {
      return res.status(200).json({ count: cached.length, items: cached });
    }

    let items = [];

    if (mode === "instagram") {
      // Try to fetch from Instagram Graph API. If any error occurs, return 502 with details.
      items = await instagram.fetchByHashtags(hashtags, limit);
    } else {
      // mock mode for demos: deterministic mock items
      const now = Date.now();
      let counter = 0;
      items = hashtags
        .flatMap((tag) =>
          Array.from({ length: Math.ceil(limit / hashtags.length) }).map(() => {
            counter++;
            const ts = new Date(now - counter * 60 * 60 * 1000).toISOString();
            return {
              id: `mock-${tag}-${counter}`,
              permalink: `https://instagram.com/p/mock-${tag}-${counter}`,
              media_url: `https://placehold.co/800x600?text=${encodeURIComponent(tag)}`,
              caption: `Mock post for #${tag} — kid-friendly example`,
              username: `${tag}_demo`,
              timestamp: ts,
              hashtags: [tag]
            };
          })
        )
        .slice(0, limit);
    }

    // Normalize and sort newest-first
    items = items.map((it) => ({
      id: it.id,
      permalink: it.permalink,
      media_url: it.media_url,
      caption: it.caption || "",
      username: it.username || it.author || "",
      timestamp: it.timestamp ? new Date(it.timestamp).toISOString() : new Date().toISOString(),
      hashtags: it.hashtags || []
    }));

    items.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    setCache(cacheKey, items, cacheTtl);

    return res.status(200).json({ count: items.length, items });
  } catch (err) {
    console.error("feed error:", err?.message || err);
    return res.status(502).json({ error: "failed_to_fetch_feed", details: String(err?.message || err) });
  }
}
