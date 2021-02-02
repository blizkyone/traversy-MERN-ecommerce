import bcrypt from 'bcryptjs'

const users = [
	{
		name: 'Admin user',
		email: 'admin@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
	},
	{
		name: 'John Doe',
		email: 'john@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
	},
	{
		name: 'Jane Doe',
		email: 'Jane@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
	},
	{
		name: 'Alex Doe',
		email: 'alex@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
	},
]

export default users
