import { ChangeEvent } from 'react'
import { Input, Button } from '@material-tailwind/react'

interface searchDetails {
  value: string
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}
const SearchInput = (props: searchDetails) => {
  return (
    <div className="relative flex w-full max-w-[24rem]">
      <Input
        type="text"
        label="Search "
        value={props.value}
        onChange={props.handleSearch}
        className="pr-20"
        containerProps={{
          className: 'min-w-0'
        }}
      />

      <Button
        size="sm"
        color={props.value ? 'gray' : 'blue-gray'}
        disabled={!props.value}
        className="!absolute right-1 top-1 rounded">
        Search
      </Button>
    </div>
  )
}
export default SearchInput
