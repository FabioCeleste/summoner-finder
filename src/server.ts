import app from './app'
import dotven from 'dotenv'
dotven.config()

app.listen(process.env.PORT || 3000)
