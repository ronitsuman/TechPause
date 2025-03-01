export const generateOTP = ()=>{
    return Math.floor(Math.random() * 100000 + 300000).toString()
}


