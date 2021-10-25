import React, { useEffect, useState} from 'react';
import { http } from '../confAxios';
import './post.css';
import { useHistory } from "react-router-dom";
import photo from './image1.jfif'
const path= process.env.REACT_APP_PUBLIC_FOLDER;

function Post(props) {
    const [news, setNews] = useState([]);
    const [users, setUsers] = useState([]);
    const [coments, setComents] = useState([]);

    const [text, setText] = useState([]);
    const [added, setAdded] = useState("");
    let history = useHistory();

    

    useEffect(() => {
        // Met à jour le titre du document via l’API du navigateur
       
        http.fetch({
            url: 'news/',
            method: 'GET',
        }).then(res=> {
             console.log("------>news comments",res);
            
            setNews(res);
        })

        console.log("process.env.PUBLIC_UR",process.env.PUBLIC_URL);
        http.fetch({
            url: 'users/',
            method: 'GET',           
            
        }).then(res=> {
            console.log("------>users",res);
            setUsers(res);
                        
        })
       
    }, [setNews,setUsers]);

    const PostComent= (id) => {
        
        console.log("---->id",id);
        http.fetch({
            url: 'news/addComment/'+id,
            method: 'PUT',
            data: {
                "text": text,               
               }
            
        }).then(res=> {
            console.log(res);
            window.location.reload();
            
        })
    }
    const AddLike= (id) => {      
        console.log("---->id",id);
        http.fetch({
            url: 'news/addLike/'+ id,
            method: 'PUT',
   
        }).then(res=> {
            console.log(res);
            window.location.reload();      
        })
    }
    const AddDisLike = (id) => {
    http.fetch({
        url: 'news/addDislike/'+ id,
        method: 'PUT',
             
    }).then(res=> {
        console.log(res);
        window.location.reload();     
    })
    }
    const AddFriend = (id) => {
        console.log("add friend");
        http.fetch({
            url: 'users/addFriend/'+ id,
            method: 'PUT',
                 
        }).then(res=> {
            console.log(res);
            // window.location.reload();
            setAdded("added")   
        })
        }
    const logout=() =>{
        console.log("hhh"); 
            localStorage.setItem("TOKEN", ""); 
            localStorage.clear();
            history.push('/')
        }
    const AddNews= ()=>{
            history.push('/addnew')
        }
    const profile= ()=>{
        history.push('/profile');
    }

    return <div>
    <div class="container mt-5">
        
        <div class="d-flex justify-content-center row">
        <div style={{textAlign:"end"}}>
                        <button class="btn btn-primary pull-right" style={{marginTop: "5px", margin: "5px"}} onClick={profile} >Profile</button>
                        <button class="btn btn-primary pull-right" style={{marginTop: "5px", margin: "5px"}} onClick={AddNews} >Add News</button>
                        <button class="btn btn-primary pull-right" style={{marginTop: "5px", margin: "5px"}} onClick={logout} >LogOut</button>
                        </div>
        <div class="col-md-8" >

        {
            news.map((neww)=>( 
                
                    <div class="d-flex flex-column comment-section card border border-5" style={{padding: "5px", margin: "5px"}}>
                        
                        <div class="bg-white p-2 ">
                        
                            <div class="d-flex flex-row user-info">
                             <img class="rounded-circle" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" width="30"/>
                                <div class="d-flex flex-column justify-content-start ml-2">
                                <span class="d-block font-weight-bold name">{neww.titre}</span>
                                <span class="date text-black-50">{neww.createdAt.slice(0,10)} at {neww.createdAt.slice(11,16)}</span>
                            </div>
                            </div>
                            <div class="mt-4">
                                <p class="comment-text" style={{float:  "left"}}><b>URL:</b>{neww.url}</p>
                                <img className="se-img-top" style={{height:"350px", width: "800px"}}  
                                loading="lazy"
                                src={neww.image} 
                                />
                            </div>
                        </div>
                        <div class="bg-white">
                            
                            <div class="d-flex flex-row fs-12">
                                <div class="like p-2 cursor" onClick={(e)=>AddLike(neww._id)}> {neww.likes.length} <i class="fa fa-thumbs-o-up"></i><span class="ml-1">Like</span></div>
                                <div class="like p-2 cursor" onClick={(e)=>AddDisLike(neww._id)}> {neww.dislikes.length}<i class="fa fa-thumbs-o-up"> </i><span class="ml-1">Dislike</span></div>
                            </div>
                        </div>
                        <hr></hr>
                        <div class="bg-light p-2">
                        <div>
                        {
                            neww.comments.map((coment)=>(
                                <div class="d-flex flex-row align-items-start">
                                 <img class="rounded-circle"  src="https://cdn-icons-png.flaticon.com/512/149/149071.png" width="25"/>
                                    <div className="d-flex flex-column" >
                                        <div style={{height: "37px"}}>
                                        <div class="d-flex flex-column justify-content-start ml-2">
                                            <span class="d-block font-weight-bold name">{coment.user.nom} {coment.user.prenom}: {coment.text}</span>
                                            <span class="date text-black-50">
                                            {coment.createdAt.slice(0,10)} at {coment.createdAt.slice(11,16)}
                                            </span>
                                        </div>
                                             <br></br>
                                    </div> 
                                    <br></br>
                                                                       
                                </div>
                                </div>
                               
                            ))
                        }
                        </div>
                            <div class="d-flex flex-row align-items-start">
                            <img class="rounded-circle"  src="https://cdn-icons-png.flaticon.com/512/149/149071.png" width="30"/>
                            <textarea class="form-control ml-1 shadow-none textarea" value={text}
                             onChange={(e)=>{setText(e.target.value)}}></textarea>
                             <button class="btn btn-primary btn-sm shadow-none" 
                            type="button" 
                            style={{padding: "0px", margin: "7px"}}
                            onClick={()=>PostComent(neww._id)}>
                                Post comment
                            </button>
                            </div>
                        </div>
                    </div>
               
                
       )) }      </div>
            <div className="col-md-4">  
            <h2>Add Friends</h2>         
      {          
                    users.map((user)=>(
                        <>
                        
                        <div className="nearby-user card" style={{margin: "5px"}}>
                            
                        <div className="row">
                        <div className="col-md-2 col-sm-2">
                            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" width="40" alt="user" className="profile-photo-lg"/>
                        </div>
                        <div className="col-md-7 col-sm-7">
                            <h5><a href="#" className="profile-link">{user.nom} {user.prenom}</a></h5>
                            <p>{user.email}</p>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <button className="btn btn-primary pull-right" 
                            style={{marginTop: "10px"}}
                            onClick={(e)=>AddFriend(user._id)}
                            >Add</button>
                        </div>
                    </div>
                    </div>
                    
                    </>
                    ))
                }
               {added && <div class="alert alert-primary alert-dismissible fade show" role="alert">
                        <strong>Added with succes!</strong>
                        <button type="button" class="close" data-dismiss="alert" style={{float: "right"}} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                </div>}
               </div>    
             </div>
         </div>
    </div>;
}

export default Post;