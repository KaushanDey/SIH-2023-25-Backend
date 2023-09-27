import News from "../models/news.js";

export const postNews = async (req,res) => {

    const {news, type, location, time, isApproved} = req.body;

    const emergencyNews = new News({
        news,
        type,
        location,
        time,
        isApproved
    });

    try{
        await emergencyNews.save();
    }catch(err){
        console.log(err);
    }
    return res.status(200).json();
}

export const getNews = async (req,res) => {

    const location = req.params.district;

    try{
        let news = await News.find();

        if(!news){
            return res.status(404).json();
        }

        let filteredNews = [];
        for(let i=0;i<news.length;i++){
            if(location===news[i].location){
                filteredNews.push(news[i]);
            }
        }
        news = filteredNews;
        return res.status(200).json({news});
    }catch(err){
        console.log(err);
    }
};

export const getNewsByType = async (req,res) => {

    const type = req.params.type;

    try{
        let news = await News.find();

        if(!news){
            return res.status(404).json();
        }

        let filteredNews = [];
        for(let i=0;i<news.length;i++){
            if(type===news[i].type){
                filteredNews.push(news[i]);
            }
        }
        news = filteredNews;
        return res.status(200).json({news});
    }catch(err){
        console.log(err);
    }
};

export const newsApproval = async (req,res) => {

    const nid = req.params.nid;
    const isApproved = "True";
    try{
        let news = await News.findByIdAndUpdate(nid,{
            isApproved
        });
        if(!news){
            return res.status(500).json();
        }
        return res.status(200).json();
    }catch(err){
        console.log(err);
    }
};