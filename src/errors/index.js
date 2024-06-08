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

export function invalidCredentialsError() {
    return {
        name: "InvalidCredentialsError",
        message: "incorrect e-mail or password",
    }
}

export function duplicatedPhoneError() {
    return {
        name: "DuplicatedPhoneError",
        message: "phone already registered"
    }
}