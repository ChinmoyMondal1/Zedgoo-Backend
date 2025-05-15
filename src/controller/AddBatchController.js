
const addBatch = require('../models/Batchmodels/AddBatch')
const AddUserBatches = require('../models/Batchmodels/AddUserBatches')
const validate = require('../models/Batchmodels/Enrollmentvalidate')

const AddBatchControl = async(req,res)=>{
        const {Batchid,Batchname,subject,trainer} = req.body;
        console.log(req.body);

        if(!Batchid || !Batchname || !subject || !trainer){
            console.log("All fields must be filled");
            return res.status(400).json({success:false,message :" All Fields must be filled"})
        }
        try{
            const enrollcheck = await validate(trainer);
            if(!enrollcheck.success){
                return res.json({success:false,message:enrollcheck.message})
            }
            const batch = await addBatch(Batchid,Batchname,subject);
            if(!batch.success){
                return res.json({success:false,message:"Batch not added"})
            }
            const userbatch = await AddUserBatches(Batchid,trainer);

           const response = {
                batch,
                userbatch,
                success:batch.success && userbatch.success
            }

            if(response.success){
                return res.status(201).json({success:true,response})
            }
            else{
                return res.status(500).json({success:false,response})

            }
        }
        catch(err){
            console.error(err.message)
            return res.status(500).json({success:false,message:"Error occured in Controller"})
        }
}

module.exports = AddBatchControl;