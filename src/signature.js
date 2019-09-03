/*
The SDK expects a certain message format to serialize and then sign.

type StdSignMsg struct {
  ChainID       string      `json:"chain_id"`
  AccountNumber uint64      `json:"account_number"`
  Sequence      uint64      `json:"sequence"`
  Fee           auth.StdFee `json:"fee"`
  Msgs          []sdk.Msg   `json:"msgs"`
  Memo          string      `json:"memo"`
}
*/

export function createSignMessage (
  jsonTxH,
  { sequence, accountNumber, chainId }
) {
  // sign bytes need amount to be an array
  console.log('createSignMessage')
  console.log(jsonTxH)

  var jsonTx = jsonTxH
  const fee = {
    amount: jsonTx.fee.amount || [],
    gas: jsonTx.fee.gas
  }

  var result = JSON.stringify({
      account_number: accountNumber,
      chain_id: chainId,
      fee,
      memo: jsonTx.memo,
      msgs: jsonTx.msg, // weird msg vs. msgs
      sequence
    }
  )
  console.log('加密')
  console.log(result)
  return result
}

export function createSignature (
  signature,
  sequence,
  accountNumber,
  publicKey
) {
  return {
    signature: signature.toString(`base64`),
    // account_number: accountNumber,
    // sequence,
    pub_key: {
      type: `tendermint/PubKeySecp256k1`, // TODO: allow other keytypes
      value: publicKey.toString(`base64`)
    }
  }
}

export function removeEmptyProperties (jsonTx) {
  return jsonTx
}


