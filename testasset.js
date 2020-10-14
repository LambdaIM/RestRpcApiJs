var Api = require('./lib/node.js').default;
const hdkey = require('@jswebfans/hdkeytest')

var cosmosRESTURL, chainId, userAddress;

cosmosRESTURL = 'http://47.94.197.75:13659';
chainId = undefined;
userAddress = 'lambda1l2gr903w63rrklqxyqr8jy37s9hyndl9dgas4p';

console.log('cosmosRESTURLcosmosRESTURL',cosmosRESTURL)
var lambdaAPI = new Api(cosmosRESTURL, chainId, userAddress)

var walletjson = `{
    "salt": "3RDTC4m13SYVbzp9MHAGKA==",
    "privateKey": "vYjBmhSjsHMj1HtYekfxLThQfd3+bIiwCIBP0XAq98kL/7JJXVGhCdPj69Kjqw6gWQqmI32gyWh0F7Xf1pCenzx8hoFO2f5z44BsG08=",
    "name": "jm-测试账户",
    "address": "lambda1l2gr903w63rrklqxyqr8jy37s9hyndl9dgas4p",
    "publicKey": "lambdapub1addwnpepqv3a5n70awc4gvel9yvqyutxhe4r3h2ehs0susmsrzukmq5nuvx7jens4t8"
  }`;

walletjson = JSON.parse(walletjson);
const signerFn = hdkey.keyStore.getSigner(walletjson,'12345678')


msgCreateAsset()

async function msgCreateAsset(){
    var result = await lambdaAPI
    .CreateAsset({
        asset_amount:'100000000',
        asset_denom:'uzsdktest',
        token_amount:'1000000000000',
        token_denom:'ulamb',
        name:'uzsdktest',
        mint_type:'0',
        fund_asset:'ulamb',
        fund_amount:'1000',
        fund_period:'3',
        remarks:'uzsdktest coin'
    })
    .simulate();
    
    
    console.log(arguments.callee.name,result)
}


async function msgSend(){
    
    var result = await lambdaAPI
    .msgSend('lambda16h3lwqvak8t8zrr9thetajf3yqzxj0kcsjlsck', 1, 'ulamb', '')
    .setsigner(signerFn)
    .setfee(35955,2)
    .send();
    
    console.log('=======***************===========')
    console.log(result)
}


