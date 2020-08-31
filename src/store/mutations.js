
// index
export const SET_DATA_POST = (state, results) => {
    state.results = results;
}

export const GET_LIKE = (state, countlikes) => {
    state.countlikes = countlikes ;
}
export const GET_LIKE_POST = (state, getlikepost) => {
    state.getlikepost = getlikepost ;
}
export const SET_LIKE = (state, getlike) => {
    state.getlike = getlike ;
}
export const ADD_LIKE = (state, status) => {
    state.status = status ;
}
export const CHECK_LIKE = (state, checklike) => {
    state.checklike = checklike ;
}
export const UN_LIKE = (state, unlike) => {
    state.unlike = unlike ;
}
export const GET_POST = (state, payload) => {
    state.post = payload;
}

export const GET_COMMENT = (state, getcomment) => {
    state.getcomment = getcomment;
}

export const DELETE_COMMENT = (state, deletecomment) => {
    state.deletecomment = deletecomment;
}

export const GET_POST_USERID = (state, getpostuser) => {
    state.getpostuser = getpostuser;
}


// end index
// theme
export const SET_DATA_THEME = (state, themes) => {
    state.themes = themes;
}




// end theme
// hot
export const SET_DATA_HOT = (state, hot) => {
    state.hot = hot;
}





// end hot
// data right
export const SET_DATA_RIGHT = (state, data_right) => {
    state.dataright = data_right;
}
// end data right
// uploads
export const CHECK_UPLOADS = (state, status) => {
    state.status = status;
}
// post_user
export const GET_DATA_POST_USER = (state, datapostuser) => {
    state.datapostuser = datapostuser;
}
// end post_user
// ADMIN
export const GET_DATA_POST_ADMIN = (state, getdataadmin) => {
    state.getdataadmin = getdataadmin;
}