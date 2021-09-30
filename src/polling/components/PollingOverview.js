import React from 'react'
import {fetchPollsByCreator} from '../actions/index';
import { connect } from 'react-redux';
import {PollingsList} from './PollingsList';
import PollCircles from './PollCircles';
 class  PollingOverview  extends React.Component{
 
     componentDidMount() {
       console.log(this.props.userid);
         this.props.fetchPollsByCreator(this.props.userid);
        
     }
      
  render() {
    return (
    <div>
        <PollCircles participants={this.props.participants} activePolls={this.props.activepolls.length} closedPolls={this.props.closedpolls.length} />
        <PollingsList  activepolls={this.props.activepolls} closedpolls={this.props.closedpolls}/>
        </div>
        )}

}
const mapStateToProps = state => {
  const today=new Date();
    return { activepolls: state.polls.filter(poll=>new Date(poll.expiredat)>=today),
      closedpolls: state.polls.filter(poll=>new Date(poll.expiredat)<today),
      participants : state.polls.reduce(function (total, poll) {
                
        return total + poll.answeredby.length;
  }, 0)
      };
  };
  
  export default connect(
    mapStateToProps,
    { fetchPollsByCreator }
  )(PollingOverview);
  