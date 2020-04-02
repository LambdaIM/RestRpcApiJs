import ActionManager from '../src/index.js'


const hdkey = require('@jswebfans/hdkeyjs')

var cosmosRESTURL, chainId, userAddress;

cosmosRESTURL = 'http://182.92.242.59:13659';
chainId = 'test';
userAddress = 'lambda16h3lwqvak8t8zrr9thetajf3yqzxj0kcsjlsck';



console.log('cosmosRESTURLcosmosRESTURL', cosmosRESTURL)
var lambdaAPI = new ActionManager(cosmosRESTURL, chainId, userAddress)


describe('ActionManager', () => {
    beforeEach(() => {
        console.log('beforeEach')
        

        fetch.mockResponse(res => {
            console.log('fetch.mockResponse', res.url)
            if (res.url.includes('auth/accounts')) {
               return Promise.resolve('{"type":"auth/Account","value":{"address":"lambda16h3lwqvak8t8zrr9thetajf3yqzxj0kcsjlsck","coins":[{"denom":"ulamb","amount":"1000000"}],"public_key":null,"account_number":"12","sequence":"0"}}')
            } else if(res.url.includes('bank/accounts')) {
                return Promise.resolve(`{"gas_estimate":"12345"}`)
            } else if(res.url.includes('txs')) {
                console.log(res.body.toString())
                var body=JSON.parse(res.body.toString())
                if(body.mode=='block'){
                    return Promise.resolve(`{
                        "gas_used": "32148",
                        "gas_wanted": "43376",
                        "height": "153322",
                        "logs": [{
                            "log": "",
                            "msg_index": "0",
                            "success": true
                        }],
                        "raw_log": "",
                        "tags": [{
                            "key": "action",
                            "value": "send"
                        }, {
                            "key": "sender",
                            "value": "lambda12fldnycgpevw4gthq9w0zcfetpa9sn4d39wzlz"
                        }, {
                            "key": "address",
                            "value": "lambda12fldnycgpevw4gthq9w0zcfetpa9sn4d39wzlz"
                        }, {
                            "key": "recipient",
                            "value": "lambda16h3lwqvak8t8zrr9thetajf3yqzxj0kcsjlsck"
                        }, {
                            "key": "address",
                            "value": "lambda16h3lwqvak8t8zrr9thetajf3yqzxj0kcsjlsck"
                        }],
                        "timestamp": "2020-03-20T06:46:56Z",
                        "tx": {
                            "type": "auth/StdTx",
                            "value": {
                                "fee": {
                                    "amount": [{
                                        "amount": "1094",
                                        "denom": "ulamb"
                                    }],
                                    "gas": "43376"
                                },
                                "memo": "",
                                "msg": [{
                                    "type": "cosmos-sdk/MsgSend",
                                    "value": {
                                        "amount": [{
                                            "amount": "1000000",
                                            "denom": "ulamb"
                                        }],
                                        "from_address": "lambda12fldnycgpevw4gthq9w0zcfetpa9sn4d39wzlz",
                                        "to_address": "lambda16h3lwqvak8t8zrr9thetajf3yqzxj0kcsjlsck"
                                    }
                                }],
                                "signatures": [{
                                    "pub_key": {
                                        "type": "tendermint/PubKeySecp256k1",
                                        "value": "A208sFTFL728fK4ctkdPR6Z+AV8cGn+efQ0nKdVCbq7C"
                                    },
                                    "signature": "X6506ZDa7Mzwtu2G0RQW0pCGzh7etCRHMltzvdCvwcljAYhRsmO2LyA52d9uyUuHWvBfZMZ4/oIglfetpRuNRQ=="
                                }]
                            }
                        },
                        "txhash": "18DDA8DAB9CB4BC4DAC73D94FD36D557CB59E63BCFDD6E1A6F8D76A55788373F"
                    }`)

                }else{
                    return Promise.resolve(` {
                        "height": "0",
                        "txhash": "0C49A0BDB57DB2F203E676ECD4F4F6568C5694852A82A51071648AA78DDC6069"
                      }`)

                }


            } 
    
        })
    
    });

    it('account', async () => {
        var obj = await lambdaAPI
            .get.account('lambda16h3lwqvak8t8zrr9thetajf3yqzxj0kcsjlsck')
        expect(obj.account_number).toBe('12')

    })


    it('gatgas', async () => {

        var result = await lambdaAPI
            .msgSend('lambda16h3lwqvak8t8zrr9thetajf3yqzxj0kcsjlsck', 1, 'ulamb', '')
            .simulate();
        expect(result).toBe(Math.round(12345*1.5))

    })

    it('sendTransaction block', async () => {
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

    it('sendTransaction sync', async () => {
        fetch.mockResponseOnce(JSON.stringify({ height: '0',
        txhash:
         '35D6A82025C6A44402DA2A6E535900171FB674879B27FCC4180666AB4F843AC5' }))
        var walletjson = `{"salt":"dZ56yoFQRYmr4RVRjhqXVQ==","privateKey":"M4Cg7zxsbFSRGqjac17XGoJUKN2wmZ1CM6YQhvQzHuMICpYtq4y90hDadv29fKb5Bid/rvWT6Ds4qtGvttR1WdH0YY6/Fw2of8E72j4=","name":"常用钱包1","address":"lambda163q4m634nq8les4nuvdvz49tk6aeh926t0ccsc","publicKey":"lambdapub1addwnpepq0zuqpchp295d4lgll9wcf4z0nex7lj0a99t07qnhxqn80y470t9zhrhpn6"}`;

        walletjson = JSON.parse(walletjson);
        const signerFn = hdkey.keyStore.getSigner(walletjson, '123456')
        const { included, hash } = await lambdaAPI
            .msgSend('lambda16h3lwqvak8t8zrr9thetajf3yqzxj0kcsjlsck', 1, 'ulamb', '')
            .setsigner(signerFn)
            .setfee(35955, 2)
            .send(true);
        expect(hash).toBe('0C49A0BDB57DB2F203E676ECD4F4F6568C5694852A82A51071648AA78DDC6069')
    })



})

