const express = require('express');

const PORT = 8000;

const index = express();

index.listen(PORT, () => console.log(`Server start on ${PORT}`));