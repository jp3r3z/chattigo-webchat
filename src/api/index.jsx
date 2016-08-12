import 'babel-polyfill';
import request from 'superagent';
import { add_message } from '../actions';
import { WebAPI, Strings } from '../constants';

class API {

    constructor(token) {
        this.api_key = token;
    }

    send(message) {
        return new Promise((resolve, reject) => {
            const req = request.post(`${WebAPI.v1.ENDPOINTS.SEND_MESSAGE.URL}`)
                .set('Authorization', `Token token=${this.api_key}`)
                .set('Accept', 'application/json');
            if (message.files) {
                const formData = new FormData();
                for (let key in message.files) {
                    if (message.files.hasOwnProperty(key) && message.files[key] instanceof File) {
                        formData.append(`files[${key}]`, message.files[key]);
                    }
                }
                delete message.files
                req.send(formData)
            }
            req.send({ token: this.api_key, message: message })
                .on('progress', (e) => {
                    console.log('uploading file... ', e.percent, '%');
                })
                .end((error, response) => {
                    if (error) {
                        if (error.status == 401) {
                            console.error(Strings.AUTH_EXCEPTION_CLIENT_MSG);
                            alert(Strings.AUTH_EXCEPTION_USER_MSG);
                        }
                        console.error(`API.send: status: ${response.status} ${response.statusText}. ${response.text}`, response);
                        reject(response);
                    } else {
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
                .query({ user: user, token: this.api_key })
                .end((error, response) => {
                    if (error) {
                        if (error.status == 401) {
                            console.error(Strings.AUTH_EXCEPTION_CLIENT_MSG);
                            alert(Strings.AUTH_EXCEPTION_USER_MSG);
                        }
                        console.error(`API.request: status: ${response.status} ${response.statusText}. ${response.text}`, response);
                        reject(response);
                    } else {
                        resolve(response);
                    }
                });
        })
    }
}

export class ReverseGeocodingProvider {

    constructor(){
        this.tag = 'ReverseGeocodingProvider';
    }

    get(lat, lon) {
        return new Promise((resolve, reject) => {
            request.get(`${WebAPI.Nominatim.ReverseGeocoding.URL}`)
                .set('Accept', 'application/json')
                .query({ format: 'json', lat: lat, lon: lon })
                .end((error, response) => {
                    if (error) {
                        console.error(`${this.tag}.get: status: ${response.status} ${response.statusText}. ${response.text}`, response);
                        reject(response);
                    } else {
                        resolve(response);
                    }
                });
        })
    }
}

export class MessageProvider {
    constructor(token, api=false, timespan=5000) {
        this.tag = 'MessageProvider';
        if (!api){
            this.api = new API(token);
        } else {
            this.api = api;
        }
        this.timespan = timespan;
        this.running = false;
    }

    run(user, dispatch){
        this.running = true;
        this._run(user, dispatch);
    }

    _run(user, dispatch) {
        setTimeout(() => {
            if (this.running) {
                this.api.request(user).then((data) => {
                    if (data.body !== []) {
                        for (let message of data.body) {
                            dispatch(add_message(message));
                        }
                    }
                    this.run(user, dispatch);
                }).catch((error) => {
                    console.error(this.tag, error);
                });
            } else {
                return;
            }
        }, this.timespan);
    }

    stop() {
        this.running = false;
    }
}

export default API;
