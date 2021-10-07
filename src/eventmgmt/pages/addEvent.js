import React, { useState } from 'react'
import ImageUpload from '../../classifieds/components/ImageUpload';
import { Alert } from '../../shared/components/Alert';
import { useAlertState } from '../../misc/custom-hooks';
import { Progress } from '../../shared/components/Progress';
import MenuItem from '@material-ui/core/MenuItem';
import eventAPI from '../../misc/axios-calls/eventAPI';
import FormControl from '@material-ui/core/FormControl';
import { uploadImagesToFireStorage } from '../../misc/firestore';
import Select from '@material-ui/core/Select';
import { useProfile } from '../../context/profile.context';
import { useHistory } from 'react-router'
import {TextField,Button} from '@material-ui/core';
// input[type="text"] {
//   width: 500px;
//   height: 35px;
//   margin: 20px;
// }

export const AddEvent = () => {
    const history=useHistory();
    var file=null;
    const categories=["Masterclass","Workshop","Contest"];
    const type=["online","venue"];
    const { user } = useProfile();
    const hostid=user._id;
    const fullname=user.firstname+" "+user.lastname;
    const communityid = user.communities[0];
    const { isAlertOpen, openAlert, closeAlert } = useAlertState();
    const [alertMessage, setAlertMessage] = useState(null);
    const [alertType, setAlertType] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [Event, setEvent] = useState({
        communityid:communityid,
        hostid:hostid,
        name:'',
        organizer: {
            name:fullname,
            email:user.email,
            phone:user.phone[0].number,
            id:hostid
        },
        startdate:'',
        enddate:'',
        starttime:'',
        endtime:'',
        timezone:'',
        mode: type[1],
        location:'',
        address : {
            addressline:'',
            area:'',
            city:'',
            state:'',
            pincode:'',
        },
        city:'',
        category: categories[1],
        description:'',
        thumbnailimage:'',
        images:[],
        enrolledby:[]
    });
    function handleChange(event){
        const { name, value }=event.target;
        setEvent(prevValue => {
            return {
            ...prevValue,
            [name]: value
    };
    });
}
const setAddressLine = (event) => {
    let tempaddress = Event.address; 
    tempaddress.addressline = event.target.value;
    setEvent((prevState) => {
      return { ...prevState, address: tempaddress }
    });
  }
  const setArea = (event) => {
    let tempaddress = Event.address;
    tempaddress.area = event.target.value;
    setEvent((prevState) => {
      return { ...prevState, address: tempaddress }
    });
  }

  const setCity = (event) => {
    const { name, value }=event.target;
    let tempaddress = Event.address;
    tempaddress.city = event.target.value;
    setEvent((prevState) => {
      return { ...prevState, [name]:value, address: tempaddress }
    });
  }

  const setState = (event) => {
    let tempaddress = Event.address
    tempaddress.state = event.target.value;
    setEvent((prevState) => {
      return { ...prevState, address: tempaddress }
    });
  }
  const setPincode = (event) => {
    let tempaddress = Event.address
    tempaddress.pincode = event.target.value;
    setEvent((prevState) => {
      return { ...prevState, address: tempaddress }
    });
  }
const addEvents = async (eventData) => {
    var apiBaseUrl = `/create`

    await eventAPI.post(apiBaseUrl, eventData)
      .then(function (response) {
        if (response.status === 201) {

          console.log(response.data);
          setIsLoading(false);
          setAlertMessage('Event is Added');
          setAlertType('success');
          openAlert();
        }

      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
        setAlertMessage(error.message);
        setAlertType('error');
        openAlert();


      });
  }   
    const gotoEvents=()=>
    {
        history.push('/events');
    }
    const addFile = (imagefile) => {
        file = imagefile;
      }
      const addEvent = async () => {
        setIsLoading(true);
        const fileList = [file];
    
        const path = `${communityid}/events`;
        //const imagefiles=await uploadImageToFireStorage();
        const imagefiles = await uploadImagesToFireStorage(path, fileList);
        const data = Event;
        try{
            data.thumbnailimage= imagefiles[0].url;
        }
        catch(err){
            console.log(err);
        }
        console.log(data);
        await addEvents(data);
    
      }
    return (
        <>
        <div ClassName="addEvent" >
        <h1 style={{ color:"#3f51b5" }} >Publish an Event</h1>
        <h2 style={{ color:"#3f51b5" }} >Basic Details</h2>
        <form>
        <div className="basicDetails" style={{ diplay:"flex",flexDirection:"row", }} >
            <div>
            <label htmlFor="name">Event Name: </label>
            <input type="text" name="name" onChange={handleChange} value={Event.name}  id="eventName"  />
            </div>
            <div>
            <label htmlFor="startDate">Start Date: </label>
            <input type="date" style={{ marginRight:"100px" }} name="startdate" onChange={handleChange} value={Event.startdate} id="startDate" />
            <label htmlFor="startTime">Start Time: </label>
            <input type="text" style={{ width:"100px" }} name="starttime" onChange={handleChange} value={Event.starttime}  id="startTime" />
            </div>
            <div>
            <label htmlFor="endDate">End Date: </label>
            <input type="date" style={{ marginRight:"100px" }} name="enddate" onChange={handleChange} min={Event.startdate} value={Event.enddate}  id="endDate" />
            <label htmlFor="endTime">End Time: </label>
            <input type="text" style={{ width:"100px" }} name="endtime" onChange={handleChange} value={Event.endtime}  id="endTime" />
            </div>
            <div>
            <label htmlFor="timeZone">Time Zone: </label>
            <input type="text" name="timezone" onChange={handleChange} value={Event.timezone}  id="timeZone" />
            </div>
            <div>
            <label htmlFor="eventType">Event Type</label>
            <Select id="eventType" name="mode" onChange={handleChange} value={Event.mode}   label="Event Type">
              {type.map((type) =>
                <MenuItem key={type} value={type}>{type}</MenuItem>
              )}
            </Select>
            </div>
        </div>
        <h2 style={{ color:"#3f51b5" }} >Location</h2>
        <div className="location" >
            <div>
            <label htmlFor="venue">Venue: </label>
            <input type="text" name="location" id="venue" onChange={handleChange} value={Event.location}/>
            </div>
            <div>
            <label htmlFor="locationName">Loaction Name: </label>
            <input type="text" name="location" id="locationName" onChange={setArea} value={Event.address.area}  />
            </div>
            <div>
            <label htmlFor="addressline">Address: </label>
            <input type="text" name="addressline" id="address" onChange={setAddressLine} value={Event.address.addressline} />
            </div>
            <div>
            <label htmlFor="city">City: </label>
            <input type="text" name="city" id="city" onChange={handleChange} value={Event.city}  />
            </div>
            <div>
            <label htmlFor="state">State: </label>
            <input type="text" name="state" id="state" onChange={setState} value={Event.address.state} />
            </div>
            <div>
            <label htmlFor="pincode">Pin Code: </label>
            <input type="text" name="pincode" id="pincode" onChange={setPincode} value={Event.address.pincode} />
            </div>
        </div>
        <h2 style={{ color:"#3f51b5" }} >More Details</h2>
        <div className="moreDetails" ></div>
            
            <div>
            <label htmlFor="category">Category :</label>
            <Select id="category" name="category" onChange={handleChange} value={Event.category} >
              {categories.map((category) =>
                <MenuItem key={category} value={category}>{category}</MenuItem>
              )}
              </Select>
            </div>
            
            <div>
            <ImageUpload addFile={addFile} id="eventImage" errorText="Upload Image" />
            </div>
            <div>
            <label htmlFor="description">Event Description </label>
            <textarea style={{ marginTop:"50px" }} onChange={handleChange} value={Event.description} className="form-control" rows="100" name="description" id="EventDescription" cols="80" rows="5"></textarea>
            </div>
            <Button onClick={addEvent} variant="contained" style ={{ backgroundColor:"#3f51b5", color:"white",marginTop:"30px", marginLeft:"300px" }} >Publish Event</Button>
            <Button variant="contained" style ={{ backgroundColor:"#3f51b5", color:"white",marginTop:"30px", marginLeft:"250px" }} onClick={gotoEvents} >Cancel </Button>
            </form>
        </div>
        {isLoading ?
      <Progress /> :
      null
    }
    {isAlertOpen ?

      <Alert open={isAlertOpen} handleClose={closeAlert} type={alertType}>{alertMessage}</Alert>

      :
      null}
        </>  
    )
}


