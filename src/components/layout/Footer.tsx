import { Link } from 'react-router-dom'
import { Typography } from '@material-tailwind/react'
import { Grid, Button } from '@mui/material'
import { AiFillApple, AiFillLinkedin } from 'react-icons/ai'
import { BsGooglePlay, BsInstagram } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import { RiTwitterXLine } from 'react-icons/ri'

const Footer = () => {
  const hover = 'hover:text-cyan-500 uppercase text-l'
  return (
    <Grid container spacing={2} columns={24} className="p-6 bg-black text-white bo">
      <Grid item xs={4}>
        <Typography variant="h6">MEME</Typography>
        <p className="mt-5">
          MEME is a Saudi Arabia-based online electronic devices store offering the Mobails,
          Computers and Cameras in the Middle East.
        </p>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h6">USEFUL LINKS</Typography>
        <div className="flex flex-col gap-3 mt-3">
          <Link className={hover} to={'/'}>
            Home
          </Link>
          <Link className={hover} to={'/products'}>
            Products
          </Link>
          <Link className={hover} to={'/services'}>
            Services
          </Link>
          <Link className={hover} to={'/contactus'}>
            Contact us
          </Link>
        </div>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h6"> Contact US</Typography>
        <div>
          <ul className="flex flex-row gap-2 justify-center m-3">
            <li>
              <a href="#">
                <MdEmail className="text-xl" />
              </a>
            </li>
            <li>
              <a href="#">
                <RiTwitterXLine className="text-xl" />
              </a>
            </li>
            <li>
              <a href="#">
                <AiFillLinkedin className="text-xl" />
              </a>
            </li>
            <li>
              <a href="#">
                <BsInstagram className="text-xl" />
              </a>
            </li>
          </ul>
        </div>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="h6">DOWNLOAD THE APP</Typography>
        <Button variant="contained" sx={{ bgcolor: 'white', margin: 2, color: 'black' }}>
          <AiFillApple className="mx-2 w-3 text-black" /> App Store
        </Button>
        <Button variant="contained" sx={{ bgcolor: 'white', color: 'black' }}>
          <BsGooglePlay className="mx-2 w-3 text-black" /> Google Play
        </Button>
      </Grid>
    </Grid>
  )
}

export default Footer
