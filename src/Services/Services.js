import axios from "axios";

// const CREATE_APP_URL = "http://127.0.0.1:8080/create"
// const READ_APP_URL = "http://127.0.0.1:8080/read"
// const DELETE_APP_URL = "http://127.0.0.1:8080/delete"
// const READ_APPS_URL = "http://127.0.0.1:8080/read_apps"
// const CREATE_CLIENT_URL = "http://127.0.0.1:8080/create_client"
// const READ_CLIENT_URL = "http://127.0.0.1:8080/read_client"
// const DELETE_USER_URL = "http://127.0.0.1:8080/delete_client"
// const LOGIN_URL = "http://127.0.0.1:8080/login"
// const CREATE_STOCKS_URL = "http://127.0.0.1:8080/create_stocks"
// const READ_STOCK_URL = "http://127.0.0.1:8080/read_stock"
// const DELETE_STOCK_URL = "http://127.0.0.1:8080/delete_stock"
// const CREATE_ORDER_URL = "http://127.0.0.1:8080/create_order"
// const READ_ORDER_URL = "http://127.0.0.1:8080/read_order"
// const CREATE_EMPLOYEE_URL = "http://127.0.0.1:8080/create_employee"
// const READ_EMPLOYEES_URL = "http://127.0.0.1:8080/read_employees"
// const UPDATE_EMPLYEE_URL = "http://127.0.0.1:8080/update_client"
// const DELETE_ORDER_URL = "http://127.0.0.1:8080/delete_order"

const CREATE_APP_URL = "https://arbufe49zb.execute-api.eu-north-1.amazonaws.com/V1/create"
const READ_APP_URL = "https://arbufe49zb.execute-api.eu-north-1.amazonaws.com/V1/read"
const DELETE_APP_URL = "https://arbufe49zb.execute-api.eu-north-1.amazonaws.com/V1/delete"
const READ_APPS_URL = "https://arbufe49zb.execute-api.eu-north-1.amazonaws.com/V1/read_apps"
const CREATE_CLIENT_URL = "https://3q8wgo8ddd.execute-api.eu-north-1.amazonaws.com/V1/create_client"
const READ_CLIENT_URL = "https://3q8wgo8ddd.execute-api.eu-north-1.amazonaws.com/V1/read_client"
const DELETE_USER_URL = "https://3q8wgo8ddd.execute-api.eu-north-1.amazonaws.com/V1/delete_client"
const LOGIN_URL = "https://3q8wgo8ddd.execute-api.eu-north-1.amazonaws.com/V1/login"
const CREATE_STOCKS_URL = "https://0bs1grlk8c.execute-api.eu-north-1.amazonaws.com/V1/create_stocks"
const READ_STOCK_URL = "https://0bs1grlk8c.execute-api.eu-north-1.amazonaws.com/V1/read_stock"
const DELETE_STOCK_URL = "https://0bs1grlk8c.execute-api.eu-north-1.amazonaws.com/V1/delete_stock"
const CREATE_ORDER_URL = "https://paj7cgiu44.execute-api.eu-north-1.amazonaws.com/V1create_order"
const READ_ORDER_URL = "https://paj7cgiu44.execute-api.eu-north-1.amazonaws.com/V1/read_order"
const CREATE_EMPLOYEE_URL = "https://3q8wgo8ddd.execute-api.eu-north-1.amazonaws.com/V1/create_employee"
const READ_EMPLOYEES_URL = "https://3q8wgo8ddd.execute-api.eu-north-1.amazonaws.com/V1/read_employees"
const UPDATE_EMPLYEE_URL = "https://3q8wgo8ddd.execute-api.eu-north-1.amazonaws.com/V1/update_client"
const DELETE_ORDER_URL = "https://paj7cgiu44.execute-api.eu-north-1.amazonaws.com/V1/delete_order"

class BackendService {

    create_app(this_email, this_app_name, this_description, this_token) {
        return axios.post(CREATE_APP_URL, {
            email: this_email,
            desc: this_description,
            app_name: this_app_name
        }, {
            headers: {
                'Content-Type': 'multipart/json',
                'Authorization': 'Bearer ' + this_token
            }
        });
    };

