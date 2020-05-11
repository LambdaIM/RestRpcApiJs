var Api = require('./lib/node.js').default;
const hdkey = require('@jswebfans/hdkeytest')

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
// msgCreateMarket()

// msgCreateMarketgas()
// msgCreateMarket()

// msgEditMarketgas()
// msgEditMarket()

// msgSend()
// msgDelegation()
// msgRedelegate()
// msgunDelegation()

// msgVote()

// msgDeposit()

// msgCreateBuyOrder()

// msgCreateBuyOrderAuto()
// msgWithdrawal()

//=需要特殊账户
// msgCreateMiner()
// msgCreateSellOrder()

// msgAssetPledgetoken()
// msgAssetPledgeassert()

// msgAssetDrop()

// msgWithdrawValidatorCommission()

// msgMinerwithdrawal()
// msgDelegation()

// msgWithDrawMarketgas()
msgWithDrawMarket()

// msgWithDrawMarketgas()
// msgWithDrawMarket()

// msgDelegateMarket()










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
    var result = await lambdaAPI.msgDelegation('lambdavaloper19v66hl7dlryn44z65l78sg5nmhqys6pcc7439l',
    1000000,true)
    .setsigner(signerFn)
    .setfee(759550,0)
    .send();

}

async function msgRedelegate(){
    var result = await lambdaAPI.msgRedelegate('lambdavaloper19v66hl7dlryn44z65l78sg5nmhqys6pcc7439l',
    'lambdavaloper1dc69vwjlry0ny6k8k5d4vqn2elhv03m0wjdmpd',
    1)
    .setsigner(signerFn)
    .setfee(759550,0)
    .send();

}

async function msgunDelegation(){
    var result = await lambdaAPI.msgDelegation('lambdavaloper19v66hl7dlryn44z65l78sg5nmhqys6pcc7439l',
    1,false)
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
//msgCreateSellOrder 这个账户做不了 需要矿工的账户

async function msgCreateSellOrder(){
    var marketName='LambdaMarket';
    var price=5000000;
    var sellSize=1;
    var description='hehe'
    var cancelTimeDuration=1
    var minBuySize =1
    var minBuyDuration=2592000000000000
    var maxBuyDuration=5184000000000000
    var rate=0.5

    var result = await lambdaAPI
    .msgCreateSellOrder(marketName,
        price,
        rate,
        sellSize,
        description,
        cancelTimeDuration,
        minBuySize,
        minBuyDuration,
        maxBuyDuration) 
    .setsigner(signerFn)
    .setfee(759550,0)
    .send();
}


//msgAssetPledge
async function msgAssetPledgetoken(){
    var result = await lambdaAPI
    .msgAssetPledge(3000e6,1e6,true) 
    .setsigner(signerFn)
    .setfee(759550,0)
    .send();
}

async function msgAssetDrop(){
    var result = await lambdaAPI
    .msgAssetDrop(1e6,3000e6,true) 
    .setsigner(signerFn)
    .setfee(759550,0)
    .send();
}

async function msgWithdrawValidatorCommission(){
    var result = await lambdaAPI
    .msgWithdrawValidatorCommission(userAddress) 
    .setsigner(signerFn)
    .setfee(759550,0)
    .send();
}




async function msgMinerwithdrawal(){
    var result = await lambdaAPI
    .msgMinerwithdrawal(userAddress) 
    .setsigner(signerFn)
    .setfee(759550,0)
    .send();
}

async function msgCreateMarket(){
    var rate='0.5'+'00000000000000000';
    var result = await lambdaAPI
    .msgCreateMarket('llll',userAddress,userAddress,rate,rate)
    .setsigner(signerFn)
    .setfee(759550,0)
    .send();
}

async function msgCreateMarketgas(){
    var rate='0.5'+'00000000000000000';
    var result = await lambdaAPI
    .msgCreateMarket('shichangming',
    userAddress,userAddress,
    rate,rate)
    .simulate();
    
    
    console.log(arguments.callee.name,result)
}

async function msgEditMarketgas(){
    var rate='0.6'+'00000000000000000';
    var result = await lambdaAPI
    .msgEditMarket(
    userAddress,userAddress,
    rate,rate)
    .simulate();
    console.log(arguments.callee.name,result)
}

async function msgEditMarket(){
    var rate='0.6'+'00000000000000000';
    var result = await lambdaAPI
    .msgEditMarket(userAddress,userAddress,rate,rate)
    .setsigner(signerFn)
    .setfee(759550,0)
    .send();
}


async function msgWithDrawMarketgas(){
    
    var result = await lambdaAPI
    .msgWithDrawMarket('lambdamarket')
    .simulate();
    console.log(arguments.callee.name,result)
}

async function msgWithDrawMarket(){
    
    var result = await lambdaAPI
    .msgWithDrawMarket('secondmarket')
    .setsigner(signerFn)
    .setfee(759550,0)
    .send();
}

async function msgDelegateMarketgas(){
    
    var result = await lambdaAPI
    .msgDelegateMarket('secondmarket',100000000,'ulamb')
    .simulate();
    console.log(arguments.callee.name,result)
}

async function msgDelegateMarket(){
    
    var result = await lambdaAPI
    .msgDelegateMarket('secondmarket',1000000000,'ulamb')
    .setsigner(signerFn)
    .setfee(759550,0)
    .send();
}


//9012FE946D7DE4B9BB1DBEE8F41D6834BC89FF61



