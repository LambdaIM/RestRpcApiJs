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


export function MsgOrderRenewal (
  senderAddress,
  {
    duration,
    orderId
  }
) {
  return {
    type: `lambda/MsgOrderRenewal`,
    value: {
      address: senderAddress,
      duration,
      orderId
    }
  }
}



export function MsgMinerWithDrawCount (
  senderAddress,
  {
    page,
    limit
  }
) {
  return {
    type: `lambda/MsgMinerWithDrawCount`,
    value: {
      address: senderAddress,
      limit,
      page
      
    }
  }
}


export function MsgDelegateMarket (
  senderAddress,
  {
    marketName,
    amount,
    denom
  }
) {
  return {
    type: `lambda/MsgDelegateMarket`,
    value: {
      address: senderAddress,
      amount: Coin({ amount, denom }),
      marketName
      
    }
  }
}

export function MsgWithDrawMarket (
  senderAddress,
  {
    marketName
  }
) {
  return {
    type: `lambda/MsgWithDrawMarket`,
    value: {
      address: senderAddress,
      marketName
      
    }
  }
}

export function MsgCancelSellOrder (
  senderAddress,
  {
    orderId
  }
) {
  return {
    type: `lambda/MsgCancelSellOrder`,
    value: {
      address: senderAddress,
      orderId: orderId
      
    }
  }
}



export function MsgCreateDigitalAssetMarket (
  senderAddress,
  {
    orderId,
    AssetName,
    Ratio
  }
) {
  return {
    type: `lambda/MsgCreateDigitalAssetMarket`,
    value: {
      address: senderAddress,
      AssetName: AssetName,
      Ratio: Ratio
    }
  }
}


export function MsgDigitalAssetPledge (
  senderAddress,
  {
    orderId,
    AssetName,
    Amount
  }
) {
  return {
    type: `lambda/MsgDigitalAssetPledge`,
    value: {
      address: senderAddress,
      AssetName: AssetName,
      Amount: Amount
    }
  }
}

export function MsgDigitalAssetRefund  (
  senderAddress,
  {
    AssetName
  
  }
) {
  return {
    type: `lambda/MsgDigitalAssetRefund`,
    value: {
      address: senderAddress,
      AssetName: AssetName
      
    }
  }
}

export function MsgAuthorizeMiningPubKey  (
  senderAddress,
  {
    PubKey
    
  }
) {
  return {
    type: `lambda/MsgAuthorizeMiningPubKey`,
    value: {
      address: senderAddress,
      PubKey: PubKey
      
    }
  }
}


export function MsgCreateAsset  (
  senderAddress,
  {
    asset_amount,
    asset_denom,
    token_amount,
    token_denom,
    name,
    mint_type,
    inflation,
    total_supply,
    adjust_rate,
    adjust_period,
    max_adjust_count,
    genesis_height
  }
) {
  return {
    type: `lambda/MsgCreateAsset`,
    value: {
      address: senderAddress,
      asset: Coin({ asset_amount, asset_denom }),
      token: Coin({ token_amount, token_denom }),
      name:name,
      mint_type:mint_type,
      inflation:inflation,
      total_supply,
      adjust_rate,
      adjust_period,
      max_adjust_count,
      genesis_height
      
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
  'MsgOrderRenewal':MsgOrderRenewal,
  'MsgMinerWithDrawCount':MsgMinerWithDrawCount,
  'MsgDelegateMarket':MsgDelegateMarket,
  'MsgWithDrawMarket':MsgWithDrawMarket,
  'MsgCancelSellOrder':MsgCancelSellOrder,
  'MsgCreateDigitalAssetMarket':MsgCreateDigitalAssetMarket,
  'MsgDigitalAssetPledge':MsgDigitalAssetPledge,
  'MsgDigitalAssetRefund': MsgDigitalAssetRefund,
  'MsgAuthorizeMiningPubKey' : MsgAuthorizeMiningPubKey,
  'MsgCreateAsset':MsgCreateAsset
}
