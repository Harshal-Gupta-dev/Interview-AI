const mongoose = require("mongoose")
const { string } = require("zod")


const techinalQuestionSchema = mongoose.Schema({
    question: {
        type: String,
        required: [true, "Question is required"]
    },
    intention: {
        type: String,
        required: [true, "Intention is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
}, {
    _id: false
})

const behavioralQuestionSchema = mongoose.Schema({
    question: {
        type: String,
        required: [true, "Question is required"]
    },
    intention: {
        type: String,
        required: [true, "Intention is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
}, {
    _id: false
})



const skillGapSchema = mongoose.Schema({
    skill: {
        type: String,
        required: [true, "skill is required"]
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high", "hard",
            "Low", "Medium", "High", "Hard",
            "Minor", "minor", "Moderate", "moderate", "Critical", "critical"],
        required: [true, "Severity is required"]
    },
}, {
    _id: false
})


const preparationPlanSchema = mongoose.Schema({
    day: {
        type: String,
        required: [true, "Day is required"]
    },
    focus: {
        type: String,
        required: [true, "Focus is required"]
    },
    tasks: [{
        type: String,
        required: [true, "task is required"]
    }]
})

const interviewReportSchema = mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, "job Descriptionn is required"]
    },
    resume: {
        type: String,
    },
    selfDescription: {
        type: String,
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100
    },

    technicalQuestion: [techinalQuestionSchema],
    behavioralQuestion: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    title:{
        type:String,
        required:[true,"Title is required"]
    }

}, {
    timestamps: true
})


const interviewReportModel = mongoose.model("interviewReport", interviewReportSchema)

module.exports = interviewReportModel