import React from "react";
import PropTypes from "prop-types";
import Comment from "./Comment";
import { TransitionGroup, CSSTransition } from "react-transition-group";

// styles
import "./CommentsList.css";

export default function CommentList({ comments, onRemove }) {
    return (
        <>
            {!comments.length && <p>No comments yet...</p>}
            <TransitionGroup
                component="div"
                className="animated-comments overflow-auto"
                style={{
                    maxHeight: "370px"
                }}
            >
                {comments.map((comment) => (
                    <CSSTransition
                        timeout={200}
                        classNames="comment"
                        key={`${comment.userId}-${comment._id}`}
                    >
                        <Comment
                            key={`comment_${comment._id}`}
                            {...comment}
                            onRemove={onRemove}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </>
    );
}

CommentList.propTypes = {
    comments: PropTypes.array,
    onRemove: PropTypes.func
};
