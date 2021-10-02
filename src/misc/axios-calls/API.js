
import React,{useState} from 'react'
const AWS_URI="https://residentsconnect-dev.srscloudapps.link/api"

export  default  getAPI({
     ANNOUNCEMENT:{
        LOCAL:"http://localhost:4010/api",
        AWS:AWS_URI
    },
    ADVERT:{
        LOCAL:"http://localhost:4004/api",
        AWS:AWS_URI
    },
    CARPOOLING:{
        LOCAL:"http://localhost:4006/api",
        AWS:AWS_URI
    },
    CLASSIFIEDS:{
        LOCAL:"http://localhost:4005/api",
        AWS:AWS_URI
    },
     COMMUNITY:{
        "LOCAL":"http://localhost:4000/api",
        "AWS":AWS_URI
    },
    NOTIFICATIONS:{
        "LOCAL":"https://residentsconnect-stg.srscloudapps.link/api",
        "AWS":"https://residentsconnect-stg.srscloudapps.link/api"
    },
     POLLINGS:{
        "LOCAL":"http://localhost:4007/api",
        "AWS":AWS_URI
    },
    PAYMENTS:{
        "LOCAL":"http://localhost:4012/api",
        "AWS":AWS_URI
    },
     USERS:{
        "LOCAL":"http://localhost:4002/api",
        "AWS":AWS_URI
    }

})
  

    

