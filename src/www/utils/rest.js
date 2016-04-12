const GET = 'GET';
const POST = 'POST';

function removeLeadingSlash(str) {
    if (typeof str !== 'string') {
        return str;
    }
    
    if (str[0] === '/') {
        return str.substring(1);
    }
    
    return str;
}

function send(method, path, payload) {
    let url = 'http://localhost:8080/' + removeLeadingSlash(path);
    let options = {};

    options.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    options.method = method;
    options.body = JSON.stringify(payload);

    return fetch(url, options)
        .then(handleResponse);
}

function handleResponse(response) {
    var result = response.json();

    if (response.status !== 200) {
        result = result.then(error => {
            var message = error && error.error;
            throw new Error(message || "Unexpecred error");
        })
    }

    return result;
}

export function get(path, payload) {
    return send(GET, path, payload);
}

export function post(path, payload) {
    return send(POST, path, payload);
}