import httpStatus from "http-status";

export function validateSchema(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessages = error.details.map((detail) => detail.message);
            return res
                .status(httpStatus.BAD_REQUEST)
                .json({ errors: errorMessages });
        }
        next();
    };
}