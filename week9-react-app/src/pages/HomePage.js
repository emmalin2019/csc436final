import React, { useEffect, useContext } from 'react'
import { StateContext } from '../Contexts'
import { useResource } from 'react-request-hook'
import PostList from '../PostList'


export default function HomePage () {
    const { state, dispatch } = useContext(StateContext)
    const [ posts, getPosts ] = useResource(() => ({
        url: '/post',
        method: 'get',
        headers: {"Authorization": `${state.user.access_token}`}
    }))

    // useEffect(() =>{
    //     if(state.user.access_token) {
    //         getPosts()
    //     }
    // }, [])

    useEffect(() =>{
        getPosts()
    }, [state.user.access_token])

    useEffect(() => {
    if (posts && posts.isLoading === false && posts.data) {
        console.log(posts.data)
            dispatch({ type: 'FETCH_POSTS', posts: posts.data.posts })
        }
    }, [posts])
    const { data, isLoading } = posts;
    return (
        <>
          {isLoading && 'Posts loading...'} <PostList />
        </>
    )
} 