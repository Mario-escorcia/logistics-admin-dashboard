import { users } from "../data/users"

export const login = (body: any) => {
    if (!body?.email || !body?.password) {
        return {
            responseCode: 400,
        };
    }

    const matchedUser = users.find(
        (e) => e.email === body.email && e.password === body.password
    );

    if (matchedUser) {
        return {
            responseCode: 200,
            user: matchedUser,
        };
    }

    return {
        responseCode: 401,
    };
};

export const saveUserDataInLocal = (data: any) => {
    try {
        localStorage.setItem("user_name", data.name);
        localStorage.setItem("user_lastName", data.lastName);
        localStorage.setItem("user_email", data.email);
        localStorage.setItem("user_admin", data.isAdmin);
        localStorage.setItem("user_role", data.companyRole);
        localStorage.setItem("user_company", data.company);
        return 200
    } catch (error) {
        console.log(error)
        return 400
    }
}