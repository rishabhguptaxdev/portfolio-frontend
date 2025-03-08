import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";

function App() {
    return (
        <>
            <div
                class="bg-sky-950 flex flex-col items-center justify-center"
                style={{ width: "100vw", height: "100vh" }}
            >
                <h1 class="text-5xl text-center text-white font-bold ">
                    Hello world! <FontAwesomeIcon icon={faRocket} />
                </h1>
                <Button class="text-white">Click me</Button>
            </div>
        </>
    );
}

export default App;
