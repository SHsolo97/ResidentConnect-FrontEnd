import React,{useEffect} from 'react'
import { connect } from 'react-redux';
import { fetchClassifieds } from '../actions';
import ClassifiedCard from '../components/ClassifiedCard';

class ClassifiedsList extends React.Component {
    componentDidMount() {
     
      this.props.fetchClassifieds(this.props.communityid);
    }

  renderList() {
    return this.props.classifieds.map((classified) => {
      return (<div style={{marginTop:'10px'}}>
          <ClassifiedCard classified={classified}/>
          </div>)
        })
  }

  render() {
    return (<div>
            {this.renderList()}
            
        </div>);
  }
}
const mapStateToProps = state => {
    return { classifieds: state.classifieds };
  };
  
  export default connect(
    mapStateToProps,
    { fetchClassifieds }
  )(ClassifiedsList);
  