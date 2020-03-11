exports.throwErrorCode = function(codemsg,Othermsg) {
  var info = codemsg.split('|');
  throw new Error(JSON.stringify({
    code: 'rpc-' + info[0],
    message: info[1]+Othermsg
  }));
};


exports.errorList = {
  Signing_failed: '1|Signing failed:',
  transaction_was_still_not_included:"2|The transaction was still not included in a block. We can't say for certain it will be included in the future",
  Error_sending_transaction:"3|Error sending transaction"
  
};
