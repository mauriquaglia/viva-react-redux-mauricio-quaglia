import {  questionConstants } from '../_constants';
export function questions(state = {}, action) {
    switch (action.type) {
      case questionConstants.GETALL_REQUEST:
        return {
          loading: true
        };
      case questionConstants.GETALL_SUCCESS:
        return {
          items: action.questions
        };
      case questionConstants.GETALL_FAILURE:
        return { 
          error: action.error
        };
      case questionConstants.DELETE_REQUEST:
        // add 'deleting:true' property to user being deleted
        return {
          ...state,
          items: state.items.map(question =>
            question.id === action.id
              ? { ...question, deleting: true }
              : question
          )
        };
      case questionConstants.DELETE_SUCCESS:
        // remove deleted user from state
        return {
          items: state.items.filter(question => question.id !== action.id)
        };
      case questionConstants.DELETE_FAILURE:
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
        return {
          ...state,
          items: state.items.map(question => {
            if (question.id === action.id) {
              // make copy of user without 'deleting:true' property
              const { deleting, ...questionCopy } = question;
              // return copy of user with 'deleteError:[error]' property
              return { ...questionCopy, deleteError: action.error };
            }
  
            return question;
          })
        };
        case questionConstants.UPDATE_REQUEST:
          return {
            loading: true
          };
        case questionConstants.UPDATE_SUCCESS:
          return {
            items: action.questions
          };
        case questionConstants.UPDATE_FAILURE:
          return { 
            error: action.error
          };
          case questionConstants.REGISTER_REQUEST:
            return {
              loading: true
            };
          case questionConstants.REGISTER_SUCCESS:
            return {
              items: action.questions
            };
          case questionConstants.REGISTER_FAILURE:
            return { 
              error: action.error
            };
      default:
        return state
    }
  }