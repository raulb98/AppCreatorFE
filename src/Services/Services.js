import axios from "axios";

const CREATE_APP_URL = "http://127.0.0.1:8080/create"
const READ_APP_URL = "http://127.0.0.1:8080/read"
const DELETE_APP_URL = "http://127.0.0.1:8080/delete"
const READ_APPS_URL = "http://127.0.0.1:8080/read_apps"
const CREATE_CLIENT_URL = "http://127.0.0.1:8080/create_client"
const READ_CLIENT_URL = "http://127.0.0.1:8080/read_client"
const DELETE_USER_URL = "http://127.0.0.1:8080/delete_client"
const READ_CLIENT_KEY_URL = "http://127.0.0.1:8080/read_client_key"
const LOGIN_URL = "http://127.0.0.1:8080/login"
const CREATE_STOCKS_URL = "http://127.0.0.1:8080/create_stocks"
const READ_STOCK_URL = "http://127.0.0.1:8080/read_stock"
const DELETE_STOCK_URL = "http://127.0.0.1:8080/delete_stock"
const CREATE_ORDER_URL = "http://127.0.0.1:8080/create_order"
const READ_ORDER_URL = "http://127.0.0.1:8080/read_order"

class BackendService {
    login(this_username, this_user_key, this_sha_pass) {
        return axios.post(LOGIN_URL, {
            email: this_username,
            foreign_key: this_user_key,
            password: this_sha_pass
        }, {
            headers: {
                'Content-Type': 'multipart/json'
            }
        });
    };

    read_apps(this_username, this_token) {
        return axios.post(READ_APPS_URL, {
            email: this_username
        }, {
            headers: {
                'Content-Type': 'multipart/json',
                'Authorization': 'Bearer ' + this_token
            }
        });
    };

    create_order(this_app_key, this_intermediate, this_order, this_token) {
        return axios.post(CREATE_ORDER_URL, {
            app_key: this_app_key,
            intermediate: this_intermediate,
            order: this_order
        }, {
            headers: {
                'Content-Type': 'multipart/json',
                'Authorization': 'Bearer ' + this_token
            }
        });
    };

    read_orders(this_app_key, this_token) {
        return axios.post(READ_ORDER_URL, {
            app_key: this_app_key
        }, {
            headers: {
                'Content-Type': 'multipart/json',
                'Authorization': 'Bearer ' + this_token
            }
        });
    };
};

export default new BackendService();