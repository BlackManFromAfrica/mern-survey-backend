import mongoose from "mongoose"

const PollSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        logoPosition: {
            type: String,
        },
        pages: {
            type: Array,
            required: true,
        },
        viewsCount: {
            type: Number,
            default: 0,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        results: {
            type: Array,
        },
        logo: {
            type: String,
        },
    
    }, {
    timestamps: true,
});

export default mongoose.model('Poll', PollSchema)

