import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { http } from '../confAxios';
import './Profile.css'
function Profile(props) {
    const [users,SetUser]= useState([]);
    let history = useHistory();
    useEffect( () => {
        http.fetch({
            url: 'users/Friends',
            method: 'GET',
        }).then(res=> {
            console.log("------>users",res);
            SetUser(res);
   
        })
    },[SetUser])
    const news=()=>{
        history.push('/news')
    }
    return (
        <div>
            {
                users.map((User)=>(
                    <div className="page-content page-container" id="page-content">
                           
                             <div className="padding">
                             <button class="btn btn-primary pull-right" 
                            style={{marginTop: "5px", margin: "5px", marginLeft: "424px"}} onClick={news} >News</button>
        <div className="row container d-flex justify-content-center">
            <div className="col-xl-6 col-md-12">
                <div className="card user-card-full">
                    <div className="row m-l-0 m-r-0">
                        <div className="col-sm-4 bg-c-lite-green user-profile">
                            <div className="card-block text-center text-white">
                                <div className="m-b-25"> 
                                <img src="https://img.icons8.com/bubbles/100/000000/user.png" 
                                className="img-radius" alt="User-Profile-Image"/> </div>
                                <h6 className="f-w-600">{User.nom} {User.prenom}</h6>
                                <p></p> <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                            </div>
                        </div>
                        <div className="col-sm-8">
                            <div className="card-block">
                                <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <p className="m-b-10 f-w-600">Email</p>
                                        <h6 className="text-muted f-w-400">{User.email}</h6>
                                    </div>
                                    <div className="col-sm-6">
                                        <p className="m-b-10 f-w-600">Phone</p>
                                        <h6 className="text-muted f-w-400">{User.phone}</h6>
                                    </div>
                                </div>
                               
                                <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Friends</h6>
                                        <div className="row">
                                            <div className="col-sm-6">
                                            {
                                                User.friends.map((friend)=>(
                                                    <ul>
                                                        <li>
                                                            <h6 className="text-muted f-w-400">{friend.nom} {friend.prenom}</h6>
                                                        </li>
                                                                                                               
                                                    </ul>
                                                    
                                                ))
                                            } 
                                                
                                            </div>
                                        </div> 
                                
                                <ul class="social-link list-unstyled m-t-40 m-b-10">
                                    <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"><i class="mdi mdi-facebook feather icon-facebook facebook" aria-hidden="true"></i></a></li>
                                    <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"><i class="mdi mdi-twitter feather icon-twitter twitter" aria-hidden="true"></i></a></li>
                                    <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true"><i class="mdi mdi-instagram feather icon-instagram instagram" aria-hidden="true"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                            </div>
                    </div>
                ))
            }    
        </div>
    );
}

export default Profile;