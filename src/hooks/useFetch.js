import { useState, useEffect } from 'react'
import axios from 'axios'

function useFetch(query, page) {
  const [cats, setCats] = useState([])
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const [moreCats, setMoreCats] = useState(false)

  useEffect(() => {
    fetchData()
  }, [query, page])
  
  const fetchData = async () => {
    setLoading(true)
    setErr(false)
    try {
      if(!query) {
        const { data } = await axios({
          method: 'GET',
          url: 'https://api.thecatapi.com/v1/breeds',
          params: { limit: 10, page:page }
        })
        if(data.length) {
          setMoreCats(true)
          setCats(prevCats => {
            if(!page == 0) {
              return [...new Set([...prevCats, ...data])]
            } else {
              return data
            }
          })
        } else {
          setMoreCats(false)
        }
      } else {
        const { data } = await axios({
          method: 'GET',
          url: 'https://api.thecatapi.com/v1/breeds/search',
          params: { q: query, limit: 10, page: page }
        })
        setCats(data)
        if(!data.length) {
          throw null
        }
        setMoreCats(false)
      }
    } catch (err) {
      setErr(true)
    } finally {
      setLoading(false)
    }
  }

  return [cats, moreCats, err, loading]
}

export default useFetch