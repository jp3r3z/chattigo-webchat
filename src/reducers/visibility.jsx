import { ActionTypes } from '../constants';

const visibility = (state = 'COLLAPSED', action) => {
    switch (action.type) {
        case ActionTypes.TOGGLE:
            if (state == 'COLLAPSED')
                return 'EXPANDED';
            else
                return 'COLLAPSED';
        case ActionTypes.COLLAPSE:
            return 'COLLAPSED';
        case ActionTypes.EXPAND:
            return 'EXPANDED';
        default:
          return state;
    }
};

export default visibility;
