import React from 'react'

const UserPost = ({ posts }) => {
    return (
        <div className="row m-3 mb-5">
            <div className="row d-none d-sm-block">
                <h3 className="text-center mx-3">Post</h3>
                <hr />
            </div>
            <div className="row mb-3">
                {posts.map((post) => (
                    <div className="col-6 col-sm-4" key={post._id}>
                        <img className="img-fluid m-1 m-sm-2 m-xl-3 rounded" src={post.img_post_url} alt="Not Found" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserPost
