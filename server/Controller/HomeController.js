const axios = require("axios");

const HomeController = {
    getHomePage : (request, response)=>{
        response.send({
            call: true,
            message: "Welcome to home"
        })
    },
    getIpInfo: async(request, response)=>{
        const API_KEY = "at_cv1Vp2YIXDR63tEE23KqK001DVL7Z";
        const {ipAddress} = request.params;
        
        try {
            const result = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ipAddress}`);
            console.log(result)
            response.json({
                call: true,
                result: result.data
            })
        } catch (error) {
            console.error("Error fetchingIP data: " + error);
            response.status(500).json({ error: 'An error occurred while fetching IP data' });
        }
    }
}

module.exports = HomeController