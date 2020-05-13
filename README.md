# Cosmos API
Cosmos API is a library for interacting with applications built on the Cosmos SDK.
# It currently supports the mocking with the cross-fetch polyfill
它目前支持使用交叉获取polyfill进行模拟 以 polyfill 形式引入的

这个库 还是只能在node、 electron、 react native 中使用

还不能在浏览器中使用，读取的数据是跨域，如果要在浏览器中使用，
链上的接口需要支持跨域
或者配合浏览器钱包使用

记得当时做eos 应用的时候，eos读取数据的接口是支持跨域的

在electron 中使用的时候，需要将请求数据的方式改为 使用原生的net作为网络请求

```
import { net } from 'electron';
global.__net = net;
```


## Install

```
yarn add @jswebfans/chainapitest
```

在node中使用引入
```
import Cosmos from "@jswebfans/chainapitest"
```

在webpack作为开发环境的项目中使用
```
import Cosmos from "@jswebfans/chainapitest/src/"
```

## 验证节点启动rest server 服务供调用

http://docs.lambda.im/Testnet-Validator-Guide/#13-rest-server

## Use

发送转账交易


```
import Api from "@jswebfans/chainapitest"
const hdkey = require('@jswebfans/hdkeytest')

var cosmosRESTURL, chainId, userAddress;

// 节点启动的 rest-server 地址
cosmosRESTURL = 'http://182.92.242.59:13659';
//chainId 设为 undefined 会自动获取链上的chainId
chainId = undefined;
//lambda 地址
userAddress = 'lambda163q4m634nq8les4nuvdvz49tk6aeh926t0ccsc';

console.log('cosmosRESTURLcosmosRESTURL',cosmosRESTURL)
var lambdaAPI = new Api(cosmosRESTURL, chainId, userAddress)
//钱包配置文件
var walletjson = `{"salt":"dZ56yoFQRYmr4RVRjhqXVQ==","privateKey":"M4Cg7zxsbFSRGqjac17XGoJUKN2wmZ1CM6YQhvQzHuMICpYtq4y90hDadv29fKb5Bid/rvWT6Ds4qtGvttR1WdH0YY6/Fw2of8E72j4=","name":"常用钱包1","address":"lambda163q4m634nq8les4nuvdvz49tk6aeh926t0ccsc","publicKey":"lambdapub1addwnpepq0zuqpchp295d4lgll9wcf4z0nex7lj0a99t07qnhxqn80y470t9zhrhpn6"}`;

walletjson = JSON.parse(walletjson);

// 生成前面授权的方法，需要知道钱包配置文件的密码
const signerFn = hdkey.keyStore.getSigner(walletjson,'123456')

//获取转账交易的gas
async function msgSendgas(){
    var result = await lambdaAPI
    .msgSend('lambda16h3lwqvak8t8zrr9thetajf3yqzxj0kcsjlsck', 1, 'ulamb', '')
    .simulate();
    
    
    console.log(arguments.callee.name,result)
}

//转账  同步发送交易
async function msgSend(){
    
    var result = await lambdaAPI
    .msgSend('lambda16h3lwqvak8t8zrr9thetajf3yqzxj0kcsjlsck', 1, 'ulamb', '')
    .setsigner(signerFn)
    .setfee(35955,2)   //设置手续费 参数分别为gas和gas的价格
    .send();          //发送交易 
    
    console.log('=======***************===========')
    console.log(result)
    const { included }= result
    // await tx to be included in a block
    await included() //
}

//转账  异步发送交易
async function msgSend(){
    
    var result = await lambdaAPI
    .msgSend('lambda16h3lwqvak8t8zrr9thetajf3yqzxj0kcsjlsck', 1, 'ulamb', '')
    .setsigner(signerFn)
    .setfee(35955,2)   //设置手续费 参数分别为gas和gas的价格
    .send(true);           // 异步交易 
    
    console.log('=======***************===========')
    console.log(result)
    const { included }= result
    // await tx to be included in a block
    await included() //
}



```
lambdaAPI.msg***包含的交易类型
支持的交易类型

```
  msgSend,
  msgDelegation,
  msgRedelegate,
  msgDeposit,
  msgVote,
  msgCreateSellOrder,
  msgCreateBuyOrder,
  msgCreateMiner,
  msgWithdrawValidatorCommission,
  msgAssetPledge,
  msgAssetDrop,
  msgWithdrawal,
  msgMinerwithdrawal,
  msgCreateMarket,
  msgEditMarket,
  msgWithDrawMarket,
  msgCancelSellOrder,
  msgMinerWithDraw,
  msgMaintain,
  msgUnMaintain,
  msgUnjailMiner,
  msgOrderRenewal,
  msgMinerWithDrawCount,
  msgDelegateMarket
```
读取链上数据的接口
lambdaAPI.get.****


例如  lambdaAPI.get.nodeVersion()



