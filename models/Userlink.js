import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
    url: {type: String,required: true},
    urltext: {type: String,required: true}
})

const UserLinkschema = new mongoose.Schema({
    userId: { type: String, required: true },
    links: [LinkSchema]
})

export default mongoose.models.UserLink || mongoose.model("UserLink", UserLinkschema);