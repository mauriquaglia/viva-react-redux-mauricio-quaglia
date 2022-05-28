import { questionConstants } from '../_constants';
import { questionService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';
//import { useHistory } from 'react-router-dom';
import { push } from 'react-router-redux';
//const history = useHistory();

export const questionActions = {
    register,
    getAll,
    delete: _delete,
    update
};

function register(question) {

    return  dispatch => {
        dispatch(request(question));

        questionService.register(question)
            .then(
                questions => { 
                    dispatch(success(questions));
                    dispatch(alertActions.success('Se ha creado la lista'));
                    
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(question) { return { type: questionConstants.REGISTER_REQUEST, question } }
    function success(questions) { return { type: questionConstants.REGISTER_SUCCESS, questions } }
    function failure(error) { return { type: questionConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        questionService.getAll()
            .then(
                questions => dispatch(success(questions)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: questionConstants.GETALL_REQUEST } }
    function success(questions) { return { type: questionConstants.GETALL_SUCCESS, questions } }
    function failure(error) { return { type: questionConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        questionService.delete(id)
            .then(
                question => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: questionConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: questionConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: questionConstants.DELETE_FAILURE, id, error } }
}

function update(id, question) {
    return dispatch => {
        dispatch(request(question));

        questionService.update(id, question)
            .then(
                questions => dispatch(success(questions)),
                error => dispatch(failure(question, error.toString()))
            );
    };

    function request(question) { return { type: questionConstants.UPDATE_REQUEST, question } }
    function success(questions) { return { type: questionConstants.UPDATE_SUCCESS, questions } }
    function failure( error) { return { type: questionConstants.UPDATE_FAILURE,  error } }
}