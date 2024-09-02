/*import jwt from 'jsonwebtoken';
import cookie from 'js-cookie'

interface TokenData {
    token : string,
    expiresIn : number
}

interface DataInToken {
    _id : string
}

function createToken(user:any):TokenData {
    const expiresIn = 3600
    const secret:any = process.env.JWT_SECRET
    const dataStoredInToken:DataInToken = {
        _id : user.id
    }
    return {
        token: jwt.sign(dataStoredInToken, secret, {expiresIn}),
        expiresIn: expiresIn
    }
}

*/