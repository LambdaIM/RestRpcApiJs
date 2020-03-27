import transaction from './transactionTypes.js'

const msgSend = function (to, amount, denom, memo) {
    var result = {
      type: transaction.SEND,
      toAddress: to,
      amounts: [
        {
          amount: amount,
          denom: denom || "ulamb"
        }
      ],
      memo: memo || ""
    };
    return result;
  }
export default {
  msgSend
}
