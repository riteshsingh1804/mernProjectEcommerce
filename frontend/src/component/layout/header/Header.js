// import React from 'react';
// //import {ReactNavbar} from "overlay-navbar";
// import logo from "../../../src/images/Sudarshan1.png";
// const Header = () => {

// //    const options={
// //     burgerColor:"#000000",
// //     burgerColorHover:"#eb4034",

// //     navColor1:"rgba(0,0,0,0.7)",

// //     logo:logo,
// //     logoWidth:"15vmax",
// //     logoHeight:"",
// //     logoHoverSize:"20px",
// //     logoHoverColor:"rgba(0,0,0,1)",

// //     link1Text:"Home",
// //     link2Text:"Product",
// //     link3Text:"Contact",
// //     link4Text:"About",
// //     link1Url:"/",
// //     link2Url:"/product",
// //     link3Url:"/contact",
// //     link4Url:"/about",
// //     link1Size:"1.5vmax",
// //     link1Color:"#000000",
// //     nav1justifyContent:"flex-start",
// //     nav2justifyContent:"flex-start",
// //     nav3justifyContent:"flex-start",
// //     nav4justifyContent:"flex-end",
// //     link1ColorHover:"#eb4034",
// //     link1Margin:"1vmax",

// //     profileIconColor:"rgba(35,35,35,0.8)",
// //     searchIconColor:"rgba(35,35,35,0.8)",
// //     cartIconColor:"rgba(35,35,35,0.8)",
// //     profileIconColorHover:"#eb4034",
// //     searchIconColorHover:"#eb4034",
// //     cartIconColorHover:"#eb4034",
// //     profileIconMargin:"1vmax",
    

// //    } 
//   return (
    
//         <ReactNavbar />
   
//   )
// }

// export default Header


import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';

import './Header';

import {Link} from "react-router-dom";
const pages = ['Home', 'Products','Cart','Search', 'Contact','About'];
const pagesLinks = ['/', '/products','/cart','/search', '/contact','/about'];

const settings = ['Profile', 'Account', 'Dashboard',  'Cart','Logout'];
const settingsLinks = ['/login', '/account', '/dashboard', '/cart','/logout'];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  return (
    <AppBar className='appbar' position="static"     sx={{  zIndex: 10  }}>
      <Container className="container" maxWidth="x1" style={{background:"#2f2626 "}} >
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
               
                   
                        <Avatar alt="logo" src='/Sudarshan1.png' style={{color:"#5f4c4c",background:"",}} />
                   
              
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '0rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            E-commerce
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {/* <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page,index) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link 
                      style={{textDecoration:"none",color:"white"}}
                      to={pagesLinks[index]}
                    >
                      {page}  
                    </Link>  
                  </Typography>
                </MenuItem>
              ))}
            </Menu> */}
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography> */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page,index) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link 
                      style={{textDecoration:"none",color:"white"}}
                      to={pagesLinks[index]}
                >
                      {page}  
                </Link>  
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting,i) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" >
                  <Link        
                      style={{textDecoration:"none",color:"black"}}
                      to={settingsLinks[i]}
                  >
                         {setting}  
                  </Link>  
                </Typography>
                </MenuItem >
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;


