import { MovieContext } from "../../types";
import { useOutletContext } from "react-router-dom";
import AddMovieForm from "../AddMovieForm";
import PageTitle from "../PageTitle";

const AddMoviePage = () => {
    const { onMovieAdded } = useOutletContext() as MovieContext;
    return (
        <div>
            <PageTitle title="Add a movie" />
            <AddMovieForm onMovieAdded={onMovieAdded} />
        </div>
    );
};

export default AddMoviePage;