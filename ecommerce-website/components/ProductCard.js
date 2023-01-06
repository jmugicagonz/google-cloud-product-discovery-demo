import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


export default function ProductCard({ product }) {
    return (
        <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            {product.images && <CardMedia
            component="img"
            image={product.images[0].uri}
            alt="productMainImage"
            />}
            <CardContent sx={{ flexGrow: 1 }}>
                {product.title && <Typography gutterBottom variant="subtitle2" component="h2">
                    {product.title.length>75?product.title.substr(0,75)+"...":product.title}
                </Typography>}
                {product.description && <Typography variant="body2">
                    {product.description.length>130?product.description.substr(0,130)+"...":product.description}
                </Typography>}
            </CardContent>
            <CardActions>
            {product.uri && <Button href={product.uri} size="small" rel="noopener" target="_blank">View Details</Button>}
            </CardActions>
        </Card>
    )
}