import {storage} from './firebase';

export  const uploadImagesToFireStorage = async (path,fileList) => {
    try {
        const uploadPromises = fileList.map(f => {
          //console.log(f.name);
            return storage
                .ref(path)
                .child(Date.now() + f.name)
                .put(f,
                    {
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
        const files = await Promise.all(shapePromises);
        
       
       return files;
      
      
    }

    catch (err) {
      
        console.log(err);
    }
}
export  const uploadFilesToFireStorage = async (path,fileList) => {
    try {
        const uploadPromises = fileList.map(f => {
          //console.log(f.name);
            return storage
                .ref(path)
                .child(Date.now() + f.name)
                .put(f.blobFile,
                    {
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
        const files = await Promise.all(shapePromises);
        
       
       return files;
      
      
    }

    catch (err) {
      
        console.log(err);
    }
}