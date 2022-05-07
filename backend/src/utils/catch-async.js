const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => res.status(500).json({
        error: err.message,
      })
    );
}

module.exports = catchAsync
