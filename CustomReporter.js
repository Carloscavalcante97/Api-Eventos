class CustomReporter {
  onRunComplete(_contexts, results) {
    const tipoTeste = process.env.TYPE_TEST;
    const { numPassedTests, numFailedTests } = results;
    const BgRed = "\x1b[41m";
    const BgGreen = "\x1b[42m";
    const Reset = "\x1b[0m";

    console.log("");

    if (tipoTeste === "nota") {
      const totalTests = numPassedTests + numFailedTests;
      const nota = ((numPassedTests / totalTests) * 100).toFixed(2);
      let mensagem =
        nota >= 75
          ? `${BgGreen}Sua nota é ${nota}%${Reset}`
          : `${BgRed}Sua nota é ${nota}%${Reset}`;
      return console.log(mensagem);
    }
  }
}

module.exports = CustomReporter;
