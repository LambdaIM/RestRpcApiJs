/* eslint-env browser */

import fetch from './fetch.js'
import log from './log.js'

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
    'lambda/MsgBeginRedelegate': () => `/staking/delegators/${senderAddress}/redelegations`,
    'cosmos-sdk/MsgSubmitProposal': () => `/gov/proposals`,
    'cosmos-sdk/MsgVote': () => `/gov/proposals/${msg.value.proposal_id}/votes`,
    'cosmos-sdk/MsgDeposit': () => `/gov/proposals/${msg.value.proposal_id}/deposits`,
    'cosmos-sdk/MsgWithdrawDelegationReward': () => `/distribution/delegators/${senderAddress}/rewards`,
    'lambda/MsgAssetPledge': () => `/asset/pledge`,
    'lambda/MsgAssetDrop': () => `/asset/drop`,
    'cosmos-sdk/MsgWithdrawValidatorCommission': () => `/distribution/delegators/${senderAddress}/rewards`,
    'lambda/MsgCreateSellOrder': () => `/market/sellorder/create`,
    'lambda/MsgCreateBuyOrder': () => `/market/buyorder/create`,
    'lambda/MsgCreateMiner': () => `/market/miner/create`,
    'lambda/MsgOrderRenewal':()=> `/market/buyorder/renewal`,
    'lambda/MsgWithdrawMinerRewards': () => `/distribution/miners/${msg.value.miner_address}/rewards`,
    'lambda/MsgMinerWithDrawCount':()=> `/market/miner/withdrawCount`,
    'lambda/MsgDelegateMarket':()=> `/market/delegate`,
    'lambda/MsgWithDrawMarket':()=> `/market/withdraw`,
    'lambda/MsgCancelSellOrder':()=> `/market/sellorder/cancel`,
    'lambda/MsgCreateAsset': () => `/asset/create`,
    'lambda/MsgCreateDigitalAssetMarket': () => `/dam/market/create`,
    'lambda/MsgDigitalAssetPledge': () => `/dam/asset/pledge`,
    'lambda/MsgDigitalAssetRefund': () => `/dam/asset/refund`,
    'lambda/MsgAuthorizeUser': () => `/dam/market/authorize_user`,
    'lambda/MsgDismissDigitalAssetMarket': () => `/dam/market/dismiss`,
    'lambda/MsgDeactivateMiner':()=>`/dam/miner/deactivate`,
    'lambda/MsgActivateMiner':()=>`/dam/miner/activate`,
    'lambda/MsgDamCreateBuyOrder':()=>`/dam/user/buy`,
    'lambda/MsgDamOrderRenewal':()=>`/dam/user/renew`,
    'lambda/MsgDamMinerWithDrawCount':()=>`/dam/miner/withdraw_count`,
    'lambda/MsgDigitalAssetDelegate':()=>`/dam/user/delegate`,
    'lambda/MsgDigitalAssetUndelegate':()=>`/dam/user/undelegate`,
    'lambda/MsgAssetInvest':()=>`/asset/invest`
    
  }[type]()
  const url = `${cosmosRESTURL}${path}`

  const tx = createRESTPOSTObject(senderAddress, chainId, { sequence, accountNumber, memo }, msg)
  log('gas_estimategas_estimate start')
  log(url)
  log(JSON.stringify(tx))
  const result = await fetch(url, { method: `POST`, body: JSON.stringify(tx) }).then(res => res.json())
  var { gas_estimate: gasEstimate } = result
  console.log('gas_estimategas_estimate', gasEstimate, result)
  
  log(result)
  log(gasEstimate)
  if(result.error!=undefined){
    throw new Error(result.error)
  }
  console.log(JSON.stringify(tx))
  log('gas_estimategas_estimate end')
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
