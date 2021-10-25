import React, {useEffect, useState } from 'react';
import './login.css';
import {http} from '../confAxios';
import { useHistory } from "react-router-dom";

function Login(props) {


    const [Email, setEmail] = useState("");
	const [Password, setPassword] = useState("");

    let history = useHistory();

    const handleFormSubmit=(e)=>{
		e.preventDefault();
		const user={
		  email:Email,
		  password:Password 
		
		}
        console.log("user",user);
		http.fetch({
            url: 'users/login',
            method: 'POST',
            data: {
                "email": user.email,
                "password": user.password
               }
            
        }).then(res=> {
            console.log(res);
            localStorage.setItem('TOKEN',res.token);
            history.push('/news')
            
        }).catch(err=>{
            console.log(err);
        })
}
	

    return (
        <div>
        <div className="wrapper fadeInDown">
         <div id="formContent">

            <h2 className="active"> Sign In </h2>

            <div className="fadeIn first">
            <i className="bi bi-person"></i>
            </div>

            <form>
            <input type="text" id="login" 
                className="fadeIn second" 
                name="login" 
                placeholder="login" 
                value={Email} onChange={(e)=>setEmail(e.target.value)}
                />
            <input type="text" 
            id="password" 
            className="fadeIn third" 
            name="login" 
            placeholder="password"
            value={Password} onChange={(e)=>setPassword(e.target.value)}/>
            <div className="row">
                <div className="col-md-6">
                            <input type="submit" 
                            className="fadeIn fourth" 
                            value="Log In" 
                            style={{margin: "4px"}}
                            onClick={handleFormSubmit}
                            />
                </div>
                <div className="col-md-6">
                    <input type="submit" 
                        class="fadeIn fourth" 
                        value="Sign Up"
                      style={{margin: "4px",
                                marginLeft: "-11px"}}
                        onClick={()=>history.push('/registre')}/>
                </div>
            </div>
            
            
            </form>

            <div id="formFooter">
            <a className="underlineHover" href="#">Mini Projet MongoDB</a>
            </div>

        </div>
        </div>
    </div>
    );
}

export default Login