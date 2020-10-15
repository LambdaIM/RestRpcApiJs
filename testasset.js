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


// msgAuthorizeUser();
msgSend()

async function msgSend(){
    
    var result = await lambdaAPI
    .msgSend('lambda1g2z30x06vz453ekkan0a55hd0nefuuzqnw3sye', 100000000, 'uzsdktest2', '')
    .setsigner(signerFn)
    .setfee(35955,2)
    .send();
    
    console.log('=======***************===========')
    console.log(result)
}

// AuthorizeUser
async function msgAuthorizeUsergas(){
    var result = await lambdaAPI
    .AuthorizeUser(userAddress,'uzsdktest2',true)
    .simulate();
    
    console.log(arguments.callee.name,result)
}

async function msgAuthorizeUser(){
    var result = await lambdaAPI
    .AuthorizeUser(userAddress,'uzsdktest2',true)
    .setsigner(signerFn)
    .setfee(35955,2)
    .send();
    console.log(arguments.callee.name,result)
    

}

async function msgCreateDigitalAssetMarketgas(){
    var result = await lambdaAPI
    .CreateDigitalAssetMarket('uzsdktest2',1 ,'testmarket')
    .simulate();
    
    
    console.log(arguments.callee.name,result)
}

async function msgCreateDigitalAssetMarketgas(){
    var result = await lambdaAPI
    .CreateDigitalAssetMarket('uzsdktest2',1 ,'testmarket')
    .simulate();
    
    
    console.log(arguments.callee.name,result)
}

async function msgCreateDigitalAssetMarket(){
    var result = await lambdaAPI
    .CreateDigitalAssetMarket('uzsdktest2',1 ,'testmarket')
    .setsigner(signerFn)
    .setfee(35955,2)
    .send();
    console.log(arguments.callee.name,result)
}




async function msgCreateAssetgas(){
    var result = await lambdaAPI
    .CreateAsset({
        asset_amount:'100000000',
        asset_denom:'uzsdktest',
        token_amount:'1000000000000',
        token_denom:'ulamb',
        name:'uzsdktest',
        mint_type:"1",
        fund_asset:'ulamb',
        fund_amount:'1000',
        fund_period:'3',
        remarks:'uzsdktest coin',
        fund_stake:'100000000'
    })
    .simulate();
    
    
    console.log(arguments.callee.name,result)
}


async function CreateAsset(){
    
    var result = await lambdaAPI
    .CreateAsset({
        asset_amount:'100000000',
        asset_denom:'uzsdktest',
        token_amount:'1000000000000',
        token_denom:'ulamb',
        name:'uzsdktest',
        mint_type:"1",
        fund_asset:'ulamb',
        fund_amount:'1000',
        fund_period:'3',
        remarks:'uzsdktest coin',
        fund_stake:'100000000'
    })
    .setsigner(signerFn)
    .setfee(55955,2)
    .send();
    
    console.log('=======***************===========')
    console.log(result)
}


async function msgCreateAssetgasType3(){
    var result = await lambdaAPI
    .CreateAsset({
        asset_amount:'100000000',
        asset_denom:'uzsdktest',
        token_amount:'1000000000000',
        token_denom:'ulamb',
        name:'uzsdktest',
        mint_type:"3",
        fund_asset:'ulamb',
        fund_amount:'1000',
        fund_period:'3',
        remarks:'uzsdktest coin',
        fund_stake:'100000000',
        inflation:'300000',
        total_supply:'3000000000',
        adjust_rate:'0.100000000000000000',
        max_adjust_count:'11',
        genesis_height:'11111111',
        adjust_period:'10',
        mining_ratio:'0.100000000000000000',
    })
    .simulate();
    
    
    console.log(arguments.callee.name,result)
}

async function CreateAssetType3(){
    
    var result = await lambdaAPI
    .CreateAsset({
        asset_amount:'100000000',
        asset_denom:'uzsdktest2',
        token_amount:'1000000000000',
        token_denom:'ulamb',
        name:'uzsdktest2',
        mint_type:"3",
        fund_asset:'ulamb',
        fund_amount:'1000',
        fund_period:'3',
        remarks:'uzsdktest2 coin',
        fund_stake:'100000000',
        inflation:'300000',
        total_supply:'3000000000',
        adjust_rate:'0.100000000000000000',
        max_adjust_count:'11',
        genesis_height:'11111111',
        adjust_period:'10',
        mining_ratio:'0.100000000000000000',
    })
    .setsigner(signerFn)
    .setfee(55955,2)
    .send();
    
    console.log('=======***************===========')
    console.log(result)
}


