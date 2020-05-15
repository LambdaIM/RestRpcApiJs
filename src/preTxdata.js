import transaction from './transactionTypes.js'
const hdkey = require('@jswebfans/hdkeytest')
export default {
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
}

const defaultdenom = 'ulamb';
/**
 * Transfer transaction
 * @param {string} Lambda address of transfer target
 * @param {number} amount Amount transferred
 * @param {string} denom  Name of token
 * @param {string} memo remarks
 */
function msgSend(to, amount, denom, memo) {
  var result = {
    type: transaction.SEND,
    toAddress: to,
    amounts: [
      {
        amount: amount,
        denom: denom || defaultdenom
      }
    ],
    memo: memo || ""
  };
  this.transactiondata=result;
  return this;
}
/**
 * Pledge or cancellation of pledge
 * @param {string} to  Address pledged to verification node 
 * @param {number} amount Amount pledged
 * @param {boolean} isdege Pledge or cancel pledge， true isPledge  false is cancel pledge
 * @param {number} validatorType the category of the node ，The default is 1
 */
function msgDelegation(to, amount, isdege, validatorType) {
  
  var result;
  if (isdege) {
    // 质押
    result= {
      type: transaction.DELEGATE,
      validatorAddress: to,
      amount: amount,
      denom: 'utbb',
      validatortype: validatorType||1
    };
  } else {
    // 取消质押
    result= {
      type: transaction.UNDELEGATE,
      validatorAddress: to,
      amount: amount,
      denom: 'utbb',
      validatortype: validatorType||1
    };
  }
  this.transactiondata=result;
  return this;
}

/**
 * Transfer pledge
 * @param {string} validatorSourceAddress  Node address of current pledge
 * @param {string} validatorDestinationAddress  Node address of the target
 * @param {string} amount Amount transferred to pledge
 * @param {Number} validatortype the category of the node ，The default is 1
 */
function msgRedelegate(validatorSourceAddress, validatorDestinationAddress, amount, validatortype) {
  var result;
  result= {
    type: transaction.REDELEGATE,
    validatorSourceAddress,
    validatorDestinationAddress,
    amount: amount,
    validatortype: validatortype||1,
    denom: 'utbb'
  };

  this.transactiondata=result;
  return this;
}
/**
 * Deposit to proposal
 * @param {string} ProposalID Proposal ID
 * @param {number} amount  Amount deposited
 */
function msgDeposit(ProposalID, amount) {
var result;
result = {
    type: transaction.DEPOSIT,
    proposalId: ProposalID,
    amounts: [{ amount: amount, denom: defaultdenom }]
  };
this.transactiondata=result;
return this;

}
/**
 * Vote on proposal
 * @param {string} ProposalID Proposal ID
 * @param {string} option  Voting options option value Yes No NoWithVeto Abstain
 */
function msgVote(ProposalID, option) {
  //option value Yes No NoWithVeto Abstain
  //
  var list=['Yes', 'No', 'NoWithVeto', 'Abstain']
  if(list.includes(option)==false){
    throw new Error('option is in Yes No NoWithVeto Abstain')

  }
  var result;
  result = {
    type: transaction.VOTE,
    proposalId: ProposalID,
    option: option
  };
  this.transactiondata=result;
  return this;
}


/**
 * Create sales order
 * @param {string} marketName  Market name of sales order
 * @param {number} price Price of sales order
 * @param {number} rate  Odds on sales
 * @param {number} sellSize  Size of space for sale
 * @param {string} description Description and introduction of the sales order
 * @param {number} cancelTimeDuration  Time to cancel sales order
 * @param {number} minBuySize Minimum purchase space size
 * @param {number} minBuyDuration Minimum purchase time
 * @param {number} maxBuyDuration Maximum purchase time
 */
function msgCreateSellOrder(marketName,
  price,
  rate,
  sellSize,
  description,
  cancelTimeDuration,
  minBuySize,
  minBuyDuration,
  maxBuyDuration) {
     if (rate == 0.5) {
      rate = rate + '00000000000000000';
      } else if(rate==1) {
        rate = rate + '.000000000000000000';
      }
  var result;
    result = {
    type: transaction.CreateSellOrder,
    marketName,
    price:String(price),
    rate:String(rate),
    sellSize:String(sellSize),
    memo: description || '',
    cancelTimeDuration:String(cancelTimeDuration),
    minBuySize:String(minBuySize),
    minBuyDuration:String(minBuyDuration),
    maxBuyDuration:String(maxBuyDuration)
  };
  this.transactiondata=result;
  return this;
};

/**
 * Create a purchase order
 * @param {number} duration  How long did you buy
 * @param {number} size Size of purchase space
 * @param {string} sellOrderId  Sales order ID of purchase space
 * @param {string} marketName Market name
 */
function msgCreateBuyOrder(duration,
  size,
  sellOrderId,
  marketName) {
    //duration=2592000000000000
    // 自动购买
    //var sellOrderId='[do-not-input-value]'
    var result;
    result = {
    type: transaction.CreateBuyOrder,
    duration:String(duration),
    size:String(size),
    sellOrderId,
    marketName
  };
  this.transactiondata=result;
  return this;
}

/**
 * Initialize miner
 * @param {string} miningAddress  Miner's address Address of miner's sub account
 * @param {string} dhtId  dhtId
 */
function msgCreateMiner(miningAddress, dhtId) {
  var result;
  result = {
    type: transaction.CreateMiner,
    miningAddress,
    dhtId
  };
  this.transactiondata=result;
  return this;
}
/**
 * Withdraw node income
 * @param {string} address lambda address
 */
