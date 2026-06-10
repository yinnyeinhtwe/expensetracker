import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "../counterSlice";

export const  CounterList = () => {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();
    return (
        <>
            <div>
                <h1>Counter List</h1>
                <p>Counter Value: {count}</p>
            </div>  
        
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
            <button onClick={() => dispatch(reset())}>Reset</button>
        </>
        
    );
}