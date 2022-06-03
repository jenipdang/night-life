import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../styles';
import { useState } from 'react'

function NavBar({ user, setUser }) {
	const location = useLocation();

	function handleLogoutClick() {
		fetch('/api/logout', { method: 'DELETE' }).then((r) => {
			if (r.ok) {
				setUser(null);
			}
		});
	}

	return (
		<Wrapper>
			<Logo>
				<Link style={{color: 'black'}} to='/events'>Night Life</Link>
			</Logo>
			<Nav>
				<Welcome>
					Welcome: <Link to='/profile'>{user.username}</Link>
				</Welcome>
				{location.pathname !== "/upcoming-events" ? 
				<><Button as={Link} to='/upcoming-events'>
						Upcoming Events
				</Button></> : null }
				{user.role === 'admin' ? (
					<>
						<Button as={Link} to='/events/new'>
							New Event
						</Button>
						<Button as={Link} to='/venues/new'>
							New Venue
						</Button>
					</>
				) : null}
				<Button variant='outline' onClick={handleLogoutClick}>
					Logout
				</Button>
			</Nav>
		</Wrapper>
	);
}
export default NavBar;

const Welcome = styled.h5`
	text-transform: uppercase;
`;

const Wrapper = styled.header`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 15px;
`;

const Logo = styled.h1`
	font-family: 'Tangerine', cursive;
	font-size: 6.5rem;
	color: black;
	line-height: 1;
	margin: 50px;
	text-shadow: 4px 4px 4px #aaa a {
		color: inherit;
		text-decoration: none;
	}
`;

const Nav = styled.nav`
	display: flex;
	gap: 4px;
	position: absolute;
	right: 8px;
`;
