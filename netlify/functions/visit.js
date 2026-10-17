// Netlify Function: /api/visit
// Original used Cloudflare D1 to log unique IPs.
// On Netlify free tier there is no built-in durable DB, so this is a no-op
// that simply returns OK so the frontend doesn't error.

exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*"
    },
    body: "OK"
  };
};
