import React from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';




class Reviewer extends React.Component {
  
  render() {

    const { user } = this.props;

    if (!user) {
      return <div>{this.props.createdat}</div>;
    }

    return (
        <div>
             <Avatar alt={user.firstname} src={user.avatar} style={{  width: 100  ,height :100}}/>
             <div style={{fontSize:'14px', color:'grey'}}>{user.firstname} {user.lastname} </div>
            <span style={{fontSize:'12px', color:'grey'}}>{this.props.createdat}</span>
    </div>)
    ;
  }
}

const mapStateToProps = (state, ownProps) => {
  return { user: state.users.find(user => user._id === ownProps.userId) };
};

export default connect(mapStateToProps)(Reviewer);