import { Button, Navbar, TextInput, Dropdown, Avatar } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { toogleTheme } from '../redux/theme/themeSlice';

function Header() {
  const path = useLocation().pathname;
  const stateInfo = useSelector( store => store.user );
  const { currentUser } = stateInfo;
  const dispatch = useDispatch();
  const theme = useSelector( store => store.theme.theme );
  // console.log(currentUser);
  // console.log(currentUser.profilePicture);
  
  // currentUser looks like this :->
  /*
  {
    currentUser: null,
    error: null,
    loading: null,
  }
  */


  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if( !res.ok ) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Navbar className='border-b-2'>
        <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
          <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-300 to-purple-200 rounded-lg text-gray-800'>
            100xdev
          </span>
          <span className='text-gray-800'>
            Blogs
          </span>
        </Link>
        <form>
          <TextInput 
            id="search" 
            type="text" 
            placeholder="Search..." 
            rightIcon={ AiOutlineSearch }
            className='hidden lg:inline'
          />
        </form>
        <Button className='w-12 h-10 lg:hidden bg-blue-600' pill>
          <AiOutlineSearch />
        </Button>
        <div className='flex gap-2 md:order-2'>
          <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={() => dispatch(toogleTheme())}>
            { theme === 'light' ? <FaMoon /> : <FaSun />}
          </Button>

          {currentUser? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar alt='user' img={currentUser.profilePicture} rounded />
              }
            >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-medium font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown> 
          ): (
            <Link to='/signin'>
              <Button gradientDuoTone={"purpleToBlue"} outline>
                Sign In
              </Button>
            </Link>
          )}


          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link active={path === '/'} as={'div'}>
            <Link to='/'>
              Home
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === '/about'} as={'div'}>
            <Link to='/about'>
              About
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === '/projects'} as={'div'}>
            <Link to='/projects'>
              Projects
            </Link>
          </Navbar.Link> 
        </Navbar.Collapse>
    </Navbar>
  )
}

export default Header