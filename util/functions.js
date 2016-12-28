var functions = function(){

    var sendResponse = function(response, data, statusGood, error){
        if(error){
            return response.status(500).json(error);
        }
        return response.status(statusGood).json(data);
    };

    var handleStringEncryption = function(str){
        const secretkey = "Twilight 0f The Thunder G()d!";
        const crypto = require('crypto');
        const cipher = crypto.createCipher('aes192', secretkey);
        var encrypted =  cipher.update(str, 'utf8', 'hex');
        return encrypted += cipher.final('hex');
    };

    var handleStringDecryption = function(str){
        const crypto = require('crypto');
        const secretkey = "Twilight 0f The Thunder G()d!";
        const decipher = crypto.createDecipher('aes192', secretkey);
        var decrypted = decipher.update(str, 'hex', 'utf8');
        return decrypted += decipher.final('utf8');
    };

    return{
        printResponse: printResponse,
        handleStringEncryption: handleStringEncryption,
        handleStringDecryption: handleStringDecryption
    }
};

module.exports = functions();
