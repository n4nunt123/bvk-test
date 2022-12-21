import { useState, useRef, useCallback } from "react"
import useFetch from "../hooks/useFetch"
import CardComponent from "../components/CardComponent"

function Main() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(0)
  const [cats, moreCats, err, loading] = useFetch(query, page)

  const observer = useRef()
  const lastCatRef = useCallback(catElementRef => {
    if(loading) return
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && moreCats) {
        setPage(prevPage => prevPage + 1)
      }
    })
    if(catElementRef) observer.current.observe(catElementRef)
  }, [loading, moreCats])

  const search = (e) => {
    setQuery(e.target.value)
    setPage(1)
  }

  return (
    <>
    <input type="text" onChange={search}></input>
    <div className="container-components">
      {cats.map((cat, index) => {
        if(cats.length === index + 1) {
          return (
          <div ref={lastCatRef} key={cat.id}>
            <CardComponent data={cat} /> 
          </div>
          )
        } else if (index > cats.length){
          return (
            <div>no more</div>
          )
        }else {
          return (
          <div key={cat.id}>
            <CardComponent data={cat} /> 
          </div>
          )
        }
      })}
      <div>{loading && 'Loading...'}</div>
      <div>{err && 'ERROR 404: CATS NOT FOUND'}</div>
    </div>
    </>
  )
}

export default Main