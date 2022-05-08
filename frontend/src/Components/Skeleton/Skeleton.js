import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import CardActions from '@mui/material/CardActions';

function Media() {
    return (
        <Card sx={{ maxWidth: 800, m: 2 }} elevation={20}>
            <CardHeader
                avatar={
                    <Skeleton animation="wave" variant="circular" width={40} height={40} />
                }
                title={<Skeleton
                    animation="wave"
                    height={10}
                    width="510px"
                    style={{ marginBottom: 6 }} />}
                subheader={<Skeleton animation="wave" height={10} width="40%" />}
            />
            <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
            <CardContent>
                <React.Fragment>
                    <Skeleton animation="wave" height={10} width="80%" />
                    <Skeleton animation="wave" height={10} width="50%" />
                    <Skeleton animation="wave" height={10} width="70%" />
                </React.Fragment>
            </CardContent>
            <CardActions >
                <CardContent>
                    <React.Fragment>
                        <Skeleton animation="wave" height={10} width="510px" />
                    </React.Fragment>
                </CardContent>
            </CardActions>
        </Card>
    );
}


export default function Facebook() {
    return (
        <div>
            <Media />
        </div>
    );
}
