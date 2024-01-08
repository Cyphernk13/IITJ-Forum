/* eslint-disable no-unused-expressions */
import svg from './../../svg'
import React from 'react'
import './../../css/enter/enter.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Input from './Input'
import Code from './Code'
import bg from './../../img/Login/bg-login.jpg'
import { Link } from 'react-router-dom'
import { AppContext } from '../../App'
const SignUp = () => {
    const [validity,setValidity] = React.useState( ['f','f','f','f'] ) 
    const [svgcolor,setSvgcolor] = React.useState( [false,false,false,false] )
    const [error,setError] = React.useState( ['','','',''] )
    const [email,setEmail] = React.useState("")
    const navigate = useNavigate();

    const EmailChange = (e) => {
        
        const email = 'iitj.ac.in'
        const userEmail = e.target.value
        setEmail(userEmail)

        var ans1 = false
        if (userEmail.length>0) ans1 = true
        
        var index = userEmail.length
        for(var i =0;i<userEmail.length;i++)
        {
            if(userEmail[i]==='@') {
                index = i+1
                break
            }
        }
        
        var bool = 0
        for(i=index;i<userEmail.length;i++)
        {
            if(email[i-index]===userEmail[i]) {
                bool = 1
            }
            else{
                bool = 2
                break
            }
        }   
        if(userEmail.length-index!==email.length && bool===1) {
            bool=2;
        }

        var ans = 'in'
        if (bool===0) ans = 'f'
        if (bool===1) ans = ''

        console.log("HERE")
        setError( (item) => {var newItem = item.slice() ; newItem[1] = "Enter an IITJ email.";return newItem } )
        setValidity( (item) => {var newItem = item.slice() ;newItem[1] = ans; return newItem} )
        setSvgcolor( (item) => {var newItem = item.slice() ; newItem[1] = ans1;return newItem} )
    }

    const PwdChange = (e) => {
        const userPwd = e.target.value
        setPassword(userPwd)

        var ans1 = 'in'
        var ans2 = false
        if (userPwd.length>7) ans1 = ''
        if (userPwd.length>0) ans2 = true
        
        setError( (item) => {var newItem = item.slice() ; newItem[2] = "Password must of atleast 8 characters.";return newItem } )
        setValidity( (item) => {var newItem = item.slice() ; newItem[2] = ans1 ;return newItem} )        
        setSvgcolor( (item) => {var newItem = item.slice(); newItem[2] = ans2 ;return newItem} ) 
    }

    const confirmPwd = (e) => {
        const userPwd = e.target.value
        var ans1 = 'in' ;
        var ans2 = false ;

        setPassword( (item) => {
            if (item == userPwd) {if (userPwd!=="") ans1 =''}
            return item
        } )
        if (userPwd.length>0) ans2 = true

        setError( (item) => {var newItem = item.slice() ; newItem[3] = "Passwords do not match.";return newItem } )
        setValidity( (item) => {var newItem = item.slice() ; newItem[3] = ans1;return newItem } )       
        setSvgcolor( (item) => {var newItem = item.slice() ; newItem[3] = ans2;return newItem} )
    }

    const [username,setUsername] = React.useState("")
    const [password,setPassword] = React.useState("")
    const [code,setCode] = React.useState(false)
    const onSubmit= async (event) => {
        event.preventDefault()
        if ( validity[0] === 'f' &&  validity[1] === '' && validity[2] === '' && validity[3] === '' )
        {

            try{
                const response = await axios.post("http://localhost:5000/auth/register",{
                    username,
                    email,
                    password,
                    commit:false
                })
                console.log(response.data.message)
                if (response.data.message == "Username already taken.") {
                    setError( (item) => {var newItem = item.slice() ; newItem[0] = "Username already taken.";return newItem} )
                    setValidity( (item) => {var newItem = item.slice() ; newItem[0] = 'in';return newItem} )
                }
                if (response.data.message == "Email already exists.") {
                    setError( (item) => {var newItem = item.slice() ; newItem[1] = "Email Already exists.";return newItem} )
                    setValidity( (item) => {var newItem = item.slice() ; newItem[1] = 'in';return newItem} ) 
                }
                if (response.data.message == "User Registered Succesfully.") {
                setCode(true)
                
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    console.log(validity[0] === 'f' &&  validity[1] === '' && validity[2] === '' && validity[3] === '')
    console.log(validity)    
}
     
    return (
        
            code == true ? <Code username={username} email={email} password={password} /> :
            <div className="container-fluid " style={{ height: '100vh' }}>
            <div className="row">
                <div className="col-lg-6 d-none d-sm-block p-0">
                    <img src="img/Login/iitj.jpg" style={{width:'100%',height:'100vh'}} />
                </div>
                <div className="col-lg-6 col-xs-12 p-0" style={{backgroundImage:`url(${bg})`,backgroundPosition:'center',backgroundSize:'100'}}>
                <form onSubmit={onSubmit}>
            <div className="d-flex h-100 align-items-center justify-content-center Signup-page"> 
                <div className="h-75 w-50 bg-white d-flex justify-content-center flex-column p-5 signup-form" style={{borderRadius:'25px'}}>
                    <p className='text-center display-4 mt-5 mb-5'>Signup</p>

                    <Input 
                        label={"Username"}
                        validity={validity[0]}
                        svg={svgcolor[0]? svg.coloredUser : svg.user}
                        error={error[0]}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder={"name@example.com"}
                        type={"text"}
                    />
                    <Input 
                        label={"Email"}
                        validity={validity[1]}
                        svg={svgcolor[1]? svg.coloredEnvelope : svg.envelope}
                        error={error[1]}
                        onChange={EmailChange}
                        placeholder={"name@example.com"}
                        type={"email"}
                    />
                    <Input 
                        label={"Password"}
                        validity={validity[2]}
                        svg={svgcolor[2]? svg.coloredLock : svg.lock}
                        error={error[2]}
                        onChange={PwdChange}
                        placeholder={"Password"}
                        type={"password"}
                    />
                    <Input 
                        label={"Confirm Password"}
                        validity={validity[3]}
                        svg={svgcolor[3]? svg.coloredLock : svg.lock}
                        error={error[3]}
                        onChange={confirmPwd}
                        placeholder={"password"}
                        type={"password"}
                    />
                    <button type='submit' className='btn btn-primary btn-lg mt-2 rounded-5 Signup-btn'>Signup</button>
                    <p className='mt-3 text-center'>Don't have an account?  <Link to={'/login'} className='sign-up-link' ><span className='sign-up-btn'>Login</span></Link> </p>
                </div>
            </div>
        </form>
                </div>
            </div>
        </div>

    
    )
}
export default SignUp

