import { S3Region, parentBucket } from '../config/env';

import { RNS3 } from 'react-native-aws3';
import { S3Options } from '../config/s3';

export async function uploadToS3(upload) {
  return new Promise((resolve, reject) => {
    try {
      const options = {
        bucket: parentBucket,
        keyPrefix: 'cache/',
        region: S3Region,
        accessKey: S3Options.accessKey,
        secretKey: S3Options.secretKey,
        successActionStatus: 201,
        awsUrl: `s3.${S3Region}.amazonaws.com`,
      };
      RNS3.put(upload.file, options)
        .then(response => {
          if (response.status !== 201) {
            const error = new Error('Attachment Upload S3 Error');
            reject(error);
          } else {
            resolve(response.body);
          }
        })
        .catch(error => {
          console.log(error);
          const newError = new Error(error.text ? error.text : 'Upload Error');
          reject(newError);
        });
      // end promise RNS3.put
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
} // end of uploadToS3
