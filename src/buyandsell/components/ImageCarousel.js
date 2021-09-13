import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    
    adImages:{
    width:"100ch",
    height:"60ch",
    display: 'flex',
    marginLeft:'5ch',
    padding: '1ch',
    borderRadius:'2ch',
    border: '2px solid orange'
    },
    img:{
    maxHeight:'100%',
    maxWidth:'100%'
    }
    
    }));
export const ImageCarousel = ({images}) => {
    const classes=useStyles();
    return (
        <Box className={classes.adImages} >

        <Carousel width='90ch' showThumbs={false} infiniteLoop={true} showIndicators={false} showArrows={true} autoPlay={true}>

       
  
        {images.map((image,index)=>{
  return <div style={{padding:'2ch', height:'50ch', width:'90ch'}}> <img   className={classes.img}  style={{ height:'50ch', width:'90ch'}}src={image} alt={index} /> </div>
      
        })
        }
      
        
        </Carousel>
        </Box> 
    

   
    )
}
