

import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
    title:{
        type: String,
    },
    duration:{
        type: String,
       
    }
})

const Course = mongoose.model('course',courseSchema)

export default Course;