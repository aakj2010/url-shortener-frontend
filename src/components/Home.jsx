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
    validate: (values) => {
      let errors = {};

      if (values.longUrl === "") {
        errors.longUrl = "Please Enter Long Url";
      }

      return errors
    },

    onSubmit: async (val) => {
      try {
        let output = await axios.post(`${env.api}/create`, val)
        setUrl(output.data)
        console.log(output);
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
          value={formik.values.longUrl}
          onChange={formik.handleChange}
          name="longUrl"
          placeholder='Enter your long url' />
        <button type='submit' className='button-9'>Submit</button>
      </form>

      <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>

    </div>
  )
}

export default Home