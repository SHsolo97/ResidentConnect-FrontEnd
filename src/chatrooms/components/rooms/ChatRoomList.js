import React from 'react';
import {  Nav } from 'rsuite';
import { Link, useLocation } from 'react-router-dom';
import { useRooms } from '../../../context/rooms.context';
import {RoomCard} from './RoomCard';
import { CircularProgress, Grid, Paper, TextField } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import { auth } from '../../../misc/firebase';
import { transformToArr } from '../../../misc/helpers';
import { JoinRoomCard } from './JoinRoomCard';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
const useStyles = makeStyles((theme) => ({

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha('#FF9800', 0.15),
    '&:hover': {
      backgroundColor: alpha('#FF9800', 0.25),
    },
    margin:'2ch',
    width: '60ch'
    
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color:'#000000'
    
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '50ch',
      '&:focus': {
        width: '50ch',
      },
    },
  },
}));
const ChatRoomList = ({ setCurrentRoomId, aboveElHeight }) => {
  const data=useRooms();
    const[rooms,setRooms] = React.useState(data);

    const classes=useStyles();
    //const c_rooms=rooms.find(room => room.communityid === communityid);
    const location = useLocation();
    const setCurrentRoom=(roomid)=>{
        console.log(roomid);
        setCurrentRoomId(roomid);
    } 
    React.useEffect(() => {
      setRooms(data);
    }, [data])
  
    const setSearchFilter=(event)=>
    {
      if (event.key === 'Enter') {
      console.log(event.target.value);
      const searchString=event.target.value;
      const result= data.filter(room=>room.name.includes(searchString));
      setRooms(result);
      }
    }

 
    return (
        <div>
        <div >
     
          
           <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"  onKeyDown={setSearchFilter}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
       
      </div>
        <Paper style={{height: 600, overflow: 'auto'}}>
        <Nav
        appearance="subtle"
        vertical
        reversed
        
        style={{ height: `calc(100% -${aboveElHeight}px)` }}
        activeKey={location.pathname} 
    >
            {!rooms && (<CircularProgress/>)}
            
            {rooms &&
                rooms.length > 0 &&
                rooms.map((room,index) => (
                    transformToArr(room.members).includes(auth.currentUser.uid)
                    ? 
                    <Nav.Item  style={{listStyleType:'none', marginTop:20}} componentClass={Link}  to={`/chat/${room.id}`}
                    key={room.id} panel="true"
                    eventKey={`/chat/${room.id}` }> 
                  
                    <RoomCard setCurrentRoomId={setCurrentRoom} room={room} />
                    </Nav.Item>
                    :
                    <Nav.Item  style={{listStyleType:'none', marginTop:20}} componentClass={Link}  to={`/chat/${room.id}`}
                    key={room.id} panel="true"
                    eventKey={`/chat/${room.id}` }> 
                    <JoinRoomCard room={room} />
                    </Nav.Item>


                  
               
            ))}
            

        </Nav>
        </Paper>
        </div>
    );
        }

export default ChatRoomList;