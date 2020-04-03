var Api = require('./lib/index.js').default;
const hdkey = require('@jswebfans/hdkeyjs')

var cosmosRESTURL, chainId, userAddress;

cosmosRESTURL = 'http://182.92.242.59:13659';
chainId = undefined;
userAddress = 'lambda163q4m634nq8les4nuvdvz49tk6aeh926t0ccsc';

console.log('cosmosRESTURLcosmosRESTURL',cosmosRESTURL)
var lambdaAPI = new Api(cosmosRESTURL, chainId, userAddress)

var walletjson = `{"salt":"dZ56yoFQRYmr4RVRjhqXVQ==","privateKey":"M4Cg7zxsbFSRGqjac17XGoJUKN2wmZ1CM6YQhvQzHuMICpYtq4y90hDadv29fKb5Bid/rvWT6Ds4qtGvttR1WdH0YY6/Fw2of8E72j4=","name":"常用钱包1","address":"lambda163q4m634nq8les4nuvdvz49tk6aeh926t0ccsc","publicKey":"lambdapub1addwnpepq0zuqpchp295d4lgll9wcf4z0nex7lj0a99t07qnhxqn80y470t9zhrhpn6"}`;

walletjson = JSON.parse(walletjson);
const signerFn = hdkey.keyStore.getSigner(walletjson,'123456')

// msgSendgas()
// msgSend()
// msgDelegation()
// msgRedelegate()
// msgunDelegation()

// msgVote()

// msgDeposit()

// msgCreateBuyOrder()

// msgCreateBuyOrderAuto()
// msgWithdrawal()
msgCreateMiner()

async function msgSendgas(){
    var result = await lambdaAPI
    .msgSend('lambda16h3lwqvak8t8zrr9thetajf3yqzxj0kcsjlsck', 1, 'ulamb', '')
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


async function msgDelegation(){
    var result = await lambdaAPI.msgDelegation('lambdavaloper19v66hl7dlryn44z65l78sg5nmhqys6pcc7439l',1000000,true,1)
    .setsigner(signerFn)
    .setfee(759550,0)
    .send();

}

async function msgRedelegate(){
    var result = await lambdaAPI.msgRedelegate('lambdavaloper19v66hl7dlryn44z65l78sg5nmhqys6pcc7439l',
    'lambdavaloper1dc69vwjlry0ny6k8k5d4vqn2elhv03m0wjdmpd',
    1,1)
    .setsigner(signerFn)
    .setfee(759550,0)
    .send();

}

async function msgunDelegation(){
    var result = await lambdaAPI.msgDelegation('lambdavaloper19v66hl7dlryn44z65l78sg5nmhqys6pcc7439l',
    1,false,1)
    .setsigner(signerFn)
    .setfee(759550,0)
    .send();

}

async function msgVote(){
    var result = await lambdaAPI.msgVote('2',
    'Yes') //Yes No NoWithVeto Abstain
    .setsigner(signerFn)
    .setfee(759550,0)
    .send();
}

async function msgDeposit(){
    var result = await lambdaAPI.msgDeposit('2',
    1) //Yes No NoWithVeto Abstain
    .setsigner(signerFn)
    .setfee(759550,0)
    .send();
}

//msgCreateSellOrder 这个账户做不了 需要矿工的账户



async function msgCreateBuyOrder(){
    var duration=2592000000000000;
    var size=1;
    var sellOrderId='95FB18E99DEB1C2E55A5AB89377898B1A86BF105'
    var marketName='LambdaMarket'

    var result = await lambdaAPI
    .msgCreateBuyOrder(duration,
        size,
        sellOrderId,
        marketName) 
    .setsigner(signerFn)
    .setfee(759550,0)
    .send();
}

async function msgCreateBuyOrderAuto(){
    var duration=2592000000000000;
    var size=1;
    var sellOrderId='[do-not-input-value]'
    var marketName='LambdaMarket'

    var result = await lambdaAPI
    .msgCreateBuyOrder(duration,
        size,
        sellOrderId,
        marketName) 
    .setsigner(signerFn)
    .setfee(759550,0)
    .send();
}


async function msgWithdrawal(){
    
    var result = await lambdaAPI
    .msgWithdrawal() 
    .setsigner(signerFn)
    .setfee(759550,0)
    .send();
}

//[do-not-input-value]

//msgCreateMiner

async function msgCreateMiner(){
    
    var result = await lambdaAPI
    .msgCreateMiner('lambda1kwk9qv7nncusukv7zx7j7j4mlt3eyrf6ecdwpu','8F57Uf1ckRsYpUT9mrPCwnQXrx99Ac7K5QGabwybksH1') 
    .setsigner(signerFn)
    .setfee(759550,0)
    .send();
}





