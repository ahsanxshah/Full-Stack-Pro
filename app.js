const express = require("express");
const BodyParser = require("body-parser");
const isCelebrateError = require("celebrate").isCelebrateError;
const userRouter = require("./routes/user_route");
const candidateRouter = require("./routes/candidate");
const companyRouter = require("./routes/company");
const contactRouter = require("./routes/contact");
const job_orderRouter = require("./routes/job_order");
const app = express();
app.use(express.json());
app.use(BodyParser.json());
app.use("/api/user", userRouter);
app.use("/api", candidateRouter);
app.use("/api", companyRouter);
app.use("/api", contactRouter);
app.use("/api", job_orderRouter);
// Route middlewares
app.use((err, req, res, next) => {
  if (isCelebrateError(err)) {
    const errorQuery = err.details.get("query");
    if (!!errorQuery) {
      const { details: errors } = errorQuery;
      const validationErrors = [];

      for (var i = 0; i < errors.length; i++) {
        validationErrors.push({
          message: errors[i].message,
          field: errors[i].context.key,
        });
      }

      const result = {
        error: "Bad Request",
        message: "Query validation failed",
        validation: validationErrors,
      };

      return res.status(400).send(result);
    }

    const errorBody = err.details.get("body");
    if (!!errorBody) {
      const { details: errors } = errorBody;
      const validationErrors = [];

      for (var i = 0; i < errors.length; i++) {
        validationErrors.push({
          message: errors[i].message,
          field: errors[i].context.key,
        });
      }

      const result = {
        error: "Bad Request",
        message: "Body validation failed",
        validation: validationErrors,
      };

      return res.status(400).send(result);
    }
  } else {
    next(err);
  }
});
module.exports = app;
