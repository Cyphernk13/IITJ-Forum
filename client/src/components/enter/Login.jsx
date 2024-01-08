/* eslint-disable eqeqeq */
/* eslint-disable no-unused-expressions */
import svg from './../../svg'
import React from 'react'
import './../../css/enter/enter.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Input from './Input'
import axios from 'axios'
import { AppContext } from '../../App'
const Login = () => {
    const navigate = useNavigate()
    const [password,setpassword] = React.useState("")
    const [validity,setValidity] = React.useState( [false,false] )
    const [email,setEmail] = React.useState("")
    
    const OnSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post("http://localhost:5000/auth/login",{
                email,
                password
            })
            if (response.data.message == "Email doesn't exist.") {
                setValidity( (item) => {const newItem = item.slice() ; newItem[0] = 'in' ;return newItem} )
                setValidity( (item) => {const newItem = item.slice() ; newItem[1] = false ;return newItem} )
            }
            else if (response.data.message == "Email or password incorrect.") {
                setValidity( (item) => {const newItem = item.slice() ; newItem[1] = 'in' ;return newItem} )
                setValidity( (item) => {const newItem = item.slice() ; newItem[0] = false ;return newItem} )
            }
            else{
                localStorage.setItem('email',email)
                console.log(email)
                navigate('/success')
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <form onSubmit={OnSubmit}>
            <div className="d-flex h-100 align-items-center justify-content-center login-page"> 
                <div className="h-75 w-50 bg-white d-flex justify-content-center flex-column p-5" style={{borderRadius:'25px'}}>
                    <p className='text-center display-4 mt-5 mb-5'>Login</p>

                    <Input 
                        label={"Email Address"}
                        validity={validity[0]}
                        svg={email.length? svg.coloredEnvelope : svg.envelope}
                        error={"Email Doesn't exist"}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={"name@example.com"}
                        type={"email"}
                    />

                    <Input 
                        label={"Password"}
                        validity={validity[1]}
                        svg={password.length?  svg.coloredLock : svg.lock}
                        error={"Incorrect Password."}
                        onChange={(e) => setpassword(e.target.value)}
                        placeholder={"password"}
                        type={"password"}
                    />

                    {/* <p className='text-center mt-1 mb-2 forgot-pass '><Link to={'/forgot'} className='sign-up-link' ><span className='sign-up-btn'>Forgot Password?</span></Link></p> */}
                    <button className='btn btn-primary btn-lg mt-5 rounded-5 login-btn'>LOGIN</button>
                    <p className='mt-3 text-center'>Don't have an account?  <Link to={'/signup'} className='sign-up-link' ><span className='sign-up-btn'>Sign Up</span></Link> </p>
                </div>
            </div>
        </form>
    )
}
export default Login