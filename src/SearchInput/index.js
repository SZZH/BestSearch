import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import {Search} from '@mui/icons-material';
import { Button, OutlinedInput } from '@mui/material';

const SearchInput = (props) => {
  const { defaultValue } = props
  const navigateTo = useNavigate()
  const [searchValue, setSearchValue] = useState(defaultValue || '')

  const handleSearch = () => {
    const trimSearchValue = searchValue?.trim()
    const searchQuery = trimSearchValue?.replace(/\s+/g, '+')
    navigateTo(`/search/${searchQuery}`)
    setSearchValue(trimSearchValue)
  }

  return (
    <div className="search-input">
      <OutlinedInput
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyUp={(e) => {
          if ((e.keyCode || e.which) == 13) {
            handleSearch()
          }
        }}
        placeholder='Search for new products in 961K stores'
      />
      <Button variant="outlined" onClick={handleSearch}><Search /></Button>
    </div>
  )
}

export default SearchInput