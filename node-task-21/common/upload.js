const { BlobServiceClient } = require('@azure/storage-blob');


// Replace 'your_storage_account_connection_string' and 'your_container_name' with your actual values
const connectionString = 'DefaultEndpointsProtocol=https;AccountName=rockerzstorage;AccountKey=kxKEHPkUhfiNEBQGeHl6QYBEP9vRzsjORwDuT1gc5vGjj6zFQsFN9zqAa9J4AwXhOFBqKxNF+fRB+AStCJy7sw==;EndpointSuffix=core.windows.net';
const containerName = 'taskcontainer';

// Create a BlobServiceClient
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

// Get a reference to a container
const containerClient = blobServiceClient.getContainerClient(containerName);


async function uploadToBlobStorage(profilePicBase64, blobName) {
    // converting file to a buffer
    const imageBuffer = Buffer.from(profilePicBase64);
    // getting ref of blockblob client
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    // Uploading image to blockblobclient
    await blockBlobClient.upload(imageBuffer, imageBuffer.length);
    // setting headers for blob client
    const options = {
        blobHTTPHeaders: {
            blobContentType: 'application/pdf', // Setting  content type
            blobContentDisposition: `inline; filename=${blobName}`, // Setting filename for inline viewing
        },
    };
    // Setting the content type and content disposition headers
    await blockBlobClient.setHTTPHeaders(options.blobHTTPHeaders);
    console.log(`file uploaded as  ${blobName}`);
}


async function downloadFileFromBlobStorage(folder, blobName) {
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.downloadToFile(folder);
    const options = {
        blobHTTPHeaders: {
            blobContentType: 'application/pdf',
            blobContentDisposition: `inline; filename=${blobName}`,
        },
    };
    await blockBlobClient.setHTTPHeaders(options.blobHTTPHeaders);
}





module.exports = {
    uploadToBlobStorage,
    downloadFileFromBlobStorage
};

