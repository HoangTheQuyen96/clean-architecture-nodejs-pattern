const { loadSingletons } = require("./configuration/infrastructure");

(async () => {
  await loadSingletons();
  require("./configuration/entrypoint");
  require("./configuration/usecase");
})();

console.log(process.env)