module.exports = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(`${process.env.PWD}/views/index.html`);
  });
};
