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
  this.laststep=result;
  return this;
}

function msgDelegation(to, amount, gas, isdege, validatorType) {
  if (isdege) {
    // 质押
    return {
      type: transaction.DELEGATE,
      validatorAddress: to,
      amount: amount,
      denom: 'utbb',
      validatortype: validatorType
    };
  } else {
    // 取消质押
    return {
      type: transaction.UNDELEGATE,
      validatorAddress: to,
      amount: amount,
      denom: 'utbb',
      validatortype: validatorType
    };
  }
}


function msgRedelegate(validatorSourceAddress, validatorDestinationAddress, amount, validatortype) {
  return {
    type: transaction.REDELEGATE,
    validatorSourceAddress,
    validatorDestinationAddress,
    amount: amount,
    validatortype: validatortype,
    denom: 'utbb'
  };
}

function msgDeposit(ProposalID, amount) {

  return {
    type: transaction.DEPOSIT,
    proposalId: ProposalID,
    amounts: [{ amount: amount, denom: defaultdenom }]
  };
}

function msgVote(ProposalID, option) {
  return {
    type: transaction.VOTE,
    proposalId: ProposalID,
    option: option
  };
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
  return {
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
};

function msgCreateBuyOrder(duration,
  size,
  sellOrderId,
  marketName) {
  return {
    type: transaction.CreateBuyOrder,
    duration,
    size,
    sellOrderId,
    marketName
  };
}

function msgCreateMiner(miningAddress, dhtId, pubKey) {
  return {
    type: transaction.CreateMiner,
    miningAddress,
    dhtId,
    pubKey
  };
}

function msgWithdrawValidatorCommission(address, amount, gas, isdege) {
  console.log('TransferwithdrawalDistribution')
  var lambdaDevelopAdresss = hdkey.address.validatorAddress(address);

  return {
    type: transaction.WithdrawValidatorCommission,
    amount: amount,
    denom: defaultdenom,
    validatorAddress: lambdaDevelopAdresss
  };
}
function msgAssetPledge(amount, asset, gas, isdege) {
  if (isdege) {
    return {
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
    return {
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
}

function msgWithdrawal(to, amount, gas, isdege) {
  return {
    type: transaction.WITHDRAW,
    amount: amount,
    denom: defaultdenom
  };
}

function msgMinerwithdrawal(address, amount, gas, isdege) {
  return {
    type: transaction.WithdrawMinerRewards,
    minerAddress: hdkeyjs.address.MinerAddress(address)
  }
}
