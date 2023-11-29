import React from 'react'
import { Typography, Button, TextField, FormControl} from '@mui/material'

const MaterialUI = () => {
  // Typography is the text component and you effectively choose the element with styling

  return (
    <div>
      <Typography variant='h3'>John's Material UI Tests</Typography>
      <form action="">
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
      </form>
      
    </div>
  )
}

export default MaterialUI