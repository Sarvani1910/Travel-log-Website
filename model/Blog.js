import mongoose from "mongoose";

const Schema = mongoose.Schema;
const blogSchema = new Schema({
    location:{
        type:String,
        required : true,
    },
    description:{
        type:String,
        required : true,
    },
    image:{
        type:String,
        required : true,
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required : true,
    },
    cost:{
        type:String,
        required : true,
    },
    places_to_visit:{
        type:String,
        required : true,
    }
});

export default mongoose.model("Blog",blogSchema);