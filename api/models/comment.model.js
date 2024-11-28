import mongoose from "mongoose";

const commnetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    likes: {
        type: Array,
        default: [],
    },
    numberOfLikes: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true
});

const Comment = mongoose.model("Comment", commnetSchema);
export default Comment;