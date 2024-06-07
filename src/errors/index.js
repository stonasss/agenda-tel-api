export function notFoundError() {
    return {
        name: "NotFoundError",
        message: "user or users not found",
    }
}

export function duplicatedEmailError() {
    return {
        name: "DuplicatedEmailError",
        message: "e-mail already in use",
    };
}