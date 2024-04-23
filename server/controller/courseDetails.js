// routes/courseRouter.js

import Course from '../model/course.js';


export const courseRouter = async(req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};


