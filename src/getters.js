'use strict'
import fetch from './fetch.js'
/* eslint-env browser */
const hdkeyjs = require('@jswebfans/hdkeyjs')

const RETRIES = 4

export default function Getters (cosmosRESTURL) {
  // request and retry
  function get (path, tries = RETRIES) {
    while (tries) {
      try {
        console.log('get url')
        console.log(cosmosRESTURL + path)
        return fetch(cosmosRESTURL + path).then(res => res.json())
      } catch (err) {
        if (--tries === 0) {
          throw err
        }
      }
    }
  }

  function gettxt (path, tries = RETRIES) {
    while (tries) {
      try {
        console.log('get url gettxt')
        console.log(cosmosRESTURL + path)
        return fetch(cosmosRESTURL + path).then(res => res.text())
      } catch (err) {
        if (--tries === 0) {
          throw err
        }
      }
    }
  }

  return {
    url: cosmosRESTURL,

    // meta
    connected: function () {
      return this.nodeVersion().then(() => true, () => false)
    },

    nodeVersion: () => fetch(cosmosRESTURL + `/node_info`).then(res => res.json()),
    nodeSyncing: () => fetch(cosmosRESTURL + `/syncing`).then(res => res.json()),
    nodeBlocklatest: () => fetch(cosmosRESTURL + `/blocks/latest`).then(res => res.json()),

    // coins
    account: function (address) {
      const emptyAccount = {
        coins: [],
        sequence: `0`,
        account_number: `0`
      }

      return get(`/auth/accounts/${address}`)
        .then(res => {
          // HACK, hope for: https://github.com/cosmos/cosmos-sdk/issues/3885
          let account = res.value || emptyAccount
          if (res.type === `auth/DelayedVestingAccount`) {
            if (!account.BaseVestingAccount) {
              console.error(
                `SDK format of vesting accounts responses has changed`
              )
              return emptyAccount
            }
            account = Object.assign(
              {},
              account.BaseVestingAccount.BaseAccount,
              account.BaseVestingAccount
            )
            delete account.BaseAccount
            delete account.BaseVestingAccount
          }

          return account
        })
        .catch(err => {
          // if account not found, return null instead of throwing
          if (
            err.response &&
            (err.response.data.includes(`account bytes are empty`) ||
              err.response.data.includes(`failed to prove merkle proof`))
          ) {
            return emptyAccount
          }
          throw err
        })
    },
    txs: function (addr,height) {
      return Promise.all([
        this.bankTxs(addr,height)
      ]).then((txs) => [].concat(...txs))
    },
    bankTxs: function (addr,height) {
      return get(`/txs?address=${addr}&tx.gHeight=${height}&page=1000000&limit=100`)
    },
    txsByHeight: function (height) {
      return get(`/txs?tx.height=${height}`)
    },
    tx: hash => get(`/txs/${hash}`),
    assets: function (addr) {
      return Promise.all([
        get(`/txs?action=asset-pledge&address=${addr}&page=1000000`),
        get(`/txs?action=asset-drop&address=${addr}&page=1000000`),
        get(`/txs?action=createAsset&address=${addr}&page=1000000`),
        get(`/txs?action=mintAsset&address=${addr}&page=1000000`),
        get(`/txs?action=destroyAsset&address=${addr}&page=1000000`),
        get(`/txs?action=ruinAsset&address=${addr}&page=1000000`),
        get(`/txs?action=lockAsset&address=${addr}&page=1000000`),
        get(`/txs?action=unLockAsset&address=${addr}&page=1000000`)
      ]).then(([pledgeTxs, dropTxs, create, mint, destroy, ruin, lock, unLock]) => [].concat(pledgeTxs, dropTxs, create, mint, destroy, ruin, lock, unLock))
    },
    assetAll: hash => get(`/asset/all`),
    assetParameters: hash => get(`/asset/parameters`),

    /* ============ STAKE ============ */
    stakingTxs: async function (address, valAddress) {
      return Promise.all([
        get(
          `/txs?action=create_validator&destination-validator=${valAddress}&page=1000000`),
        get(
          `/txs?action=edit_validator&destination-validator=${valAddress}&page=1000000`),
        get(`/txs?action=delegate&delegator=${address}&page=1000000`),
        get(`/txs?action=begin_redelegate&delegator=${address}&page=1000000`),
        get(`/txs?action=begin_unbonding&delegator=${address}&page=1000000`),
        get(`/txs?action=unjail&source-validator=${valAddress}&page=1000000`)
      ]).then(([
        createValidatorTxs,
        editValidatorTxs,
        delegationTxs,
        redelegationTxs,
        undelegationTxs,
        unjailTxs
      ]) =>
        [].concat(
          createValidatorTxs,
          editValidatorTxs,
          delegationTxs,
          redelegationTxs,
          undelegationTxs,
          unjailTxs
        )
      )
    },
    // Get all delegations information from a delegator
    delegations: function (addr) {
      console.log(`/staking/delegators/${addr}/delegations`)
      return get(`/staking/delegators/${addr}/delegations`)
    },
    partnerDelegations: function (addr) {
      console.log(`/staking/delegators/${addr}/partner_delegations`)
      return get(`/staking/delegators/${addr}/partner_delegations`)
    },
    undelegations: function (addr) {
      return get(

        `/staking/delegators/${addr}/unbonding_delegations`,
        true
      )
    },
    partnerundelegations: function (addr) {
      return get(`/staking/delegators/${addr}/unbonding_partner_delegations`)
    },
    redelegations: function (addr) {
      return get(`/staking/redelegations?delegator=${addr}`)
    },
    // Query all validators that a delegator is bonded to
    delegatorValidators: function (delegatorAddr) {
      return get(`/staking/delegators/${delegatorAddr}/validators`)
    },
    // Get a list containing all the validator candidates
    validators: () => Promise.all([
      get(`/staking/validators?status=unbonding`),
      get(`/staking/validators?status=bonded`),
      get(`/staking/validators?status=unbonded`)
    ]).then((validatorGroups) =>
      [].concat(...validatorGroups)
    ),
    // Get information from a validator
    validator: function (addr) {
      return get(`/staking/validators/${addr}`)
    },
    partnervalidators: () => Promise.all([
      get(`/staking/partner_validators?status=unbonding`),
      get(`/staking/partner_validators?status=bonded`),
      get(`/staking/partner_validators?status=unbonded`)
    ]).then((validatorGroups) =>
      [].concat(...validatorGroups)
    ),
    // Get information from a validator
    partnervalidator: function (addr) {
      return get(`/staking/partner_validators/${addr}`)
    },

    // Get the list of the validators in the latest validator set
    validatorSet: () => get(`/validatorsets/latest`),

    // Query a delegation between a delegator and a validator
    delegation: function (delegatorAddr, validatorAddr) {
      return get(

        `/staking/delegators/${delegatorAddr}/delegations/${validatorAddr}`,
        true
      )
    },
    unbondingDelegation: function (delegatorAddr, validatorAddr) {
      return get(

        `/staking/delegators/${delegatorAddr}/unbonding_delegations/${validatorAddr}`,
        true
      )
    },
    pool: () => get(`/staking/pool`),
    stakingParameters: () => get(`/staking/parameters`),

    /* ============ Slashing ============ */

    validatorSigningInfo: function (pubKey) {
      return get(`/slashing/validators/${pubKey}/signing_info`)
    },

    /* ============ Governance ============ */

    proposals: () => get(`/gov/proposals`),
    proposal: function (proposalId) {
      return get(`/gov/proposals/${proposalId}`)
    },
    proposalVotes: function (proposalId) {
      return get(`/gov/proposals/${proposalId}/votes`)
    },
    proposalVote: function (proposalId, address) {
      return get(`/gov/proposals/${proposalId}/votes/${address}`)
    },
    proposalDeposits: function (proposalId) {
      return get(`/gov/proposals/${proposalId}/deposits`)
    },
    proposalDeposit: function (proposalId, address) {
      return get(

        `/gov/proposals/${proposalId}/deposits/${address}`,
        true
      )
    },
    proposalTally: function (proposalId) {
      return get(`/gov/proposals/${proposalId}/tally`)
    },
    govDepositParameters: () => get(`/gov/parameters/deposit`),
    govTallyingParameters: () => get(`/gov/parameters/tallying`),
    govVotingParameters: () => get(`/gov/parameters/voting`),
    governanceTxs: async function (address) {
      return Promise.all([
        get(`/txs?action=submit_proposal&proposer=${address}&page=1000000`),
        get(`/txs?action=deposit&depositor=${address}&page=1000000`),
        get(`/txs?action=vote&voter=${address}&page=1000000`)
      ]).then(([submitProposalTxs, depositTxs, voteTxs]) =>
        [].concat(submitProposalTxs, depositTxs, voteTxs)
      )
    },
    /* ============ Explorer ============ */
    block: function (blockHeight) {
      return get(`/blocks/${blockHeight}`)
    },
    /* ============ Distribution ============ */
    distributionTxs: async function (address, valAddress) {
      var lambdaDevelopAdresss = hdkeyjs.address.validatorAddress(address)
      var url = `/txs?action=withdraw_validator_rewards_all&source-validator=${lambdaDevelopAdresss}&page=1000000`
      // `/txs?action=withdraw_validator_rewards_all&page=1000000`
      return Promise.all([
        get(`/txs?action=set_withdraw_address&delegator=${address}&page=1000000`),
        get(`/txs?action=withdraw_delegator_reward&delegator=${address}&page=1000000`),
        get(url)
      ]).then(([
        updateWithdrawAddressTxs,
        withdrawDelegationRewardsTxs,
        withdrawValidatorCommissionTxs
      ]) =>
        [].concat(
          updateWithdrawAddressTxs,
          withdrawDelegationRewardsTxs,
          withdrawValidatorCommissionTxs
        )
      )
    },
    delegatorRewards: function (delegatorAddr) {
      return get(`/distribution/delegators/${delegatorAddr}/rewards`)
    },
    delegatorRewardsFromValidator: function (delegatorAddr, validatorAddr) {
      return get(

        `/distribution/delegators/${delegatorAddr}/rewards/${validatorAddr}`
      )
    },
    validatorDistributionInformation: function (validatorAddr) {
      return get(`/distribution/validators/${validatorAddr}`)
    },
    validatorRewards: function (validatorAddr) {
      return get(`/distribution/validators/${validatorAddr}/rewards`)
    },
    MinerRewards: function (Addr) {
      var MinerAddress = hdkeyjs.address.MinerAddress(Addr)
      return get(`/distribution/miners/${MinerAddress}`)
    },
    distributionParameters: function () {
      return get(`/distribution/parameters`)
    },
    distributionOutstandingRewards: function () {
      return get(`/distribution/outstanding_rewards`)
    },
    /* ------市场相关--------- */
    marketlist: function () {
      return get(`/market/markets`)
    },
    marketinfo: function (name) {
      return get(`/market/params`)
    },
    marketOrderslist: function (marketName, orderType, statusType, page, limit) {
      return get(`/market/sellorders/${marketName}/${orderType}/${statusType}/${page}/${limit}`)
    },
    marketminermachines: function (address, page, limit) {
      return get(`/market/miner/machines/${address}/${page}/${limit}`)
    },
    marketSellOrderslist: function (address, page, limit) {
      return get(`/market/miner/sellorders/${address}/${page}/${limit}`)
    },
    marketUserOrderslist: function (address, page, limit) {
      return get(`/market/matchorders/${address}/${page}/${limit}`)
    },
    marketOrderinfo: function (Orderid) {
      return get(`/market/matchorder/${Orderid}`)
    },
    marketmachineinfo: function (address, machineName) {
      return get(`/market/machine/${address}/${machineName}`)
    },
    marketsellorderinfo:function(Orderid){
      return get(`/market/sellorder/${Orderid}`)
    },
    marketdelegationinfo:function(marketName,address){
      return get(`/market/delegation/${marketName}/${address}`)
    },
    marketTxs: async function (address) {
      return Promise.all([
        get(`/txs?action=createMiner&address=${address}&page=1000000`),
        get(`/txs?action=createMachine&address=${address}&page=1000000`),
        get(`/txs?action=editMachine&address=${address}&page=1000000`),
        get(`/txs?action=minerWithdraw&address=${address}&page=1000000`),
        get(`/txs?action=createMarket&address=${address}&page=1000000`),
        get(`/txs?action=editMarket&address=${address}&page=1000000`),
        get(`/txs?action=withdrawMarket&address=${address}&page=1000000`),
        get(`/txs?action=createSellOrder&address=${address}&page=1000000`),
        get(`/txs?action=cancelOrder&address=${address}&page=1000000`),
        get(`/txs?action=createBuyOrder&address=${address}&page=1000000`),
        get(`/txs?action=minerWithdrawMachine&address=${address}&page=1000000`)

      ]).then((datalist) =>
        [].concat(...datalist)
      )
    },
    /***minting***/
    mintingAnnualprovisions: function () {
      return gettxt(`/minting/annual-provisions`)
    },
    /**dam***********/
    dammarketlist: function () {
      return get(`/dam/markets`)
    },
    damminerinfo: function (address) {
      return get(`/dam/miner/${address}`)
    },
    damparams: function () {
      return get(`/dam/params`)
    },
    dam_delegations: function (address) {
      return get(`/dam/delegator/${address}/delegations`)
    },
    damrefunding_records: function (address) {
      return get(`/dam/delegator/${address}/refunding_delegations`)
    },
    dam_pledgerecords: function (minerAddr) {
      return get(`/dam/miner/${minerAddr}/pledge_records`)
    },
    dammatchorders: function (address,page,limit) {
      return get(`/dam/match_orders/${address}/${page}/${limit}`)
    },
    damassetmatchorders: function (asset,address,page,limit) {
      return get(`/dam/match_orders/${asset}/${address}/${page}/${limit}`)
    },
    damauthorized_users: function (asset,page,limit) {
      return get(`/dam/market/authorized_users/${asset}/${page}/${limit}`)
    },
    damorderinfo: function (orderID) {
      return get(`/dam/match_order/${orderID}`)
    },
   
    marketMinerInfo: function (address) {
      return get(`/market/miner/minerinfo/${address}`)
    },
    pdpStoragepower: function (address) {
      var MinerAddress = hdkeyjs.address.MinerAddress(address)
      return get(`/pdp/storagepower/${MinerAddress}`)
    },


    damUserDelegatorRewards:function(address){
      return get(`/distribution/asset/${address}/rewards`)
    },
    damassetinfo:function(name){
      return get(`/asset/symbol/${name}`)
    },
    damassetfund:function(name){
      return get(`/asset/fund/${name}`)
    },
    damUserassetfund:function(symbol,address){
      return get(`/asset/fund_info/${symbol}/funder/${address}`)
    },
    damassetmintsimulate: function ({assetName,
      assetiniti,total_supply,inflation,
      adjust_rate,adjust_period,max_adjust_count,
      genesis_height}
      ) {
      var  list=['/asset/mint/simulate?',
      `asset=${assetiniti}${assetName}`,
      `total_supply=${total_supply}`,
      `inflation=${inflation}`,
      `adjust_rate=${adjust_rate}`,
      `adjust_period=${adjust_period}`,
      `max_adjust_count=${max_adjust_count}`,
      `genesis_height=${genesis_height}`
      ]

      return get(list.join('&'))
    },
    damfileSend: function (address,page=1,limit=10) {
      return get(`/txs?action=transferOwnership&sender=${address}&page=${page}&limit=${limit}`)
    },
    damfileReceiver: function (address,page=1,limit=10) {
      return get(`/txs?action=transferOwnership&receiver=${address}&page=${page}&limit=${limit}`)
    },
    /*
    loan
    */
   loanParams(){
      return get(`/pool/params`)
   },
   loanmarkets(){
      return get(`/pool/markets`)
   },
   loansupplierreward(address,islatest_reward){
     //latest_reward is bool
      return get(`/pool/supplier/${address}/${islatest_reward}`)
   },
   loanloanee(address){
    return get(`/pool/loanee/${address}`)
   },
   loanmatch_order_info(order_id){
    return get(`/pool/match_order/${order_id}`)
   },
   loanmatch_match_orders(address,page,limit){
    return get(`/pool/match_orders/${address}/${page}/${limit}`)
   }


  }
}
