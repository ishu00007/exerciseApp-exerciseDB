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
import AdbIcon from '@mui/icons-material/Adb';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import Autocomplete from '@mui/material/Autocomplete';
import { Input, TextField } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Stack from "@mui/material/Stack"
import Drawer from "@mui/material/Drawer";
import { exerciseContext } from '../../store/context';
import Divider from "@mui/material/Divider"

const pages = ['exercises'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {

    const searchedExerciseRef = React.useRef()

    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const { setExercises, fetchData, setCurrentPage } = React.useContext(exerciseContext)


    const [selectedCategory, setSelectedCategory] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = async (value) => {
        sessionStorage.setItem("category", value);
        fetchData(`${value}List`, setSelectedCategory);
        setCurrentPage(1);
        handleClose();
    };

    const handleExerciseOptionClick = async (value) => {

        localStorage.setItem("subCategory", value);
        fetchData(`${sessionStorage.getItem("category")}/${value}`, setExercises);
        setDrawerOpen(false)
        setCurrentPage(1);
    };


    const handleSearch = () => {
        console.log(searchedExerciseRef.current.value);
        fetchData(`/name/${searchedExerciseRef.current.value}`, setExercises)
    }

    const allExercises = () => {
        fetchData('', setExercises)
        setCurrentPage(1)
        handleCloseNavMenu();

    }




    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

    return (
        <AppBar position="static" sx={{ bgcolor: "black", position: "sticky", top: 0 }} >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <FitnessCenterIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        workOut
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={() => setDrawerOpen(!drawerOpen)}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"

                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}

                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={allExercises}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}


                            <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                                <Button
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    variant="contained"
                                    color="warning"
                                    sx={{ m: 3 }}
                                >
                                    {localStorage.getItem("category") ? sessionStorage.getItem("category") : <Typography color={"white"}>All Exercises</Typography>}
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{ 'aria-labelledby': 'basic-button' }}
                                >
                                    {["equipment", "bodyPart", "target"].map((item, index) => (
                                        <MenuItem key={index} onClick={() => handleSelect(item)}>{item}</MenuItem>
                                    ))}
                                </Menu>
                                <Stack>
                                    {selectedCategory.length === 0 ? <Typography color="white">All Exercises</Typography> : selectedCategory.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <Button variant="text" onClick={() => handleExerciseOptionClick(item)}>
                                                <Typography variant="button" color="black">{item}</Typography>
                                            </Button>
                                            <Divider sx={{ color: "gray", bgcolor: "gray" }} />
                                        </React.Fragment>
                                    ))}
                                </Stack>

                            </Drawer>


                        </Menu>


                    </Box>
                    {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
                    {/* <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        display={"none"}
                        href="#app-bar-with-responsive-menu"
                        
                        sx={{
                            display:"none",    
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
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={allExercises}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>

                        ))}

                    </Box>

                    <Stack direction={"row"} gap={5} sx={{ flexGrow: 0 }} >
                        <Stack alignItems={"center"} direction={"row"} mx={"auto"}>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    inputRef={searchedExerciseRef}

                                />

                            </Search>
                            <Button onClick={handleSearch} variant="contained" color="warning">Search</Button>
                        </Stack>
                        {/* <Tooltip title="Open settings">
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
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu> */}
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;
