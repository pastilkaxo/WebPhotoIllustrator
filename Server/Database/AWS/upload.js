import { S3Client, PutObjectCommand, ListObjectsCommand } from "@aws-sdk/client-s3"
import fs from "fs";

const s3 = new S3Client({
    region: "EU",
    endpoint: "http://localhost.localstack.cloud:4566",
    forcePathStyle: true,
    credentials: {
        accessKeyId: "test",
        secretAccessKey:"test"
    }
});

async function main(params) {
    const fileBuffer = fs.readFileSync("../../../public/Images/dark-logo.png");
    const upload = new PutObjectCommand({
        Bucket: "user-illustrations",
        Key: "dark-logo",
        Body: fileBuffer,
        ContentType: "image/png"
    })

    await s3.send(upload);
    console.log("File upload: success");

    const list = new ListObjectsCommand({ Bucket: "user-illustrations" });
    const response = await s3.send(list);
    console.log("📂 Содержимое бакета:", response.Contents);
}

main().catch(console.error);