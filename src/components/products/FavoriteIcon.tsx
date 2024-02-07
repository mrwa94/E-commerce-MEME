import { Badge } from '@material-tailwind/react'
import React from 'react'
import { MdOutlineFavorite } from 'react-icons/md'

export const FavoriteIcon = ({ value }: { value: number }) => {
  return (
    <div>
      <MdOutlineFavorite />
      <Badge className=""> {value}</Badge>
    </div>
  )
}
