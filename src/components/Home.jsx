import React, { useState } from 'react'
import { Formik, useFormik } from 'formik'
import axios from 'axios'
import { env } from '../config'
import './Home.css'

function Home() {
  const [url, setUrl] = useState("");
  const formik = useFormik({
    initialValues: {
      longUrl: "",
    },
    validate: () => {
      let validate = {}
      return validate
    },
    onSubmit: async (val) => {
      try {
        let output = await axios.post(`${env.api}/create`, val)
        setUrl(output.data)
      } catch (error) {
        console.log(error);
      }
    }
  })
  return (
    <div className='home'>
      <div>
        <h1>Url Shortener</h1>
        <h2>Phaste Your Long Url</h2>
      </div>
      <form className="form"
        onSubmit={formik.handleSubmit}>
        <input type="url"
          id='longUrl'
          value={formik.values.longUrl}
          onChange={formik.handleChange}
          name="longUrl"
          placeholder='Phaste your long url' />
        <button type='submit' className='button-9'>Submit</button>
      </form>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {url}
      </a>
    </div>
  )
}

export default Home