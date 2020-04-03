import ActionManager from '../src/index.js'


const hdkey = require('@jswebfans/hdkeyjs')

var cosmosRESTURL, chainId, userAddress;

cosmosRESTURL = 'http://182.92.242.59:13659';
chainId = 'test';
userAddress = 'lambda16h3lwqvak8t8zrr9thetajf3yqzxj0kcsjlsck';

var walletjson = `{"salt":"dZ56yoFQRYmr4RVRjhqXVQ==","privateKey":"M4Cg7zxsbFSRGqjac17XGoJUKN2wmZ1CM6YQhvQzHuMICpYtq4y90hDadv29fKb5Bid/rvWT6Ds4qtGvttR1WdH0YY6/Fw2of8E72j4=","name":"常用钱包1","address":"lambda163q4m634nq8les4nuvdvz49tk6aeh926t0ccsc","publicKey":"lambdapub1addwnpepq0zuqpchp295d4lgll9wcf4z0nex7lj0a99t07qnhxqn80y470t9zhrhpn6"}`;
walletjson = JSON.parse(walletjson);
const signerFn = hdkey.keyStore.getSigner(walletjson, '123456')


var lambdaAPI = new ActionManager(cosmosRESTURL, chainId, userAddress)


describe('delegation.spec', () => {
    beforeEach(() => {
        fetch.mockResponse(res => {
            console.log('fetch.mockResponse', res.url)
            if (res.url.includes('auth/accounts')) {
                return Promise.resolve('{"type":"auth/Account","value":{"address":"lambda16h3lwqvak8t8zrr9thetajf3yqzxj0kcsjlsck","coins":[{"denom":"ulamb","amount":"1000000"}],"public_key":null,"account_number":"12","sequence":"0"}}')
            } else if (res.url.includes('staking/delegators')) {
                return Promise.resolve(`{"gas_estimate":"12345"}`)
            }
        })


    })
    it('msgDelegation gatgas', async () => {

        var result = await lambdaAPI
            .msgDelegation('lambdavaloper19v66hl7dlryn44z65l78sg5nmhqys6pcc7439l',
                1000000, true, 1)
            .simulate();
        expect(result).toBe(Math.round(12345 * 1.5))

    })
    


})
