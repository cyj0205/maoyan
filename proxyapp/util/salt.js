// module.exports = {
//     secretKey: 'dudu_key'
// }

const crypto = require('crypto');
const data = {
    MD5_SUFFIX: 'dudu_salt',
    md5: (pwd) => {
        let md5 = crypto.createHash('md5');
        return md5.update(pwd+data.MD5_SUFFIX).digest('hex');
    },
    secretKey: 'dudu_key'
};

module.exports = data;