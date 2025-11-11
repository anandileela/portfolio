import { useEffect, useState } from "react";

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("mock");
  const [hashtags, setHashtags] = useState("family,kids,nyc");
  const [limit, setLimit] = useState(12);
  const [error, setError] = useState(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/feed?mode=${encodeURIComponent(mode)}&hashtags=${encodeURIComponent(hashtags)}&limit=${encodeURIComponent(limit)}`);
      const json = await res.json();
      if (!res.ok) {
        setError(json);
        setItems([]);
      } else {
        setItems(json.items || []);
      }
    } catch (err) {
      setError(err.message || String(err));
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: 20 }}>
      <h1>Instagram Hashtag Feed PoC</h1>

      <section style={{ marginBottom: 16 }}>
        <label>
          Mode:
          <select value={mode} onChange={(e) => setMode(e.target.value)} style={{ marginLeft: 8 }}>
            <option value="mock">mock</option>
            <option value="instagram">instagram</option>
          </select>
        </label>

        <label style={{ marginLeft: 16 }}>
          Hashtags:
          <input style={{ marginLeft: 8, width: 260 }} value={hashtags} onChange={(e) => setHashtags(e.target.value)} />
        </label>

        <label style={{ marginLeft: 16 }}>
          Limit:
          <input type="number" style={{ marginLeft: 8, width: 64 }} value={limit} onChange={(e) => setLimit(e.target.value)} />
        </label>

        <button onClick={load} style={{ marginLeft: 12 }}>Refresh</button>
      </section>

      {loading && <p>Loading feed…</p>}
      {error && <pre style={{ color: "crimson" }}>{JSON.stringify(error, null, 2)}</pre>}

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 12 }}>
        {items.map((it) => (
          <article key={it.id} style={{ border: "1px solid #eee", padding: 12, borderRadius: 6 }}>
            <a href={it.permalink} target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
              {it.media_url ? (
                <img src={it.media_url} alt={it.caption || ""} style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 4 }} />
              ) : (
                <div style={{ width: "100%", height: 160, background: "#fafafa", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  No image
                </div>
              )}
              <div style={{ marginTop: 8 }}>
                <strong style={{ display: "block" }}>{it.username}</strong>
                <div style={{ color: "#444", fontSize: 13, marginTop: 6 }}>{it.caption?.slice(0, 160)}</div>
                <div style={{ marginTop: 8, fontSize: 12, color: "#666" }}>{new Date(it.timestamp).toLocaleString()}</div>
              </div>
            </a>
          </article>
        ))}
      </section>

      {!loading && items.length === 0 && <p>No items — try mock mode or check your Instagram tokens for instagram mode.</p>}
    </main>
  );
}
