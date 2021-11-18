import React, { useContext } from 'react'
import Post from './Post'

import { StateContext } from './Contexts'

export default function PostList () {
      const {state} = useContext(StateContext)
      const {posts} = state;

     return (
      <div>
       {posts.map((p, i) => <Post {...p} short={true} title={p.title} author={p.author} key={'post-' + i} postId={p.id}/>)}
      </div> 
      )
}
    
