const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  summary: Joi.string().required(),
  description: Joi.string().required(),
  company: Joi.string().required(),
  category: Joi.string().required(),
  remaining: Joi.number().required(),
  image: Joi.string().required(),
  detailImage: Joi.string().required()
})

const checkCompleteProductFrom = (from) => async (req, res, next) => {
  const { name, price, summary, description, company, category, remaining, image, detailImage } = req[from];

  try {
    await schema.validateAsync({
      name,
      price,
      summary,
      description,
      company,
      category, 
      remaining, 
      image,
      detailImage
    })
  } catch(error) {
    const result = Object.entries(req[from]).reduce((map, [key, value])=>{
        map += `[${key} : ${value}] `;
        return map;
    }, '');
    next(
        new AppError(commonErrors.inputError, 400, `${result}: 유효한 데이터 셋이 아닙니다.`)
    );
  }
  next();
};

const checkProductIdFrom = (from) => (req, res, next) => {
  const { id } = req[from];

  if (id === undefined) {
    next(
      new AppError(commonErrors.inputError, 400, `${from}: id는 필수값입니다.`)
    );
  }
  next();
};

const checkMinProductConditionFrom = (from) => (req, res, next) => {
  const { name, price, summary, description, company, category, remaining, image, detailImage } = req[from];

  if (name === undefined && price === undefined && summary === undefined && description === undefined && company === undefined && category === undefined && remaining === undefined && image === undefined && detailImage === undefined) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: 값이 최소 하나는 필요합니다.`
      )
    );
  }
  next();
};

module.exports = {
  checkCompleteProductFrom,
  checkProductIdFrom,
  checkMinProductConditionFrom,
};
