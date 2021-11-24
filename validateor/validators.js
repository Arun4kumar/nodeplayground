const joi = require("joi");

module.exports.userRegisterValidator = function (body) {
  const schema = joi.object({
    username: joi.string().min(3).required(),
    email: joi
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    password: joi.string().min(6).required(),
  });

  return schema.validate(body);
};

module.exports.userLoginValidator = function (body) {
  const schema = joi.object({
    email: joi
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: joi.string().min(6).required(),
  });

  return schema.validate(body);
};
