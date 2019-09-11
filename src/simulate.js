/* eslint-env browser */

import fetch from './fetch.js'
const GAS_ADJUSTMENT = 1.5
export default async function simulate (
  cosmosRESTURL,
  senderAddress,
  chainId,
  msg,
  memo,
  sequence,
  accountNumber
) {
  const type = msg.type
  const path = {
    'cosmos-sdk/MsgSend': () => `/bank/accounts/${senderAddress}/transfers`,
    'lambda/MsgDelegate': () => `/staking/delegators/${senderAddress}/delegations`,
    'lambda/MsgUndelegate': () => `/staking/delegators/${senderAddress}/unbonding_delegations`,
    'cosmos-sdk/MsgBeginRedelegate': () => `/staking/delegators/${senderAddress}/redelegations`,
    'cosmos-sdk/MsgSubmitProposal': () => `/gov/proposals`,
    'cosmos-sdk/MsgVote': () => `/gov/proposals/${msg.value.proposal_id}/votes`,
    'cosmos-sdk/MsgDeposit': () => `/gov/proposals/${msg.value.proposal_id}/deposits`,
    'cosmos-sdk/MsgWithdrawDelegationReward': () => `/distribution/delegators/${senderAddress}/rewards`,
    'lambda/MsgAssetPledge': () => `/asset/pledge`,
    'lambda/MsgAssetDrop': () => `/asset/drop`,
    'cosmos-sdk/MsgWithdrawValidatorCommission': () => `/distribution/delegators/${senderAddress}/rewards`
  }[type]()
  const url = `${cosmosRESTURL}${path}`

  const tx = createRESTPOSTObject(senderAddress, chainId, { sequence, accountNumber, memo }, msg)

  const result = await fetch(url, { method: `POST`, body: JSON.stringify(tx) }).then(res => res.json())
  var { gas_estimate: gasEstimate } = result
  console.log('gas_estimategas_estimate', gasEstimate, result)
  console.log(JSON.stringify(tx))
  return Math.round(gasEstimate * GAS_ADJUSTMENT)
}

// attaches the request meta data to the message
function createRESTPOSTObject (senderAddress, chainId, { sequence, accountNumber, memo }, msg) {
  const requestMetaData = {
    sequence,
    from: senderAddress,
    account_number: accountNumber,
    chain_id: chainId,
    simulate: true,
    memo
  }

  return { base_req: requestMetaData, ...msg.value }
}
