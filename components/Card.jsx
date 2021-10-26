import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function MyCard({title, img, children}) {
  return (
    <Card className='card'>
      <CardActionArea className="actionArea">
        <CardMedia
          component="img"
          height="150"
          image={img}
          alt="trilha"
        />

        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2">
            {children}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MyCard;
