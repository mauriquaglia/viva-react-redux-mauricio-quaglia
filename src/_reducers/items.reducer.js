import {  itemConstants } from '../_constants';
export function items(state = {}, action) {
    switch (action.type) {
      case itemConstants.GETALL_REQUEST:
        return {
          loading: true
        };
      case itemConstants.GETALL_SUCCESS:
        return {
          items: action.items
        };
      case itemConstants.GETALL_FAILURE:
        return { 
          error: action.error
        };
      case itemConstants.DELETE_REQUEST:
        // add 'deleting:true' property to user being deleted
        return {
          ...state,
          items: state.items.map(item =>
            item._id === action.id
              ? { ...item, deleting: true }
              : item
          )
        };
      case itemConstants.DELETE_SUCCESS:
        // remove deleted user from state
        return {
          items: state.items.filter(item => item._id !== action.id)
        };
      case itemConstants.DELETE_FAILURE:
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
        return {
          ...state,
          items: state.items.map(item => {
            if (item._id === action.id) {
              // make copy of user without 'deleting:true' property
              const { deleting, ...itemCopy } = item;
              // return copy of user with 'deleteError:[error]' property
              return { ...itemCopy, deleteError: action.error };
            }
  
            return item;
          })
        };
        case itemConstants.UPDATE_REQUEST:
          return {
            loading: true
          };
        case itemConstants.UPDATE_SUCCESS:
          return {
            items: action.items
          };
        case itemConstants.UPDATE_FAILURE:
          return { 
            error: action.error
          };
          case itemConstants.REGISTER_REQUEST:
            return {
              loading: true
            };
          case itemConstants.REGISTER_SUCCESS:
            return {
              items: action.items
            };
          case itemConstants.REGISTER_FAILURE:
            return { 
              error: action.error
            };
      default:
        return state
    }
  }