const { v4: uuidv4 } = require("uuid");
const generateUniqueId = () => {
    return uuidv4();
}
module.exports = { generateUniqueId };