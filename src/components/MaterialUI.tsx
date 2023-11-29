import React from 'react'
import { Typography, Button, TextField, FormControl, Grid, Card, CardContent, Box, Container} from '@mui/material'

const MaterialUI = () => {
  // Typography is the text component and you effectively choose the element with styling

  return (
    <div>
      {/* Box is just a flexbox with the same properties */}
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Typography variant='h3'>John's Material UI Tests</Typography>
      </Box>

      {/* I think you just used this if you want to do things differently depending on screen size */}
      <Container>
        <Typography variant='h5'>Centered Vertically</Typography>
        <Typography variant='h5'>Centered Vertically Again</Typography>
      </Container>

      {/* <form action="">
        <FormControl>
        <TextField
            label="My text field"
            variant='outlined'
            value={'Test Value'}
          />
          <Button variant='contained' color='primary'>
            Click Me
          </Button>
        </FormControl>
      </form> */}

      {/* Grids range in size from 1 to 12 where 12 is full width */}
      {/* <Grid container spacing={2}>
        <Grid item xs={4} md={3} lg={2}>
          test
        </Grid>
        <Grid item xs={4} md={3} lg={2}>
          test
        </Grid>
        <Grid item xs={4} md={3} lg={2}>
          test
        </Grid>
      </Grid>
      
      <Grid container spacing={4}>
        {Array.from(Array(6)).map((_, index) => (
        <Grid item xs={4} md={3} key={index}>
          <Card>
            <CardContent>
              <Typography variant="h5">Item {index + 1}</Typography>
              <Typography variant="body2">Description of item {index + 1}...</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
      </Grid> */}
      

    </div>
  )
}

export default MaterialUI