import { IUser } from "src/app/users/models/user.model";

export interface State {
    user: IUser;
}

const initialState: State = {
    user: null
};

export function authReducer(state = initialState, action) {
    return state
}