import { SET_CONNECTED_USERS,SET_SELECTED_USER,REMOVE_USER } from "./actions";

export const reducerIO = (state, action) => {
    switch (action.type) {
      case SET_CONNECTED_USERS:
        const connectedUsers=state.connectedUsers;
        action.payload.forEach(socketId => {
            if(connectedUsers.indexOf(socketId)<0)
            {
              connectedUsers.push(socketId);
            }
          });
          state.connectedUsers=[...connectedUsers];
          console.log("state",state);

        return {...state};
  
      case SET_SELECTED_USER:
        state.selectedUser = action.payload;
        return {...state};

        case REMOVE_USER:
        state.connectedUsers = state.connectedUsers.filter(x=>x!=action.payload);
        return {...state};
    }
  };