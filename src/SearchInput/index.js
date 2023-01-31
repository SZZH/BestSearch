import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import {Search} from '@mui/icons-material';
import { Button, OutlinedInput } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'

import { setSearchValue } from '../store/reducer'

const SearchInput = (props) => {
  const { defaultValue } = props
  const navigateTo = useNavigate()
  const searchValue = useSelector((state) => state.app.searchValue)
  const dispatch = useDispatch()

  const handleSearch = () => {
    const trimSearchValue = searchValue?.trim()
    const searchQuery = trimSearchValue?.replace(/\s+/g, '+')
    navigateTo(`/search/${searchQuery}`)
    dispatch(setSearchValue(trimSearchValue))
  }

  useEffect(() => {
    dispatch(setSearchValue(defaultValue))
  }, [])

  return (
    <div className="search-input">
      <OutlinedInput
        value={searchValue}
        onChange={(e) => dispatch(setSearchValue(e.target.value))}
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