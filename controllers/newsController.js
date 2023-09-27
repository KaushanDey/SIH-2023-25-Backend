import News from "../models/news.js";

export const postNews = async (req,res) => {

    const {news, type, location, time} = req.body;

    const emergencyNews = new News({
        news,
        type,
        location,
        time
    });

    try{
        await emergencyNews.save();
    }catch(err){
        console.log(err);
    }
    return res.status(200).json();
}

export const getNews = async (req,res) => {

    let emergencyNews;

    try{
        emergencyNews = await News.find();

        if(!emergencyNews){
            return res.status(404).json();
        }
        return res.status(200).json({emergencyNews});
    }catch(err){
        console.log(err);
    }
}