import { createStore } from 'redux'

const funcsReduser = (state = [], action) => {
    switch (action.type) {
        case 'addFunction':
            state.push({
                f: () => undefined,
                color: '#ffc8fc',
                width: 5,
                startIntegral: null,
                endIntegral: null,
                derivativeX: false,
                square: null,
                value: null
            });
            return state;
        case 'delFunction':
            state.splice(action.index, 1);
            return state;
    }
}

const store = createStore(funcsReduser);

export default store;