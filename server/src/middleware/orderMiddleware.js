const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const Joi = require("joi");
const { Order } = require("../data-access/model");

// checkCompleteOrderFrom 스키마
const completSschema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().required(),
  price: Joi.number().required(),
});

// checkOrderIdFrom 스키마
const IdSchema = Joi.object({
  id: Joi.string().required(),
});

// checkUserCondition 스키마
const checkUserConditionSchema = Joi.object({
  address: Joi.string().required(),
});

// checkAdminCondition 스키마
const checkAdminConditionSchema = Joi.object({
  status: Joi.string().default("배송준비중").required(),
});

const checkCompleteOrderFrom = (from) => async (req, res, next) => {
  try {
    console.log(req[from]);
    await Promise.all(
      req[from].map(async (item) => {
        const { productId, quantity, price } = item;
        await completSschema.validateAsync({
          productId,
          quantity,
          price,
        });
      })
    );
  } catch (error) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: 유효한 데이터 셋이 아닙니다.`
      )
    );
  }
  next();
};

const checkOrderIdFrom = (from) => async (req, res, next) => {
  const { id } = req[from];
  try {
    await IdSchema.validateAsync({
      id,
    });
  } catch (error) {
    next(
      new AppError(commonErrors.inputError, 400, `${from}: id는 필수값입니다.`)
    );
  }
  next();
};

const checkUserOrderConditionFrom = (from) => async (req, res, next) => {
  const { address } = req[from];
  try {
    await checkUserConditionSchema.validateAsync({
      address,
    });
  } catch (error) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: address 수정이 필요합니다.`
      )
    );
  }
  next();
};

const checkStatus = (from) => async (req, res, next) => {
  const { id } = req[from];
  const data = await Order.findOne({ _id: id });

  if (data.status === "배송중" || data.status === "배송완료") {
    next(
      new AppError(
        commonErrors.authenticationError,
        400,
        `${from}: 배송 준비중인 상품만 정보를 변경할 수 있습니다.`
      )
    );
  }
  next();
};

const checkAdminOrderConditionFrom = (from) => async (req, res, next) => {
  const { status } = req[from];
  try {
    await checkAdminConditionSchema.validateAsync({
      status,
    });
  } catch (error) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: status 수정이 필요합니다.`
      )
    );
  }
  next();
};

module.exports = {
  checkCompleteOrderFrom,
  checkOrderIdFrom,
  checkUserOrderConditionFrom,
  checkStatus,
  checkAdminOrderConditionFrom,
};
