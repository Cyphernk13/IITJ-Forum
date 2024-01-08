import svg from './../../svg'
import React, { useEffect, useState } from 'react'
import './../../css/enter/enter.css'
import axios from 'axios'
import Input from './Input'
import { useNavigate } from 'react-router-dom'
import bg from './../../img/Login/bg-login.jpg'

const Code = ({username,email,password}) => {
    const [otp,setOtp] = React.useState(-1)
    useEffect  ( () => {
        console.log(email)
        const fetchData = async() => {
            const response = await axios.post("http://localhost:5000/auth/otp",{
                email
            })
            setOtp(response.data.otp)
        }
        fetchData(email)
    } ,[])
    const [code, setCode] = useState('')
    const [validity, setValidity] = useState('f')
    const [error,setError] = useState('')
    const navigate = useNavigate()
    const codeChange = (e) => {
        const userCode = e.target.value
        setCode(userCode)
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        console.log(otp,parseInt(code,10),'code.jsx')
        if (otp == -1) 
        {
            setValidity('in')
            setError('Please Enter OTP')
        }
        else
        {
            if (otp === parseInt(code,10)) {
                try{
                    const response = await axios.post("http://localhost:5000/auth/register",{
                        username,
                        email,
                        password,
                        commit:true
                    })
                    if (response.data.message === 'User Registered Succesfully.') {
                        localStorage.setItem('email',email)
                        navigate('/Success')
                    }
                }
                catch(err)
                {
                    console.log(err)
                }
            }else{
                setValidity('in')
                setError('OTP is Incorrect')
            }
        }
    }

    const resendCode = () => {
        alert('Code resent!'); 
    };

    return (
        <div className="container-fluid " style={{ height: '100vh' }}>
        <div className="row">
            <div className="col-lg-6 d-none d-sm-block p-0">
                <img src="img/Login/iitj.jpg" style={{width:'100%',height:'100vh'}} />
            </div>
            <div className="col-lg-6 col-xs-12 p-0" style={{backgroundImage:`url(${bg})`,backgroundPosition:'center',backgroundSize:'100'}}>
            <form onSubmit={onSubmit}>
            <div className="d-flex h-100 align-items-center justify-content-center Signup-page">
                <div className="h-75 w-50 bg-white d-flex justify-content-center flex-column p-5 signup-form" style={{ borderRadius: '25px' }}>
                    <p className='text-center display-4 mt-5 mb-5'>Enter Code</p>

                    <p className="text-center mb-3">We have sent you an authentication code on {email}</p>

                    <Input
                        label={"Verification Code"}
                        validity={validity}
                        svg={svg.color}
                        onChange={codeChange}
                        placeholder={"Enter the code received on your email"}
                        type={"text"}
                        error={error}
                    />

                    <button type='submit' className='btn btn-primary btn-lg mt-2 rounded-5 Signup-btn'>Submit</button>

                    <p className='text-center mt-3'>
                        Didn't receive a code? <a href="#" onClick={resendCode} style={{ textDecoration: 'none' }}>Resend it</a>
                    </p>
                </div>
            </div>
        </form>
            </div>
        </div>
    </div>

    )
}

export default Code
