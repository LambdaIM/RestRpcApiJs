import transaction from './transactionTypes.js'
const hdkey = require('@jswebfans/hdkeyjs')


const defaultdenom = 'ulamb'

const msgSend = function (to, amount, denom, memo) {
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
  return result;
}

const msgDelegation = function (to, amount, gas, isdege, validatorType) {
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


  const msgRedelegate = function (validatorSourceAddress, validatorDestinationAddress, amount, validatortype) {
    return {
      type: transaction.REDELEGATE,
      validatorSourceAddress,
      validatorDestinationAddress,
      amount: amount,
      validatortype: validatortype,
      denom: 'utbb'
    };
  };

  const msgDeposit = function (ProposalID, amount) {

    return {
      type: transaction.DEPOSIT,
      proposalId: ProposalID,
      amounts: [{ amount: amount, denom: defaultdenom }]
    };
  }

  const msgVote = function (ProposalID, option) {
    return {
      type: transaction.VOTE,
      proposalId: ProposalID,
      option: option
    };
  }

  const msgCreateSellOrder = function (marketName,
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

  const msgCreateBuyOrder = function (duration,
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

  const msgCreateMiner = function (miningAddress, dhtId, pubKey) {
    return {
      type: transaction.CreateMiner,
      miningAddress,
      dhtId,
      pubKey
    };
  }

  const msgWithdrawValidatorCommission = function (address, amount, gas, isdege) {
    console.log('TransferwithdrawalDistribution')
    var lambdaDevelopAdresss = hdkey.address.validatorAddress(address);

    return {
      type: transaction.WithdrawValidatorCommission,
      amount: amount,
      denom: defaultdenom,
      validatorAddress: lambdaDevelopAdresss
    };
  }
  const msgAssetPledge = function (amount, asset, gas, isdege) {
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

  const msgWithdrawal =  function (to, amount, gas, isdege) {
    return {
      type: transaction.WITHDRAW,
      amount: amount,
      denom: defaultdenom
    };
  }

  const  msgMinerwithdrawal = function (address, amount, gas, isdege) {
    return {
      type: transaction.WithdrawMinerRewards,
      minerAddress:hdkeyjs.address.MinerAddress(address)
    };
  }




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
