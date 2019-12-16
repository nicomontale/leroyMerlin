function PostData(userData) {
    return new Promise((resolve, reject) => {
        fetch('https://api-dev-commercio.leroymerlin.it/api/v1/customer/1_0_0/authentication/login', {
            method: 'POST',
            headers: {
                'x-square-api-key': 'testToken'
            },
            body: JSON.stringify(userData)


        })
            .then((response) => response.json())
            .then((responseJson) => {
                resolve(responseJson)
            })
            .catch((error) => {
                reject(error)
            })
    });
} export default PostData;