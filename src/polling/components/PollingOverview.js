import React from 'react'
import {fetchPollsByCreator} from '../actions/index';
import { connect } from 'react-redux';
import { SectionHeader } from '../../shared/components/SectionHeader';
import {PollingsList} from './PollingsList';
import PollCircles from './PollCircles';
 class  PollingOverview  extends React.Component{
 
     componentDidMount() {
         this.props.fetchPollsByCreator(this.props.userid);
         console.log(this.props.polls);
     }
      
  render() {
    return (
    <div>
        <PollCircles participants={100} activePolls={10} closedPolls={24} />
        <PollingsList  polls={this.props.polls}/>
        </div>
        )}

}
const mapStateToProps = state => {
    return { polls: state.polls };
  };
  
  export default connect(
    mapStateToProps,
    { fetchPollsByCreator }
  )(PollingOverview);
  