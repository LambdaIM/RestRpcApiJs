import ActionManager from '../src/index.js'


const hdkey = require('@jswebfans/hdkeyjs')

var cosmosRESTURL, chainId, userAddress;

cosmosRESTURL = 'http://182.92.242.59:13659';
chainId = 'test';
userAddress = 'lambda16h3lwqvak8t8zrr9thetajf3yqzxj0kcsjlsck';

console.log('cosmosRESTURLcosmosRESTURL', cosmosRESTURL)
var lambdaAPI = new ActionManager(cosmosRESTURL, chainId, userAddress)

describe('ActionManager', () => {
    it('gatgas', async () => {
        var gasEstimate = await lambdaAPI
            .msgSend('lambda16h3lwqvak8t8zrr9thetajf3yqzxj0kcsjlsck', 1, 'ulamb', '')
            .simulate();
        expect(gasEstimate).toBeGreaterThan(10)

    })

    it('sendTransaction', async () => {
        var walletjson = `{"salt":"dZ56yoFQRYmr4RVRjhqXVQ==","privateKey":"M4Cg7zxsbFSRGqjac17XGoJUKN2wmZ1CM6YQhvQzHuMICpYtq4y90hDadv29fKb5Bid/rvWT6Ds4qtGvttR1WdH0YY6/Fw2of8E72j4=","name":"常用钱包1","address":"lambda163q4m634nq8les4nuvdvz49tk6aeh926t0ccsc","publicKey":"lambdapub1addwnpepq0zuqpchp295d4lgll9wcf4z0nex7lj0a99t07qnhxqn80y470t9zhrhpn6"}`;

        walletjson = JSON.parse(walletjson);
        const signerFn = hdkey.keyStore.getSigner(walletjson, '123456')
        const { included, hash } = await lambdaAPI
            .msgSend('lambda16h3lwqvak8t8zrr9thetajf3yqzxj0kcsjlsck', 1, 'ulamb', '')
            .setsigner(signerFn)
            .setfee(35955, 2)
            .send();
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