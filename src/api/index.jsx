import 'babel-polyfill';
import request from 'superagent';
import { add_message } from '../actions';
import { WebAPI } from '../constants';

class API {

    constructor(token) {
        this.api_key = token;
    }
    
    send(message) {
        return new Promise((resolve, reject) => {
            request.post(`${WebAPI.v1.ENDPOINTS.SEND_MESSAGE.URL}`)
                .set('Authorization', `Token token=${this.api_key}`)
                .set('Accept', 'application/json')
                .send({ message: message })
                .end((error, response) => {
                    if (error) {
                        console.error("API.send:", response);
                        reject(response);
                    } else {
                        console.log("API.send:", response);
                        resolve(response);
                    }
                });
        })
    }
    
    request(user) {
        return new Promise((resolve, reject) => {
            request.get(`${WebAPI.v1.ENDPOINTS.REQUEST_MESSAGES.URL}`)
                .set('Authorization', `Token token=${this.api_key}`)
                .set('Accept', 'application/json')
                .end((error, response) => {
                    if (error) {
                        console.error("API.request:", response);
                        reject(response);
                    } else {
                        console.log("API.request:", response);
                        resolve(response);
                    }
                });
        })
    }
}

export class MessageProvider {
    constructor(token, timespan=3000) {
        this.tag = 'MessageProvider';
        this.api = new API(token);
        this.timespan = timespan;
    }

    run(user, dispatch){
        setTimeout(() => { 
            this.api.request(user).then((data) => {
                dispatch(add_message(data.body))
                this.run(user, dispatch);
            }).catch((error) => {
                console.error(this.tag, error);
            });
        }, this.timespan);
    }
} 

export default API;