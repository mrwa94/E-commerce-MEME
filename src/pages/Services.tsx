import { Card, CardBody, CardFooter, Typography, Button } from '@material-tailwind/react'
import { FaShippingFast } from 'react-icons/fa'
import { AiOutlineFieldTime } from 'react-icons/ai'
import { BsListStars } from 'react-icons/bs'

const iconStyle = 'mb-4 h-12 w-20 text-gray-900 container mx-auto px-4'
const Services = () => {
  return (
    <div className=" m-24  p-9">
      <Typography variant="h4">Services</Typography>
      <div className="flex flex-row gap-3 container mx-auto px-9">
        <Card className="mt-6 w-96">
          <CardBody>
            <FaShippingFast className={iconStyle} />

            <Typography variant="h5" color="blue-gray" className="mb-2">
              Express Shipping
            </Typography>
            <Typography>
              Offer your cusomers and delivery services. Highlight features such as fast delivery
              times
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <a href="#" className="inline-block">
              <Button size="sm" variant="text" className="flex items-center gap-2">
                Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-4 w-4">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </Button>
            </a>
          </CardFooter>
        </Card>
        <Card className="mt-6 w-96">
          <CardBody>
            <AiOutlineFieldTime className={iconStyle} />

            <Typography variant="h5" color="blue-gray" className="mb-2">
              24/7 Customer Support
            </Typography>
            <Typography>
              Provide round-the-clock customer support to enhance the shopping experience for your
              customers
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <a href="#" className="inline-block">
              <Button size="sm" variant="text" className="flex items-center gap-2">
                Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-4 w-4">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </Button>
            </a>
          </CardFooter>
        </Card>
        <Card className="mt-6 w-96">
          <CardBody>
            <BsListStars className={iconStyle} />

            <Typography variant="h5" color="blue-gray" className="mb-2">
              Product Reviews and Retings
            </Typography>
            <Typography>
              Implement a robust product review and rating system where customers can share their
              feedback and experiences with your products
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <a href="#" className="inline-block">
              <Button size="sm" variant="text" className="flex items-center gap-2">
                Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-4 w-4">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </Button>
            </a>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Services
