import { useState } from "react";
import { useDispatch } from "react-redux";
import { editMovie } from "../slices/movieSlice";

export function MovieEdit({ movie }) {
    const [ isEdit, setIsEdit ] = useState(false);
    const [ newName, setNewName ] = useState(movie.name);
    const dispatch = useDispatch();

    const handleSave = () => {
        dispatch(editMovie({id: movie.id, name: newName}));
        setIsEdit(false);
    };

    return (
        <div>
            {isEdit ? (
                <div>
                    <input onChange={(event) => setNewName(event.target.value)} value={newName} />
                    <button onClick={handleSave}>Save</button>
                </div>
            ) : 
            (
                <div>

                    
                    <button onClick={() => setIsEdit(true)}>Edit</button>
                </div>            
            )}
        </div>
    );
}