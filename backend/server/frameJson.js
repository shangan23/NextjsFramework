'use strict';
const Msg = require('./messages').Messages;
module.exports = (res, method) => {
    if (res['errors']) {
        return { httpCode: 400, message: { type: Msg.ERROR, message: res['errors'][0].message } };
    } else {
        let recordMessage;
        switch (method) {
            case 'POST':
                recordMessage = Msg.newRecord;
                break;
            case 'PUT':
                recordMessage = Msg.updateRecord;
                break;
            case 'DELETE':
                recordMessage = Msg.deleteRecord;
                break;
        }
        //console.log('recordMessage',recordMessage);
        return { httpCode: 200, message: { type: Msg.SUCCESS, message: recordMessage } };
    }
}