import 'dotenv/config'
import express from 'express'
import Stripe from 'stripe'
import cors from 'cors'


const app = express()
const PORT = 8080
const KEY = process.env.STRIPE_KEY
const PUBLIC_KEY = process.env.PUBLIC_KEY
const stripe = Stripe(KEY)

const storeItems = [
   {
    price_data: {
        currency: 'usd',
        product_data: {
            name: 'Working API please'
        },
        unit_amount: 50 * 100
    },
    quantity: 1
   }
]

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())


app.get('/checkout', (req, res) => {
    res.json('Here')
})

app.post('/checkout', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: storeItems,
            mode: 'payment',
            success_url: 'http://localhost:5173/success'
        })
        res.status(200).json({url: session.url})
    } catch (error) {
        res.status(400).json( error)
        console.log('From server', error)
        
    }
    
})


app.listen(PORT, () => {
    console.log("LIstening to you")
})

