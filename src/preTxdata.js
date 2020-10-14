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
  msgDelegateMarket,
  CreateDigitalAssetMarket,
  DigitalAssetPledge,
  DigitalAssetRefund,
  AuthorizeUser,
  CreateAsset
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

/**
 * Create asset market
* @param {string} AssetName   Asset Name
* @param {Float} Ratio   Ratio
* @param {string} marketName   market Name
* @param {memo} memo   memo
*/
function CreateDigitalAssetMarket (AssetName,Ratio,marketName,memo) {
  var result = {
    type: transaction.CreateDigitalAssetMarket,
    AssetName: AssetName,
    Ratio:String(Ratio) ,
    marketName:marketName,
    memo: memo || ''
  };
  this.transactiondata = result;
  console.log(this.transactiondata)
  return this;
}

/**
 * Miners pledge to asset market
 * @param {string} AssetName   Asset Name
 * @param {int} Size   Space size
 * @param {string} price   price 
 * @param {memo} memo   memo
*/
function  DigitalAssetPledge (AssetName,Size,Price,memo) {
  var result = {
    type: transaction.DigitalAssetPledge,
    AssetName: AssetName,
    Size:String(Size),
    Price:Price,
    memo: memo || ''
  };
  this.transactiondata = result;
  console.log(this.transactiondata)
  return this;
};

/**
 * Miners redeem from asset markets
 *  @param {string} AssetName   Asset Name
 *  @param {memo} memo   memo
*/
 function DigitalAssetRefund(AssetName,memo) {
  var result = {
    type: transaction.DigitalAssetRefund,
    AssetName: AssetName,
    memo: memo || ''
  };
  this.transactiondata = result;
  console.log(this.transactiondata)
  return this;
};


/**
 * Add or cancel miner authorization in asset market
 * @param {string} user   user lambda address
 * @param {string} AssetName   AssetName
 * @param {Boolean} isAllowed    Add or remove authorization
 * @param {memo} memo   memo
*/
function AuthorizeUser( userlambdaaddress, AssetName, isAllowed,memo) {
  var result,publicKey; 
  result = {
    type: transaction.AuthorizeUser,
    AssetName:AssetName,
    memo: memo || '',
    user:userlambdaaddress,
    isAllowed:isAllowed
  };

  this.transactiondata = result;
  console.log(this.transactiondata)
  return this;
};

/**
 * Creating assets in the asset market
 * @param AssetInfo Information about the Asset. 
 * @param AssetInfo.asset_amount   Initial issue of assets
 * @param AssetInfo.asset_denom  The name of the asset
 * @param AssetInfo.token_amount  The amount to be consumed to create the asset
 * @param AssetInfo.token_denom  The name of the asset to be consumed to create the asset
 * @param AssetInfo.name    name  of assets
 * @param AssetInfo.mint_type Types of additional issuance of assets
 * @param AssetInfo.fund_asset  Name of assets used in pre mining
 * @param AssetInfo.fund_amount The amount involved in the pre-mining
 * @param AssetInfo.fund_period Duration of pre-mining
 * @param AssetInfo.fund_stake The amount of assets mined by pre-mining
 * @param AssetInfo.remarks Full name notes of assets
 * The type of additional issuance is the attribute that needs to be filled in for mining additional issuance
 * @param AssetInfo.total_supply Total issuance
 * @param AssetInfo.inflation Additional issuance of each block height
 * @param AssetInfo.miningratio Percentage of miner rewards Keep 18 decimal values
 * @param AssetInfo.adjust_rate adjust rate  Keep 18 decimal values
 * @param AssetInfo.adjust_period adjust period
 * @param AssetInfo.max_adjust_count max adjust count
 * @param AssetInfo.genesis_height Block height of the initial issuance
 * @param AssetInfo.memo  memo
 
*/
function CreateAsset ( {
  asset_amount,asset_denom,
  token_amount,token_denom,name,
  mint_type,inflation,
  total_supply,
  adjust_rate,adjust_period,max_adjust_count,
  genesis_height,remarks,
  memo,mining_ratio,
  fund_asset,fund_amount,fund_period,fund_stake
}) {
  var result = {
    type: transaction.CreateAsset,
    asset_amount:asset_amount,
    asset_denom:asset_denom,
    token_amount:token_amount,
    token_denom:token_denom,
    name:remarks,
    mint_type:parseInt(mint_type) ,
    fund_asset,
    fund_amount,
    fund_period,
    fund_stake,
    inflation:inflation||'0',
    total_supply:total_supply||'0',
    adjust_rate:adjust_rate||'0.000000000000000000',
    max_adjust_count:max_adjust_count||'0',
    genesis_height:genesis_height||'0',
    adjust_period:adjust_period||'0',
    mining_ratio:mining_ratio||'0.000000000000000000',
    memo: memo || '',
  };

  this.transactiondata = result;
  console.log(this.transactiondata)
  return this;
};

