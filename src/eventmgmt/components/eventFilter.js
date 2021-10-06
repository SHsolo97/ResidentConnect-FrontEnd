import React, {useState} from "react"
import Button from '@material-ui/core/Button';
import FilteredEventsList from "./filteredEvents";

const filterBoxStyle={ 
    height:"300px", 
    width:"1035px", 
    border:"1px solid #FF9800",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",  
}
const TextInputStyle={
    margin:"25px",
    padding:"10px",
    border:"1px solid #FF9800",
    borderRadius:"10px"
}
const EventFilter = () => {
    const [filter,setFilter]=useState({
        Type:"",
        Category:"",
        City:""
    });
    function handleChange(event){
        const { name, value }=event.target;
        setFilter(prevValue => {
            return {
            ...prevValue,
            [name]: value
    };
    });
}

    
    return (<div>
      <div class="eventFilter" style={filterBoxStyle}>
          <form action="/" method="post">
              <input type="text" name="Type" id="filterType" placeholder="Type" style={TextInputStyle} onChange={handleChange} value={filter.Type} />
              <input type="text" name="Category" id="filterCategory" placeholder="Category" style={TextInputStyle} onChange={handleChange} value={filter.Category}  />
              <input type="text" name="City" id="filterCity" placeholder="City" style={TextInputStyle} onChange={handleChange} value={filter.City}  />
              <Button variant="contained" color="primary" >Filter Events</Button>
          </form>
      </div>
      <FilteredEventsList heading="Filtered Events" Category={filter.Category} Type={filter.Type} City={filter.City} />
      </div>
    )
}

export default EventFilter;
