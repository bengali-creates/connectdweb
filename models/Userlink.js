import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
    link: {type: String,required: true},
    linktext: {type: String,required: true}
})

const UserLinkschema = new mongoose.Schema({
    
    links: [LinkSchema]
})

export default mongoose.models.UserLink || mongoose.model("UserLink", UserLinkschema);