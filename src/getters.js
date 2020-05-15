'use strict'
import fetch from './fetch.js'
/* eslint-env browser */
const hdkeyjs = require('@jswebfans/hdkeytest')

const RETRIES = 4

export default function Getters (cosmosRESTURL) {
  // request and retry
  console.log('cosmosRESTURL',cosmosRESTURL)
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
  
/**
 * @module get
 * @description More about blockchain interface information http://docs.lambda.im/api-reference/paths/
 * 
 */
  return {
    url: cosmosRESTURL,

    /**
     * Link to node or not
     * @static
     */
    connected: function () {
      return this.nodeVersion().then(() => true, () => false)
    },
    /**
     *  Node information
     *@static
     */
    nodeVersion: () => fetch(cosmosRESTURL + `/node_info`).then(res => res.json()),
    /**
     * Node synchronization information
     * @static
     */
    nodeSyncing: () => fetch(cosmosRESTURL + `/syncing`).then(res => res.json()),
    /**
     * Latest block information
     * @static
     */
    nodeBlocklatest: () => fetch(cosmosRESTURL + `/blocks/latest`).then(res => res.json()),

    /**
     * Read account balance and other information
     * @param {string} address   Lambda address
     * @static
     */
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
    /**
     * Get list of recent transactions
     * @param {string} addr  address
     * @param {Number} height  Block height
     * @static
     */
    txs: function (addr,height) {
      return Promise.all([
        this.bankTxs(addr,height)
      ]).then((txs) => [].concat(...txs))
    },
    bankTxs: function (addr,height) {
      return get(`/txs?address=${addr}&tx.gHeight=${height}&page=1000000&limit=100`)
    },
    /**
     * Get transactions within a block
     * @param {Number} height Block height
     * @static
     */
    txsByHeight: function (height) {
      return get(`/txs?tx.height=${height}`)
    },
    /**
     * Get transaction details based on transaction hash
     * @param {string} hash   Transaction hash
     * @static
     */
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
    /**
     * Get the list of assets on the chain
     * @static
     */
    assetAll: () => get(`/asset/all`),

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
    /**
     * Get all delegations information from a delegator
     * @param {string} addr  Lambda address
     * @static
     */
    delegations: function (addr) {
      console.log(`/staking/delegators/${addr}/delegations`)
      return get(`/staking/delegators/${addr}/delegations`)
    },
    partnerDelegations: function (addr) {
      console.log(`/staking/delegators/${addr}/partner_delegations`)
      return get(`/staking/delegators/${addr}/partner_delegations`)
    },
    /**
     * Obtain records of cancelling pledge
     * @param {string} addr  Lambda address
     * @static
     */
    undelegations: function (addr) {
      return get(

        `/staking/delegators/${addr}/unbonding_delegations`,
        true
      )
    },
    partnerundelegations: function (addr) {
      return get(`/staking/delegators/${addr}/unbonding_partner_delegations`)
    },
    /**
     * Obtain the list of sub pledge
     * @param {string} addr   Lambda address
     * @static
     */
    redelegations: function (addr) {
      return get(`/staking/redelegations?delegator=${addr}`)
    },
    
    /**
     * Query all validators that a delegator is bonded to
     * @param {string} delegatorAddr  Lambda address
     * @static
     */
    delegatorValidators: function (delegatorAddr) {
      return get(`/staking/delegators/${delegatorAddr}/validators`)
    },
    /**
     * Get a list containing all the validator candidates
     * @static
     */
    validators: () => Promise.all([
      get(`/staking/validators?status=unbonding`),
      get(`/staking/validators?status=bonded`),
      get(`/staking/validators?status=unbonded`)
    ]).then((validatorGroups) =>
      [].concat(...validatorGroups)
    ),
    /**
     * Query the information from a single validator
     * @param {string} addr  Node operation address
     * @static
     */
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

    /**
     * Latest nodes participating in consensus
     * @static
     */
    validatorSet: () => get(`/validatorsets/latest`),

    
    /**
     * Query a delegation between a delegator and a validator
     * @param {string} delegatorAddr  User's lambda address
     * @param {string} validatorAddr  Operation address of validator node
     * @static
     */
    delegation: function (delegatorAddr, validatorAddr) {
      return get(

        `/staking/delegators/${delegatorAddr}/delegations/${validatorAddr}`,
        true
      )
    },
    /**
     * Query the records of users cancelling pledge in the verification node
     * @param {string} delegatorAddr  User lambda address
     * @param {string} validatorAddr  validator node operation address
     * @static
     */
    unbondingDelegation: function (delegatorAddr, validatorAddr) {
      return get(

        `/staking/delegators/${delegatorAddr}/unbonding_delegations/${validatorAddr}`,
        true
      )
    },
    /**
     * Pledge information in pledge pool
     * @static
     */
    pool: () => get(`/staking/pool`),
    /**
     * Pledge parameter information
     * @static
     */
    stakingParameters: () => get(`/staking/parameters`),

    /* ============ Slashing ============ */
    
    /**
     * For the latest signature status of the specified node
     * @param {string} pubKey  Public key
     * @static
     */
    validatorSigningInfo: function (pubKey) {
      return get(`/slashing/validators/${pubKey}/signing_info`)
    },

    /* ============ Governance ============ */
    /**
     * Proposal list
     * @static
     */
    proposals: () => get(`/gov/proposals`),
    /**
     * Proposal details
     * @param {Number} proposalId  Proposal ID
     * @static
     */
    proposal: function (proposalId) {
      return get(`/gov/proposals/${proposalId}`)
    },
    /**
     * Get voting information for a proposal
     * @param {Number} proposalId proposal Id
     * @static
     */
    proposalVotes: function (proposalId) {
      return get(`/gov/proposals/${proposalId}/votes`)
    },
    /**
     * Get a user's voting information on a proposal
     * @param {Number} proposalId  Proposal ID
     * @param {string} address User's lambda address
     * @static
     */
    proposalVote: function (proposalId, address) {
      return get(`/gov/proposals/${proposalId}/votes/${address}`)
    },
    /**
     * How much money is saved to get the proposal
     * @param {Number} proposalId Proposal ID
     * @static
     */
    proposalDeposits: function (proposalId) {
      return get(`/gov/proposals/${proposalId}/deposits`)
    },
    /**
     * Get a user's saving information on a proposal
     * @param {Number} proposalId Proposal ID
     * @param {string} address  User's lambda address
     * @static
     */
    proposalDeposit: function (proposalId, address) {
      return get(

        `/gov/proposals/${proposalId}/deposits/${address}`,
        true
      )
    },
    /**
     * Get parameters of proposal
     * @param {Number} proposalId 
     * @static
     */
    proposalTally: function (proposalId) {
      return get(`/gov/proposals/${proposalId}/tally`)
    },
    /**
     * Parameter expression of proposal deposit
     * @static
     */
    govDepositParameters: () => get(`/gov/parameters/deposit`),
    /**
     * Parameter description of proposal
     * @static
     */
    govTallyingParameters: () => get(`/gov/parameters/tallying`),
    /**
     * Parameter description related to proposal voting
     * @static
     */
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
    /**
     * Get the information of the specified block height
     * @param {Number} blockHeight  Block height
     * @static
     */
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
    /**
     *  Get the total rewards balance from all delegations
     * @param {string} delegatorAddr   User's lambda address
     * @static
     */
    delegatorRewards: function (delegatorAddr) {
      return get(`/distribution/delegators/${delegatorAddr}/rewards`)
    },
    /**
     *  Query a single delegation reward by a delegator
     * @param {string} delegatorAddr  User's lambda address
     * @param {string} validatorAddr  OperatorAddress of validator	
     * @static
     */
    delegatorRewardsFromValidator: function (delegatorAddr, validatorAddr) {
      return get(

        `/distribution/delegators/${delegatorAddr}/rewards/${validatorAddr}`
      )
    },
    /**
     * Query the distribution information of a single validator
     * @param {string} validatorAddr  OperatorAddress of validator	
     * @static
     */
    validatorDistributionInformation: function (validatorAddr) {
      return get(`/distribution/validators/${validatorAddr}`)
    },
    /**
     * Query pledge income information
     * @param {string} validatorAddr  OperatorAddress of validator
     * @static
     */
    validatorRewards: function (validatorAddr) {
      return get(`/distribution/validators/${validatorAddr}/rewards`)
    },
    /**
     * Query mining rewards of miners
     * @param {string} Addr  Miner's Lamba address
     * @static
     */
    MinerRewards: function (Addr) {
      var MinerAddress = hdkeyjs.address.MinerAddress(Addr)
      return get(`/distribution/miners/${MinerAddress}`)
    },
    /**
     * Parameter description related to income distribution
     * @static
     */
    distributionParameters: function () {
      return get(`/distribution/parameters`)
    },
    /**
     *  Fee distribution outstanding rewards of a single validator
     * @param {string} validatorAddr  OperatorAddress of validator
     * @static
     */
    distributionOutstandingRewards: function (validatorAddr) {
      return get(`/distribution/validators/${validatorAddr}/outstanding_rewards`)
    },
    /* ------市场相关--------- */
    /**
     * Market list
     * @static
     */
    marketlist: function () {
      return get(`/market/markets`)
    },
    /**
     * Market parameter information
     * @param {string} name 
     * @static
     */
    marketinfo: function (name) {
      return get(`/market/params`)
    },
    /**
     * List of sales orders
     * @param {string} marketName  Market name
     * @param {string} orderType   Type of sales order e.g. premium
     * @param {string} statusType  The status of the sales order is active and sold out active inactive
     * @param {number } page  Page
     * @param {number} limit  How many pieces of data are displayed per page
     * @static
     */
    marketOrderslist: function (marketName, orderType, statusType, page, limit) {
      return get(`/market/sellorders/${marketName}/${orderType}/${statusType}/${page}/${limit}`)
    },
    
    /**
     * Look up a miner's sales list
     * @param {string} address Lambda address
     * @param {string} page Page
     * @param {string} limit  Number of sales orders per page
     * @static
     */
    marketSellOrderslist: function (address, page, limit) {
      return get(`/market/miner/sellorders/${address}/${page}/${limit}`)
    },
    /**
     * Query matching orders of users
     * @param {string} address  Lambda address
     * @param {Number} page  Page
     * @param {Number} limit  Amount of data per page
     * @static
     */
    marketUserOrderslist: function (address, page, limit) {
      return get(`/market/matchorders/${address}/${page}/${limit}`)
    },
    /**
     * Matching order details
     * @param {string} Orderid Order ID
     * @static
     */
    marketOrderinfo: function (Orderid) {
      return get(`/market/matchorder/${Orderid}`)
    },
    /**
     * Sales order details
     * @param {string} Orderid Order id 
     * @static
     */
    marketsellorderinfo:function(Orderid){
      return get(`/market/sellorder/${Orderid}`)
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
    /**
     * Annual additional issuance
     * @static
     */
    mintingAnnualprovisions: function () {
      return gettxt(`/minting/annual-provisions`)
    }
  }
}
