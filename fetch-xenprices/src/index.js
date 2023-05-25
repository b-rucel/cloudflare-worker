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
    const bsc = dexscreener + 'bsc/0xaaa77f0acdc01cbe71e74f177efd38697b5a7feb';
    const polygon = dexscreener + 'polygon/0x97ffb2574257280e0fb2fa522345f0e81faae711';
    const avalanche = dexscreener + 'avalanche/0x55e41d322a6da698137b4557431f2754d7e6ea5e';
    const ethereumpow = dexscreener + 'ethereumpow/0x7fee6a68a09cf4592a04a3ae02cc6db0af6e6e34';
    const moonbeam = dexscreener + 'moonbeam/0x43a094dc0fb493fae9955c32e88d6ef839c5df7e';
    const evmos = dexscreener + 'evmos/0xf4ac0c589d8d0b196cf194026c646d00b1d40a76';
    const fantom = dexscreener + 'fantom/0xab3738d7671a50e5c49d8c17b0e1f5051cbc4aad';
    const dogechain = dexscreener + 'dogechain/0x77f1ef6d7afef2384db4768fa42aa3558823aab0';
    const okc = dexscreener + 'okc/0x698e2966d6f38da1803e21fb04858f17bb1e5d3d';
    const pulsechain = dexscreener + 'pulsechain/0x9194fe03e648e1220fa8267d699cef1a20a6ac88';

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

    const group_one_responses = await Promise.all([
      fetch(ethereum, options),
      fetch(bsc, options),
      fetch(polygon, options),
      fetch(avalanche, options),
      fetch(ethereumpow, options),
      fetch(moonbeam, options),
    ])

    const group_one_results = await Promise.all([
      parseResponse(group_one_responses[0]),
      parseResponse(group_one_responses[1]),
      parseResponse(group_one_responses[2]),
      parseResponse(group_one_responses[3]),
      parseResponse(group_one_responses[4]),
      parseResponse(group_one_responses[5]),
    ])

    const group_two_responses = await Promise.all([
      fetch(evmos, options),
      fetch(fantom, options),
      fetch(dogechain, options),
      fetch(okc, options),
      fetch(pulsechain, options),
    ])

    const group_two_results = await Promise.all([
      parseResponse(group_two_responses[0]),
      parseResponse(group_two_responses[1]),
      parseResponse(group_two_responses[2]),
      parseResponse(group_two_responses[3]),
      parseResponse(group_two_responses[4]),
    ])

    const response = new Response(JSON.stringify(group_one_results.concat(group_two_results)), options);
    response.headers.set("Cache-Control", "max-age=30");
    return response;
  },
};
