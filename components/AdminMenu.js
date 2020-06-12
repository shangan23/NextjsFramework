import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useRouter } from 'next/router';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles((theme) => ({
  spacing: {
    display: 'flex',
    '& > *': {
      padding: theme.spacing(0.5),
    },
    marginLeft: theme.spacing(2),
    height: 50
  }
}));

export default function AdminMenu() {
  const classes = useStyles();
  const router = useRouter();

  const urlIndex = {
    0: '/admin',
    1: '/admin/users',
    2: '/admin/roles'
  };

  let activeValue = 0;

  switch (router.pathname) {
  case '/admin':
    activeValue = 0;
    break;
  case '/admin/users':
  case '/admin/users/create':
    activeValue = 1;
    break;
  case '/admin/roles':
    activeValue = 2;
    break;
  }

  const [value, setValue] = React.useState(activeValue);


  const handleChange = (event, newValue) => {
    setValue(newValue);
    //console.log(newValue, urlIndex[newValue]);
    router.push(urlIndex[newValue]);
    //console.log(urlIndex[newValue]);
  };


  return (
    <div className={classes.spacing}>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
      >
        <Tab label="General Settings" />
        <Tab label="Users" />
        <Tab label="Roles" disabled />
      </Tabs>
    </div>
  );
}
