## Modules

<dl>
<dt><a href="#module_get">get</a></dt>
<dd><p>More about blockchain interface information <a href="http://docs.lambda.im/api-reference/paths/">http://docs.lambda.im/api-reference/paths/</a></p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#get">get</a> : <code>Object</code></dt>
<dd><p>Methods under all get modules are accessed through secondary properties</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#setContext">setContext()</a></dt>
<dd><p>Modify the address and blockchain chainid of the linked node</p>
</dd>
<dt><a href="#simulate">simulate()</a></dt>
<dd><p>Simulate the gas needed to send data to obtain transactions</p>
</dd>
<dt><a href="#setsigner">setsigner(signerFn)</a></dt>
<dd><p>Set the method for signature authorization</p>
</dd>
<dt><a href="#setfee">setfee(gasEstimate, gasPrice)</a></dt>
<dd><p>Set gas and gas prices</p>
</dd>
<dt><a href="#send">send(issync)</a></dt>
<dd><p>Send transaction</p>
</dd>
<dt><a href="#msgSend">msgSend(Lambda, amount, denom, memo)</a></dt>
<dd><p>Transfer transaction</p>
</dd>
<dt><a href="#msgDelegation">msgDelegation(to, amount, isdege, validatorType)</a></dt>
<dd><p>Pledge or cancellation of pledge</p>
</dd>
<dt><a href="#msgRedelegate">msgRedelegate(validatorSourceAddress, validatorDestinationAddress, amount, validatortype)</a></dt>
<dd><p>Transfer pledge</p>
</dd>
<dt><a href="#msgDeposit">msgDeposit(ProposalID, amount)</a></dt>
<dd><p>Deposit to proposal</p>
</dd>
<dt><a href="#msgVote">msgVote(ProposalID, option)</a></dt>
<dd><p>Vote on proposal</p>
</dd>
<dt><a href="#msgCreateSellOrder">msgCreateSellOrder(marketName, price, rate, sellSize, description, cancelTimeDuration, minBuySize, minBuyDuration, maxBuyDuration)</a></dt>
<dd><p>Create sales order</p>
</dd>
<dt><a href="#msgCreateBuyOrder">msgCreateBuyOrder(duration, size, sellOrderId, marketName)</a></dt>
<dd><p>Create a purchase order</p>
</dd>
<dt><a href="#msgCreateMiner">msgCreateMiner(miningAddress, dhtId)</a></dt>
<dd><p>Initialize miner</p>
</dd>
<dt><a href="#msgWithdrawValidatorCommission">msgWithdrawValidatorCommission(address)</a></dt>
<dd><p>Withdraw node income</p>
</dd>
<dt><a href="#msgAssetPledge">msgAssetPledge(amount, asset)</a></dt>
<dd><p>Lamb exchange TBB</p>
</dd>
<dt><a href="#msgAssetDrop">msgAssetDrop(asset, amount)</a></dt>
<dd><p>TBB exchange lamb</p>
</dd>
<dt><a href="#msgWithdrawal">msgWithdrawal()</a></dt>
<dd><p>Withdrawal of pledge income</p>
</dd>
<dt><a href="#msgMinerwithdrawal">msgMinerwithdrawal(address)</a></dt>
<dd><p>Reward for miner&#39;s extraction and mining</p>
</dd>
<dt><a href="#msgWithDrawMarket">msgWithDrawMarket(marketName)</a></dt>
<dd><p>Withdrawal of market pledge income</p>
</dd>
<dt><a href="#msgMinerWithDraw">msgMinerWithDraw(matchOrderId)</a></dt>
<dd><p>Miner&#39;s order income</p>
</dd>
<dt><a href="#msgMaintain">msgMaintain()</a></dt>
<dd><p>Miner initiated maintenance</p>
</dd>
<dt><a href="#msgUnMaintain">msgUnMaintain()</a></dt>
<dd><p>Miner lifting maintenance</p>
</dd>
<dt><a href="#msgUnjailMiner">msgUnjailMiner()</a></dt>
<dd><p>Miners lift restrictions</p>
</dd>
<dt><a href="#msgOrderRenewal">msgOrderRenewal(orderId, duration)</a></dt>
<dd><p>Order renewal, increase order usage time</p>
</dd>
<dt><a href="#msgMinerWithDrawCount">msgMinerWithDrawCount(page, limit)</a></dt>
<dd><p>Miners withdraw order revenue in batches</p>
</dd>
<dt><a href="#msgDelegateMarket">msgDelegateMarket(marketName, amount, denom)</a></dt>
<dd><p>Market pledge</p>
</dd>
</dl>

