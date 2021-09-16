import React,{useEffect} from 'react'
import { connect } from 'react-redux';
import { fetchClassifieds } from '../actions';
import ClassifiedCard from '../components/ClassifiedCard';

class ClassifiedsList extends React.Component {
    constructor(props)
    {
      super(props);
      console.log(this.props.searchData);
      this.state = {
            
        searchQuery:this.props.searchData
    }
    }
    componentDidMount() {
     console.log(this.props.searchData);
      this.props.fetchClassifieds(this.props.searchData);
    }
    componentDidUpdate(prevProps, prevState) {
      console.log(this.props.searchData);
      if (prevProps.searchData !== this.props.searchData) {
        this.props.fetchClassifieds(this.props.searchData);

      }
    }

  renderList() {
    if(this.props.classifieds.length===0)
    {
      return <h2>No Results</h2> 
    }

    return (
      <div>
        <span>{this.props.classifieds.length} results found </span>
        { this.props.classifieds.map((classified) => {
      return (<div style={{marginTop:'10px'}}>
          <ClassifiedCard classified={classified}/>
          </div>)
        })
      }
        </div>)
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
  