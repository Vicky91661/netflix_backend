const { genAI } = require("../utils/openAI");

const gptController = async(req,res)=>{
    try {
        const prompt = req.body.prompt;
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        res.status(200).json({
            message:text
        })
    } catch (error) {
        res.status(400).json({
            message:"Something went wrong while fetching from Gemini Api"
        })
    }
   
}

module.exports = {gptController};