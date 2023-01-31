import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";

import { fetchData } from '../store/reducer'
import './index.css'
import SearchInput from '../SearchInput'
import ListItem from '../ListItem'

const Search = (props) => {
  const { keyword = '' } = useParams()
  const navigateTo = useNavigate()
  const loading = useSelector((state) => state.app.loading)
  const data = useSelector((state) => state.app.data)
  const dispatch = useDispatch()

  const update = () => {
    dispatch(fetchData(keyword))
  }

  useEffect(() => {
    update()
  }, [keyword])

  return (
    <div className='search-result-container'>
      <div className='search-result-title'>
        <span onClick={() => {
          navigateTo('/')
        }}><b>Best</b>Search</span>
        <SearchInput defaultValue={keyword.replace('+', ' ')}/>
      </div>
      <div className='search-result-content'>
        <div className='search-list-title'>Related product trends</div>
        <div className='search-list'>
          {
            loading ? (
              ['a','b','c','d'].map((item) => (
                <ListItem
                  key={item}
                  loading={true}
                />
              ))
            ) : data?.map((item, index) => (
              <ListItem
                key={item.name}
                keyword={keyword}
                data={item}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Search