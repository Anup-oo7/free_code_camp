import mongoose from 'mongoose';
import Course from '../model/course.js';

const Connection = async(username, password)=>{
    const URL = `mongodb+srv://${username}:${password}@anup.rforof9.mongodb.net/`
   try{
    await mongoose.connect(URL, {useNewUrlParser:true})
    console.log('database connected')
    return Course.insertMany([
        { title: 'Web Development', duration: '12 weeks' },
        { title: 'Data Science', duration: '10 weeks' },
        { title: 'Machine Learning', duration: '8 weeks' }
      ]);
   }catch (error){
    console.log('error in connection', error)
   }
}

export default Connection;