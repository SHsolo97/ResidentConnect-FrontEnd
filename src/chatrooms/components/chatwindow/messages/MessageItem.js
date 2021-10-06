import React, { memo } from 'react';


import TimeAgo from 'timeago-react';
import { auth } from '../../../../misc/firebase';

import ProfileAvatar from '../../ProfileAvatar';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';
import { useHover } from '../../../../misc/custom-hooks';

import ImgBtnModal from './ImgBtnModal';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import { red } from '@material-ui/core/colors';
import { grey } from '@material-ui/core/colors';
import { Grid } from '@material-ui/core';

const StyledBadge = withStyles((theme) => ({
badge: {
right: -3,
top: 13,
border: `2px solid ${theme.palette.background.paper}`,
padding: '0 4px',
},
}))(Badge);
const renderFileMessage = (file) => {
if (file.contentType.includes('image')) {

return <div className="height-220">

  <ImgBtnModal src={file.url} fileName={file.name} />
</div>
}
if (file.contentType.includes('audio')) {
// console.log("audio");
return (
// eslint-disable-next-line jsx-a11y/media-has-caption
<audio controls>
  <source src={file.url} type="audio/mp3" />
  Your browser does not support the audio element
</audio>
)

}

return <a href={file.url}> Download {file.name} </a>
}


const MessageItem = ({ message, handleAdmin, handleLike, handleDelete }) => {

const { author, createdAt, text,file,  likeCount} = message;
const [selfRef] = useHover();


const isAuthor = auth.currentUser.uid === author.uid;


// console.log('isMessageAuthorAdmin', isMessageAuthorAdmin)
return (
<div ref={selfRef} style={{ marginTop:50}}>
  <div>

    <Grid  container direction="row" justifyContent="flex-start" alignItems="center">

        <ProfileAvatar src={author.avatar} alt={author.name} name={author.name} style={{  width: 50  ,height :50}} />
        
      <ProfileInfoBtnModal  handleAdmin={handleAdmin} style={{ padding:10}} profile={author} / >
     
     
      <TimeAgo datetime={createdAt} style={{ padding:10,  color: grey[500] , fontSize: 10 }} />
    </Grid>

    <Grid container direction="row" justifyContent="flex-start" alignItems="center">

      <IconButton aria-label="like" onClick={()=> handleLike(message.id,file)}>
        <StyledBadge badgeContent={likeCount}>

          <FavoriteIcon style={{ color: red[500] , fontSize: 15 }} />
        </StyledBadge>
      </IconButton>

      {isAuthor &&
      (<IconButton aria-label="delete" onClick={()=> handleDelete(message.id,file)}>
        <DeleteIcon style={{  fontSize: 15 }} />
      </IconButton>
      )
      }
    </Grid>
  </div>
  <div>
    {text &&
    <span style={{color:red[900] , fontSize:18}}> {text} </span>
    }
    {file &&
    renderFileMessage(file)
    }
  </div>
</div>

);
}

export default memo(MessageItem);