import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function AddToCartButton(props:{onClick:()=>void}) {
  return (
    <Stack spacing={2} direction="row">
      {/* <Button variant="text">Text</Button> */}
      <Button variant="contained" sx={{marginTop:2}}>Add to Cart</Button>
      {/* <Button variant="outlined">Outlined</Button> */}
    </Stack>
  );
}