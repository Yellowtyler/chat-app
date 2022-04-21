const AUTH_SERVICE_URL = "http://localhost:8081/auth";

const signUpUser = (signUp) => {
    fetch(AUTH_SERVICE_URL + "/signup")
    .then((res) => {
        if (!res.ok) {
            throw new Error("error");
        }
    })
    .catch(e => console.log(e));  
};

export const loginUser = (login) => {
    fetch(AUTH_SERVICE_URL + "/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(login)
    })
    .then(data => {
        localStorage.setItem("accessToken", data.json().token);
    })
    .catch(e=>console.log(e));
};

const getCurrentUser = () => {

};
