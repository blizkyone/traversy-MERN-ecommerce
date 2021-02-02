import mongoose from 'mongoose'

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGODB_URL, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		})

		console.log(`MongoDB Connected: ${conn.connection.host}`.cyan)
	} catch (e) {
		console.error(`Error: ${e.message}`.red)
		process.exit(1)
	}
}

export default connectDB
