const fs = require('fs');
const path = require('path');

const dbFile = path.join(__dirname, 'data.json');

// Initialize the file if it doesn't exist
if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, '{}', 'utf8');
}

// Load the database into memory
let data = JSON.parse(fs.readFileSync(dbFile, 'utf8'));

// Save the database to the file
function saveData() {
    fs.writeFileSync(dbFile, JSON.stringify(data, null, 2), 'utf8');
}

module.exports = {
    // Get a value by key
    get: (key) => data[key],

    // Set a value by key
    set: (key, value) => {
        data[key] = value;
        saveData();
    },

    // Delete a key
    delete: (key) => {
        delete data[key];
        saveData();
    },

    // Get the entire database
    all: () => data
};
