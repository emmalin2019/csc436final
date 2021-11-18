function userReducer (state, action) {
    switch (action.type) {
        case 'LOGIN':
        case 'REGISTER':
			console.log('action-',action);
            return {
                'username': action.username,
                'access_token': action.access_token
            }
        case 'LOGOUT':
            return {
                'username': undefined,
                'access_token': undefined
            }
        default:
            return state;
    }
}

  function postsReducer (state, action) {
    switch (action.type) {
        case 'CREATE_POST':
          const newPost = { 
              id: action.id,
              title: action.title,
              content: action.content, 
              author: action.author,
              complete: false,
              completedOn: undefined
            }
            return [ newPost, ...state ]
        case 'TOGGLE_POST':
            return state.map((p) => {
                if(p.id === action.postId) {
                    p.complete = action.complete;
                    p.completedOn = action.completedOn;
                }
                return p;
            })
        case 'DELETE_POST':
            return state.filter((p) => p.id !== action.postId)
        case 'FETCH_POSTS':
            return action.posts
        default:
           return state;
    }
  }

  export default function appReducer (state, action) {
    return {
        user: userReducer(state.user, action),
        posts: postsReducer(state.posts, action)
    }
}
