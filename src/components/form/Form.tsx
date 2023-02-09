import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Form() {
  const [name, setName] = useState<String>();
  const [number, setNumber] = useState<String>();
  const [email, setEmail] = useState<String>();
  const [isIncomplete, setIsIncomplete] = useState<Boolean>(true);
  const [alert, setAlert] = useState<Boolean>(false);
  const navigate = useNavigate();

  function saveDetails() {
    // if name, email or phone input is kept empty.
    if (
      name === undefined ||
      name.length < 3 ||
      '' ||
      number === undefined ||
      number.length < 10 ||
      '' ||
      email === undefined ||
      email.length < 4 ||
      ''
    ) {
      setIsIncomplete(true);
      setAlert(true);
    }

    // if all inputs are filled.
    if (name && email && number !== undefined) {
      setIsIncomplete(false);
      setAlert(false);
    }

    // collecting user data.
    const data = {
      name: name,
      email: email,
      number: number,
    };

    localStorage.setItem('data', JSON.stringify(data));
  }

  // if there is a change detected in isIncomplete, navigate user.
  useEffect(() => {
    !isIncomplete ? navigate('/second-page') : navigate('/');
  }, [isIncomplete]);

  return (
    <>
      {alert ? (
        <Alert
          severity="warning"
          sx={{
            position: 'absolute',
            top: '3vh',
            width: '40vw',
            margin: 'auto',
            left: '0',
            right: '0',
          }}
          action={
            <Button
              color="inherit"
              onClick={() => setAlert(false)}
              size="small"
            >
              X
            </Button>
          }
        >
          Please fill the details correctly!
        </Alert>
      ) : (
        ''
      )}
      <Grid container spacing={1} columns={2} rowGap={5}>
        <Grid item md={2}>
          <TextField
            id="standard-basic"
            onChange={(e) => setName(e.target.value)}
            fullWidth
            label="Name"
            variant="standard"
            style={{ textIndent: '12px' }}
          />
        </Grid>
        <Grid item md={1}>
          <TextField
            onChange={(e) => setNumber(e.target.value)}
            type="number"
            fullWidth
            label="Phone"
            variant="standard"
            style={{ textIndent: '12px' }}
          />
        </Grid>

        <Grid item md={1}>
          <TextField
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            label="Email"
            style={{ textIndent: '12px' }}
            variant="standard"
          />
        </Grid>

        <Grid item md={2}>
          <Button
            color="success"
            fullWidth
            variant="contained"
            onClick={saveDetails}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default Form;
