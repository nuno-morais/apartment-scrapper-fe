import React from 'react';
import { List, ExportButton, useRefresh, Pagination } from 'react-admin';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import dataProvider from './../dataProvider';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = {
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
};

const ApartmentsGrid = ({ ids, data }) => {

    const filterIds = ids.filter(id => !data[id].isHidden);
    const refresh = useRefresh();

    const handleHidenClick = (apartmentId) => {

        dataProvider.create(`apartments/${apartmentId}/actions/hide`, { id: apartmentId, data: {} })
            .then(() => {
                console.log('Hidden apartment');
                refresh();
            })
            .catch((e) => {
                console.log('Error: An error occured on hidden apartment', 'warning')
            });
    }

    const handleFavoriteClick = (apartmentId) => {

        dataProvider.create(`apartments/${apartmentId}/actions/favorite`, { id: apartmentId, data: {} })
            .then(() => {
                console.log('Favorite apartment');
                refresh();
            })
            .catch((e) => {
                console.log('Error: An error occured on Favorite apartment', 'warning')
            });
    }


    return (
        <div style={{ margin: '1em' }}>
            {filterIds.map(id =>
                <Card key={id} style={useStyles.card}>
                    <CardActionArea onClick={() => {
                        window.open(data[id].ads[0].url, "_blank")
                    }}>
                        <CardHeader
                            title={data[id].price}
                            subheader={data[id].createdAt}
                        />
                        <CardMedia
                            style={useStyles.media}
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
                        <IconButton onClick={() => {
                            handleHidenClick(data[id].id)
                        }} aria-label="mark as hidden">
                            <VisibilityOffIcon />
                        </IconButton>
                        <IconButton onClick={() => {
                            handleFavoriteClick(data[id].id)
                        }} aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            )}
        </div>
    )
};
const PostActions = ({
    basePath,
    currentSort,
    displayedFilters,
    exporter,
    filters,
    filterValues,
    onUnselectItems,
    resource,
    selectedIds,
    showFilter,
    total
}) => {
    const handleHidenClick = () => {
        dataProvider.create(`apartment-trigger`, { data: {} })
            .then(() => {
                console.log('Hidden apartment');
            })
            .catch((e) => {
                console.log('Error: An error occured on hidden apartment', 'warning')
            });
    }

    return (
        <Toolbar>
            {filters && React.cloneElement(filters, {
                resource,
                showFilter,
                displayedFilters,
                filterValues,
                context: 'button',
            })}
            <ExportButton
                disabled={total === 0}
                resource={resource}
                sort={currentSort}
                filter={filterValues}
                exporter={exporter}
            />
            {/* Add your custom actions */}
            <Button color="primary" onClick={handleHidenClick}>Trigger scrapper</Button>
        </Toolbar>
    );
}
const ApartmentPagination = props => <Pagination rowsPerPageOptions={[6, 12, 24, 48]} {...props} />;

export const ApartmentList = props => (
    <List {...props}
        sort={{ field: 'createdAt', order: 'DESC' }} perPage={6} actions={<PostActions />}
        pagination={<ApartmentPagination />}>
        <ApartmentsGrid />
    </List>
);