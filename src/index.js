import Rpcapijs from "./action.js";
import transaction from "./transactionTypes";
import _Getters from './getters'
import preTxdata from './preTxdata'

export default class ActionManager {
  constructor(cosmosRESTURL,chainId,userAddress) {
    this.context = null;
    this.cosmos = null;
    this.message = null;
    this.transactiondata=null;
    this.get = {};
 
    const getters = _Getters(cosmosRESTURL);

    Object.keys(getters).forEach(getter => {
      this.get[getter] = getters[getter]
    })
  
    Object.keys(preTxdata).forEach(getter => {
      this[getter] = preTxdata[getter]
      
    })
  
    this.cosmos = new Rpcapijs(
      cosmosRESTURL,
      chainId
    );

    this.context = {
      url:cosmosRESTURL || "",
      chainId:chainId|| "",
      userAddress:userAddress

    };
  }

  setContext(context = null) {
    if (!context) {
      throw Error("Context cannot be empty");
    }
    /**
     url ,
     chainId,
     userAddress
      **/
    this.context = context;
    this.cosmos = new Rpcapijs(
      this.context.url || "",
      this.context.chainId || ""
    );
  }

  readyCheck() {
    if (!this.context) {
      throw Error("This modal has no context.");
    }
    // if (!this.context.connected) {
    //   throw Error(
    //     `Currently not connected to a secure node. Please try again when Lunie has secured a connection.`
    //   );
    // }
    
    if (this.transactiondata==null) {
      throw Error(`No message to send.`);
    }
  }

  messageTypeCheck(msgType) {
    if (!msgType) {
      throw Error("No message type present.");
    }

    const isKnownType = Object.values(transaction).includes(msgType);
    if (!isKnownType) {
      throw Error(`Invalid message type: ${msgType}.`);
    }
  }

  setMessage(type, transactionProperties) {
    if (!this.context) {
      throw Error("This modal has no context.");
    }

    this.messageTypeCheck(type);
    this.messageType = type;

    // console.log(this.cosmos);

    this.message = this.cosmos[type](
      this.context.userAddress,
      transactionProperties
    );
  }

  async simulate() {
    this.readyCheck()
    const {type, memo, ...properties } = this.transactiondata;
        
    this.setMessage(type, properties);
    const gasEstimate = await this.message.simulate({
      memo: memo
    });
    return gasEstimate
  }
  setsigner(signerFn){
    this._signerFn=signerFn;
    return this
  }
  setfee(gasEstimate,gasPrice){
    this.feeProperties = {
      gasEstimate: gasEstimate,
      gasPrice: gasPrice
    }
  return this;

  }

  async send(issync) {
    this.readyCheck()
    const {type, memo, ...properties } = this.transactiondata;

    const { gasEstimate, gasPrice } = this.feeProperties;
    this.setMessage(type, properties);
    if (this.messageType === transaction.WITHDRAW) {
      this.message = await this.createWithdrawTransaction();
    }

    const { included, hash } = await this.message.send(
      {
        gas: String(gasEstimate),
        gasPrices: convertCurrencyData([gasPrice]),
        memo
      },
      this._signerFn,
      issync
    );

    return { included, hash };
  }

  async createWithdrawTransaction() {
    const addresses = await getTop5RewardsValidators(
      this.context.userAddress,
      this.cosmos
    );
    return this.createMultiMessage(
      transaction.WITHDRAW,
      this.context.userAddress,
      { validatorAddresses: addresses }
    );
  }

  // Withdrawing is a multi message for all validators you have bonds with
  createMultiMessage(type, senderAddress, { validatorAddresses }) {
    const messages = validatorAddresses.map(validatorAddress =>
      this.cosmos[type](senderAddress, { validatorAddress })
    );
    return this.cosmos.MultiMessage(senderAddress, messages);
  }
}

function convertCurrencyData(amounts) {
  return amounts.map(({ amount, denom }) => ({
    amount: toMicroAtomString(amount),
    denom
  }));
}

function toMicroAtomString(amount) {
  return String(amount);
  // return String(uatoms(amount))
}

// // limitation of the block, so we pick the top 5 rewards and inform the user.
async function getTop5RewardsValidators(operator_address, cosmos) {
  // Compares the amount in a [address1, {denom: amount}] array
  // 1 获取我的质押列表
  // 2 获取我的收益列表
  // 3 选择前5条数据 因为出块大小限制
  console.log("getTop5RewardsValidators");

  // return;
  var delegationsList = await cosmos.get.delegations(operator_address);
  var partnerDelegations = await cosmos.get.partnerDelegations(
    operator_address
  );
  if (delegationsList == null) {
    delegationsList = [];
  }
  if (partnerDelegations == null) {
    partnerDelegations = [];
  }
  delegationsList = delegationsList.concat(partnerDelegations);

  delegationsList.forEach(async item => {
    var Rewards = await cosmos.get.delegatorRewardsFromValidator(
      operator_address,
      item.validator_address
    );
    item.Rewards = coinListFormart(Rewards);
  });

  const byBalanceOfDenom = denom => (a, b) => b.Rewards - a.Rewards;
  const validatorList = delegationsList
    .sort(byBalanceOfDenom)
    .slice(0, 5) // Just the top 5
    .map(item => item.validator_address);

  return validatorList;
}

function coinListFormart(list) {
  var result = 0;
  list.forEach(item => {
    if (item.denom == "lamb") {
      result = item.amount;
    }
    result.push(item.amount + item.denom);
  });
  return result;
}


