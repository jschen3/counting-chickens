import React, { Component } from 'react';
import * as dotenv from 'dotenv';
import { Buffer } from 'buffer';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AWS from 'aws-sdk';
import { MenuItem } from './types/menu';
dotenv.config();
const AWS_ACCESS_KEY_ID = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
const AWS_S3_BUCKET = process.env.REACT_APP_AWS_S3_BUCKET;
const AWS_S3_REGION = process.env.REACT_APP_AWS_S3_REGION;

interface IProps {
    allMenuItems: [MenuItem]
}
interface IState {
    allMenuItems: MenuItem[]
    images: string[]
}
export default class MenuItemContainer extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            allMenuItems: [],
            images: []
        }
        //this.getMenuItemData.bind(this);
    }

    getMenuItemData = () => {
        const menuItems = [
            {
                "visible": true,
                "ingredients": [
                    {
                        "name": "chicken",
                        "ingredientId": 1,
                        "unit": "lb",
                        "qty": 0.5
                    },
                    {
                        "name": "lemons",
                        "ingredientId": 2,
                        "unit": "ea",
                        "qty": 1
                    }
                ],
                "name": "lemon chicken",
                "restaurantId": "6f0e",
                "imagePath": "lemon chicken.jpeg",
                "restaurantName": "Sample Restaurant",
                "notes": "Lemons are fanstastic. Allergies to peanuts",
                "ranking": 2,
                "category": "poultry",
                "itemType": "entree",
                "description": "Chicken breast seasoned with lemons.",
                "price": 11.99,
                "id": "995d"
            },
            {
                "visible": true,
                "ingredients": [
                    {
                        "name": "hot dog",
                        "ingredientId": 12,
                        "unit": "ea",
                        "qty": 1
                    },
                    {
                        "name": "bread",
                        "ingredientId": 9,
                        "unit": "bun",
                        "qty": 1
                    }
                ],
                "name": "hot dog",
                "restaurantId": "6f0e",
                "imagePath": "hot dog.jpg",
                "restaurantName": "Sample Restaurant",
                "notes": "kids meal",
                "ranking": 6,
                "category": "sandwich",
                "itemType": "entree",
                "description": "hot dog",
                "price": 5.99,
                "id": "3fa8"
            },
            {
                "visible": true,
                "ingredients": [
                    {
                        "name": "eggplant",
                        "ingredientId": "11",
                        "unit": "ea",
                        "qty": 3
                    }
                ],
                "name": "eggplant with fish sauce",
                "restaurantId": "6f0e",
                "imagePath": "eggplant-fishsauce.jpg",
                "restaurantName": "Sample Restaurant",
                "notes": "vegetarian",
                "ranking": 1,
                "category": "vegetarian",
                "itemType": "entree",
                "description": "eggplant with fish sauce, soy sauce, sweet and savory",
                "price": 10.99,
                "id": "1231"
            }
        ];
        this.setState({ allMenuItems: menuItems }, () => {
            this.getMenuItemImages();
        });
    }
    getMenuItemImages = () => {
        const allMenuItems = this.state.allMenuItems;
        const images = this.state.images;
        for (let i = 0; i < allMenuItems.length; i += 1) {
            const stateMenuItem = allMenuItems[i];
            if (stateMenuItem.imagePath != null) {
                this.getImage(stateMenuItem.imagePath).then(result => {
                    const base64Image = this.convertToBase64(result.Body);
                    const currentImages = Object.assign(images);
                    currentImages.push(base64Image);
                    this.setState(state => ({images:currentImages}));
                });
            }
        }
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
            ResponseContentEncoding: 'image/jpg'
        };
        return s3.getObject(params).promise();
    }
    componentDidMount = () => {
        this.getMenuItemData();
    }
    render = () => {
        const allMenuItems = this.state.allMenuItems;
        const images = this.state.images;
        if (allMenuItems != null && allMenuItems.length > 0 && images != null && images.length >0) {
            const cardsArray = allMenuItems.map(
                (singleCard, index) =>  
                        (<React.Fragment>
                            <Card className="menu-item-card">
                                <CardHeader
                                title={singleCard.name}
                                />
                            {images[index]!=null &&
                            <CardMedia
                                className="menu-item-card-media-image"
                                component="img"
                                height="100"
                                src={`data:image/jpg;base64, ${images[index]}`}
                                alt="Paella dish"
                            />
                            }
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {singleCard.description}
                                </Typography>
                                <Typography variant="body2">{singleCard.price}</Typography>
                            </CardContent>
                        </Card>
                        </React.Fragment>) 
                );
            return (<div className="menu-item-container">
                {cardsArray} 
            </div>);
        }
        else {
            return (<div className="menu-item-container"></div>);
        }
    }
}