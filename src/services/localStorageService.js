const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USERID_KEY = "local-user-id";

export const setTokens = ({
    refreshToken,
    localId,
    expiresIn = 3600,
    idToken
}) => {
    const expiredDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(USERID_KEY, localId);
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiredDate);
};

export const getAccessToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};
export const getRefreshToken = () => {
    return localStorage.getItem(REFRESH_KEY);
};
export const getTokenExpiresDate = () => {
    return localStorage.getItem(EXPIRES_KEY);
};
export const getUserId = () => {
    return localStorage.getItem(USERID_KEY);
};

export const removeAuthData = () => {
    localStorage.removeItem(USERID_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EXPIRES_KEY);
};

export const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate,
    getUserId,
    removeAuthData
};
