var Api = require('./lib/node.js').default;
const hdkey = require('@jswebfans/hdkeytest')

var cosmosRESTURL, chainId, userAddress;

cosmosRESTURL = 'http://47.94.197.75:13659';
chainId = undefined;
userAddress = 'lambda1g2z30x06vz453ekkan0a55hd0nefuuzqnw3sye';

console.log('cosmosRESTURLcosmosRESTURL',cosmosRESTURL)
var lambdaAPI = new Api(cosmosRESTURL, chainId, userAddress)

var walletjson = `{
    "salt": "5M4Wrsl9EtBpQCDGMGTisg==",
    "privateKey": "uR+/k5iBdSN+QKugwzY5yIsEk7ByOtC/qENshdERa7Fjb5Ekzs6W/bS7OchI1WRb1DuavBYxQEwRw5Zp7FlZ0au6ScOJkbDIoAo3aAc=",
    "name": "sdk矿工测试账户",
    "address": "lambda1g2z30x06vz453ekkan0a55hd0nefuuzqnw3sye",
    "publicKey": "lambdapub1addwnpepqtw0jjm6ljemejc0nl9u2xq62cz8x4rjvajtdzpg8z6v356fr3rmk9usl3m"
}`;

walletjson = JSON.parse(walletjson);
const signerFn = hdkey.keyStore.getSigner(walletjson,'12345678')
// head strike property panda start best segment mule error net tomorrow
// medal error cross blind behave naive era spend circle hire trim conduct ahead

//lambda1g2z30x06vz453ekkan0a55hd0nefuuzqnw3sye



msgAuthorizeUser();


async function msgSend(){
    
    var result = await lambdaAPI
    .msgSend('lambda16h3lwqvak8t8zrr9thetajf3yqzxj0kcsjlsck', 1, 'ulamb', '')
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



















