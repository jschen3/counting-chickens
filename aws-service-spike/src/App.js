import axios from 'axios';
 
import React,{Component} from 'react';
const AWS = require('aws-sdk');
const fs = require('fs')
const AWS_ACCESS_KEY_ID = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
const AWS_S3_BUCKET= process.env.REACT_APP_AWS_S3_BUCKET;
const AWS_S3_REGION= process.env.REACT_APP_AWS_S3_REGION;
class App extends Component {
    constructor(props) {
      
      AWS.config.update({
        accessKeyId:AWS_ACCESS_KEY_ID,
        secretAccessKey:AWS_SECRET_ACCESS_KEY,
        region: AWS_S3_REGION
      });
      super(props)
      this.state = {
        selectedFile: null
      };
    }
    
  
    onFileChange = event => {
      // Update the state
      this.setState({ selectedFile: event.target.files[0] });
      // convert from the this.state.selectedFile to filestream
    };
    // On file upload (click the upload button)
    fileData = () => {
      if (this.state.selectedFile) {
        var file = this.state.selectedFile;
        var fileName = this.state.selectedFile.name;
        const s3Bucket = new AWS.S3({ params: { Bucket: AWS_S3_BUCKET}});
        s3Bucket.putObject({
          Bucket: AWS_S3_BUCKET,
          Key: fileName,
          Body: file,
          ACL: 'public-read'
        }).promise().then(function(data){
          console.log("success");
        }).catch(function(err){
          console.log("error occurred");
          console.log(err);
        });
        return (
          <div>
            <h2>File Details:</h2>
              <p>File Name: {this.state.selectedFile.name}</p>       
              <p>File Type: {this.state.selectedFile.type}</p>
              <p>Last Modified:{" "}{this.state.selectedFile.lastModifiedDate.toDateString()}</p>
          </div>
        );
      } else {
        return (
          <div>
            <br />
            <h4>Choose before Pressing the Upload button</h4>
          </div>
        );
      }
    };
    
    render() {
      return (
        <div>
            <h1>
              GeeksforGeeks
            </h1>
            <h3>
              File Upload using React!
            </h3>
            <div>
                <input type="file" onChange={this.onFileChange} />
            </div>
          {this.fileData()}
        </div>
      );
    }
  }
 
  export default App;