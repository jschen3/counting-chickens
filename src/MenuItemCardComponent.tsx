import React, { Component } from 'react';
import * as dotenv from 'dotenv';
import { Buffer } from 'buffer';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AWS from 'aws-sdk';
dotenv.config();
const AWS_ACCESS_KEY_ID = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
const AWS_S3_BUCKET = process.env.REACT_APP_AWS_S3_BUCKET;
const AWS_S3_REGION = process.env.REACT_APP_AWS_S3_REGION;
const singleCardInfo = {
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
export default class MenuItemCardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    };
  }
  componentDidMount = () => {
    this.getImage(singleCardInfo.imagePath).then(result => {
      const base64Image = this.convertToBase64(result.Body)
      this.setState({ image: base64Image });
    });

  }
  convertToBase64 = (data) => {
    const buf = Buffer.from(data);
    const base64 = buf.toString('base64');
    return base64;
  }
  getImage = (imagePath: string) => {
    AWS.config.update({
      region: AWS_S3_REGION,
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    });
    const s3 = new AWS.S3();
    const params = {
      Bucket: AWS_S3_BUCKET,
      Key: imagePath,
      ResponseContentEncoding: 'image/png'
    };
    return s3.getObject(params).promise();
  }

  render() {
    return <React.Fragment> {
      <Card>
        <CardHeader
          title={singleCardInfo.name}
        />
        <CardMedia
          component="img"
          height="194"
          src={`data:image/png;base64, ${this.state.image}`}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {singleCardInfo.description}
          </Typography>
        </CardContent>
      </Card>}</React.Fragment>;
  }
}