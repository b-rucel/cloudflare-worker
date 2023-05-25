/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {

		const dexscreener = 'https://api.dexscreener.com/latest/dex/pairs/'
		const ethereum = dexscreener + 'ethereum/0x2a9d2ba41aba912316d16742f259412b681898db'
    
		const options = {
			"headers": {
			  "content-type": "application/json;charset=UTF-8",
			},
		};

    async function parseResponse(response) {
      const { headers } = response;
      const contentType = headers.get("content-type") || "";   

      if (contentType.includes("application/json")) {
        const data = await response.json();

        const result = {}
        result[data.pair.chainId] = String(data.pair.priceUsd)
        return result;
      } else if (contentType.includes("application/text")) {
        return response.text();
      } else if (contentType.includes("text/html")) {
        return response.text();
      } else {
        return response.text();
      }
    }
		
		const responses = await Promise.all([
			fetch(ethereum, options),
		])

    const results = await Promise.all([
      parseResponse(responses[0]),
    ])

    return new Response(JSON.stringify(results), options);
	},
};
