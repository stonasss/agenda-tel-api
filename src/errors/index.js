export function notFoundError() {
    return {
        name: "NotFoundError",
        message: "no info found",
    }
}

export function duplicatedEmailError() {
    return {
        name: "DuplicatedEmailError",
        message: "e-mail already in use",
    };
}