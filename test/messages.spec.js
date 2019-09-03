import * as MessageConstructors from '../src/messages'

var senderAddress=`lambda163q4m634nq8les4nuvdvz49tk6aeh926t0ccsc`
var toAddress=`lambda10a7pf73q86v06c7sq8hun2t4g4dunqnjgcrcyk`
var amounts=[{
        "amount": "1000000",
        "denom": "ulamb"
      }]

describe("messgages",()=>{
    it(`MsgSend`, () => {
      var result=   MessageConstructors.MsgSend(senderAddress,{
            toAddress,
            amounts
        })
    
        expect(result).toMatchObject(
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
        )
      })
})