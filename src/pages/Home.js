import React from 'react'
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';

const Home = (props) => {
    let mode = props.mode;
    let setMode = props.setMode;
  return (
    <>
        <Navbar mode={mode} setMode={setMode}/>
        <Carousel />
    </>
  )
}

export default Home