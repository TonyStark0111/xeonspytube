// Netlify Function: /api/stats
// Returns download count from GitHub Releases + placeholder visitors
// (Original Cloudflare version used D1; this uses public GitHub API only)

exports.handler = async function (event, context) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "public, max-age=60"
  };

  try {
    const res = await fetch(
      "https://api.github.com/repos/IM-SPYBOY/SPYTube/releases?per_page=20",
      { headers: { "User-Agent": "SPYTube-Netlify" } }
    );

    let downloads = 0;
    let latestTag = "—";

    if (res.ok) {
      const releases = await res.json();
      for (const rel of releases) {
        if (rel.assets) {
          for (const asset of rel.assets) {
            downloads += asset.download_count || 0;
          }
        }
      }
      if (releases[0]) {
        latestTag = releases[0].tag_name || "—";
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        downloads,
        visitors: 0,          // no persistent store on free Netlify
        today: 0,
        latest: latestTag
      })
    };
  } catch (err) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ downloads: 0, visitors: 0, today: 0, latest: "—" })
    };
  }
};
