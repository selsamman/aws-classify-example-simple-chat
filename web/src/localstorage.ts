export const awsURL = undefined; // Leave it to document.location

if (document.location.search.match(/reset/)) {
    localStorage.setItem('root', "");
    localStorage.setItem('ClassifySession', "");
    document.location.href = document.location.href.replace(/\?reset/i, '');
}

export async function getSession() {
    return localStorage.getItem('ClassifySession') || "None"
}

export async function setSession(sessionId: string) {
    localStorage.setItem('ClassifySession', sessionId);
}

export const persistConfig = {storageEngine: localStorage}