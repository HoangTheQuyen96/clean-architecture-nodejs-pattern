const { loadSingletons } = require("./configuration/infrastructure");

(async () => {
  await loadSingletons();
  require("./configuration/usecase");
  require("./configuration/entrypoint");
})();
