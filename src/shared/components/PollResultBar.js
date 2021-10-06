import React from 'react'
  
const PollResultBar = ({progress,height}) => {
     
    const Parentdiv = {
        height: height,
        width: '60%',
        backgroundColor: '#FEF6E0',
        margin: 10
      }
      
      const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: "#FFE5A1",
        textAlign: 'right'
      }
     
        
    return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
      </div>
    </div>
    )
}
  
export default PollResultBar;