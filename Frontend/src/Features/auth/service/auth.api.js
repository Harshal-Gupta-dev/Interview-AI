// import axios from "axios"

// export async function register({ username, email, password }) {
//     try {
//         const respone = await axios.post("http://localhost:3000/api/auth/register", {
//             username, email, password
//         }, {
//             withCredentials: true
//         })
//         return respone.data
//     } catch (err) {
//         console.log(err)
//     }
// }

// export async function login({ email, password }) {
//     try {
//         const response = await axios.post("http://localhost:3000/api/auth/login", {
//             email, password
//         }, {
//             withCredentials: true
//         })
//         return response.data
//     } catch (err) {
//         console.log(err)
//     }

// }


// export async function logout() {
//     try {
//         const response = await axios.get("http://localhost:3000/api/auth/logout", {
//             withCredentials: true
//         })
//         return response.data
//     } catch (err) {
//         console.log(err)
//     }
// }


//     export async function getme() {
//         try {
//             const response = await axios.get("http://localhost:3000/api/auth/get-me", {
//                 withCredentials: true
//             })
//             return response.data
//         } catch (err) {
//             console.log(err)
//         }
//     }


import axios from "axios";

// Define the live production Render URL
const BASE_URL = "https://interview-ai-xh7p.onrender.com";

export async function register({ username, email, password }) {
    try {
        const response = await axios.post(`${BASE_URL}/api/auth/register`, {
            username, email, password
        }, {
            withCredentials: true
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export async function login({ email, password }) {
    try {
        const response = await axios.post(`${BASE_URL}/api/auth/login`, {
            email, password
        }, {
            withCredentials: true
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export async function logout() {
    try {
        const response = await axios.get(`${BASE_URL}/api/auth/logout`, {
            withCredentials: true
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export async function getme() {
    try {
        const response = await axios.get(`${BASE_URL}/api/auth/get-me`, {
            withCredentials: true
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
}
