import SaveResult from "../components/SaveResult"



export default function Result() {


var points = localStorage.getItem("points")
if(localStorage.getItem("futureA") == localStorage.getItem("Idx")) {
localStorage.setItem("Idx", 99)
points++
localStorage.setItem("points", points)
}

return (
    <SaveResult>
    </SaveResult>
)
}
