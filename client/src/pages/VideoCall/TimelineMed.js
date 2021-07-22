import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import img1 from '../../assets/img/1.png';
import img2 from '../../assets/img/2.png';
import img3 from '../../assets/img/3.png';
import img4 from '../../assets/img/4.png';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  timelineDot: {
    backgroundColor: 'white',
    borderRadius: '100%'
  }
}));

export default function TimelineMed() {
  const classes = useStyles();

  return (
    <Timeline align="alternate">
      <TimelineItem>
        <TimelineOppositeContent>
          <div   style={{ paddingLeft: '30%', padding: '5% 5% 15% 0'}} >
             <img style={{width: '70%', height: '40%'}} src={img1}></img>
          </div>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot className={classes.timelineDot}>
            <div style={{padding: '3px 10px', color: '#4D61FC',}}>
              <b>1</b>
            </div>
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <div style={{ paddingRight: '35%'}} >
            <h4 style={{fontWeight: 'bold'}}>Simple Booking for Clients</h4>
            <p>Clients can book anywhere - online, on chat, by phone or by email, and it will magically be synchronised for you.</p>
          </div>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent>
          <div style={{ paddingRight: '30%', padding: '5% 0 15% 5%'}}  >
            <img style={{width: '70%', height: '40%'}} src={img2}></img>
          </div>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot className={classes.timelineDot}>
            <div style={{padding: '3px 10px', color: '#4D61FC',}}>
              <b>2</b>
            </div>
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <div style={{ paddingLeft: '35%'}} >
            <h4 style={{fontWeight: 'bold'}}>Schedule and Intake</h4>
            <p>Schedule and conduct your hassle free Intake session. We will capture all important details for your before hand.</p>
          </div>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
      <TimelineOppositeContent>
          <div style={{ paddingLeft: '30%', padding: '5% 5% 15% 0'}} >
            <img style={{width: '70%', height: '40%'}} src={img3}></img>
          </div>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot className={classes.timelineDot}>
            <div style={{padding: '3px 10px', color: '#4D61FC',}}>
              <b>3</b>
            </div>
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <div style={{ paddingRight: '35%'}} >
            <h4 style={{fontWeight: 'bold'}}>Document Effortlessly</h4>
            <p>Record session notes seemlessly with minimal typing. Create a record of every session for your review </p>
          </div>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
      <TimelineOppositeContent>
          <div style={{ paddingRight: '30%', padding: '5% 0 15% 5%'}} >
            <img style={{width: '70%', height: '40%'}} src={img4}></img>
          </div>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot className={classes.timelineDot}>
            <div style={{padding: '3px 10px', color: '#4D61FC',}}>
              <b>4</b>
            </div>
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <div style={{ paddingLeft: '35%'}} >
            <h4 style={{fontWeight: 'bold'}}>Engage Clients between Sessions</h4>
            <p>Keep clients engaged with self improvement tools, in between sessions send nudges, homework or send message or video</p>
          </div>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot className={classes.timelineDot}>
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent>
        </TimelineContent>
      </TimelineItem>
      

    </Timeline>
  );
}
