import React from 'react'
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";

function SymbolForm(props) {
  return (
    <div >
        <CardActions sx={{ m: 2 }} style={{backgroundColor:"#D3D3D3"}}>
          
        <form onSubmit={props.handleSubmit}>
            <TextField
              onChange={e => props.setSymbol(e.target.value)}
              value={props.symbol}
              size="small"
              id="outlined-basic"
              label="Symbol"
              variant="outlined"
              sx={{mr:2}}
            />
            <Button variant="contained" size="small" type="submit">
              <AddIcon /> Watch
            </Button>
           </form>
           </CardActions>
    </div>
  )
}

export default SymbolForm