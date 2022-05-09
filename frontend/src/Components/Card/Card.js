import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import CommentList from '../List/CommentList';
import Fade from '@mui/material/Fade';
import { addComment } from '../../Services/Services'


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function CustomCard(props) {

    const [data, setData] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const [comment, setComment] = useState("");

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const sendComment = async (id) => {
        const res = await addComment({ id, comment });
        console.log(res);
        setData(res.data.data);
        setComment('');
    }

    /************************************************************/
    useEffect(() => {
        setData(props.data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    /************************************************************/



    return (
        <Fade in={true}
            style={{ transformOrigin: '0 0 0' }}
            {...(true ? { timeout: 1000 } : {})}
        >
            <Card sx={{ maxWidth: 600, m: 2 }} elevation={20}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }}
                            alt={data && `${data.userINFO.firstName[0]}${data.userINFO.lastName[0]}`}>
                            {data && `${data.userINFO.firstName[0]}${data.userINFO.lastName[0]}`}
                        </Avatar>
                    }
                    title={data && `${data.userINFO.firstName} ${data.userINFO.lastName}`}
                    subheader={data && data.userINFO.email}
                />


                <CardMedia
                    component="img"
                    height="400"
                    sx={{ width: "37.5rem", objectFit: "cover" }}
                    image={data && `http://localhost:7000/${data.image}`}
                    alt={data && `${data.caption}'s image`}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {data && data.caption}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                        <Typography sx={{ mx: 1 }}>
                            {data && data.likesCount}
                        </Typography>
                    </IconButton>

                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1 },
                            width: "100%",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Input
                            color="grey"
                            fullWidth={true}
                            placeholder="Share your feelings..."
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                        />
                        <IconButton onClick={() => sendComment(data._id)} aria-label="sending comments" sx={{ m: 0, p: 0 }}>
                            <SendIcon />
                        </IconButton>
                    </Box>

                </CardActions>
                <Box component="div"
                    sx={{
                        p: 2,
                        display: 'flex',
                        cursor: 'pointer',
                        alignItems: "center",
                        justifyContent: 'center',
                    }}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ ml: 1 }}
                    >
                        View All {data && data.commentsCount} comments
                    </Typography>
                    <ExpandMore
                        expand={expanded}
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </Box>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {
                            data && data.comments.map(commentInfo => <CommentList key={commentInfo._id} details={commentInfo} />)
                        }
                    </CardContent>
                </Collapse>
            </Card >
        </Fade>
    );
}
