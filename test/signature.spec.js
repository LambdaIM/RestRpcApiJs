import {
  createSignature,
  createSignMessage,
  removeEmptyProperties
} from "../src/signature.js"

describe(`Signing`, () => {
  const tx = {
    msg: [
      {
        "type": "cosmos-sdk/MsgSend",
        "value": {
          "amount": [{
            "amount": "1000000",
            "denom": "ulamb"
          }],
          "from_address": "lambda163q4m634nq8les4nuvdvz49tk6aeh926t0ccsc",
          "to_address": "lambda10a7pf73q86v06c7sq8hun2t4g4dunqnjgcrcyk"
        }
      }
    ],
    fee: { 	
      "amount": [{
        "amount": "985",
        "denom": "ulamb"
    }],
    "gas": "39416"},
    signatures: null,
    memo: ``
  }
  const txWithNulls = {
    msg: [
      {
        type: `cosmos-sdk/Send`,
        value: {
          inputs: [
            {
              address: `cosmos1qperwt9wrnkg5k9e5gzfgjppzpqhyav5j24d66`,
              coins: [{ denom: `STAKE`, amount: `1` }]
            }
          ],
          outputs: [
            {
              x: undefined,
              address: `cosmos1yeckxz7tapz34kjwnjxvmxzurerquhtrmxmuxt`,
              coins: [{ denom: `STAKE`, amount: `1` }]
            }
          ]
        }
      }
    ],
    fee: { amount: [{ denom: ``, amount: `0` }], gas: `21906` },
    signatures: null,
    memo: ``
  }

  it(`createSignature`, () => {
    const vectors = [
      {
        sequence: `0`,
        account_number: `1`,
        signature: `MEQCIE2f8y5lVAOZu/MDZX3aH+d0sgvTRVrEzdP60NHr7lKJAiBexCiaAsh35R25IhgJMBIp/AD2Lfuk57suV8gnqOSfzg==`,
        publicKey: `03ab1ebbb21aee35154e36aaebc25067177f783f7e967c9d6493e8920c05e40eb5`
      },
      {
        sequence: `1`,
        account_number: `1`,
        signature: `MEQCIE2f8y5lVAOZu/MDZX3aH+d0sgvTRVrEzdP60NHr7lKJAiBexCiaAsh35R25IhgJMBIp/AD2Lfuk57suV8gnqOSfzg==`,
        publicKey: `0243311589af63c2adda04fcd7792c038a05c12a4fe40351b3eb1612ff6b2e5a0e`
      }
    ]

    vectors.forEach(({ signature, sequence, account_number, publicKey }) =>
      expect(
        createSignature(signature, sequence, account_number, publicKey)
      ).toMatchObject({
        signature: signature.toString(`base64`),
        // account_number,
        // sequence,
        pub_key: {
          type: `tendermint/PubKeySecp256k1`,
          value: publicKey.toString(`base64`)
        }
      })
    )
  })

  it(`createSignMessage`, () => {
    const vectors = [
      {
        tx,
        sequence: `33`,
        accountNumber: `6`,
        chainId: `lambda-chain-test`,
        signMessage: `{"account_number":"6","chain_id":"lambda-chain-test","fee":{"amount":[{"amount":"985","denom":"ulamb"}],"gas":"39416"},"memo":"","msgs":[{"type":"cosmos-sdk/MsgSend","value":{"amount":[{"amount":"1000000","denom":"ulamb"}],"from_address":"lambda163q4m634nq8les4nuvdvz49tk6aeh926t0ccsc","to_address":"lambda10a7pf73q86v06c7sq8hun2t4g4dunqnjgcrcyk"}}],"sequence":"33"}`
      },
      // {
      //   tx: txWithNulls,
      //   sequence: `0`,
      //   accountNumber: `1`,
      //   chainId: `tendermint_test`,
      //   signMessage: `{"account_number":"1","chain_id":"tendermint_test","fee":{"amount":[{"amount":"0","denom":""}],"gas":"21906"},"memo":"","msgs":[{"type":"cosmos-sdk/Send","value":{"inputs":[{"address":"cosmos1qperwt9wrnkg5k9e5gzfgjppzpqhyav5j24d66","coins":[{"amount":"1","denom":"STAKE"}]}],"outputs":[{"address":"cosmos1yeckxz7tapz34kjwnjxvmxzurerquhtrmxmuxt","coins":[{"amount":"1","denom":"STAKE"}]}]}}],"sequence":"0"}`
      // }
    ]

    vectors.forEach(
      ({ tx, sequence, accountNumber, chainId, signMessage }) => {
        expect(
          createSignMessage(tx, { sequence, accountNumber, chainId })
        ).toBe(signMessage)
      }
    )
  })

  
})
