import * as React from 'react';
import * as dotenv from 'dotenv';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AWS from 'aws-sdk';
async function getImage(imagePath: string){
  const AWS_ACCESS_KEY_ID = 'AKIA5V2SVVCIY3G5YQ7S';
  const AWS_SECRET_ACCESS_KEY = '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';
  const AWS_S3_BUCKET = 'counting-chickens-menu-items';
  const AWS_S3_REGION = 'us-east-2';
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
      const buf = Buffer.from(data);
      const base64 = buf.toString('base64');
      return base64;
   }}).promise();
  return image;
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
  

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={singleCardInfo.name}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
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
