import React, {useState, useReducer, useEffect} from 'react';
import { mount, route } from 'navi';
import { Router, View } from 'react-navi';

import { Container } from 'react-bootstrap';

import appReducer from './reducers';


import { ThemeContext, StateContext } from './Contexts';
import CreatePost from './CreatePost';
import PostPage from './pages/PostPage';
import HeaderBar from './pages/HeaderBar';
import HomePage from './pages/HomePage';

function App() {

  const [ state, dispatch ] = useReducer(appReducer, { user: {}, posts: [] })

  const {user} = state;

  const [ theme, setTheme ] = useState({
    primaryColor: 'deepskyblue',
    secondaryColor: 'coral'
 })

 const routes = mount({
  '/': route({ view: <HomePage /> }),
  '/post/create':route({ view: <CreatePost /> }),
  '/post/:id': route(req => {
      return { view: <PostPage id={req.params.id} /> }
  }),
})

  // useEffect(() => {
  //   if (user) {
  //      document.title = `${user}’s Blog` 
  //    } else {
  //      document.title = 'Blog'
  //  }
  // }, [user])

  return (
    <div>
      <ThemeContext.Provider value={theme}>
        <StateContext.Provider value={{state: state, dispatch: dispatch}}>
          <Router routes={routes}>
            <Container>
                <HeaderBar setTheme={setTheme} />
                <hr />
                <View />
            </Container>
            </Router>
        </StateContext.Provider>
      </ThemeContext.Provider>
    </div>
  )
}

export default App;
