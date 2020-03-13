import { useReducer, useEffect, useCallback } from "react";

function reducer(state, action) {
    switch (action.type) {
        case "LOADING": // 데이터를 읽어들이고 있을 때를 말함
            return {
                loading: true,
                data: null,
                error: null
            };
        case "SUCCESS": // 데이터를 읽어들이고, 받아오기에 성공했을때
            return {
                loading: false,
                data: action.data,
                error: null
            };
        case "ERROR":   // 데이터 수집에 실패했을 경우
            return {
                loading: false,
                data: null,
                error: action.error
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

export function useAsync(callback, deps = [], skip = false) {
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        data: null,
        error: null
    });

    const fetchData = useCallback(async () => {
        dispatch({ type: "LOADING" });
        try {
            const data = await callback();
            dispatch({ type: "SUCCESS", data });
        } catch (e) {
            dispatch({ type: "ERROR", error: e });
        }
    }, [callback]);

    useEffect(() => {
        // if (skip) return;
        fetchData();
    }, deps);

    return [state, fetchData];
}
