var Api = require('./lib/index.js').default;
const hdkey = require('@jswebfans/hdkeyjs')

var cosmosRESTURL, chainId, userAddress;

cosmosRESTURL = 'http://182.92.242.59:13659';
chainId = 'test';
userAddress = 'lambda16h3lwqvak8t8zrr9thetajf3yqzxj0kcsjlsck';

console.log('cosmosRESTURLcosmosRESTURL',cosmosRESTURL)
var lambdaAPI = new Api(cosmosRESTURL, chainId, userAddress)

// test();

// getgas();

// senddata();
test3()

async function test2(){
    console.log('lambdaAPI.simulate')
    console.log(lambdaAPI.simulate)
    // console.log(lambdaAPI)
    var ss = await lambdaAPI
    .msgSend('lambda16h3lwqvak8t8zrr9thetajf3yqzxj0kcsjlsck', 1, 'ulamb', '')
    .simulate();
    
    console.log('=======***************===========')
    console.log(ss)
}


async function test3(){
    console.log('lambdaAPI.simulate')
    console.log(lambdaAPI.simulate)
    // console.log(lambdaAPI)
    var walletjson = `{"salt":"dZ56yoFQRYmr4RVRjhqXVQ==","privateKey":"M4Cg7zxsbFSRGqjac17XGoJUKN2wmZ1CM6YQhvQzHuMICpYtq4y90hDadv29fKb5Bid/rvWT6Ds4qtGvttR1WdH0YY6/Fw2of8E72j4=","name":"常用钱包1","address":"lambda163q4m634nq8les4nuvdvz49tk6aeh926t0ccsc","publicKey":"lambdapub1addwnpepq0zuqpchp295d4lgll9wcf4z0nex7lj0a99t07qnhxqn80y470t9zhrhpn6"}`;

    walletjson = JSON.parse(walletjson);
    const signerFn = hdkey.keyStore.getSigner(walletjson,'123456')
    var ss = await lambdaAPI
    .msgSend('lambda16h3lwqvak8t8zrr9thetajf3yqzxj0kcsjlsck', 1, 'ulamb', '')
    .setsigner(signerFn)
    .setfee(35955,2)
    .send();
    
    console.log('=======***************===========')
    console.log(ss)
}

async function test(){
    console.log('链接')
    var isconnected = await lambdaAPI.get.connected();
    console.log('isconnected', isconnected)



}


async function getgas(){
    console.log('gas')
        var transactiondata = lambdaAPI.preTxdata.msgSend('lambda16h3lwqvak8t8zrr9thetajf3yqzxj0kcsjlsck', 1, 'ulamb', '');

        var actionManagerObj = lambdaAPI;
        
        const { type, memo, ...properties } = transactiondata;
        
        actionManagerObj.setMessage(type, properties);
        var gasEstimate = await actionManagerObj.simulate(memo || "");

        console.log(gasEstimate)
        /**
         * var api=new API(*****);
         * api.msgsend(*****).simulate()
         ***/



}

async  function senddata(){
    console.log('send tx')
    var transactiondata = lambdaAPI.preTxdata.msgSend('lambda16h3lwqvak8t8zrr9thetajf3yqzxj0kcsjlsck', 1, 'ulamb', '');

        var actionManagerObj = lambdaAPI;
  
        const { type, memo, ...transactionProperties } = transactiondata;
        var gasprice = 0.25;
        var gasEstimate = 500000; // 需要接口读取
        var default_gas_price = gasprice;

        const gasPrice = {
            amount: default_gas_price.toFixed(9),
            // denom: this.bondDenom
            denom: "ulamb"
        };

        const feeProperties = {
            gasEstimate: gasEstimate,
            gasPrice: gasPrice
        };

        actionManagerObj.setMessage(type, transactionProperties);
        //返回一个签名的函数
        //////
        var walletjson = `{"salt":"dZ56yoFQRYmr4RVRjhqXVQ==","privateKey":"M4Cg7zxsbFSRGqjac17XGoJUKN2wmZ1CM6YQhvQzHuMICpYtq4y90hDadv29fKb5Bid/rvWT6Ds4qtGvttR1WdH0YY6/Fw2of8E72j4=","name":"常用钱包1","address":"lambda163q4m634nq8les4nuvdvz49tk6aeh926t0ccsc","publicKey":"lambdapub1addwnpepq0zuqpchp295d4lgll9wcf4z0nex7lj0a99t07qnhxqn80y470t9zhrhpn6"}`;

        walletjson = JSON.parse(walletjson);
        const signerFn = hdkey.keyStore.getSigner(walletjson,'123456')

        const { included, hash } = await actionManagerObj.send(
            memo,
            feeProperties,
            signerFn
        );
        console.log(hash)
        /**
         * var api=new API(*****);
         * api.msgsend(*****).setsigner(*****).setfee(****).send()
         ***/

}
