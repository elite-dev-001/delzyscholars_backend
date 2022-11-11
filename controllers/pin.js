const pinSchema = require('../models/pin')


const checkPin = async (req, res) => {
    const {activationPin, materialId} = req.body
    
    const pin = await pinSchema.findOne({ activationPin }).lean();

    if(pin){
        const status = pin['activated']
        if(status){
            res.status(200).json({message: 'Pin has already been used', status: 'used'})
        } else if(materialId !== pin['materialId']){
            res.status(200).json({message: 'You\'re are trying to activate an invalid course. Make sure you\'re using the activation code for the right course', status: 'bad'})
        }else {
            const usePin = await pinSchema.findByIdAndUpdate(
                {_id: pin['_id']}, {
                    $set: {
                        activated: true
                    }
                }, {new: true}
            )
            if(usePin) {
                res.status(200).json({message: 'Pin used successfully', status: 'ok'})
            }
        }
    } else {
        res.status(200).json({message: 'Invalid Activation Pin. Please purchase a course to recieve your Activation Pin', status: 'invalid'})
    }
}

module.exports = {checkPin}