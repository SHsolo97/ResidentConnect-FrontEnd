import axios from "axios";
export  const getRequest = async (apiBaseUrl) =>{
    await axios.get(apiBaseUrl )
         .then(async function  (response) {
             if (response.status === 200)
            {           
              
                return await (response.data);
            }
       
         })
         .catch(function (error) {
             console.log(error);
             return(null);

         });
}