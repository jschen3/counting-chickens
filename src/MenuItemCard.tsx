import * as React from 'react';
import * as dotenv from 'dotenv';
import {Buffer} from 'buffer';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AWS from 'aws-sdk';
async function getImage(imagePath: string){
  dotenv.config()
  const AWS_ACCESS_KEY_ID = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
  const AWS_SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
  const AWS_S3_BUCKET = process.env.REACT_APP_AWS_S3_BUCKET;
  const AWS_S3_REGION = process.env.REACT_APP_AWS_S3_REGION;
  AWS.config.update({
    region: AWS_S3_REGION,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  });
  const s3 = new AWS.S3();
  const params = {
    Bucket: AWS_S3_BUCKET,
    Key: imagePath,
    ResponseContentEncoding:'image/png'
  };
  const image =  s3.getObject(params, function(err, data){
    if (err){
       console.log(err, err.stack)
    }
    else{
      return data;
   }}).promise();
  return image;
}

function encode(data){
  const buf = Buffer.from(data);
  const base64 = buf.toString('base64');
  return base64
}
export default async function MenuItemCard() {
  const singleCardInfo={
    name: 'hot dog',
    imagePath: 'hot dog.png',
    id: '3fa8',
    description: 'hot dog',
    price: 5.99,
    ingredients: [
      {
        name: 'hot dog',
        qty: 1,
        unit: 'ea',
        ingredientId: 12,
      },
      {
        name: 'bread',
        qty: 1,
        unit: 'bun',
        ingredientId: 9,
      },
    ],
    itemType: 'entree',
    category: 'sandwich',
    notes: 'kids meal',
    ranking: 6,
    restaurantName: 'Sample Restaurant',
    restaurantId: '6f0e',
    visible: true
  };
  const image = await getImage(singleCardInfo.imagePath);
  const imageData = encode(image.Body)
  //<!--{`data:image/png;base64, ${imageData}`} -->

  //https://stackoverflow.com/questions/46879693/how-to-set-state-in-react-and-material-ui-over-js-files
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={singleCardInfo.name}
      />
      <CardMedia
        component="img"
        height="194"
        src="example.png" 
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         {singleCardInfo.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
