import { useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { useEffect } from 'react';
import './index.css'
import SearchInput from '../SearchInput'
import ListItem from '../ListItem'

const Search = (props) => {
  const { keyword = '' } = useParams()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  const update = () => {
    setLoading(true)
    axios({
      url: 'http://3.141.23.218:5000/interview/keyword_search',
      method: 'post',
      data: {
        login_token: 'INTERVIEW_SIMPLY2021',
        search_phrase: keyword
      }
    })
      .then((res) => {
        const data = res.data.data
        setData(data.product_trends)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    update()
  }, [keyword])

  return (
    <div className='search-result-container'>
      <div className='search-result-title'>
        <span><b>Best</b>Search</span>
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