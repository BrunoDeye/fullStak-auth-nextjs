import fs from 'fs'
import { type NextRequest } from 'next/server'

export default async function POST(request: NextRequest) {
  //Send the data for the pdf in the request as query params such as the title and filename
  const data = await request.json();
  const filename = data.filename
  //use the tmp serverless function folder to create the write stream for the pdf
  let writeStream = fs.createWriteStream(`/tmp/${filename}`);
  writeStream.write(data, function () {
    //once the doc stream is completed, read the file from the tmp folder
    const fileContent = fs.readFileSync(`/tmp/${filename}`);
    //create the params for the aws s3 bucket
    
    var params = {
      Key: `${filename}.pdf`,
      Body: fileContent,
      Bucket: 'your-s3-bucket-name',
      ContentType: 'application/pdf',
    };

    //Your AWS key and secret pulled from environment variables
    
  });
}