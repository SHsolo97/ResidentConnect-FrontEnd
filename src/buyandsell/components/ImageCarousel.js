import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { makeStyles } from '@material-ui/core/styles';
import { Box,Paper } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    
    adImages:{
    width:"100ch",
    height:"60ch",
    display: 'flex',
    marginLeft:'5ch',
    paddingTop: '5ch',
    paddingLeft: '10ch',

    borderRadius:'2ch',
    
    },
    img:{
    maxHeight:'100%',
    maxWidth:'100%'
    }
    
    }));
export const ImageCarousel = ({images}) => {
    const classes=useStyles();
    return (
        <Paper elevation={3} className={classes.adImages} >

        <Carousel width='80ch' showThumbs={false} infiniteLoop={true} showIndicators={false} showArrows={true} autoPlay={true}>

       
  
        {images.map((image,index)=>{
  return <div style={{padding:'2ch', height:'50ch', width:'80ch'}}>
             <img   className={classes.img}  style={{ height:'50ch', width:'80ch'}}src={image} alt={index} /> </div>
      
        })
        }
      
        
        </Carousel>
        </Paper> 
    

   
    )
}
