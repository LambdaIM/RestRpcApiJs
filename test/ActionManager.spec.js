import ActionManager from '../src/ActionManager.js'
import preTxdata from '../src/preTxdata.js'

const hdkey = require('@jswebfans/hdkeyjs')

describe('ActionManager', () => {
    it('MsgSend preTxdata', () => {
        var result = preTxdata.msgSend('lambda16h3lwqvak8t8zrr9thetajf3yqzxj0kcsjlsck', 1, 'ulamb', '');
        console.log(result)
        expect(result).toMatchObject({})

    })
    it('gatgas', async () => {
        var transactiondata = preTxdata.msgSend('lambda16h3lwqvak8t8zrr9thetajf3yqzxj0kcsjlsck', 1, 'ulamb', '');

        var actionManagerObj = new ActionManager();
        var gasprice = 0.025;
        var default_gas_price = gasprice; // recommended from Cosmos Docs
        const { type, memo, ...properties } = transactiondata;
        console.log("default_gas_price", default_gas_price);
        if (actionManagerObj != undefined) {
            actionManagerObj.setContext({
                url: ' http://182.92.242.59:13659',
                userAddress: 'lambda1hqlr7uekgeu5mxz4cmwkssf7g7mjageaq5jqm4'
            });
        }

        actionManagerObj.setMessage(type, properties);
        var gasEstimate = await actionManagerObj.simulate(memo || "");
        expect(gasEstimate).toBeGreaterThan(10)

    })

    it('sendTransaction', async () => {
        var transactiondata = preTxdata.msgSend('lambda16h3lwqvak8t8zrr9thetajf3yqzxj0kcsjlsck', 1, 'ulamb', '');

        var actionManagerObj = new ActionManager();
  
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

        if (actionManagerObj != undefined) {
            actionManagerObj.setContext({
                url: ' http://182.92.242.59:13659',
                userAddress: 'lambda1hqlr7uekgeu5mxz4cmwkssf7g7mjageaq5jqm4'
            });
        }

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
        expect(hash).toHaveLength(64)


      
    })


    ///
    // it(`MsgSend`, () => {
    //     var result = MessageConstructors.MsgSend(senderAddress, {
    //         toAddress,
    //         amounts
    //     })

    //     expect(result).toMatchObject(
    //         {
    //             "type": "cosmos-sdk/MsgSend",
    //             "value": {
    //                 "amount": [{
    //                     "amount": "1000000",
    //                     "denom": "ulamb"
    //                 }],
    //                 "from_address": "lambda163q4m634nq8les4nuvdvz49tk6aeh926t0ccsc",
    //                 "to_address": "lambda10a7pf73q86v06c7sq8hun2t4g4dunqnjgcrcyk"
    //             }
    //         }
    //     )
    // })
    ///
})


/*

exports.getSigner= function (walletjson, password ) {
  console.log("getSigner");

  var privatekey = this.checkJson(
      walletjson,
      password
  );
  var publicKey = cosPubKey.getBytes(walletjson.publicKey);
  console.log("校验密码ok");
  return signMessage => {
      console.log("数据签名");
      console.log(signMessage);
      const signature = coscrypto.sign(
          Buffer.from(signMessage),
          privatekey
      );
      return {
          signature,
          publicKey: publicKey
      };
  };
  //////

*/