import { itemConstants } from '../_constants';
import { itemService} from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';
//import { useHistory } from 'react-router-dom';
import { push } from 'react-router-redux';
//const history = useHistory();

export const itemActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete,
    update
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        itemService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    //history.go('/');
                    //dispatch(history.push('/'));
                    //window.location.href = '/';
                    
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: itemConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: itemConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: itemConstants.LOGIN_FAILURE, error } }
}

function logout() {
    itemService.logout();
    return { type: itemnConstants.LOGOUT };
}

function register(items) {
    return dispatch => {
        dispatch(request(items));

        itemService.register(items)
            .then(
                items => { 
                    dispatch(success(items));
                    //history.replace('/login');
                    //window.location.href = '/login';
                    dispatch(alertActions.success('La pregunta y respuesta(s) se agrego correctamente'));
                    
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(items) { return { type: itemConstants.REGISTER_REQUEST, items } }
    function success(items) { return { type: itemConstants.REGISTER_SUCCESS, items } }
    function failure(error) { return { type: itemConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        itemService.getAll()
            .then(
                items => dispatch(success(items)),
                error => dispatch(failure(error.toString()))
            );
    };


    function request() { return { type: itemConstants.GETALL_REQUEST } }
    function success(items) { return { type: itemConstants.GETALL_SUCCESS, items } }
    function failure(error) { return { type: itemConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        itemService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: itemConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: itemConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: itemConstants.DELETE_FAILURE, id, error } }
}

function update(id, item) {
    return dispatch => {
        dispatch(request(item));

        itemService.update(id, item)
            .then(
                items => dispatch(success(items)),
                error => dispatch(failure(items, error.toString()))
            );
    };

    function request(items) { return { type: itemConstants.UPDATE_REQUEST, items } }
    function success(items) { return { type: itemConstants.UPDATE_SUCCESS, items } }
    function failure( error) { return { type: itemConstants.UPDATE_FAILURE, error } }
}