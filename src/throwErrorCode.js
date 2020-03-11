exports.throwErrorCode = function(codemsg) {
  var info = codemsg.split('|');
  throw new Error(JSON.stringify({
    code: 'hdkey-' + info[0],
    message: info[1]
  }));
};


exports.errorList = {
  amino: '1|amino',
  
};
