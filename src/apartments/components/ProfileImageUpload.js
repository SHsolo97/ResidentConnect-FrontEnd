import React, { useRef, useState, useEffect } from 'react';

import { Avatar, Button } from '@material-ui/core';
import './ProfileImageUpload.css';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { makeStyles } from '@material-ui/core/styles';
import { Fullscreen } from '@material-ui/icons';

const ProfileImageUpload = props => {
 const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState(props.previewUrl);
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = event => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
 //   props.onInput(props.id, pickedFile, fileIsValid);
      props.addFile(pickedFile,props.placeholder);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div  >
      <input
        
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
     
        <Avatar  style={{ height: '150px', width: '150px' , objectFit:'cover' }} className="image-upload__preview"   onClick={pickImageHandler}>
          {previewUrl && <img src={previewUrl} alt="Preview"  />}
          {!previewUrl && <AddAPhotoIcon fontSize="large"/> }
        </Avatar>
       
     
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ProfileImageUpload;
