import React from "react";
import PropTypes from "prop-types";

// icons
import X from "../../../assets/x.svg";
import { displayDate } from "src/utils/displayDate";
import { useUser } from "src/hooks/useUsers";
import { useAuth } from "src/hooks/useAuth";

const Comment = ({
    content,
    created_at: created,
    _id: id,
    userId,
    onRemove
}) => {
    const { currentUser } = useAuth();
    const { getUser } = useUser();
    const user = getUser(userId);

    const date = displayDate(created);

    return (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start ">
                        <img
                            src={user.image}
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="65"
                            height="65"
                        />
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1">
                                        {user && user.name}
                                        <span className="ms-1 small">
                                            - {date}
                                        </span>
                                    </p>
                                    {currentUser._id === userId && (
                                        <button
                                            onClick={() => onRemove(id)}
                                            className="btn btn-sm text-primary d-flex align-items-center"
                                        >
                                            <img
                                                style={{
                                                    height: "20px",
                                                    width: "20px"
                                                }}
                                                src={X}
                                                alt="x"
                                            />
                                        </button>
                                    )}
                                </div>
                                <p className="small mb-0">{content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Comment.propTypes = {
    content: PropTypes.string,
    created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    _id: PropTypes.string,
    userId: PropTypes.string,
    onRemove: PropTypes.func
};

export default React.memo(Comment);
