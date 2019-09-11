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

export function MsgRedelegate (
  senderAddress,
  {
    validatorSourceAddress,
    validatorDestinationAddress,
    amount,
    denom
  }
) {
  return {
    type: `cosmos-sdk/MsgBeginRedelegate`,
    value: {
      delegator_address: senderAddress,
      validator_src_address: validatorSourceAddress,
      validator_dst_address: validatorDestinationAddress,
      amount: Coin({ amount, denom })
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
      voter: senderAddress,
      proposal_id: proposalId,
      option
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
      depositor: senderAddress,
      proposal_id: proposalId,
      amount: amounts.map(Coin)
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
  }){
    return {
      type: `cosmos-sdk/MsgWithdrawValidatorCommission`,
      value: {
        validator_address:validatorAddress
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
  'MsgRedelegate': MsgRedelegate,
  'MsgSubmitProposal': MsgSubmitProposal,
  'MsgVote': MsgVote,
  'MsgDeposit': MsgDeposit,
  'MsgWithdrawDelegationReward': MsgWithdrawDelegationReward,
  'MsgAssetPledge': MsgAssetPledge,
  'MsgAssetDrop': MsgAssetDrop,
  'MsgWithdrawValidatorCommission': MsgWithdrawValidatorCommission
}
