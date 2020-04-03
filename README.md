# Cosmos API
Cosmos API is a library for interacting with applications built on the Cosmos SDK.
# It currently supports the mocking with the cross-fetch polyfill
它目前支持使用交叉获取polyfill进行模拟 以 polyfill 形式引入的

## Install

```
yarn add @jswebfans/chainapitest
```
在webpack作为开发环境的项目中使用
```
import Cosmos from "@jswebfans/chainapitest"
```
在node中使用引入
```
import Cosmos from "@jswebfans/chainapitest/lib/node"
```
在浏览器中使用引入
```
import Cosmos from "@jswebfans/chainapitest/lib/browser"
```


## Use

Simple example of how to send tokens.


```
import Api from "@jswebfans/chainapitest"
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

//获取转账交易的gas
async function msgSendgas(){
    var result = await lambdaAPI
    .msgSend('lambda16h3lwqvak8t8zrr9thetajf3yqzxj0kcsjlsck', 1, 'ulamb', '')
    .simulate();
    
    
    console.log(arguments.callee.name,result)
}

//转账
async function msgSend(){
    
    var result = await lambdaAPI
    .msgSend('lambda16h3lwqvak8t8zrr9thetajf3yqzxj0kcsjlsck', 1, 'ulamb', '')
    .setsigner(signerFn)
    .setfee(35955,2)
    .send();
    
    console.log('=======***************===========')
    console.log(result)
    const { included }= result
    // await tx to be included in a block
    await included()
}



```
