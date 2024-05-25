const fs = require('fs');
const path = require('path');

// Path to the directory containing card images
const cardImagesPath = path.join(__dirname, 'assets', 'cards', 'cardImages');

// Function to generate card names array
function generateCardNames() {
    // Read the files in the card images directory
    const files = fs.readdirSync(cardImagesPath);
    
    // Filter out only the .png files and remove the file extension
    const cardNames = files
        .filter(file => path.extname(file) === '.png')
        .map(file => path.basename(file, '.png'));

    // Convert the card names array to a string representation
    const cardNamesString = JSON.stringify(cardNames, null, 2);

    // Path to the cardsLists.js file
    const cardsListPath = path.join(__dirname, 'assets', 'cards', 'cardsLists.js');

    // Write the card names array to the cardsLists.js file
    const fileContent = `export const cardNames = ${cardNamesString};\n`;

    fs.writeFileSync(cardsListPath, fileContent);

    console.log('Card names array generated successfully!');
}

// Run the function
generateCardNames();
