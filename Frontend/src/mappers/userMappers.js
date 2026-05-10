function userFromBackToFront (backendUser) {
    return {
        nameUser: backendUser.nameUser,
        lastName: backendUser.lastName,
        phoneNumber: backendUser.phoneNumber,
        email: backendUser.email,
        uuidUser: backendUser.uuidUser
    }
}

export {
    userFromBackToFront
}