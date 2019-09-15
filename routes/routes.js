module.exports = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(`${process.env.PWD}/views/index.html`);
  });

  app.get('/login', (req, res) => {
    res.sendFile(`${process.env.PWD}/views/login.html`);
  });

  app.get('/dashboard', (req, res) => {
    res.sendFile(`${process.env.PWD}/views/dashboard.html`);
  });
};
