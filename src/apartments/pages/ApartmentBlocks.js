import React from 'react'
import { PrimaryButton } from '../../shared/components/PrimaryButton'
import { Grid } from '@material-ui/core';
import { BlockRow } from '../components/BlockRow';
import { makeStyles } from '@material-ui/core/styles';
import { PageHeader } from '../../shared/components/PageHeader';
import Paper from '@material-ui/core/Paper';
import communityAPI from '../../misc/axios-calls/communityAPI';
import { useCommunity } from '../../context/community.context';
import { Progress } from '../../shared/components/Progress';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop:'10px',
    fontSize:'18px',
    fontWeight:'bold'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export const ApartmentBlocks = ({ children, ...props }) => {

  const {community,setCommunity}=useCommunity();
  const {isProgress,setIsProgress}=React.useState(true);

  const communityid = community._id;
  const classes = useStyles();
  const [key, setKey] = React.useState(0);
  const IINTIAL_VALUE = {

    floors: 0,
    flats: 0,

    block: '',
    floordetails: []

  }
  const editBlocks = async (blocksToAdd) => {

    var apiBaseUrl = `/community/${communityid}/blocks/edit`
    await communityAPI.put(apiBaseUrl, blocksToAdd)
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          setCommunity(response.data);
          props.handleNext();


        }
      })
      .catch(function (error) {
        console.log(error);

      });
  }
  const [isNew, setIsNew] = React.useState([])
  const [blocks, setBlocks] = React.useState([])
  const getApartmentBlocks = async () => {
    var apiBaseUrl = `/community/${communityid}/blocks`
    await communityAPI.get(apiBaseUrl)
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data.blocks);
          const blockList = response.data.blocks;

          // eslint-disable-next-line array-callback-return
          blockList.map((block, index) => {
            blockList[index] = { ...block, key: index };
            setKey(index + 1);
          });
          console.log(blockList);
          setBlocks(blockList)


        }
      })
      .catch(function (error) {
        console.log(error);

      });
  }
  React.useEffect(() => {
    getApartmentBlocks();


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const addRow = (e) => {
    let block = IINTIAL_VALUE;
    block.key = key;
    setBlocks([...blocks, block]);
    setKey(key => key + 1);
    setIsNew([...isNew, true]);
    console.log(blocks);
  }
  const handleSubmit = (e) => {
    console.log(blocks);
    let blockdetails = [];
    // eslint-disable-next-line array-callback-return
    blocks.map((block) => {
      let b = {};
      b['floors'] = parseInt(block['floors'])
      b['flats'] = parseInt(block['flats'])
      b['block'] = block['block']
      b['floordetails'] = block['floordetails']
      blockdetails.push(b);
    })
    console.log(blockdetails);
    editBlocks(blockdetails);
   
  }
  const handleBack = (e) => {
    props.handleBack();
  }

  const deleteRow = (key) => {

    setBlocks((blocks) => blocks.filter((block) => block.key !== key));
  }
  const saveRow = (blocktoAdd) => {

    setBlocks((blocks) => blocks.map((block) => {
      if (block.key === blocktoAdd.key)
        return blocktoAdd;
      else
        return block;
    }));



  }
  const renderDetails=()=>{
    return( <Grid container direction="column" justifyContent="center" alignItems="center">
    <Grid container direction="row" justifyContent="space-between" alignItems="center"><PageHeader>{children}</PageHeader>
      <PrimaryButton onClick={addRow}>Add Block</PrimaryButton>
    </Grid>
    <Paper elevation={1}>
      {blocks.length !== 0 ?
        <Grid container direction="row" justifyContent="space-around" alignItems="center">

          <div className={classes.formControl}> Block </div>
          <div className={classes.formControl}> Floors</div>
          <div style={{borderLeft:'-50px'}} className={classes.formControl}>Flats </div>
        </Grid>
        :
        <h2 style={{ color: 'gray' }}> Please add block</h2>
      }

      {blocks.map((block, index) => {
        return <BlockRow key={index} isNew="true" saveRow={saveRow} deleteRow={deleteRow} block={block} />

      })}
    </Paper>
    <div style={{marginTop:'100px'}}>
      <PrimaryButton onClick={handleBack}> Back </PrimaryButton>
      <PrimaryButton style={{marginLeft:'50px'}} onClick={handleSubmit}> Next </PrimaryButton>
    </div>

  </Grid>)
  }
  return (
    <div>
    {
      community===null? <Progress/>:renderDetails()
    }
    </div>
   
  )
}