/* eslint-env browser */

import { createSignMessage, createSignature } from './signature'
import fetch from './fetch.js'
const hdkeyjs = require('@jswebfans/hdkeyjs');

const DEFAULT_GAS_PRICE = [{ amount: (2.5e-8).toFixed(9), denom: `uatom` }]

export default async function send ({ gas, gasPrices = DEFAULT_GAS_PRICE, memo = `` }, messages, signer, cosmosRESTURL, chainId, accountNumber, sequence) {
  const signedTx = await createSignedTransaction({ gas, gasPrices, memo }, messages, signer, chainId, accountNumber, sequence)

  // broadcast transaction with signatures included
  var body = createBroadcastBody(signedTx, `async`)

  console.log('body')
  console.log(body)
  // body = "0x"+Buffer.from(body).toString('hex')
  // console.log(body)
  // const encodeBody = await fetch('${cosmosRESTURL}/txs/encode', { method: `POST`, body })
  // var Body= await res.text();
  const res = await fetch(`${cosmosRESTURL}/txs`, {
    method: `POST`,
    body: body,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  console.log('***************')

  console.log('状态代码', res.status)
  // console.log(res)
  var dataJson = await res.json()
  assertOk(dataJson)
  console.log(dataJson)
  console.log('***************')
  // .then(res => res.json())
  // .then(assertOk)

  return {
    hash: dataJson.txhash,
    sequence,
    included: () => queryTxInclusion(dataJson.txhash, cosmosRESTURL)
  }
}
export  async function getTxhash ({ gas, gasPrices = DEFAULT_GAS_PRICE, memo = `` }, messages, signer, cosmosRESTURL, chainId, accountNumber, sequence) {
  const signedTx = await createSignedTransaction({ gas, gasPrices, memo }, messages, signer, chainId, accountNumber, sequence)

  
  var txhash=hdkeyjs.address.getTxhash( JSON.parse(JSON.stringify(signedTx))  )
  

  return  txhash.toString('hex').toUpperCase()
}

export async function createSignedTransaction ({ gas, gasPrices = DEFAULT_GAS_PRICE, memo = `` }, messages, signer, chainId, accountNumber, sequence) {
  // sign transaction
  console.log('createSignedTransaction')
  console.log(messages)
  console.log(signer)

  const stdTx = createStdTx({ gas, gasPrices, memo }, messages)
  console.log('stdTx')
  console.log(stdTx)
  const signMessage = createSignMessage(stdTx, { sequence, accountNumber, chainId })
  let signature, publicKey
  console.log(signMessage)
  console.log('createSignedTransaction')
  try {
    ({ signature, publicKey } = await signer(signMessage))
  } catch (err) {
    throw new Error('Signing failed: ' + err.message)
  }
  console.log('after signer')
  console.log(signature)
  console.log(publicKey)
  const signatureObject = createSignature(signature, sequence, accountNumber, publicKey)
  const signedTx = createSignedTransactionObject(stdTx, signatureObject)
  console.log(signedTx)
  return signedTx
}

// wait for inclusion of a tx in a block
// Default waiting time: 60 * 3s = 180s
export async function queryTxInclusion (txHash, cosmosRESTURL, iterations = 60, timeout = 3000) {
  let includedTx
  while (iterations-- > 0) {
    try {
      includedTx = await fetch(`${cosmosRESTURL}/txs/${txHash}`)
        .then(function (response) {
          if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response.json())
          } else {
            var error = new Error(response.statusText || response.status)
            error.response = response
            return Promise.reject(error)
          }
        })
      break
    } catch (err) {
      // tx wasn't included in a block yet
      await new Promise(resolve =>
        setTimeout(resolve, timeout)
      )
    }
  }
  if (iterations <= 0) {
    throw new Error(`The transaction was still not included in a block. We can't say for certain it will be included in the future.该事务仍不包含在块中。我们不能肯定它将来会被包括在内。`)
  }

  assertOk(includedTx)

  return includedTx
}

// attaches the request meta data to the message
export function createStdTx ({ gas, gasPrices, memo }, messages) {
  const fees = gasPrices.map(({ amount, denom }) => ({ amount: String(Math.round(amount * gas)), denom }))
    .filter(({ amount }) => amount > 0)
  return {

    msg: Array.isArray(messages) ? messages : [messages],
    fee: {
      amount: fees.length > 0 ? fees : [],
      gas
    },
    signatures: null,
    memo

  }
}

// the broadcast body consists of the signed tx and a return type
// returnType can be block (inclusion in block), async (right away), sync (after checkTx has passed)
function createBroadcastBody (signedTx, returnType = `sync`) {
  return JSON.stringify({
    tx: signedTx,
    mode: returnType
  })
}

// adds the signature object to the tx
function createSignedTransactionObject (tx, signature) {
  tx.signatures = [signature]

  return tx
  // return Object.assign({}, {
  //   value:{
  //     signatures: [signature]
  //   }
  // },tx)
}

// assert that a transaction was sent successful
function assertOk (res) {
  console.log('assertOk')
  console.log(res)
  console.log('assertOk')
  if (Array.isArray(res)) {
    if (res.length === 0) throw new Error(`Error sending transaction`)

    res.forEach(assertOk)
  }

  if (res.error) {
    throw new Error(res.error)
  }

  // Sometimes we get back failed transactions, which shows only by them having a `code` property
  if (res.code) {
    const message = res.logs.map((item) => {
      return item.log
    }).join(',')
    console.log(message)
    throw new Error(message)
  }

  if (!res.txhash) {
    const message = res.message
    throw new Error(message)
  }

  return res
}
