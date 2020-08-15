import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

const InfoBox = ({ active, title, cases, total, classes, ...props }) => {
  return (
    <Card onClick={props.onClick} className={`infoBox ${classes} ${active ? 'active' : ''}`}>
      <CardContent>
        <Typography color="textSecondary title">
          {title}
        </Typography>
        <h2 className="infoBox__cases" >
          + {cases}
        </h2>
        <Typography color="textSecondary">
          <span className="totalTitle">Total :</span>  <span> {total}</span>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default InfoBox;
