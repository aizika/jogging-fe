import rest from 'rest';
import mime from 'rest/interceptor/mime';

const url = 'http://localhost:8080/';
const client = rest.wrap(mime);

class RestClient {
    getUsers() {
        client({path: url + 'users'}).then(function (response) {
            let users = response.entity._embedded.users;
            console.log('response: ', users);
            return users;
        });
    }

    getRuns() {
        client({path: url + 'users/1/runs'}).then(
            function (response) {
                let runs = response.entity._embedded.runs;
                console.log('response: ', runs);
                return runs;
            },
            function (error) {
                console.log('error: ', error);
                return [];
            }
        );
    }
}

export default RestClient;