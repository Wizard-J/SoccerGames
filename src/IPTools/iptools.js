
const getRandomNum = (min, max) => {
    return Math.floor(min + Math.random() * (max - min + 1));
}

// 伪造请求IP
export const getRandomIp = () => {
    return getRandomNum(1, 255) + '.' + getRandomNum(1, 255) + '.' + getRandomNum(1, 255) + '.' + getRandomNum(1, 255);
}

// 随机时间生成
export const randomTimer = (min,max)=>{
    
    // 生成一个min秒-max秒的随机时间毫秒计时
    return getRandomNum(min,max)*1000;

}