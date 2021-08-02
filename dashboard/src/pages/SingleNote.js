import React, { useState, useEffect} from 'react'
import { Card, CardHeader ,CardContent, Box, Avatar, Typography} from '@material-ui/core';

import renderHTML from 'react-render-html';

import queryString from "query-string";
import axios from 'axios';

import { API_SERVICE } from 'src/config/URI';

export default function SingleNote() {

const [user, setUser] = useState([]);
const [userNotes, setUserNotes] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    const { id } = queryString.parse(window.location.search);
    axios.get(`${API_SERVICE}/api/v1/main/getuser/${id}`).then((res) => {
        setUser(res.data);
        setLoading(false)
    });
}, []);

useEffect(() => {
    const { id } = queryString.parse(window.location.search);
    axios.get(`${API_SERVICE}/api/v1/main/getusernotes/${id}`).then((res) => {
      setUserNotes(res.data);
    });
}, []);

const sig_note = (data, idx) => {
    return (
      <>
      <Card className='mt-2'>
        <CardHeader title={`Note ${idx+1}`} />
        <CardContent>
            {renderHTML(data.note)}
        </CardContent>
      </Card>
      </>
    );
};

const Img = (user) => {
    return (
      <Card>
        <CardContent>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Avatar
              src={user.image}
              sx={{
                height: 100,
                width: 100,
              }}
            />
            <Typography color="textPrimary" gutterBottom variant="h3">
              {user.name}
            </Typography>
            <Typography color="textSecondary" variant="body1">
              {user.location}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  };

    return (
        <div style={{margin: '1%'}}>
            {loading === true? <div style={{textAlign: 'center'}}>Loading...</div>: user.map(Img)}
            <br></br>
            <div style={{textAlign: 'center'}}><h3>Notes</h3></div>
            {userNotes.length === 0 ? <div></div> : userNotes.map(sig_note)}
        </div>
    )
}
