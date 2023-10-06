import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';

interface Props {
  placeholder: string
  className?: string
}

export function SearchBar({
  placeholder,
  className
}: Props) {
  return (
    <Box className={`flex bg-[#E9EDEF] gap-2 w-full max-w-xl pl-4 rounded-full ${className}`}>
      <SearchIcon sx={{ alignSelf: 'center' }}/>
      <input
        name='text'
        type='text'
        className='w-full py-3 pr-4 bg-[#E9EDEF] dark:text-primary-color rounded-full focus:outline-none'
        placeholder={placeholder}
      ></input>
    </Box>
  )
}
