import axios from "axios"
import { post } from "jquery"

// index post
export const getdatapost = ({ commit }) => {
    axios.get('http://localhost:8000/get').then(Response => {
        commit('SET_DATA_POST', Response.data);
    })
}

export const  getpost = async ({ commit }, { post_id }) => {
     let result = await axios.post('http://localhost:8000/getpost', {
        post_id
    }).
   then(res=>{
        let data = res.data[0]
        // console.log(data)
        commit('GET_POST', data);
    })
}
 
export const deletepost = ({ commit }, { post_id }) => {
    commit('DELETE_POST', { post_id });
    axios.post('http://localhost:8000/deletepost', {
        post_id
    });
    
}
export const getlike = ({ commit }) => {
    axios.get('http://localhost:8000/getlike').then(Response => {
        commit('SET_LIKE', Response.data);
    })
}

export const countlike = ({ commit }, { post_id }) => {
    axios.post('http://localhost:8000/countlike', {
        post_id
    })
    .then(res=>{
        // console.log(res.data[0])
        let data = res.data;
        // console.log(data)
        commit('GET_LIKE', data);
    })
}
export const unlike = ({ commit }, { post_id,user_id }) => {
    axios.post('http://localhost:8000/unlike', {
        post_id:post_id,
        user_id:user_id,
    })
    .then(res=>{
        // console.log(res.data[0])
        // console.log(data)
        commit('UN_LIKE', res.data);
    })
}

export const checklike = ({ commit }, { post_id,user_id }) => {
    axios.post('http://localhost:8000/checklike', {
        post_id:post_id,
        user_id:user_id,
    })
    .then(res=>{
        // console.log(res.data[0])
        // console.log( res.data)
        commit('CHECK_LIKE', res.data);
    })
}
export const getPostUser = ({commit},user_id)=>{
    axios.post('http://localhost:8000/getpostuser',{user_id})
    .then(res=>{
        let data = res.data
        commit('GET_POST_USERID',data)
    })
}   

export const addlike = ({ commit }, { post_id,user_id,action }) => {
    console.log(action)
    axios.post('http://localhost:8000/rating', {
        post_id:post_id,
        user_id:user_id,
        action:action
    })
    .then(res=>{
        // console.log(res.data[0])
        let isd = res.data;
        // console.log(data)
        commit('ADD_LIKE', isd);
    })
}
 
export const  getcomment = ({ commit }, { post_id }) => {
    axios.post('http://localhost:8000/getcomment', {
       post_id
   }).
  then(res=>{
       let data = res.data
       // console.log(data)
       commit('GET_COMMENT', data);
   })
}

export const  addcomment = ({ commit }, formData ) => {
    console.log(formData)
    axios.post('http://localhost:8000/addcomment', 
        formData
   ).
  then(res=>{
       let data = res.data
       console.log(data)
       commit('ADD_COMMENT', data);
   })
}

export const  deletecomment = ({ commit }, { comment_id}) => {
    axios.post('http://localhost:8000/deletecomment', {
        comment_id
   }).
  then(res=>{
       let data = res.data
       // console.log(data)
       commit('DELETE_COMMENT', data);
   })
}
// end index post
// theme
export const gettheme = ({ commit }) => {
    axios.get('http://localhost:8000/gettheme').then(Response => {
        commit('SET_DATA_THEME', Response.data);
    })
}

// end theme

// hot
export const gethot = ({ commit }) => {
    axios.get('http://localhost:8000/gethot').then(Response => {
        commit('SET_DATA_HOT', Response.data);
    })
}
// end hot

// right data 
export const getdataright = ({ commit },{ arr }) => {
        commit('SET_DATA_RIGHT', arr);
}
// end right data
// appheader
export const checkuploads = ({ commit },{ status }) => {
    commit('CHECK_UPLOADS', status);
}
// end app header
// user_post
export const  getdatapostuser = ({ commit }, { user_id}) => {
    axios.post('http://localhost:8000/users/getdatapostuser', {
        user_id
   }).
  then(res=>{
       let data = res.data
       console.log(data)
       commit('GET_DATA_POST_USER', data);
   })
}
// end user_post
// admin
export const getdataadmin = ({ commit }) => {
    axios.get('http://localhost:8000/posts/posts').then(Response => {
        commit('GET_DATA_POST_ADMIN', Response.data);
    })
}
