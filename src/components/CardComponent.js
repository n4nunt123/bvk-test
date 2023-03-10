import { useEffect, useState } from "react"
import React from 'react'
import axios from 'axios'


import chart from './Graph'
import { Radar } from 'react-chartjs-2';

export default function CardComponent(props) {
  const [visible, setVisible] = useState(false)
  const [image, setImage] = useState('')

  const click = () => {
    if(visible) setVisible(false)
    else setVisible(true)
  }

  const getImage = async (image) => {
    const { data } = await axios({
      url: `https://api.thecatapi.com/v1/images/${image}`,
      method: 'GET'
    })
    setImage(data.url)
  }

  useEffect(() => {
    getImage(props.data.reference_image_id)
  }, [image])
  
  return (
    <>
      <div className="card-container">
        <div className="card" style={{width: "25rem", margin: 15}}>
          {image ? <img src={image} className="card-img-top" alt={props.data.name} /> : <img src={'https://cdn.discordapp.com/attachments/1043787906436841502/1053190363399061525/640px-Image_not_available.png'} className="card-img-top" alt={props.data.name} />}
          <div className="card-body">
            <h5 className="card-title">{props.data.name}</h5>
            <p className="card-text">{props.data.description}</p>
            {visible && <div style={{"margin-bottom": 25}}>
              <p className="card-text">Origin: {props.data.origin}<br/>Imperial Weight: {props.data.weight.imperial} Kg<br/>Metric Weight: {props.data.weight.metric} Kg<br/>Life Span: {props.data.life_span} years</p>
              <Radar data={chart(props.data)} />
              <a href={props.data.wikipedia_url} className="card-text">Wikipedia</a>
            </div>}
            <a onClick={click} className="btn btn-primary">{!visible ? 'Show More...' : 'Show Less..'}</a>
          </div>
        </div>
      </div>
    </>
  )
}
