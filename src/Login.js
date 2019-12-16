import React, { Component } from 'react';
import PostData from './PostData';
import { Redirect } from 'react-router-dom';
import axios from "axios";
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: false
        }
        this.onChange = this.onChange.bind(this);
        this.login = this.login.bind(this);
        this.loginFunction = this.loginFunction.bind(this);
        // this.loginTwo = this.loginTwo.bind(this);
    }

    login() {
        PostData(this.state).then((result => {
            let responseJSON = result;

            if (responseJSON.token) {
                sessionStorage.setItem('userData', responseJSON)
                this.setState({
                    redirect: true
                })

            } else {
                alert('no data');
            }
        }))
    }


    getLoginInfo(id, authToken) {
        axios({
            method: "GET",
            url: `https://api-dev-commercio.leroymerlin.it/api/v1/customer/1_0_0/profilelight/get/${id}`,
            headers: {
                "x-square-api-key": "testToken",
                "x-square-auth-token": authToken,
                "x-square-user-ID": id
            }
        }).then(res => console.log(res.data));
    }
    loginFunction(username, password) {
        axios({
            method: "POST",
            url:
                "https://api-dev-commercio.leroymerlin.it/api/v1/customer/1_0_0/authentication/login",
            headers: {
                "x-square-api-key": "testToken",
                "Content-Type": "application/json; charset=utf-8"
            },
            data: {
                rememberMe: false,
                username: username,
                password: password
            }
        }).then(res => {
            const response = res.data.status;
            if (response === "KO") {
                alert("errorio");
            } else {

                const id = res.data.content.customerID;
                const authToken = res.data.content.authenticationToken;
                this.getLoginInfo(id, authToken);
                this.setState({
                    redirect: true
                })
            }
        });
    }
    onChange(e) {
        this.setState(
            { [e.target.name]: e.target.value })
    }
    render() {
        const { username, password } = this.state;
        if (this.state.redirect) {
            return (<Redirect to={'/StoreLocations'} />)
        } if (sessionStorage.getItem('userData')) {
            return (<Redirect to={'/StoreLocations'} />)
        }
        return (

            <div className='wrapper'>
                <div className='form-wrapper'>
                    <h1>Create Account</h1>
                    <form >
                        <div className='firstName'>
                            <label htmlFor='firstName'>First Name</label>
                            <input
                                type='text'

                                placeholder='First Name'
                                name='username' value={username}
                                onChange={this.onChange}
                            ></input>

                        </div>


                        <div className='password'>
                            <label htmlFor='password'>Password</label>
                            <input
                                type='password'

                                placeholder='Password'
                                name='password'
                                onChange={this.onChange} value={password}

                            ></input>

                        </div>
                        <div className='createAccount'>
                            <button onClick={this.loginFunction(this.state.username, this.state.password)} type='submit' to="/StoreLocations">Create Acoount</button>

                        </div>
                    </form>

                </div>


            </div>
        )
    }





} export default Login;

