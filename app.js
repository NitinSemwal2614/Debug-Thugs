const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Serve the HTML file for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pikachu.html'));
});

// Handle file upload and text input for encryption
app.post('/encrypt', upload.single('file'), (req, res) => {
    const inputText = req.body.text;
    const file = req.file;

    // Perform encryption (you can customize this based on your needs)
    const key = 'your-secret-key';
    const cipher = crypto.createCipher('aes-256-cbc', key);

    let encryptedResult = '';

    // Encrypt the text
    if (inputText) {
        encryptedResult += 'Text: ' + cipher.update(inputText, 'utf-8', 'hex');
        encryptedResult += cipher.final('hex') + '\n';
    }

    // Encrypt the file content
    if (file) {
        const fileContent = file.buffer.toString('hex');
        encryptedResult += 'File Content: ' + cipher.update(fileContent, 'hex', 'hex');
        encryptedResult += cipher.final('hex');
    }

    res.json({ result: encryptedResult });
});

// Handle decryption
app.post('/decrypt', (req, res) => {
    const encryptedText = req.body.encryptedText;

    // Perform decryption (you can customize this based on your needs)
    const key = 'your-secret-key';
    const decipher = crypto.createDecipher('aes-256-cbc', key);

    let decryptedResult = '';

    // Decrypt the text
    if (encryptedText) {
        decryptedResult += 'Text: ' + decipher.update(encryptedText, 'hex', 'utf-8');
        decryptedResult += decipher.final('utf-8') + '\n';
    }

    res.json({ result: decryptedResult });
});

// Serve the decrypted DOCX file
app.get('/download', (req, res) => {
    const decryptedFilePath = 'path/to/decrypted/file.docx'; // Set the path to your decrypted DOCX file
    const decryptedFile = fs.createReadStream(decryptedFilePath);
    
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', 'attachment; filename=decrypted_file.docx');

    decryptedFile.pipe(res);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
