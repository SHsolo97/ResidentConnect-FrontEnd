import { useProfile } from '../context/profile.context';
import { storage } from '../misc/firebase';
const React = require('react')

const SamplePage =()=> {
    const {user}=useProfile();
    const  communityid =user.communities[0];

    const[isLoading,setIsLoading]=React.useState(false);
    const[file,setFile]=React.useState(null);
   
  const handleChange=(event)=> {
    setFile(event.target.files[0])
    console.log(file);
   
  }
  const uploadHandler=async (event)=>
  {
      console.log(file);
   
        const fileList=[file];
        try {
            setIsLoading(true);
            const uploadPromises = fileList.map(f => {
              console.log(f.name);
                return storage
                    .ref(`${communityid}/classifieds`)
                    .child(Date.now() + f.name)
                    .put(f.blobFile,
                        {
                          contentType: `image/jpeg`,
                          cacheControl: `public, max-age=${3600 * 12 * 3}`
                        });
  
            });
            const uploadSnapshots = await Promise.all(uploadPromises);
            const shapePromises = uploadSnapshots.map(async snap => {
                return {
                    contentType: snap.metadata.contentType,
                    name: snap.metadata.name,
                    url: await snap.ref.getDownloadURL()
                }
            })
            console.log(shapePromises);
            const files = await Promise.all(shapePromises);
            console.log(files);
           // await afterUpload(files);
            setIsLoading(false);
        }
            catch (err) {
                setIsLoading(false);
                console.log(err);
            }
        
  }
  
    return (
      <div>
        <input type="file" onChange={handleChange}/>
        <img src={file} alt="image" />
        <button onClick={uploadHandler}> upload</button>
      </div>
    );
  
}


export default SamplePage;
