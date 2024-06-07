import httpStatus from "http-status";

export function errorHandler(err, req, res) {
    if (err.name === "ConflictError" || err.name === "DuplicatedEmailError" || err.name === "DuplicatedUsernameError") {
        return res.status(httpStatus.CONFLICT).send({
            message: err.message,
        });
    }

    if (err.name === "NotFoundError") {
        return res.status(httpStatus.NOT_FOUND).send({
            message: err.message,
        })
    }

    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: "InternalServerError",
        message: "Internal Server Error",
    });
}