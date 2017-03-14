import 'babel-polyfill';
import request from 'superagent';
import { add_message } from '../actions';
import { WebAPI, Strings } from '../constants';

class API {

    constructor(token) {
        this.api_key = token;
    }

    _send(resolve, reject, req, message) {
        req.send({ token: this.api_key, message: message })
            .end((error, response) => {
                if (error) {
                    if (error.status == 401) {
                        console.error(Strings.AUTH_EXCEPTION_CLIENT_MSG);
                        alert(Strings.AUTH_EXCEPTION_USER_MSG);
                    }
                    console.error(`API.send: status: ${response.status} ${response.statusText}. ${response.text}`, response);
                    reject(response);
                } else {
                    resolve({response: response, message: message});
                }
            });
    }

    send(message) {
        return new Promise((resolve, reject) => {
            const req = request.post(`${WebAPI.v1.ENDPOINTS.SEND_MESSAGE.URL}`)
                .set('Authorization', `Token token=${this.api_key}`)
                .set('Accept', 'application/json');
            if (message.files) {
                this.send_files(message).then( (response) => {
                    delete message.files;
                    const new_message = Object.assign({}, message, { attachments: response.attachments });
                    this._send(resolve, reject, req, new_message);
                }).catch((error) => {
                    console.error("Problem sending file:", error);
                    reject(error);
                });
            } else {
                this._send(resolve, reject, req, message);
            }
        });
    }

    send_files(message) {
        return new Promise((resolve, reject) => {
            let attachments = [];
            for (let file of message.files) {
                const req = request.post(`${WebAPI.v1.ENDPOINTS.SEND_FILE.URL}`)
                    .set('Authorization', `Token token=${this.api_key}`)
                    .set('Accept', 'application/json')
                    .on('progress', (e) => {
                        console.log('uploading file ', file.name,'... ', e.percent, '%');
                    });
                const formData = new FormData();
                formData.append(`token`, this.api_key);
                formData.append(`author_id`, message.author.id);
                formData.append(`author_name`, message.author.name);
                formData.append(`file`, file);
                req.send(formData)
                    .end((error, response) => {
                        if (error) {
                            if (error.status == 401) {
                                console.error(Strings.AUTH_EXCEPTION_CLIENT_MSG);
                                alert(Strings.AUTH_EXCEPTION_USER_MSG);
                            }
                            console.error(`API.send: status: ${response.status} ${response.statusText}. ${response.text}`, response);
                            reject(response);
                        } else {
                            attachments.push(response.body);
                        }
                    });
            }
            resolve({attachments: attachments});
        });
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
        this.intervalId = null;
        this.running = false;
    }

    run(user, dispatch){
        this.running = true;
        this._run(user, dispatch);
    }

    _run(user, dispatch) {
        this.intervalId = setInterval(() => {
            if (this.running) {
                this.api.request(user).then((data) => {
                    if (data.body !== []) {
                        for (let message of data.body) {
                            dispatch(add_message(message));
                        }
                    }
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
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
        }
    }
}

export default API;
