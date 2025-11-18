
const  FNotification = ({message}) => {
    if (message === null) {
        return null
    }

    return (
        <div className="fail">
            {message}
        </div>
    )

}


export default FNotification 