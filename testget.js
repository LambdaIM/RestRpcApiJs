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

async function test(){
    var result;
    result = await lambdaAPI.get.connected();
    console.log(result)
    result = await lambdaAPI.get.nodeVersion()
    console.log(result)
    result = await lambdaAPI.get.nodeSyncing()
    console.log(result)
    result = await lambdaAPI.get.nodeBlocklatest()
    console.log(result)
    result = await lambdaAPI.get.account(userAddress)
    console.log(result)
    console.log('---------------1')
    result = await lambdaAPI.get.txs(userAddress,0)
    console.log(result)
    result = await lambdaAPI.get.txsByHeight(1000)
    console.log(result)
    result = await lambdaAPI.get.tx('1EA0DA1FA4FBAE089D4C348AFB9450BBC3576DEB4D7BEB6D753D4B0C8808386F')
    console.log(result)
    result = await lambdaAPI.get.assetAll()
    console.log(result)
    console.log('---------------2')
    result = await lambdaAPI.get.delegations(userAddress)
    console.log(result)
    result = await lambdaAPI.get.undelegations(userAddress)
    console.log(result)
    result = await lambdaAPI.get.redelegations(userAddress)
    console.log(result)
    result = await lambdaAPI.get.delegatorValidators(userAddress)
    console.log(result)
    result = await lambdaAPI.get.validators()
    console.log(result)
    result = await lambdaAPI.get.validator('lambdavaloper19v66hl7dlryn44z65l78sg5nmhqys6pcc7439l')
    console.log(result)
    result = await lambdaAPI.get.validatorSet()
    console.log(result)
    console.log('---------------3')
    result = await lambdaAPI.get.delegation(userAddress,'lambdavaloper19v66hl7dlryn44z65l78sg5nmhqys6pcc7439l')
    console.log(result)
    result = await lambdaAPI.get.unbondingDelegation(userAddress,'lambdavaloper19v66hl7dlryn44z65l78sg5nmhqys6pcc7439l')
    console.log(result)
    result = await lambdaAPI.get.pool()
    console.log(result)
    result = await lambdaAPI.get.stakingParameters()
    console.log(result)
    result = await lambdaAPI.get.proposals()
    console.log(result)
    result = await lambdaAPI.get.proposal(1)
    console.log(result)
    result = await lambdaAPI.get.proposalVotes(1)
    console.log(result)
    result = await lambdaAPI.get.proposalVote(1,userAddress)
    console.log(result)
    result = await lambdaAPI.get.proposalDeposits(1)
    console.log(result)
    result = await lambdaAPI.get.proposalDeposit(1,userAddress)
    console.log(result)
    result = await lambdaAPI.get.proposalTally(1)
    console.log(result)
    result = await lambdaAPI.get.govDepositParameters()
    console.log(result)
    result = await lambdaAPI.get.govTallyingParameters()
    console.log(result)
    result = await lambdaAPI.get.govVotingParameters()
    console.log(result)
    result = await lambdaAPI.get.block(1)
    console.log(result)
    result = await lambdaAPI.get.delegatorRewards(userAddress)
    console.log(result)
    result = await lambdaAPI.get.delegatorRewardsFromValidator(userAddress,'lambdavaloper19v66hl7dlryn44z65l78sg5nmhqys6pcc7439l')
    console.log(result)
    result = await lambdaAPI.get.validatorDistributionInformation('lambdavaloper19v66hl7dlryn44z65l78sg5nmhqys6pcc7439l')
    console.log(result)
    result = await lambdaAPI.get.validatorRewards('lambdavaloper19v66hl7dlryn44z65l78sg5nmhqys6pcc7439l')
    console.log(result)
    console.log('-----------------4')
    result = await lambdaAPI.get.MinerRewards(userAddress)  //钱包里面是传lambda地址进去
    console.log(result)
    result = await lambdaAPI.get.distributionParameters(userAddress)  
    console.log(result)
    result = await lambdaAPI.get.distributionParameters(userAddress)  
    console.log(result)
    result = await lambdaAPI.get.distributionOutstandingRewards('lambdavaloper19v66hl7dlryn44z65l78sg5nmhqys6pcc7439l')  
    console.log(result)
    result = await lambdaAPI.get.marketlist()  
    console.log(result)
    result = await lambdaAPI.get.marketinfo()  
    console.log(result)
    //to do 剩下市场模块
    console.log('-----------------5')
    result = await lambdaAPI.get.marketOrderslist('lambdamarket','premium','active',1,10)  
    console.log(result)
    result = await lambdaAPI.get.marketSellOrderslist(userAddress,1,10)  
    console.log(result)
    result = await lambdaAPI.get.marketUserOrderslist(userAddress,1,10)  
    console.log(result)
    result = await lambdaAPI.get.marketOrderinfo('695996F63BDA79F23F31BE2C254ECC32E930BB19')  
    console.log(result)
    result = await lambdaAPI.get.marketsellorderinfo('695996F63BDA79F23F31BE2C254ECC32E930BB19')  
    console.log(result)
    console.log('-----------------5')
    result = await lambdaAPI.get.mintingAnnualprovisions()
    console.log(result)

    

    
    
    
}

test()
