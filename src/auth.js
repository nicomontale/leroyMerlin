


const load = () => {
    const value = window.localStorage.getItem('currentUser')
    if (!value) {
        return
    }
    return JSON.parse(value);
}
let currentUser = load;
const login = (firstName, password) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (password === 'password') {
            currentUser = {
                firstName,
                id: 1
            }
            window.localStorage.setItem('currentUser', JSON.stringify(currentUser))
            return resolve();
        }
        reject();
    }, 300)
})



const logout = () => {
    currentUser = undefined
    return Promise.resolve();
};

const getUser = () => currentUser;

export default {
    login,
    logout,
    getUser

}

