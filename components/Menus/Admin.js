import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useRouter } from 'next/router';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles((theme) => ({
  tabRoot: {
    minHeight: 24,
    height: 24
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
    <Tabs
      value={value}
      indicatorColor="secondary"
      textColor="secondary"
      onChange={handleChange}
      className={classes.tabRoot}
    >
      <Tab label="Settings" className={classes.tabRoot} />
      <Tab label="Users" className={classes.tabRoot} />
      <Tab label="Roles" className={classes.tabRoot} disabled />
      <Tab label="UI Config" className={classes.tabRoot} disabled />
      <Tab label="Orchestration" className={classes.tabRoot} disabled />
      <Tab label="Templates" className={classes.tabRoot} disabled />
    </Tabs>
  );
}
