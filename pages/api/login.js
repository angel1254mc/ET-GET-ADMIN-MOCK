const jwt = require('jsonwebtoken');
const MongoClient = require('../../src/Mongo/MongoInit').client;
const bcrypt = require('bcrypt');
import { serialize } from "cookie";
import {setCookie} from 'cookies-next';

export default async (req, res) => {
    if (req.method != "POST") return res.status(400).json({message: "Incorrect request method"});

    const db = MongoClient.db('GlossaryEmergingTech');
    const collection = db.collection("Users");

    const {user, password} = req.body;
    if (!user || !password) return res.status(400).json({message: 'both username and password are required'});

    const userInDB = await collection.findOne({user: user});
    
    const compare = await bcrypt.compare(password, userInDB.password);
    console.log(compare);
    if (compare) {
        const refreshToken = jwt.sign(
            { "user": userInDB.user},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );

        await collection.updateOne(
            {user: user},
            {$set: {
                refreshToken: refreshToken,
            }},
            { upsert: true }
        ) //Update the user object with the refreshToken
        const serialised = serialize("etgetjwt", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge : 60*60*1000,
            path: "/",
        })
        res.setHeader("Set-Cookie", serialised);
        return res.status(200).json({
            message: `Login Successful, user ${user} is now logged in.` 
        }
        )
    }
}