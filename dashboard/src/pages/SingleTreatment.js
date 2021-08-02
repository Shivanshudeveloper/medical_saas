import React, { useState, useEffect} from 'react'
import { Container, Grid, TextField, InputLabel, Select, Button ,Card, CardHeader ,CardContent, Box, Avatar, Typography} from '@material-ui/core';

import queryString from "query-string";
import axios from 'axios';

import { API_SERVICE } from 'src/config/URI';

export default function SingleTreatment() {

const [user, setUser] = useState([]);
const [treatment_, setTreatment_] = useState([]);
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
    axios.get(`${API_SERVICE}/api/v1/main/gettreatment/${id}`).then((res) => {
      setTreatment_(res.data);
    }).catch(err=>{
      console.log(err);
    })
}, []);

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

const sig_t = (treatment_) => {
    return(
        <Container maxWidth="lg">
                      <br />
                      <br />
                      <br />
                      <br />
                      <h4>
                      Patient's Treatment Plan
                      </h4>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <InputLabel>Description</InputLabel>
                          <TextField id="outlined-basic" fullWidth placeholder="Description" variant="outlined" name= "desc" value={treatment_.desc}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <InputLabel>Diagnostic justification and/or assessment measures</InputLabel>
                          <TextField id="outlined-basic" fullWidth placeholder="Diagnostic justification and/or assessment measures" variant="outlined" name= "justification" value={treatment_.justification} />
                        </Grid>

                        <Grid item xs={12} mt={1} sm={12}>
                          <InputLabel>Presenting Problem</InputLabel>
                          <TextField id="outlined-basic" multiline rows={5} fullWidth placeholder="Presenting Problem" variant="outlined" name= "problem" value={treatment_.problem} />
                        </Grid>

                        <Grid item xs={12} mt={1} sm={12}>
                          <InputLabel>Treatment Goals</InputLabel>
                          <TextField id="outlined-basic" multiline rows={5} fullWidth placeholder="Treatment Goals" variant="outlined" name= "goals" value={treatment_.goals} />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                          <InputLabel>Estimated Completion</InputLabel>
                          <TextField id="outlined-basic" fullWidth placeholder="Description" variant="outlined" name= "estComp1" value={treatment_.estComp1} />
                        </Grid>

                        <Grid item xs={12} mt={1} sm={12}>
                          <InputLabel>Objective</InputLabel>
                          <TextField id="outlined-basic" multiline rows={5} fullWidth placeholder="Objective" variant="outlined" name= "obj" value={treatment_.obj} />
                        </Grid>

                        <Grid item xs={12} mt={1} sm={12}>
                          <InputLabel>Treatment Strategy / Interventions</InputLabel>
                          <TextField id="outlined-basic" multiline rows={5} fullWidth placeholder="Treatment Strategy / Interventions" variant="outlined" name= "strat" value={treatment_.strat} />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                          <InputLabel>Estimated Completion</InputLabel>
                          <TextField id="outlined-basic" fullWidth placeholder="Description" variant="outlined" name= "estComp2" value={treatment_.estComp2} />
                        </Grid>

                        <Grid item xs={12} mt={1} sm={12}>
                          <InputLabel>Prescribed Frequency of Treatment</InputLabel>
                          <TextField id="outlined-basic" multiline rows={5} fullWidth placeholder="Prescribed Frequency of Treatment" variant="outlined" name= "freq" value={treatment_.freq} />
                        </Grid>
                      </Grid>
                      <br />
              </Container>
    );
}

    return (
        <div style={{margin: '1%'}}>
            {loading === true? <div style={{textAlign: 'center'}}>Loading...</div>: user.map(Img)}
            <br></br>
            <div style={{textAlign: 'center'}}><h3>Treatment Plan</h3></div>
            {treatment_.length === 0? <div></div>: treatment_.map(sig_t)}
        </div>
    )
}