function msgWithdrawValidatorCommission(address) {
  console.log('TransferwithdrawalDistribution')
  var lambdaDevelopAdresss = hdkey.address.validatorAddress(address);
  var result;
  result = {
    type: transaction.WithdrawValidatorCommission,
    denom: defaultdenom,
    validatorAddress: lambdaDevelopAdresss
  };
  this.transactiondata=result;
  return this;
}

/**
 * Lamb exchange TBB
 * @param {number} amount  Amount of lamb
 * @param {number} asset  TBB amount
 */
function msgAssetPledge(amount, asset) {
  var result;
    result = {
      type: transaction.AssetPledge,
      amounts: {
        amount: amount,
        denom: defaultdenom
      },
      asset: {
        amount: asset,
        denom: 'utbb'
      }

    };
  
  
  this.transactiondata=result;
  return this;
}
/**
 * TBB exchange lamb
 * @param {number} asset   TBB amount
 * @param {number} amount  Amount of lamb
 */
function msgAssetDrop(asset,amount) {
  var result;

    result = {
      type: transaction.AssetDrop,
      amounts: {
        amount: amount,
        denom: defaultdenom
      },
      asset: {
        amount: asset,
        denom: 'utbb'
      }

    };
  
  this.transactiondata=result;
  return this;
}

/**
 * Withdrawal of pledge income
 */
function msgWithdrawal() {
  var result;
  result = {
    type: transaction.WITHDRAW,
  };
  this.transactiondata=result;
  return this;
}

/**
 * Reward for miner's extraction and mining
 * @param {string} address Miner's lamb address
 */
function msgMinerwithdrawal(address) {
  var result;
  result =  {
    type: transaction.WithdrawMinerRewards,
    minerAddress: hdkey.address.MinerAddress(address)
  }
  this.transactiondata=result;
  return this;
}


/**
 * Create a market
 * @param {string} name     Market name
 * @param {string} address Lambda address of the Creator
 * @param {string} profit  Beneficiary's lambda address
 * @param {string} feeRate  like '0.5'+'00000000000000000'
 * @param {string} commissionRate  like '0.5'+'00000000000000000'
 */
function msgCreateMarket(name,
  address,
  profit,
  feeRate,
  commissionRate) {

  var result;
  result =  {
    type: transaction.CreateMarket,
    address: address,
    commissionRate:commissionRate,
    feeRate:feeRate,
    name:name,
    profit:profit,
    
    
  }
  this.transactiondata=result;
  return this;
}

/**
 * Modify market information
 * @param {string} address Lambda address of the Creator
 * @param {string} profit Beneficiary's lambda address
 * @param {string} feeRate like '0.5'+'00000000000000000'
 * @param {string} commissionRate like '0.5'+'00000000000000000'
 */
function msgEditMarket(
  address,
  profit,
  feeRate,
  commissionRate) {

  var result;
  result =  {
    type: transaction.EditMarket,
    address: address,
    commissionRate:commissionRate,
    feeRate:feeRate,
    profit:profit,
    
    
  }
  this.transactiondata=result;
  return this;
}

/**
 *Withdrawal of market pledge income
 * @param {string} marketName Market name
 */
function msgWithDrawMarket(marketName) {
  var result;
  result =  {
    type: transaction.WithDrawMarket,
    marketName:marketName
  }
  this.transactiondata=result;
  return this;
}

function msgCancelSellOrder(orderId) {
  var result;
  result =  {
    type: transaction.CancelSellOrder,
    orderId:orderId
  }
  this.transactiondata=result;
  return this;
}

/**
 * Miner's order income
 * @param {string} matchOrderId  Match order ID
 */
function msgMinerWithDraw(matchOrderId) {
  var result;
  result =  {
    type: transaction.MinerWithDraw,
    matchOrderId:matchOrderId
  }
  this.transactiondata=result;
  return this;
}

/**
 * Miner initiated maintenance
 */
function msgMaintain() {
  var result;
  result =  {
    type: transaction.Maintain,
    
  }
  this.transactiondata=result;
  return this;
}

/**
 * Miner lifting maintenance
 */
function msgUnMaintain() {
  var result;
  result =  {
    type: transaction.UnMaintain,
    
  }
  this.transactiondata=result;
  return this;
}

/**
 * Miners lift restrictions
 */
function msgUnjailMiner() {
  var result;
  result =  {
    type: transaction.UnjailMiner,
    
  }
  this.transactiondata=result;
  return this;
}


/**
 * Order renewal, increase order usage time
 * @param {string} orderId  ID of the order
 * @param {number} duration Increase order usage time
 */
function msgOrderRenewal(orderId,duration) {
  var result;
  result =  {
    type: transaction.OrderRenewal,
    orderId:orderId,
    duration:duration
    
  }
  this.transactiondata=result;
  return this;
}

/**
 * Miners withdraw order revenue in batches
 * @param {number} page  Page
 * @param {number} limit One page contains the number of orders, up to 100 orders
 */
function msgMinerWithDrawCount(page,limit) {
  var result;
  result =  {
    type: transaction.OrderRenewal,
    page:page,
    limit:limit
  }
  this.transactiondata=result;
  return this;
}

/**
 * Market pledge
 * @param {string} marketName   Market name
 * @param {number} amount amount
 * @param {string} denom Token name defaults to lamb
 */
function msgDelegateMarket(marketName,amount,denom) {
  var result;
  result =  {
    type: transaction.DelegateMarket,
    marketName:marketName,
    amount:amount,
    denom:denom||'ulamb'
  }
  this.transactiondata = result;
  console.log(this.transactiondata)
  return this;
}