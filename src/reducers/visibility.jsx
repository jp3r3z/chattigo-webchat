import { ActionTypes } from '../constants';

const visibility = (state = 'COLLAPSED', action) => {
    switch (action.type) {
        case ActionTypes.TOGGLE:
            if (state == 'COLLAPSED')
                return 'EXPANDED';
            else
                return 'COLLAPSED';
        default:
          return state;
    }
};

export default visibility;