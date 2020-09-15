const jwt = require("jsonwebtoken");
const jwksRsa = require("jwks-rsa");
const customError = require("../../../infrastructures/common/custom-error");
const customErrorEnum = require("../../../infrastructures/common/custom-error-enum");
const { auth0 } = require("../../../../config/env");
const { toCamelCase } = require("../../../infrastructures/common/utils");

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (
    !auth ||
    auth.split(" ").length !== 2 ||
    !/^Bearer$/i.test(auth.split(" ")[0]) ||
    !auth.split(" ")[1]
  ) {
    await next(
      customError(
        customErrorEnum.UNAUTHORIZATION,
        "you can not accesss to this resource"
      )
    );
  }

  const token = auth.split(" ")[1];

  let payloadToken;
  let kid;
  try {
    const { payload, header } = jwt.decode(token, { complete: true });
    payloadToken = payload;
    kid = header.kid;
  } catch (error) {
    await next(
      customError(
        customErrorEnum.UNAUTHORIZATION,
        "you can not accesss to this resource",
        error
      )
    );
    return;
  }

  const secret = jwksRsa({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${auth0.domain}/.well-known/jwks.json`
  });

  let signingKey;
  try {
    signingKey = await new Promise((resolve, reject) => {
      secret.getSigningKey(kid, (err, key) => {
        if (err) {
          reject(err);
        } else {
          resolve(key.getPublicKey());
        }
      });
    });
  } catch (error) {
    await next(
      customError(
        customErrorEnum.INTERNAL_ERROR,
        "an unexpected error occurred on controller system",
        error
      )
    );
    return;
  }

  try {
    jwt.verify(token, signingKey, {
      audience: auth0.audience,
      issuer: `https://${auth0.domain}/`,
      algorithms: ["RS256"]
    });
  } catch (error) {
    await next(customError(customErrorEnum.UNAUTHORIZATION, "you can not accesss to this resource", error));
    return;
  }

  res.locals.user = toCamelCase({
    userId: payloadToken.sub,
    userMetadata: payloadToken["https://user_metadata"],
    authorization: payloadToken["https://authorization"]
  });

  await next();
};
