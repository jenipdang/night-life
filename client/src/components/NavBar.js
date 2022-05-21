import { Link } from 'react-router-dom';
import styled from "styled-components";
import { Button } from "../styles";


function NavBar({ user, setUser }) {
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
	      <Link to="/events">Night Life</Link>
	    </Logo>
	    <Nav>
		<Welcome>
			Signed in as: <a href="/profile">{user.username}</a>
		</Welcome>
			{(user.role === "admin") ? (<Button as={Link} to="/events/new">
	        New Event
	      </Button>) : null}
	      <Button variant="outline" onClick={handleLogoutClick}>
	        Logout
	      </Button>
	    </Nav>
	  </Wrapper>
	)
}
export default NavBar;


const Welcome = styled.h5`
	text-transform: uppercase;
`

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

const Logo = styled.h1`
  font-family: "Tangerine", cursive;
  font-size: 5.5rem;
  color: black;
  margin: 0;
  line-height: 1;
  text-shadow: 4px 4px 4px #aaa

  a {
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


