import { useState, useEffect } from 'react'
import axios, { all } from 'axios'

function useFetch(url, page) {
  const [cats, setCats] = useState([])
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const [moreCats, setMoreCats] = useState(false)

  useEffect(() => {
    fetchData()
  }, [url, page])

  const fetchData = async () => {
    setLoading(true)
    setErr(false)
    try {
      const { data } = await axios({
        method: 'GET',
        url: url,
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
    } catch (err) {
      setErr(true)
    } finally {
      setLoading(false)
    }
  }

  return [cats, moreCats, err, loading]
}

export default useFetch