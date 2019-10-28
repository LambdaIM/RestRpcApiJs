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

    it(`MsgBeginRedelegate`, () => {
        var amount = "1000000";
        var denom = "utbb";
        var validatortype = 1;
        var validatorSourceAddress="lambdavaloper18j63yncsd8awmf5a6057rlfzxmqlfdntqnktef";
        var validatorDestinationAddress="lambdavaloper19zptal4p80w29kqjv4wrwyd4qm2y4u7wnjwcec";

        var result = MessageConstructors.MsgBeginRedelegate(senderAddress, {
            validatorSourceAddress,
            validatorDestinationAddress,
            amount,
            denom,
            validatortype
        })

        expect(result).toMatchObject(
            {
                "type": "lambda/MsgBeginRedelegate",
                "value": {
                    "amount": {
                        "amount": "1000000",
                        "denom": "utbb"
                    },
                    "delegator_address": "lambda163q4m634nq8les4nuvdvz49tk6aeh926t0ccsc",
                    "validator_dst_address": "lambdavaloper19zptal4p80w29kqjv4wrwyd4qm2y4u7wnjwcec",
                    "validator_src_address": "lambdavaloper18j63yncsd8awmf5a6057rlfzxmqlfdntqnktef",
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

    it(`MsgWithdrawValidatorCommission`, () => {
        

        var result = MessageConstructors.MsgWithdrawValidatorCommission(senderAddress, {
            validatorAddress,
        })

        expect(result).toMatchObject(
            {
                "type": "cosmos-sdk/MsgWithdrawValidatorCommission",
                "value": {
                    "validator_address": validatorAddress
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

    it(`MsgVote`, () => {
        
        var  proposalId=1;
        var option = 'yes';
        var result = MessageConstructors.MsgVote(senderAddress, {
            proposalId,
            option
        })

        expect(result).toMatchObject(
            {
                "type": "cosmos-sdk/MsgVote",
                "value": {
                    option,
                    proposal_id: proposalId,
                    voter: senderAddress
                }
            }
        )

    })

    it(`MsgDeposit`, () => {
        
        var  proposalId=1;
    
        var result = MessageConstructors.MsgDeposit(senderAddress, {
            proposalId,
            amounts
        })

        expect(result).toMatchObject(
            {
                "type": "cosmos-sdk/MsgDeposit",
                "value": {
                    amount:amounts,
                    depositor: senderAddress,
                    proposal_id: proposalId,
                    
                }
            }
        )

    })



    it(`MsgCreateSellOrder`, () => {
        var marketName='testname';
        var price='1';
        var rate=1;
        var sellSize=1;
        var machineName='xxxxName';
        var cancelTimeDuration=1;
        var minBuySize=1;
        var minBuyDuration=2;
        var maxBuyDuration=4;

        var result = MessageConstructors.MsgCreateSellOrder(senderAddress, {
            marketName,
            price,
            rate,
            sellSize,
            machineName,
            cancelTimeDuration,
            minBuySize,
            minBuyDuration,
            maxBuyDuration
        })

        expect(result).toMatchObject(
            {
                "type": "lambda/MsgCreateSellOrder",
                "value": {
                    address: senderAddress,
                    cancelTimeDuration:cancelTimeDuration,
                    machineName:machineName,
                    marketName:marketName,
                    maxBuyDuration:maxBuyDuration,
                    minBuyDuration:minBuyDuration,
                    minBuySize:minBuySize,
                    price:price,
                    rate:rate,
                    sellSize:sellSize
                
                    
                }
            }
        )

    })

    it(`MsgCreateBuyOrder`, () => {
        var duration='1';
        var size='1';
        var sellOrderId='1';
        var marketName='name';


        var result = MessageConstructors.MsgCreateBuyOrder(senderAddress, {
            duration,
            size,
            sellOrderId,
            marketName
        })

        expect(result).toMatchObject(
            {
                "type": "lambda/MsgCreateBuyOrder",
                "value": {
                    duration:duration,
                    size:size,
                    sellOrderId:sellOrderId,
                    marketName:marketName
                    
                }
            }
        )

    })


})