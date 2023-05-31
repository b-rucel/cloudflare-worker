
const xenprices = async ({params}) => {
  // const headers = {
  //   "Cache-Control": "max-age=1500",
  //   "Content-type": "application/json"
  // };

  // const body = JSON.stringify({"xenprice":"request"});

  // headers['Access-Control-Allow-Origin'] = '*';
  // return new Response(body, {headers});
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

  const response = new Response(JSON.stringify(group_one_results.concat(group_two_results).reduce((acc, curr) => { return {...acc, ...curr} }, {})), options);
  response.headers.set("Cache-Control", "max-age=30");
  response.headers.set('Access-Control-Allow-Origin', '*')

  return response;
}

const dxnprices = async ({params}) => {
  // const headers = {
  //   "Cache-Control": "max-age=1500",
  //   "Content-type": "application/json"
  // };

  // const body = JSON.stringify({"dxnprice":"request"});

  // headers['Access-Control-Allow-Origin'] = '*';
  // return new Response(body, {headers});

  const dexscreener = 'https://api.dexscreener.com/latest/dex/pairs/'
  const ethereum = dexscreener + 'ethereum/0x7f808fd904ffa3eb6a6f259e6965fb1466a05372'
  const bsc = dexscreener + 'bsc/0xe0f166b714726efb679ad48ba58e8b1403e363ea';
  const polygon = dexscreener + 'polygon/0x5ddf65bdc8c4b981b9e9b864e9f67d07d9b1201d';
  const avalanche = dexscreener + 'avalanche/0x0c1ad4dfbe5a53e2689d5abccc82e1fb8eb34980';
  const ethereumpow = dexscreener + 'ethereumpow/0xa248f12d2a3690561a2b5c41ef36e4006f04d611';
  const moonbeam = dexscreener + 'moonbeam/0xc5ede6f445a2cda6c05dd2161f6dd7667d6bcfad';
  const evmos = dexscreener + 'evmos/0x359042319ea82ab5c55e8325541be7d739ccb642';
  const fantom = dexscreener + 'fantom/0xa700b87d19cc1bb914569127fc11455bc0d2b0d3';
  const dogechain = dexscreener + 'dogechain/0xccee717b08c59cc0ed7b4c8be937ed0b62bfa697';
  const okc = dexscreener + 'okc/0x917e1c4235963c86c03922741e23dd0791150e83';
  // const pulsechain = dexscreener + 'pulsechain/0x9194fe03e648e1220fa8267d699cef1a20a6ac88';

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
    // fetch(pulsechain, options),
  ])

  const group_two_results = await Promise.all([
    parseResponse(group_two_responses[0]),
    parseResponse(group_two_responses[1]),
    parseResponse(group_two_responses[2]),
    parseResponse(group_two_responses[3]),
    // parseResponse(group_two_responses[4]),
  ])

  const response = new Response(JSON.stringify(group_one_results.concat(group_two_results).reduce((acc, curr) => { return {...acc, ...curr} }, {})), options);
  response.headers.set("Cache-Control", "max-age=30");
  response.headers.set('Access-Control-Allow-Origin', '*')

  return response;


}

module.exports = { 
  xenprices,
  dxnprices,
};
  