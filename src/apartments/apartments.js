import React from 'react';
import { List, Create, SimpleForm } from 'react-admin';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles(() => ({
    card: {
        width: 300,
        minHeight: 300,
        margin: '0.5em',
        display: 'inline-block',
        verticalAlign: 'top'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    }
}));

const ApartmentsGrid = ({ ids, data, created_at }) => {
    const classes = useStyles();
    return (
        <div style={{ margin: '1em' }}>
            {ids.map(id =>
                <Card key={id} className={classes.card}>
                    <CardActionArea onClick={() => {
                            window.open(data[id].ads[0].url, "_blank")
                        }}>
                        <CardHeader
                            title={data[id].price}
                            subheader={data[id].createdAt}
                        />
                        <CardMedia
                            className={classes.media}
                            image={data[id].image}
                            title={data[id].title}
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {data[id].title}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" onClick={() => {
                            window.open(data[id].ads[0].url, "_blank")
                        }}>
                            Details
                        </Button>
                        <IconButton aria-label="mark as hidden">
                            <VisibilityOffIcon />
                        </IconButton>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            )}
        </div>
    )
};

export const ApartmentList = props => (
    <List {...props}>
        <ApartmentsGrid />
    </List>
);

export const ApartmentTrigger = (props) => (
    <Create {...props}>
        <SimpleForm>
        </SimpleForm>
    </Create>
);