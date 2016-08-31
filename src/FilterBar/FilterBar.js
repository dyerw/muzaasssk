import React from 'react'
import { Nav, NavItem, NavDropdown, MenuItem, Button } from 'react-bootstrap'

let FilterBar = (props) => {
  return(
    <div>
      <Nav bsStyle="tabs" activeKey="1" onSelect={x => console.log(x)}>
        <NavItem eventKey="0">New</NavItem>
        <NavItem eventKey="1">Eloquent</NavItem>
        <NavItem eventKey="2">Hidden Gems</NavItem>
        <NavDropdown eventKey="3" title="Mood" id="nav-dropdown">
            <MenuItem eventKey="3.0">Sad</MenuItem>
            <MenuItem eventKey="3.1">Lazy</MenuItem>
            <MenuItem eventKey="3.2">Sexy</MenuItem>
        </NavDropdown>
      </Nav>
      <Button onClick={props.showReviewEditor}>Add A Review</Button>
    </div>
  );
}

export default FilterBar
