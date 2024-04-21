import express from "express"
import axios from "axios"
import cors from "cors"

const url = `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode`
const proxyPort = 8080
const app = express();


app.use(
    cors({
        origin: "*"
    })
)

app.get("/api/:input", async (req, res) => {
    try {
        const postCode = req.params.input
        const apiEndpoint= `${url}/${postCode}`
        const response = await axios.get(apiEndpoint);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error fetching data from external API'})
    }
})

app.listen(proxyPort, () => {
    console.log(`Proxy server is running on port ${proxyPort}`);
});