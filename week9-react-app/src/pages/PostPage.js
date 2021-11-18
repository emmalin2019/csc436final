import React, { useEffect, useContext } from 'react'
import { useResource } from 'react-request-hook'

import { StateContext } from '../Contexts'

import { Link } from 'react-navi'

import Post from '../Post'


export default function PostPage ({ id }) {

    const {state} = useContext(StateContext);

    const [ post, getPost ] = useResource(() => ({
        url: `/post/${id}`,
        headers: {"Authorization": `${state.user.access_token}`},
        method: 'get'
    }))

    useEffect(getPost, [id])

    return (
        <div>
            {(post && post.data)
                ? <Post {...post.data} />
                : 'Loading...'
            }
            <div><Link href="/">Go back</Link></div>
        </div>
    )
}
