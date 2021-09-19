import React,{useEffect} from 'react'
import { connect } from 'react-redux';
import {ReviewCard} from './ReviewCard';
import { fetchCommentsAndUsers } from '../actions';
import Divider from '@material-ui/core/Divider';

class ReviewList extends React.Component {
    componentDidMount() {
     
      this.props.fetchCommentsAndUsers(this.props.classifiedid);
    }
    componentDidUpdate(prevProps, prevState) {
      console.log(this.props.newReview);
      if (prevProps.newReview !== this.props.newReview) {
        if(this.props.newReview===true)
        {
        this.props.fetchCommentsAndUsers(this.props.newReview);
        console.log(this.props.comments);
        }
      }
    }
  renderList() {
    return this.props.comments.map((comment) => {
      return ( <div style={{paddingBottom:'20px'}}>
          <ReviewCard comment={comment} />
          <Divider/>
          </div> )
        })
  }

  render() {
    return (<div>
            {this.renderList()}
            
        </div>);
  }
}

  const mapStateToProps = state => {
    return { comments: state.comments };
  };
  
  export default connect(
    mapStateToProps,
    { fetchCommentsAndUsers }
  )(ReviewList);