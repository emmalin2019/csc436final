import React, { useContext } from 'react'

import CreatePost from '../CreatePost'
import UserBar from '../user/UserBar'
import Header from '../Header'
import ChangeTheme from '../ChangeTheme'

import { Link } from 'react-navi'

import { Navbar, Nav, Container } from 'react-bootstrap'

import { ThemeContext, StateContext } from '../Contexts'

export default function HeaderBar ({setTheme }) {
    const theme = useContext(ThemeContext)
    const {state} = useContext(StateContext)
    const {user} = state;

    return (
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/"><Header text="My Blog" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {user.username && <Nav.Link><Link href="/post/create">Create New Post</Link></Nav.Link>}
            </Nav>
            <React.Suspense fallback={"Loading..."}>
              <UserBar />
            </React.Suspense>
          </Navbar.Collapse>
        </Container>
        </Navbar>



    )
}