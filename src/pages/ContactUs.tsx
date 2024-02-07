import { Card, Input, Button, Typography, Textarea } from '@material-tailwind/react'

export default function ContactUs() {
  return (
    <div color="transparent" className=" pb-10 ">
      <Typography variant="h4" color="blue-gray">
        Contact Us
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to Tell us about it.
      </Typography>
      <form className="mt-8 mb-5 w-50 max-w-screen-lg sm:w-96    ml-96  ">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: 'before:content-none after:content-none'
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Message
          </Typography>
          <Textarea
            size="lg"
            placeholder="Tell Us !"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: 'before:content-none after:content-none'
            }}
          />
        </div>
        <Button className="mt-6" fullWidth>
          Sent
        </Button>
      </form>
    </div>
  )
}
