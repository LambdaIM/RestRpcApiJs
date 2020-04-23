// Bank
export function MsgSend (
  senderAddress,
  {
    toAddress,
    amounts // [{ denom, amount}]
  }
) {
  return {
    type: `cosmos-sdk/MsgSend`,
    value: {
      amount: amounts.map(Coin),
      from_address: senderAddress,
      to_address: toAddress
    }
  }
}

// Staking
export function MsgDelegate (
  senderAddress,
  {
    validatorAddress,
    amount,
    denom,
    validatortype
  }
) {
  return {
    type: `lambda/MsgDelegate`,
    value: {
      amount: Coin({ amount, denom }),
      delegator_address: senderAddress,
      validator_address: validatorAddress,
      validator_type: validatortype

    }
  }
}

export function MsgUndelegate (
  senderAddress,
  {
    validatorAddress,
    amount,
    denom,
    validatortype
  }
) {
  return {
    type: `lambda/MsgUndelegate`,
    value: {
      amount: Coin({ amount, denom }),
      delegator_address: senderAddress,
      validator_address: validatorAddress,
      validator_type: validatortype
    }
  }
}

export function MsgBeginRedelegate (
  senderAddress,
  {
    validatorSourceAddress,
    validatorDestinationAddress,
    amount,
    denom,
    validatortype
  }
) {
  return {
    type: `lambda/MsgBeginRedelegate`,
    value: {
      amount: Coin({ amount, denom }),
      delegator_address: senderAddress,
      validator_dst_address: validatorDestinationAddress,
      validator_src_address: validatorSourceAddress,
      validator_type: validatortype
    }
  }
}

// Governance

export function MsgSubmitProposal (
  senderAddress,
  {
    proposalType,
    title,
    description,
    initialDeposits // [{ denom, amount }]
  }
) {
  return {
    type: `cosmos-sdk/MsgSubmitProposal`,
    value: {
      proposer: senderAddress,
      proposal_type: proposalType,
      title,
      description,
      initial_deposit: initialDeposits.map(Coin)
    }
  }
}

export function MsgVote (
  senderAddress,
  {
    proposalId,
    option
  }
) {
  return {
    type: `cosmos-sdk/MsgVote`,
    value: {
      option,
      proposal_id: proposalId,
      voter: senderAddress

    }
  }
}

export function MsgDeposit (
  senderAddress,
  {
    proposalId,
    amounts // [{ denom, amount }]
  }
) {
  return {
    type: `cosmos-sdk/MsgDeposit`,
    value: {
      amount: amounts.map(Coin),
      depositor: senderAddress,
      proposal_id: proposalId

    }
  }
}

export function MsgWithdrawDelegationReward (
  senderAddress,
  {
    validatorAddress
  }
) {
  return {
    type: `cosmos-sdk/MsgWithdrawDelegationReward`,
    value: {
      delegator_address: senderAddress,
      validator_address: validatorAddress
    }
  }
}

export function MsgWithdrawValidatorCommission (
  senderAddress,
  {
    validatorAddress
  }) {
  return {
    type: `cosmos-sdk/MsgWithdrawValidatorCommission`,
    value: {
      validator_address: validatorAddress
    }
  }
}

export function MsgAssetPledge (
  senderAddress,
  {
    amounts, // [{ denom, amount }]
    asset
  }
) {
  return {
    type: `lambda/MsgAssetPledge`,
    value: {
      address: senderAddress,
      asset: Coin(asset),
      token: Coin(amounts)
    }
  }
}

export function MsgAssetDrop (
  senderAddress,
  {
    amounts, // [{ denom, amount }]
    asset
  }
) {
  return {
    type: `lambda/MsgAssetDrop`,
    value: {
      address: senderAddress,
      asset: Coin(asset),
      token: Coin(amounts)
    }
  }
}

export function MsgCreateSellOrder (
  senderAddress,
  {
    marketName,
    price,
    rate,
    sellSize,
    cancelTimeDuration,
    minBuySize,
    minBuyDuration,
    maxBuyDuration
  }
) {
  return {
    type: `lambda/MsgCreateSellOrder`,
    value: {
      address: senderAddress,
      cancelTimeDuration,
      marketName,
      maxBuyDuration,
      minBuyDuration,
      minBuySize,
      price,
      rate,
      sellSize

    }
  }
}

export function MsgCreateBuyOrder (
  senderAddress,
  {
    duration,
    size,
    sellOrderId,
    marketName
  }
) {
  return {
    type: `lambda/MsgCreateBuyOrder`,
    value: {
      address: senderAddress,
      duration,
      marketName,
      sellOrderId: sellOrderId,
      size
    }
  }
}


