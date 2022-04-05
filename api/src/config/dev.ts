// export const config = {
//     secrets: {
//         jwt: 'heythisisasecret'
//     },
//     dbUrl: process.env.DB_CONNECTION
// }

module.exports = {
    google_client_id: process.env.GOOGLE_CLIENT_ID || '1028122304328-nhs31gd8i2vqgmu5t7qikmj4pi7avkoo.apps.googleusercontent.com',
    google_client_domain: process.env.GOOGLE_CLIENT_DOMAIN || 'flutterwavego.com,flutterwave.co.tz',
    redirect_url: process.env.REDIRECT_URL || '',
    bcrypt_salt: process.env.BCRYPT_SALT || '12345abcde',
    email_username: process.env.EMAIL_USERNAME || '',
    email_password: process.env.EMAIL_PASSWORD || '',
    client_url: process.env.CLIENT_URL || 'https://wondrous-pastelito-a210e3.netlify.app',

}