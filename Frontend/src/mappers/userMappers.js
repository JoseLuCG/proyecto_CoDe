function userFromBackToFront (backendUser) {
    return {
        nameUser: backendUser.name_user,
        lastName: backendUser.last_name_user,
        phoneNumber: backendUser.phone_number,
        email: backendUser.email,
        uuidUser: backendUser.uuid_user
    }
}

export {
    userFromBackToFront
}