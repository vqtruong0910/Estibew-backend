require('dotenv').config()

module.exports = { 
    CLIENT_URL: "http://localhost:3000",
    SERVER_URL: `http://localhost:${process.env.SERVER_PORT || 5000}`,
    JWT_SECRET: "sdjsadn123mkanevajnsecszpp1",

    NODEMAILER: {
        EMAIL: "gnoob53@gmail.com",
        PASSWORD: "vbbqzleavztewocu",
    },

    STRIPE: {
        PRIVATE_KEY: "sk_test_51Lef3dDPF5H7ZtpR41jI9E3O29RUuJrZ60qe4PKqryoL1k2pebxhsY2DwVOUkyVFRUmuYOYE67l76LJLqVTvHozG009t29w0rV"
    },
    COULDINARY: {
        NAME: 'vokethu5',
        API_KEY: '682893794781665',
        API_SECRET: 'nGPDWcFeJnqPY7W-1eRGSsY_aoY'
    }
 }

