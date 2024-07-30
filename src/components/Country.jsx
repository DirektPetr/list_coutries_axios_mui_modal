import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
export const Country = (props) => {
  return (
    <>
      <CardActionArea>
        <Card
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.name.common}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <span style={{ fontWeight: 800 }}>Languages: </span>
              {props.languages ? (
                <span>{Object.values(props.languages).join(', ')}</span>
              ) : (
                <span>No languages available</span>
              )}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <span style={{ fontWeight: 800 }}>Capital:</span> {props.capital}
            </Typography>
          </CardContent>
          <CardMedia
            sx={{ width: '250px', height: '200px' }}
            component="img"
            image={props.flags.png}
            alt={props.name.common}
            title={props.name.common}
          />
        </Card>
      </CardActionArea>
    </>
  );
};