<a name="module_get"></a>

## get
More about blockchain interface information http://docs.lambda.im/api-reference/paths/


* [get](#module_get)
    * [.connected()](#module_get.connected)
    * [.nodeVersion()](#module_get.nodeVersion)
    * [.nodeSyncing()](#module_get.nodeSyncing)
    * [.nodeBlocklatest()](#module_get.nodeBlocklatest)
    * [.account(address)](#module_get.account)
    * [.txs(addr, height)](#module_get.txs)
    * [.txsByHeight(height)](#module_get.txsByHeight)
    * [.tx(hash)](#module_get.tx)
    * [.assetAll()](#module_get.assetAll)
    * [.delegations(addr)](#module_get.delegations)
    * [.undelegations(addr)](#module_get.undelegations)
    * [.redelegations(addr)](#module_get.redelegations)
    * [.delegatorValidators(delegatorAddr)](#module_get.delegatorValidators)
    * [.validators()](#module_get.validators)
    * [.validator(addr)](#module_get.validator)
    * [.validatorSet()](#module_get.validatorSet)
    * [.delegation(delegatorAddr, validatorAddr)](#module_get.delegation)
    * [.unbondingDelegation(delegatorAddr, validatorAddr)](#module_get.unbondingDelegation)
    * [.pool()](#module_get.pool)
    * [.stakingParameters()](#module_get.stakingParameters)
    * [.validatorSigningInfo(pubKey)](#module_get.validatorSigningInfo)
    * [.proposals()](#module_get.proposals)
    * [.proposal(proposalId)](#module_get.proposal)
    * [.proposalVotes(proposalId)](#module_get.proposalVotes)
    * [.proposalVote(proposalId, address)](#module_get.proposalVote)
    * [.proposalDeposits(proposalId)](#module_get.proposalDeposits)
    * [.proposalDeposit(proposalId, address)](#module_get.proposalDeposit)
    * [.proposalTally(proposalId)](#module_get.proposalTally)
    * [.govDepositParameters()](#module_get.govDepositParameters)
    * [.govTallyingParameters()](#module_get.govTallyingParameters)
    * [.govVotingParameters()](#module_get.govVotingParameters)
    * [.block(blockHeight)](#module_get.block)
    * [.delegatorRewards(delegatorAddr)](#module_get.delegatorRewards)
    * [.delegatorRewardsFromValidator(delegatorAddr, validatorAddr)](#module_get.delegatorRewardsFromValidator)
    * [.validatorDistributionInformation(validatorAddr)](#module_get.validatorDistributionInformation)
    * [.validatorRewards(validatorAddr)](#module_get.validatorRewards)
    * [.MinerRewards(Addr)](#module_get.MinerRewards)
    * [.distributionParameters()](#module_get.distributionParameters)
    * [.distributionOutstandingRewards(validatorAddr)](#module_get.distributionOutstandingRewards)
    * [.marketlist()](#module_get.marketlist)
    * [.marketinfo(name)](#module_get.marketinfo)
    * [.marketOrderslist(marketName, orderType, statusType, page, limit)](#module_get.marketOrderslist)
    * [.marketSellOrderslist(address, page, limit)](#module_get.marketSellOrderslist)
    * [.marketUserOrderslist(address, page, limit)](#module_get.marketUserOrderslist)
    * [.marketOrderinfo(Orderid)](#module_get.marketOrderinfo)
    * [.marketsellorderinfo(Orderid)](#module_get.marketsellorderinfo)
    * [.mintingAnnualprovisions()](#module_get.mintingAnnualprovisions)

<a name="module_get.connected"></a>

### get.connected()
Link to node or not

**Kind**: static method of [<code>get</code>](#module_get)  
<a name="module_get.nodeVersion"></a>

### get.nodeVersion()
Node information

**Kind**: static method of [<code>get</code>](#module_get)  
<a name="module_get.nodeSyncing"></a>

### get.nodeSyncing()
Node synchronization information

**Kind**: static method of [<code>get</code>](#module_get)  
<a name="module_get.nodeBlocklatest"></a>

### get.nodeBlocklatest()
Latest block information

**Kind**: static method of [<code>get</code>](#module_get)  
<a name="module_get.account"></a>

### get.account(address)
Read account balance and other information

**Kind**: static method of [<code>get</code>](#module_get)  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | Lambda address |

<a name="module_get.txs"></a>

### get.txs(addr, height)
Get list of recent transactions

**Kind**: static method of [<code>get</code>](#module_get)  

| Param | Type | Description |
| --- | --- | --- |
| addr | <code>string</code> | address |
| height | <code>Number</code> | Block height |

<a name="module_get.txsByHeight"></a>

### get.txsByHeight(height)
Get transactions within a block

**Kind**: static method of [<code>get</code>](#module_get)  

| Param | Type | Description |
| --- | --- | --- |
| height | <code>Number</code> | Block height |

<a name="module_get.tx"></a>

### get.tx(hash)
Get transaction details based on transaction hash

**Kind**: static method of [<code>get</code>](#module_get)  

| Param | Type | Description |
| --- | --- | --- |
| hash | <code>string</code> | Transaction hash |

<a name="module_get.assetAll"></a>

### get.assetAll()
Get the list of assets on the chain

**Kind**: static method of [<code>get</code>](#module_get)  
<a name="module_get.delegations"></a>

### get.delegations(addr)
Get all delegations information from a delegator

**Kind**: static method of [<code>get</code>](#module_get)  

| Param | Type | Description |
| --- | --- | --- |
| addr | <code>string</code> | Lambda address |

<a name="module_get.undelegations"></a>

### get.undelegations(addr)
Obtain records of cancelling pledge

**Kind**: static method of [<code>get</code>](#module_get)  

| Param | Type | Description |
| --- | --- | --- |
| addr | <code>string</code> | Lambda address |

<a name="module_get.redelegations"></a>

### get.redelegations(addr)
Obtain the list of sub pledge

**Kind**: static method of [<code>get</code>](#module_get)  

| Param | Type | Description |
| --- | --- | --- |
| addr | <code>string</code> | Lambda address |

<a name="module_get.delegatorValidators"></a>

### get.delegatorValidators(delegatorAddr)
Query all validators that a delegator is bonded to

**Kind**: static method of [<code>get</code>](#module_get)  

| Param | Type | Description |
| --- | --- | --- |
| delegatorAddr | <code>string</code> | Lambda address |

<a name="module_get.validators"></a>

### get.validators()
Get a list containing all the validator candidates

**Kind**: static method of [<code>get</code>](#module_get)  
<a name="module_get.validator"></a>

### get.validator(addr)
Query the information from a single validator

**Kind**: static method of [<code>get</code>](#module_get)  

| Param | Type | Description |
| --- | --- | --- |
| addr | <code>string</code> | Node operation address |

<a name="module_get.validatorSet"></a>

### get.validatorSet()
Latest nodes participating in consensus

**Kind**: static method of [<code>get</code>](#module_get)  
<a name="module_get.delegation"></a>

### get.delegation(delegatorAddr, validatorAddr)
Query a delegation between a delegator and a validator

**Kind**: static method of [<code>get</code>](#module_get)  

| Param | Type | Description |
| --- | --- | --- |
| delegatorAddr | <code>string</code> | User's lambda address |
| validatorAddr | <code>string</code> | Operation address of validator node |

<a name="module_get.unbondingDelegation"></a>

### get.unbondingDelegation(delegatorAddr, validatorAddr)
Query the records of users cancelling pledge in the verification node

**Kind**: static method of [<code>get</code>](#module_get)  

| Param | Type | Description |
| --- | --- | --- |
| delegatorAddr | <code>string</code> | User lambda address |
| validatorAddr | <code>string</code> | validator node operation address |

<a name="module_get.pool"></a>

### get.pool()
Pledge information in pledge pool

**Kind**: static method of [<code>get</code>](#module_get)  
<a name="module_get.stakingParameters"></a>

### get.stakingParameters()
Pledge parameter information

**Kind**: static method of [<code>get</code>](#module_get)  
<a name="module_get.validatorSigningInfo"></a>

### get.validatorSigningInfo(pubKey)
For the latest signature status of the specified node

**Kind**: static method of [<code>get</code>](#module_get)  

| Param | Type | Description |
| --- | --- | --- |
| pubKey | <code>string</code> | Public key |

<a name="module_get.proposals"></a>

### get.proposals()
Proposal list

**Kind**: static method of [<code>get</code>](#module_get)  
<a name="module_get.proposal"></a>

### get.proposal(proposalId)
Proposal details

**Kind**: static method of [<code>get</code>](#module_get)  

| Param | Type | Description |
| --- | --- | --- |
| proposalId | <code>Number</code> | Proposal ID |

<a name="module_get.proposalVotes"></a>

### get.proposalVotes(proposalId)
Get voting information for a proposal

**Kind**: static method of [<code>get</code>](#module_get)  

| Param | Type | Description |
| --- | --- | --- |
| proposalId | <code>Number</code> | proposal Id |

<a name="module_get.proposalVote"></a>

### get.proposalVote(proposalId, address)
Get a user's voting information on a proposal

**Kind**: static method of [<code>get</code>](#module_get)  

| Param | Type | Description |
| --- | --- | --- |
| proposalId | <code>Number</code> | Proposal ID |
| address | <code>string</code> | User's lambda address |

<a name="module_get.proposalDeposits"></a>

### get.proposalDeposits(proposalId)
How much money is saved to get the proposal

**Kind**: static method of [<code>get</code>](#module_get)  

| Param | Type | Description |
| --- | --- | --- |
| proposalId | <code>Number</code> | Proposal ID |

<a name="module_get.proposalDeposit"></a>

### get.proposalDeposit(proposalId, address)
Get a user's saving information on a proposal

**Kind**: static method of [<code>get</code>](#module_get)  

| Param | Type | Description |
| --- | --- | --- |
| proposalId | <code>Number</code> | Proposal ID |
| address | <code>string</code> | User's lambda address |

<a name="module_get.proposalTally"></a>

### get.proposalTally(proposalId)
Get parameters of proposal

**Kind**: static method of [<code>get</code>](#module_get)  

| Param | Type |
| --- | --- |
| proposalId | <code>Number</code> | 

<a name="module_get.govDepositParameters"></a>

### get.govDepositParameters()
Parameter expression of proposal deposit

**Kind**: static method of [<code>get</code>](#module_get)  
<a name="module_get.govTallyingParameters"></a>

### get.govTallyingParameters()
Parameter description of proposal

**Kind**: static method of [<code>get</code>](#module_get)  
<a name="module_get.govVotingParameters"></a>

### get.govVotingParameters()
Parameter description related to proposal voting

**Kind**: static method of [<code>get</code>](#module_get)  
<a name="module_get.block"></a>

### get.block(blockHeight)
Get the information of the specified block height

**Kind**: static method of [<code>get</code>](#module_get)  

| Param | Type | Description |
| --- | --- | --- |
| blockHeight | <code>Number</code> | Block height |

<a name="module_get.delegatorRewards"></a>

### get.delegatorRewards(delegatorAddr)
Get the total rewards balance from all delegations

**Kind**: static method of [<code>get</code>](#module_get)  

| Param | Type | Description |
| --- | --- | --- |
| delegatorAddr | <code>string</code> | User's lambda address |

<a name="module_get.delegatorRewardsFromValidator"></a>

### get.delegatorRewardsFromValidator(delegatorAddr, validatorAddr)
Query a single delegation reward by a delegator

**Kind**: static method of [<code>get</code>](#module_get)  

| Param | Type | Description |
| --- | --- | --- |
| delegatorAddr | <code>string</code> | User's lambda address |
| validatorAddr | <code>string</code> | OperatorAddress of validator |

<a name="module_get.validatorDistributionInformation"></a>

### get.validatorDistributionInformation(validatorAddr)
Query the distribution information of a single validator

**Kind**: static method of [<code>get</code>](#module_get)  

| Param | Type | Description |
| --- | --- | --- |
| validatorAddr | <code>string</code> | OperatorAddress of validator |

<a name="module_get.validatorRewards"></a>

### get.validatorRewards(validatorAddr)
Query pledge income information

**Kind**: static method of [<code>get</code>](#module_get)  

| Param | Type | Description |
| --- | --- | --- |
| validatorAddr | <code>string</code> | OperatorAddress of validator |

<a name="module_get.MinerRewards"></a>

### get.MinerRewards(Addr)
Query mining rewards of miners

**Kind**: static method of [<code>get</code>](#module_get)  

| Param | Type | Description |
| --- | --- | --- |
| Addr | <code>string</code> | Miner's Lamba address |

<a name="module_get.distributionParameters"></a>

### get.distributionParameters()
Parameter description related to income distribution

**Kind**: static method of [<code>get</code>](#module_get)  
<a name="module_get.distributionOutstandingRewards"></a>

### get.distributionOutstandingRewards(validatorAddr)
Fee distribution outstanding rewards of a single validator

**Kind**: static method of [<code>get</code>](#module_get)  

| Param | Type | Description |
| --- | --- | --- |
| validatorAddr | <code>string</code> | OperatorAddress of validator |

<a name="module_get.marketlist"></a>

### get.marketlist()
Market list

**Kind**: static method of [<code>get</code>](#module_get)  
<a name="module_get.marketinfo"></a>

### get.marketinfo(name)
Market parameter information

**Kind**: static method of [<code>get</code>](#module_get)  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="module_get.marketOrderslist"></a>

### get.marketOrderslist(marketName, orderType, statusType, page, limit)
List of sales orders

**Kind**: static method of [<code>get</code>](#module_get)  

| Param | Type | Description |
| --- | --- | --- |
| marketName | <code>string</code> | Market name |
| orderType | <code>string</code> | Type of sales order e.g. premium |
| statusType | <code>string</code> | The status of the sales order is active and sold out active inactive |
| page | <code>number</code> | Page |
| limit | <code>number</code> | How many pieces of data are displayed per page |

<a name="module_get.marketSellOrderslist"></a>

### get.marketSellOrderslist(address, page, limit)
Look up a miner's sales list

**Kind**: static method of [<code>get</code>](#module_get)  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | Lambda address |
| page | <code>string</code> | Page |
| limit | <code>string</code> | Number of sales orders per page |

<a name="module_get.marketUserOrderslist"></a>

### get.marketUserOrderslist(address, page, limit)
Query matching orders of users

**Kind**: static method of [<code>get</code>](#module_get)  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | Lambda address |
| page | <code>Number</code> | Page |
| limit | <code>Number</code> | Amount of data per page |

<a name="module_get.marketOrderinfo"></a>

### get.marketOrderinfo(Orderid)
Matching order details

**Kind**: static method of [<code>get</code>](#module_get)  

| Param | Type | Description |
| --- | --- | --- |
| Orderid | <code>string</code> | Order ID |

<a name="module_get.marketsellorderinfo"></a>

### get.marketsellorderinfo(Orderid)
Sales order details

**Kind**: static method of [<code>get</code>](#module_get)  

| Param | Type | Description |
| --- | --- | --- |
| Orderid | <code>string</code> | Order id |

<a name="module_get.mintingAnnualprovisions"></a>

### get.mintingAnnualprovisions()
Annual additional issuance

**Kind**: static method of [<code>get</code>](#module_get)  
<a name="get"></a>

## get : <code>Object</code>
Methods under all get modules are accessed through secondary properties

**Kind**: global variable  
<a name="setContext"></a>

## setContext()
Modify the address and blockchain chainid of the linked node

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| context.url | <code>string</code> | Modify the address of the linked node |
| context.chainId | <code>string</code> | Modify the  blockchain chainid of the linked node |

<a name="simulate"></a>

## simulate()
Simulate the gas needed to send data to obtain transactions

**Kind**: global function  
<a name="setsigner"></a>

## setsigner(signerFn)
Set the method for signature authorization

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| signerFn | <code>function</code> | Signature method |

<a name="setfee"></a>

## setfee(gasEstimate, gasPrice)
Set gas and gas prices

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| gasEstimate | <code>number</code> | The value of gas |
| gasPrice | <code>number</code> | Price of gas |

<a name="send"></a>

## send(issync)
Send transaction

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| issync | <code>bool</code> | Send transaction asynchronously or not |

<a name="msgSend"></a>

## msgSend(Lambda, amount, denom, memo)
Transfer transaction

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| Lambda | <code>string</code> | address of transfer target |
| amount | <code>number</code> | Amount transferred |
| denom | <code>string</code> | Name of token |
| memo | <code>string</code> | remarks |

<a name="msgDelegation"></a>

## msgDelegation(to, amount, isdege, validatorType)
Pledge or cancellation of pledge

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| to | <code>string</code> | Address pledged to verification node |
| amount | <code>number</code> | Amount pledged |
| isdege | <code>boolean</code> | Pledge or cancel pledge， true isPledge  false is cancel pledge |
| validatorType | <code>number</code> | the category of the node ，The default is 1 |

<a name="msgRedelegate"></a>

## msgRedelegate(validatorSourceAddress, validatorDestinationAddress, amount, validatortype)
Transfer pledge

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| validatorSourceAddress | <code>string</code> | Node address of current pledge |
| validatorDestinationAddress | <code>string</code> | Node address of the target |
| amount | <code>string</code> | Amount transferred to pledge |
| validatortype | <code>string</code> | the category of the node ，The default is 1 |

<a name="msgDeposit"></a>

## msgDeposit(ProposalID, amount)
Deposit to proposal

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| ProposalID | <code>string</code> | Proposal ID |
| amount | <code>number</code> | Amount deposited |

<a name="msgVote"></a>

## msgVote(ProposalID, option)
Vote on proposal

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| ProposalID | <code>number</code> | Proposal ID |
| option | <code>string</code> | Voting options option value Yes No NoWithVeto Abstain |

<a name="msgCreateSellOrder"></a>

## msgCreateSellOrder(marketName, price, rate, sellSize, description, cancelTimeDuration, minBuySize, minBuyDuration, maxBuyDuration)
Create sales order

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| marketName | <code>string</code> | Market name of sales order |
| price | <code>string</code> | Price of sales order |
| rate | <code>number</code> | Odds on sales |
| sellSize | <code>number</code> | Size of space for sale |
| description | <code>string</code> | Description and introduction of the sales order |
| cancelTimeDuration | <code>number</code> | Time to cancel sales order |
| minBuySize | <code>number</code> | Minimum purchase space size |
| minBuyDuration | <code>number</code> | Minimum purchase time |
| maxBuyDuration | <code>number</code> | Maximum purchase time |

<a name="msgCreateBuyOrder"></a>

## msgCreateBuyOrder(duration, size, sellOrderId, marketName)
Create a purchase order

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| duration | <code>number</code> | How long did you buy |
| size | <code>number</code> | Size of purchase space |
| sellOrderId | <code>string</code> | Sales order ID of purchase space |
| marketName | <code>string</code> | Market name |

<a name="msgCreateMiner"></a>

## msgCreateMiner(miningAddress, dhtId)
Initialize miner

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| miningAddress | <code>\*</code> | Miner's address Address of miner's sub account |
| dhtId | <code>\*</code> | dhtId |

<a name="msgWithdrawValidatorCommission"></a>

## msgWithdrawValidatorCommission(address)
Withdraw node income

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | Operation address of node |

<a name="msgAssetPledge"></a>

## msgAssetPledge(amount, asset)
Lamb exchange TBB

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| amount | <code>number</code> | Amount of lamb |
| asset | <code>number</code> | TBB amount |

<a name="msgAssetDrop"></a>

## msgAssetDrop(asset, amount)
TBB exchange lamb

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| asset | <code>number</code> | TBB amount |
| amount | <code>number</code> | Amount of lamb |

<a name="msgWithdrawal"></a>

## msgWithdrawal()
Withdrawal of pledge income

**Kind**: global function  
<a name="msgMinerwithdrawal"></a>

## msgMinerwithdrawal(address)
Reward for miner's extraction and mining

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | Miner's lamb address |

<a name="msgWithDrawMarket"></a>

## msgWithDrawMarket(marketName)
Withdrawal of market pledge income

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| marketName | <code>string</code> | Market name |

<a name="msgMinerWithDraw"></a>

## msgMinerWithDraw(matchOrderId)
Miner's order income

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| matchOrderId | <code>string</code> | Match order ID |

<a name="msgMaintain"></a>

## msgMaintain()
Miner initiated maintenance

**Kind**: global function  
<a name="msgUnMaintain"></a>

## msgUnMaintain()
Miner lifting maintenance

**Kind**: global function  
<a name="msgUnjailMiner"></a>

## msgUnjailMiner()
Miners lift restrictions

**Kind**: global function  
<a name="msgOrderRenewal"></a>

## msgOrderRenewal(orderId, duration)
Order renewal, increase order usage time

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| orderId | <code>string</code> | ID of the order |
| duration | <code>\*</code> | Increase order usage time |

<a name="msgMinerWithDrawCount"></a>

## msgMinerWithDrawCount(page, limit)
Miners withdraw order revenue in batches

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| page | <code>number</code> | Page |
| limit | <code>number</code> | One page contains the number of orders, up to 100 orders |

<a name="msgDelegateMarket"></a>

## msgDelegateMarket(marketName, amount, denom)
Market pledge

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| marketName | <code>string</code> | Market name |
| amount | <code>\*</code> | amount |
| denom | <code>\*</code> | Token name defaults to lamb |

