import React from "react";
import PropTypes from "prop-types";
import Comment from "./Comment";

export default function CommentList({ comments, onRemove }) {
    return comments.length ? (
        comments.map((comment) => (
            <Comment
                key={`comment_${comment._id}`}
                {...comment}
                onRemove={onRemove}
            />
        ))
    ) : (
        <p>No comments yet...</p>
    );
}

CommentList.propTypes = {
    comments: PropTypes.array,
    onRemove: PropTypes.func
};
