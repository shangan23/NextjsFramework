import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//import BarChart from '../Widgets/charts/barChart';
import PieChartWidget from '../Widgets/charts/pieChart';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  }
});

export default function SimpleCard() {
  
  const classes = useStyles();
 
  return (
    <Card className={classes.root}  elevation={0}>
      <CardContent>
        <Typography className={classes.title} color="primary" variant="body1">
          Word of the Day
        </Typography>
        <PieChartWidget />
      </CardContent>
    </Card>
  );
}