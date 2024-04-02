import "./Posts.css";

const Posts = ({postData}) => {

    return (
        <div className="d-flex justify-content-center m-top-2">
        {postData.map((post) => {
            return (
                <div className="m-left-3 blk-border bg-wheat m-top-2">
                    <h3 className="w-127">{post.author}</h3>
                    <p>{post.body}</p>
                </div>
            )
        })}
        </div>
    )
}

export default Posts;