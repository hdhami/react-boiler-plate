module.exports = {
  fetchData: async (req, res) => {
    const body = require("../mocks/fetch-data.json");
    try {
      res.status(200).json(body);
    } catch (error) {
      res.sendStatus(500);
    }
  },
};