/**
 * Closing the asset market
 * @param {string} AssetName   AssetName
 * @param {memo} memo   memo
*/
function DismissDigitalAssetMarket(AssetName,memo) {
  var result = {
    type: transaction.DismissDigitalAssetMarket,
    AssetName: AssetName,
    memo: memo || ''
  };
  this.transactiondata = result;
  console.log(this.transactiondata)
  return this;
};

/**
 * Buying miners' space in asset markets
 * @param {string} Asset   Asset Name
 * @param {string} Duration   Order duration
 * @param {string} Size   Size of purchase space
 * @param {string} minerAddress   Miner's operating address
*/
function DamCreateBuyOrder(Asset,Duration,Size,minerAddress,memo) {
  var result = {
    type: transaction.DamCreateBuyOrder,
    Asset: Asset,
    Size:Size,
    Duration:Duration,
    minerAddress:minerAddress,
    memo: memo || ''
  };
  this.transactiondata = result;
  console.log(this.transactiondata)
  return this;
};

/**
* Increase usage time for orders in asset markets
* @param {string} orderId   The ID of the order
* @param {string} duration   Duration of renewal
* @param {string} memo   memo
*/
function DamOrderRenewal (orderId,duration,memo) {
  console.log('DamOrderRenewal',orderId,duration)

  var result = {
    type: transaction.DamOrderRenewal,
    orderID: orderId,
    duration:duration,
    memo: memo || ''
  };
  this.transactiondata = result;
  console.log(this.transactiondata)
  return this;
}

/**
 * Mining reward for extracting asset duration
 * @param {string} asset  Asset Name
 * @param {string} page  Page number
 * @param {string} limit  Page size
 * @param {string} memo   memo
*/
function DamMinerWithDrawCount(asset,page,limit,memo) {
  var result = {
    type: transaction.DamMinerWithDrawCount,
    page: page,
    limit: limit,
    asset:asset,
    memo: memo || ''
  };

  this.transactiondata = result;
  console.log(this.transactiondata)
  return this;
};

/**
 * Pledge to the miners in the asset market or cancel the pledge
 * @param {string} AssetName  Asset Name
 * @param {string} minerAddress  Miner's operating address
 * @param {string} amount  amount of asset
 * @param {string} delegateType   Type of transaction pledge or cancellation pledge
 * @param {string} memo   memo
*/
function DamUserDelegatebyType (AssetName, minerAddress, amount, delegateType,memo) {
  var typeName = ''

  if(delegateType == 'delegate'){
    typeName = transaction.DigitalAssetDelegate;
  }else{
    typeName = transaction.DigitalAssetUndelegate;
  }

  var result = {
    type: typeName,  //DigitalAssetUndelegate
    assetName: AssetName,
    amount:amount,
    miner:minerAddress,
    memo: memo || ''
  };
  this.transactiondata = result;
  console.log(this.transactiondata)
  return this;
};

/**
 * Pre mining with assets
 * @param {string} asset  Asset name of the pre mined mine
 * @param {string} token  Amount of assets
 * @param {string} tokendenom   The name of the asset
 * @param {string} memo   memo
*/
function damAssetInvest( asset, token,tokendenom,memo) {

  var result; 
  result = {
    type: transaction.AssetInvest,
    asset:asset,
    memo: memo || '',
    token:token,
    tokendenom:tokendenom
  };

  this.transactiondata = result;
  console.log(this.transactiondata)
  return this;
};
