import * as MessageConstructors from '../src/messages'

var senderAddress = `lambda163q4m634nq8les4nuvdvz49tk6aeh926t0ccsc`
var toAddress = `lambda10a7pf73q86v06c7sq8hun2t4g4dunqnjgcrcyk`
var validatorAddress = 'lambdavaloper1prrcl9674j4aqrgrzmys5e28lkcxmntxuvjpcl'
var amounts = [{
    "amount": "1000000",
    "denom": "ulamb"
}];
var amountsForTbb={
        "amount": "3000000000",
        "denom": "ulamb"
    }
var assetForLamb={
        "amount": "1000000",
        "denom": "utbb"
    }

describe("messgages", () => {
    it(`MsgSend`, () => {
        var result = MessageConstructors.MsgSend(senderAddress, {
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

    it(`MsgDelegate`, () => {
        var amount = "1000000";
        var denom = "utbb";
        var validatortype = 1;

        var result = MessageConstructors.MsgDelegate(senderAddress, {
            validatorAddress,
            amount,
            denom,
            validatortype
        })

        expect(result).toMatchObject(
            {
                "type": "lambda/MsgDelegate",
                "value": {
                    "amount": {
                        "amount": "1000000",
                        "denom": "utbb"
                    },
                    "delegator_address": "lambda163q4m634nq8les4nuvdvz49tk6aeh926t0ccsc",
                    "validator_address": "lambdavaloper1prrcl9674j4aqrgrzmys5e28lkcxmntxuvjpcl",
                    "validator_type": 1
                }
            }
        )
    })

    it(`MsgUndelegate`, () => {
        var amount = "1000000";
        var denom = "utbb";
        var validatortype = 1;

        var result = MessageConstructors.MsgUndelegate(senderAddress, {
            validatorAddress,
            amount,
            denom,
            validatortype
        })

        expect(result).toMatchObject(
            {
                "type": "lambda/MsgUndelegate",
                "value": {
                    "amount": {
                        "amount": "1000000",
                        "denom": "utbb"
                    },
                    "delegator_address": "lambda163q4m634nq8les4nuvdvz49tk6aeh926t0ccsc",
                    "validator_address": "lambdavaloper1prrcl9674j4aqrgrzmys5e28lkcxmntxuvjpcl",
                    "validator_type": 1
                }
            }
        )

    })

    it(`MsgWithdrawDelegationReward`, () => {
        

        var result = MessageConstructors.MsgWithdrawDelegationReward(senderAddress, {
            validatorAddress,
        })

        expect(result).toMatchObject(
            {
                "type": "cosmos-sdk/MsgWithdrawDelegationReward",
                "value": {
                    "delegator_address": "lambda163q4m634nq8les4nuvdvz49tk6aeh926t0ccsc",
                    "validator_address": "lambdavaloper1prrcl9674j4aqrgrzmys5e28lkcxmntxuvjpcl"
                }
            }
        )

    })

    it(`MsgAssetPledge`, () => {
        

        var result = MessageConstructors.MsgAssetPledge(senderAddress, {
            amounts:amountsForTbb, // [{ denom, amount }]
            asset:assetForLamb
        })

        expect(result).toMatchObject(
            {
                "type": "lambda/MsgAssetPledge",
                "value": {
                    "address": "lambda163q4m634nq8les4nuvdvz49tk6aeh926t0ccsc",
                    "asset": {
                        "amount": "1000000",
                        "denom": "utbb"
                    },
                    "token": {
                        "amount": "3000000000",
                        "denom": "ulamb"
                    }
                }
            }
        )

    })

    it(`MsgAssetDrop`, () => {
        

        var result = MessageConstructors.MsgAssetDrop(senderAddress, {
            amounts:amountsForTbb, // [{ denom, amount }]
            asset:assetForLamb
        })

        expect(result).toMatchObject(
            {
                "type": "lambda/MsgAssetDrop",
                "value": {
                    "address": "lambda163q4m634nq8les4nuvdvz49tk6aeh926t0ccsc",
                    "asset": {
                        "amount": "1000000",
                        "denom": "utbb"
                    },
                    "token": {
                        "amount": "3000000000",
                        "denom": "ulamb"
                    }
                }
            }
        )

    })


})