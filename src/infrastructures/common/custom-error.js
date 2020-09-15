module.exports = (customErrorEnum, message, error) => {
  const customError = new Error(message);
  customError.detail = customErrorEnum;
  customError.expose = true;

  if (error && !(error instanceof Error)) {
    customError.data = error.errors;
  }

  if (error && error.stack) {
    let trace = "";
    trace += customError.stack.split("\n")[0];
    trace += `\n${customError.stack.split("\n")[1]}`;
    trace += `\n${error.stack}`;
    customError.stack = trace;
  }

  return customError;
};
