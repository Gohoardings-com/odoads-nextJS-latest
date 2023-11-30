const jwtToken = require('jsonwebtoken')
const cookie = require('cookie')
const catchError = require('./catchError');

export const token = catchError(async (userid, statuscode, res) => {
    const token = jwtToken.sign({id: userid}, "thisismysecretejsonWebToken", {
        expiresIn: "7d",
    });
    const option = {
        path: '/',
        httpOnly:true,
        expires: new Date(Date.now() + 7 * 24 * 3600000),
        httpOnly: false,
        sameSite: 'strict',
    } 
    return res.status(statuscode).setHeader("Set-Cookie",cookie.serialize(`odoads_goh`, token, option)).json({
        success: true,
        message: "Login Successfully"
    })  
})

export const outtoken = catchError(async (userid, statuscode, res) => {
    const token = jwtToken.sign({id: userid}, "thisismysecretejsonWebToken", {
        expiresIn: "7d",
    });
    const option = {
        path: '/',
        httpOnly:true,
        expires: new Date(Date.now() + 7 * 24 * 3600000),
        httpOnly: false,
        sameSite: 'strict',
    } 
    res.setHeader("Set-Cookie",cookie.serialize(`paid`, token, option))
})

export const outverifyToken = async (req, res, next) => {

    const cookieData = req.cookies;
    if (!cookieData) {
        return res.status(400).json({message: "No Cookie Found"}) 
    }
    const key = `paid`
    const token = cookieData[key];
    if (!token) {
        return res.status(206).json({message: "No Token Found"})
    } else {
        return jwtToken.verify(token,  "thisismysecretejsonWebToken", async (err, user) => {
            if (err) {
                return res.status(206).json({message: "InValid Token"});
            } else {
        const data = user.id
        const getid = data.split('&')
        if(getid){
            const staffid = getid[0]
            const comapny = getid[1]
          req.id = {userid:  staffid, code : comapny}
        }
            }
        })
    }
}

export const verifyToken = async (req, res, next) => {

    const cookieData = req.cookies;
    if (!cookieData) {
        return res.status(400).json({message: "No Cookie Found"}) 
    }
    const key = `odoads_goh`
    const token = cookieData[key];
    if (!token) {
        return res.status(206).json({message: "No Token Found"})
    } else {
        return jwtToken.verify(token,  "thisismysecretejsonWebToken", async (err, user) => {
            if (err) {
                return res.status(206).json({message: "InValid Token"});
            } else {
        const data = user.id
        const getid = data.split('&')
        if(getid){
            const staffid = getid[0]
            const comapny = getid[1]
          req.id = {userid:  staffid, code : comapny}
        }
            }
        })
    }
}

export  function mysql_real_escape_string(str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\% ]/g, function (char) {
        switch (char) {
            case "\0":
                return "0";
            case "\x08":
                return "b";
            case "\x09":
                return "t";
            case "\x1a":
                return "z";
            case "\n":
                return "n";
            case "\r":
                return "r";
            case " ":
                return "_"; 
            case "\"":
            case "'":
            case "\\":
            case "%":
                return ""; 
        }
    });
}

export function formatDate(date) {
    const parts = date.split('-');
    const formattedDate = `${parts[0]}-${parts[1]}-${parts[2]}`;
    return formattedDate;
  }  
  


 