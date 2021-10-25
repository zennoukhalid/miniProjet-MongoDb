import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { http } from '../confAxios';
import './login.css';
function Registre(props) {
    const [Nom, setNom] = useState("");
    const [Prenom, setPrenom] = useState("");
    const [Email, setEmail] = useState("");
    const [Phone, setPhone] = useState("");
	const [Password, setPassword] = useState("");
    const [Success, setSuccess] = useState("");

    const history = useHistory();

    const handleFormSubmit=(e)=>{
		e.preventDefault();
		const user={
            nom: Nom,
            prenom: Prenom,
		    email:Email,
            phone:Phone,
		    password:Password 
		
		}
        console.log("user",user);
		http.fetch({
            url: 'users/addUser',
            method: 'POST',
            data: {
                "nom": user.nom,
                "prenom": user.prenom,
                "email": user.email,
                "password": user.password,
                "phone": user.phone
               }
            
        }).then(res=> {
            console.log(res);
            setSuccess("-------------->done",res.status);
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
            
        })

       
}
    return (
        <div>
            <div class="wrapper fadeInDown">
             <div id="formContent">
    
                <h2 class="active"> Sign Up </h2>

                <div class="fadeIn first">
                <i class="bi bi-person"></i>
                </div>

                <form>
                <input type="text" 
                id="nom" 
                class="fadeIn second" 
                name="nom" 
                placeholder="Nom"
                value={Nom} onChange={(e)=>setNom(e.target.value)}/>
                <input type="text" 
                id="prenom" 
                class="fadeIn second" 
                name="prenom" 
                placeholder="Prénom"
                value={Prenom} onChange={(e)=>setPrenom(e.target.value)}/>
                <input type="text" 
                id="login" 
                class="fadeIn second" 
                name="login" 
                placeholder="email"
                value={Email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="text" 
                id="login" 
                class="fadeIn second" 
                name="login" 
                placeholder="phone"
                value={Phone} onChange={(e)=>setPhone(e.target.value)}/>
                <input type="text" 
                id="password" 
                class="fadeIn third" 
                name="login" 
                placeholder="password"
                value={Password} onChange={(e)=>setPassword(e.target.value)}/>
                <div className="row">
                    <div className="col-md-6">
                        <input type="submit" 
                                class="fadeIn fourth" 
                                value="Sign Up"
                                style={{margin: "5px",
                                marginLeft: "6px"}}
                                onClick={handleFormSubmit}/>
                    </div>
                    <div className="col-md-6">
                        <input type="submit" 
                        class="fadeIn fourth" 
                        value="Log In"
                        style={{margin: "4px",
                                marginLeft: "-2px"}}
                        onClick={()=>history.push('/')}/>
                    </div>

                </div>
               

               
                
                {Success &&
                    <div class="alert alert-primary" role="alert">
                        {Success}
                    </div>
                }  
                </form>

                <div id="formFooter">
                <a class="underlineHover" href="#">Mini Projet Mongodb</a>
                </div>

            </div>
            </div>
        </div>
    );
}

export default Registre;