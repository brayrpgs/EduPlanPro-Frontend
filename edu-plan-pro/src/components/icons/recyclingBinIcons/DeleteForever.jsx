
function DeleteForever({ height, width, color }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={height}
            viewBox="0 -960 960 960"
            width={height}
            fill={color}
            className="flex h-[3.8vh] items-center cursor-pointer hover:scale-110"
        >
            <path d="M376-300l104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280zm400-600H280v520h400v-520zm-400 0v520-520z" />
        </svg>
    )
}

export default DeleteForever
