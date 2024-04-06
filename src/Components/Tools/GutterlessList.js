import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';

export default function GutterlessList({data}) {
  return (
    <List sx={{ bgcolor: 'background.paper' }}>
      {Object.keys(data).map((key, index) => (
        <ListItem
          key={key}
          disableGutters
          sx={{ border: 1, paddingLeft: `20%` }}
        >
          <ListItemText primary={`${key}`}/>
          <ListItemText primary={`${data[key]}`} />
        </ListItem>
      ))}
    </List>
  );
}