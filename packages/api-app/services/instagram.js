// Lightweight Instagram Graph API helper
// Usage: set INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_BUSINESS_ACCOUNT_ID in env to enable
import axios from "axios";

const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const IG_USER_ID = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
const GRAPH_BASE = "https://graph.facebook.com/v17.0"; // adjust version if needed

// Helper: call ig_hashtag_search to get hashtag id
async function fetchHashtagId(tag) {
  if (!ACCESS_TOKEN || !IG_USER_ID) throw new Error("INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_BUSINESS_ACCOUNT_ID required");
  const url = `${GRAPH_BASE}/ig_hashtag_search`;
  const resp = await axios.get(url, {
    params: {
      user_id: IG_USER_ID,
      q: tag,
      access_token: ACCESS_TOKEN
    },
    timeout: 8000
  });
  const d = resp.data;
  if (d && Array.isArray(d.data) && d.data.length > 0 && d.data[0].id) {
    return d.data[0].id;
  }
  throw new Error(`no_hashtag_id_for_${tag}`);
}

// Helper: fetch recent media for a hashtag id
async function fetchRecentMediaForHashtag(hashtagId, limit = 10) {
  if (!ACCESS_TOKEN || !IG_USER_ID) throw new Error("INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_BUSINESS_ACCOUNT_ID required");
  const url = `${GRAPH_BASE}/${hashtagId}/recent_media`;
  const resp = await axios.get(url, {
    params: {
      user_id: IG_USER_ID,
      fields: "id,caption,media_url,thumbnail_url,permalink,timestamp,username,media_type",
      limit,
      access_token: ACCESS_TOKEN
    },
    timeout: 10000
  });
  return resp.data && resp.data.data ? resp.data.data : [];
}

// Public: fetch posts by hashtags (round-robin by tag)
async function fetchByHashtags(hashtags, limit = 25) {
  if (!ACCESS_TOKEN || !IG_USER_ID) throw new Error("INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_BUSINESS_ACCOUNT_ID required");
  const perTag = Math.ceil(limit / Math.max(1, hashtags.length));
  const promises = hashtags.map(async (tag) => {
    try {
      const id = await fetchHashtagId(tag);
      const items = await fetchRecentMediaForHashtag(id, perTag);
      return items.map((i) => ({
        id: i.id,
        permalink: i.permalink,
        media_url: i.media_url || i.thumbnail_url || null,
        caption: i.caption || "",
        username: i.username || "",
        timestamp: i.timestamp,
        media_type: i.media_type,
        hashtags: [tag]
      }));
    } catch (err) {
      console.warn(`instagram fetch failed for tag=${tag}: ${err.message}`);
      return [];
    }
  });

  const arrays = await Promise.all(promises);
  const all = arrays.flat().slice(0, limit);
  return all;
}

export default { fetchByHashtags };