export function MsgCreateMiner (
  senderAddress,
  {
    miningAddress,
    dhtId
  }
) {
  return {
    type: `lambda/MsgCreateMiner`,
    value: {
      address: senderAddress,
      dhtId,
      miningAddress
    }
  }
}

export function MsgWithdrawMinerRewards (
  senderAddress,
  {
    minerAddress
  }) {
  return {
    type: `lambda/MsgWithdrawMinerRewards`,
    value: {
      miner_address: minerAddress
    }
  }
}

export function MsgCreateMachine (
  senderAddress,
  {
    name,
    peerId,
    dhtId,
    pubKey
  }
) {
  return {
    type: `lambda/MsgCreateMachine`,
    value: {
      address: senderAddress,
      dhtId,
      name,
      peerId,
      pubKey
    }
  }
}


export function MsgCreateMarket (
  senderAddress,
  {
    name,
    address,
    profit,
    feeRate,
    commissionRate
  }
) {
  return {
    type: `lambda/MsgCreateMarket`,
    value: {
      address: senderAddress,
      commissionRate,
      feeRate,
      name,
      profit
    }
  }
}

export function MsgEditMarket (
  senderAddress,
  {
    address,
    profit,
    feeRate,
    commissionRate
  }
) {
  return {
    type: `lambda/MsgEditMarket`,
    value: {
      address: senderAddress,
      commissionRate,
      feeRate,
      profit
    }
  }
}

export function MsgWithDrawMarket (
  senderAddress,
  {
    address,
    profit,
    feeRate,
    commissionRate
  }
) {
  return {
    type: `lambda/MsgWithDrawMarket`,
    value: {
      address: senderAddress
    }
  }
}

export function MsgCancelSellOrder (
  senderAddress,
  {
    address,
    orderId
  }
) {
  return {
    type: `lambda/MsgCancelSellOrder`,
    value: {
      address: senderAddress,
      orderId:orderId
    }
  }
}

export function MsgMinerWithDraw (
  senderAddress,
  {
    address,
    matchOrderId
  }
) {
  return {
    type: `lambda/MsgMinerWithDraw`,
    value: {
      address: senderAddress,
      matchOrderId:matchOrderId
    }
  }
}


export function MsgMaintain (
  senderAddress,
  {
    address
  }
) {
  return {
    type: `lambda/MsgMaintain`,
    value: {
      address: senderAddress,
      
    }
  }
}



export function MsgUnMaintain (
  senderAddress,
  {
    address
  }
) {
  return {
    type: `lambda/MsgUnMaintain`,
    value: {
      address: senderAddress,
      
    }
  }
}


export function MsgUnjailMiner (
  senderAddress,
  {
    address
  }
) {
  return {
    type: `lambda/MsgUnjailMiner`,
    value: {
      address: senderAddress,
      
    }
  }
}



function Coin ({ amount, denom }) {
  return ({
    amount: String(amount),
    denom

  })
}

export default {
  'MsgSend': MsgSend,
  'MsgDelegate': MsgDelegate,
  'MsgUndelegate': MsgUndelegate,
  'MsgBeginRedelegate': MsgBeginRedelegate,
  'MsgSubmitProposal': MsgSubmitProposal,
  'MsgVote': MsgVote,
  'MsgDeposit': MsgDeposit,
  'MsgWithdrawDelegationReward': MsgWithdrawDelegationReward,
  'MsgAssetPledge': MsgAssetPledge,
  'MsgAssetDrop': MsgAssetDrop,
  'MsgWithdrawValidatorCommission': MsgWithdrawValidatorCommission,
  'MsgCreateSellOrder': MsgCreateSellOrder,
  'MsgCreateBuyOrder': MsgCreateBuyOrder,
  'MsgCreateMiner': MsgCreateMiner,
  'MsgCreateMachine': MsgCreateMachine,
  'MsgWithdrawMinerRewards': MsgWithdrawMinerRewards,
  'MsgCreateMarket':MsgCreateMarket,
  'MsgEditMarket':MsgEditMarket,
  'MsgWithDrawMarket':MsgWithDrawMarket,
  'MsgCancelSellOrder':MsgCancelSellOrder,
  'MsgMinerWithDraw':MsgMinerWithDraw,
  'MsgMaintain':MsgMaintain,
  'MsgUnMaintain':MsgUnMaintain,
  'MsgUnjailMiner':MsgUnjailMiner
  
}
