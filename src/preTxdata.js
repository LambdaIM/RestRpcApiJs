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
  msgMinerwithdrawal
}

const defaultdenom = 'ulamb';

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

function msgWithdrawal() {
  var result;
  result = {
    type: transaction.WITHDRAW,
  };
  this.transactiondata=result;
  return this;
}

function msgMinerwithdrawal(address) {
  var result;
  result =  {
    type: transaction.WithdrawMinerRewards,
    minerAddress: hdkey.address.MinerAddress(address)
  }
  this.transactiondata=result;
  return this;
}
