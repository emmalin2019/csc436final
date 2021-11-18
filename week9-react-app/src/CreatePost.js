import React, {useState, useEffect, useContext} from 'react'
import { StateContext } from './Contexts'
import { useResource } from 'react-request-hook'

import { useNavigation } from 'react-navi'

export default function CreatePost () {

    const [ title, setTitle ] = useState('')
    const [ content, setContent ] = useState('')

    const navigation = useNavigation()

    const {state, dispatch} = useContext(StateContext)
    const {user} = state;

    const [post , createPost ] = useResource(({ title, content, author }) => ({
            url: '/post',
            method: 'post',
            headers: {"Authorization": `${state.user.access_token}`},
            data: { title, content, author }
        }))

    function handleTitle (evt) { setTitle(evt.target.value) }

    function handleContent (evt) { setContent(evt.target.value) }

    function handleCreate () {
            createPost({ title, content, author: user.username })
        }
        
    useEffect(() => {
        if (post && post.data) {
            dispatch({ type: 'CREATE_POST', title: post.data.title, content: post.data.content, id: post.data.id, author: user.username })
            console.log(post.data)
            navigation.navigate(`/post/${post.data.id}`)
        }
    }, [post])
        

     return (
          <form onSubmit={e => {e.preventDefault(); handleCreate();} }>
             
             <div>Author: <b>{user.username}</b></div>

             <div>
                 <label htmlFor="create-title">Title:</label>
                 <input type="text" value={title} onChange={handleTitle} name="create-title"  id="create-title" />
             </div>

             <textarea value={content} onChange={handleContent} />
             <input type="submit" value="Create" />
         </form>   
          )
 }
 