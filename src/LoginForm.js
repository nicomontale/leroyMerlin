import React from 'react'
import './LoginForm.css'

import { Link } from 'react-router-dom';
import auth from './auth';
import { withRouter } from 'react-router';
//const emailRegex = RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);





class LoginForm extends React.Component {
    submit = () => {
        auth
            .login('firstName', 'password')
            .then(() => {
                this
                    .props
                    .history
                    .push('/StoreLocations')
            }).catch(() => {
                alert('Password errata')
            })
    }

    render() {



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
                                name='firstName'
                                noValidate
                                ì
                            ></input>

                        </div>


                        <div className='password'>
                            <label htmlFor='password'>Password</label>
                            <input
                                type='password'

                                placeholder='Password'
                                name='password'
                                noValidate

                            ></input>

                        </div>
                        <div className='createAccount'>
                            <button onClick={this.submit} type='submit' to="/StoreLocations">Create Acoount</button>
                            <Link onClick={this.submit} to="/StoreLocations">Login</Link>
                        </div>
                    </form>

                </div>


            </div>
        )
    }
}
export default LoginForm;
