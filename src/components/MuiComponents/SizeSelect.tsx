import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SizeSelect() {
  const [size, setSize] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSize(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120, maxWidth: 200, color: "white" }}>
      <FormControl fullWidth>
        <InputLabel sx={{ color:"white"}}>Size</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={size}
          label="Size"
          onChange={handleChange}
          sx={{ color:"white"}}
        >
          <MenuItem value={"small"}>Small</MenuItem>
          <MenuItem value={"medium"}>Medium</MenuItem>
          <MenuItem value={"large"}>Large</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}