import React from 'react'
import { Link } from 'react-router-dom'
import { FaUser } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { Navbar, Typography, IconButton, Collapse } from '@material-tailwind/react'

import CartIcon from '../products/CartIcon'
import { RootState } from '../../redux/store'
import { FavoriteIcon } from '../products/FavoriteIcon'

const Header = () => {
  const { userData } = useSelector((state: RootState) => state.users)
  const { cartItem } = useSelector((state: RootState) => state.cart)
  const { favoriteItem } = useSelector((state: RootState) => state.favorite)
  const hover = 'hover:text-cyan-500 uppercase text-lg'

  const [openNav, setOpenNav] = React.useState(false)

  React.useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false))
  }, [])

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1  font-semibold">
        <Link className={hover} to={'/home'}>
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1  font-semibold">
        <Link className={hover} to={'/products'}>
          Products
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1  font-semibold">
        <Link className={hover} to={'/services'}>
          services
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1  font-semibold">
        <Link className={hover} to={'/contactUs'}>
          contactUs
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1  font-semibold">
        <Link
          to={`${
            userData?.isAdmin
              ? '/profile/adminProfile'
              : userData?.isAdmin
              ? '/profile/userProfile'
              : '/Login'
          }`}>
          <FaUser />
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1  font-semibold">
        <Link className={hover} to={'/favorite'}>
          <FavoriteIcon value={favoriteItem.length > 0 ? favoriteItem.length : 0} />
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1  font-semibold">
        <Link className={hover} to={'/cart'}>
          <CartIcon value={cartItem.length > 0 ? cartItem.length : 0} />
        </Link>
      </Typography>
    </ul>
  )

  return (
    <Navbar className="mx-auto max-w-screen-full px-4 py-2 lg:px-8 lg:py-4 mb-9">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography className="mr-4 cursor-pointer py-1.5 font-bold text-2xl">
          <Link to={'/'}>MEME</Link>
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}>
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">{navList}</div>
      </Collapse>
    </Navbar>
  )
}

export default Header
