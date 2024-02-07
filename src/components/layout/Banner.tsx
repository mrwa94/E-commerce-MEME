import { Carousel } from '@material-tailwind/react'
import banner1 from '../../assets/banner/banner1.jpg'
import banner2 from '../../assets/banner/banner2.jpg'
import banner3 from '../../assets/banner/banner3.png'

const Banner = () => {
  return (
    <Carousel transition={{ duration: 0.2 }} className="rounded-xl h-150">
      <img src={banner3} alt="image 1" className="h-full w-full object-cover" />
      <img src={banner2} alt="image 2" className="h-full w-full object-cover" />
      <img src={banner1} alt="image 3" className="h-full w-full object-cover" />
    </Carousel>
  )
}

export default Banner
