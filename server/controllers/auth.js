const bcrypt = require('bcryptjs')

module.exports = {
    login: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { email, password } = req.body

            let userResponse = await db.getUserByEmail(email)
            let user = userResponse[0]

            if(!user){
                return res.status(401).send('Email not found')
            }

            const isAuthenticated = bcrypt.compareSync(password, user.password)

            if(!isAuthenticated){
                return res.status(403).send('Incorrect password')
            }

            delete user.password
            req.session.user = user

            res.send(req.session.user)

        } catch(error) {
            console.log('Error logging in:', error)
            res.status(500).send(error)
        }
    },

    register: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { name, email, password } = req.body

            let userResponse = await db.getUserByEmail(email)
            if(userResponse[0]){
                return res.status(409).send('Email already taken')
            }

            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)

            let response = await db.registerUser([name, email, hash])
            let newUser = response[0]

            delete newUser.password

            req.session.user = newUser
            res.send(req.session.user)

        } catch(error) {
            console.log('Error registering', error)
            res.status(500).send(erorr)
        }
    },

    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },

    getUser: (req, res) => {
        res.send(req.session.user)
    }
}