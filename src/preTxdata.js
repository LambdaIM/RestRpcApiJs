import transaction from './transactionTypes.js'
const hdkey = require('@jswebfans/hdkeyjs')
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

function msgDelegation(to, amount, gas, isdege, validatorType) {
  var result;
  if (isdege) {
    // 质押
    result= {
      type: transaction.DELEGATE,
      validatorAddress: to,
      amount: amount,
      denom: 'utbb',
      validatortype: validatorType
    };
  } else {
    // 取消质押
    result= {
      type: transaction.UNDELEGATE,
      validatorAddress: to,
      amount: amount,
      denom: 'utbb',
      validatortype: validatorType
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
    validatortype: validatortype,
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
    var result;
    result = {
    type: transaction.CreateSellOrder,
    marketName,
    price,
    rate,
    sellSize,
    memo: description || '',
    cancelTimeDuration,
    minBuySize,
    minBuyDuration,
    maxBuyDuration
  };
  this.transactiondata=result;
  return this;
};

function msgCreateBuyOrder(duration,
  size,
  sellOrderId,
  marketName) {
    var result;
    result = {
    type: transaction.CreateBuyOrder,
    duration,
    size,
    sellOrderId,
    marketName
  };
  this.transactiondata=result;
  return this;
}

function msgCreateMiner(miningAddress, dhtId, pubKey) {
  var result;
  result = {
    type: transaction.CreateMiner,
    miningAddress,
    dhtId,
    pubKey
  };
  this.transactiondata=result;
  return this;
}

function msgWithdrawValidatorCommission(address, amount, gas, isdege) {
  console.log('TransferwithdrawalDistribution')
  var lambdaDevelopAdresss = hdkey.address.validatorAddress(address);

  var result;
  result = {
    type: transaction.WithdrawValidatorCommission,
    amount: amount,
    denom: defaultdenom,
    validatorAddress: lambdaDevelopAdresss
  };
  this.transactiondata=result;
  return this;
}
function msgAssetPledge(amount, asset, gas, isdege) {
  var result;
  if (isdege) {
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
  } else {
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
  }
  this.transactiondata=result;
  return this;
}

function msgWithdrawal(to, amount, gas, isdege) {
  var result;
  result = {
    type: transaction.WITHDRAW,
    amount: amount,
    denom: defaultdenom
  };
  this.transactiondata=result;
  return this;
}

function msgMinerwithdrawal(address, amount, gas, isdege) {
  var result;
  result =  {
    type: transaction.WithdrawMinerRewards,
    minerAddress: hdkeyjs.address.MinerAddress(address)
  }
  this.transactiondata=result;
  return this;
}
