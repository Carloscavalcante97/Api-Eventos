const path = require("path");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  reporters: [
    "./CustomReporter",
    [
      "jest-html-reporters",
      {
        pageTitle: "Relatório dos Testes",
        publicPath: path.resolve(__dirname, "resultados"),
        filename: "relatorio.html",
        openReport: true,
      },
    ],
  ],
  cache: false,
};