    login(this_username, this_sha_pass) {
        return axios.post(LOGIN_URL, {
            email: this_username,
            password: this_sha_pass
        }, {
            headers: {
                'Content-Type': 'multipart/json'
            }
        });
    };

    create_client(this_email, this_password, this_name){
        return axios.post(CREATE_CLIENT_URL, {
            email: this_email,
            password: this_password,
            name: this_name,
            perms: "admin"
        }, {
            'Content-Type': 'multipart/json'
        });
    }
    
    read_apps(this_email, this_app_key, this_token) {
        return axios.post(READ_APPS_URL, {
            email: this_email,
            app_key: this_app_key
        }, {
            headers: {
                'Content-Type': 'multipart/json',
                'Authorization': 'Bearer ' + this_token
            }
        });
    };

    create_order(this_app_key, this_emp_eml, this_order, this_token) {
        return axios.post(CREATE_ORDER_URL, {
            app_key: this_app_key,
            emp_eml: this_emp_eml,
            order: this_order
        }, {
            headers: {
                'Content-Type': 'multipart/json',
                'Authorization': 'Bearer ' + this_token
            }
        });
    };

    read_orders(this_app_key, this_emp_eml, this_token) {
        return axios.post(READ_ORDER_URL, {
            app_key: this_app_key,
            emp_eml: this_emp_eml
        }, {
            headers: {
                'Content-Type': 'multipart/json',
                'Authorization': 'Bearer ' + this_token
            }
        });
    };

    read_stocks(this_app_key, this_token){
        return axios.post(READ_STOCK_URL, {
            app_key: this_app_key
        }, {
            headers: {
                'Content-Type': 'multipart/json',
                'Authorization': 'Bearer ' + this_token
            }
        });
    }

    create_stocks(this_app_key, this_stocks, this_token){
        return axios.post(CREATE_STOCKS_URL, {
            app_key: this_app_key,
            stocks: this_stocks
        }, {
            headers: {
                'Content-Type': 'multipart/json',
                'Authorization': 'Bearer ' + this_token
            }
        });
    }

    create_employee(this_app_key, this_emp_email, this_emp_password, this_emp_name, this_perm, this_token){
        return axios.post(CREATE_EMPLOYEE_URL, {
            app_key: this_app_key,
            email: this_emp_email,
            password: this_emp_password,
            name : this_emp_name,
            token: this_token,
            perms: this_perm
        }, {
            headers: {
                'Content-Type': 'multipart/json',
                'Authorization': 'Bearer ' + this_token
            }
        })
    }

    read_employees(this_app_key, this_token){
        return axios.get(READ_EMPLOYEES_URL, {
            params: {
                app_key: this_app_key
            }
        }, {
            headers: {
                'Content-Type': 'multipart/json',
                'Authorization': 'Bearer ' + this_token
            }
        })
    }

    delete_employee(this_app_key, this_emp_email, this_token){
        return axios.delete(DELETE_USER_URL, {
        data : {
                app_key: this_app_key,
                email: this_emp_email
               }
        }, {
            headers: {
                'Content-Type': 'multipart/json',
                'Authorization': 'Bearer ' + this_token
            }
        })
    }

    update_employee(this_emp_email, this_emp_name, this_emp_permis, this_token){
        return axios.post(UPDATE_EMPLYEE_URL, {
            email: this_emp_email,
            name: this_emp_name,
            permis: this_emp_permis
        }, {
            headers: {
                'Content-Type': 'multipart/json',
                'Authorization': 'Bearer ' + this_token
            }
        })
    }

    delete_order(this_app_key, this_order_id, this_emp_permis, this_order, this_token){
        return axios.delete(DELETE_ORDER_URL, {
            data : {
                    ak: this_app_key,
                    order_id: this_order_id,
                    permis: this_emp_permis,
                    order: this_order
                }
            }, {
            headers: {
                'Content-Type': 'multipart/json',
                'Authorization': 'Bearer ' + this_token
            }
        })
    }
};

export default new BackendService();
