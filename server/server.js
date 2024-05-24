import 'dotenv/config'
import express from 'express'
import Stripe from 'stripe'

const app = express()
const PORT = 8080
const KEY = process.env.STRIPE_KEY
const PUBLIC_KEY = process.env.PUBLIC_KEY
const stripe = Stripe(KEY)

const storeItems = [
    1,{
        priceInCents: 10000,
        name: "Dope Shirts"
    },
    2, {
        priceInCents: 20000,
        name: "Dope Pants"
    }
]

app.use(express.json())
app.get('/', (req, res) => {
    res.json('Here')
})

app.post('/', async (req, res) => {
    try {
        const response = await stripe.checkout.sessions.create(req.body)
        res.status(200).json(response)
        
    } catch (error) {
        res.status(400).json(error)
        
    }
    
})


app.listen(PORT, () => {
    console.log("LIstening to you")
})

