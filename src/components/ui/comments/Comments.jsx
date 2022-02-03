import React, { useEffect, useState } from "react";
import Form from "src/components/common/form/Form";
import SelectedField from "src/components/common/form/SelectedField";
import SubmitButton from "src/components/common/form/SubmitButton";
import TextAreaField from "src/components/common/form/TextAreaField";
import PropTypes from "prop-types";
import api from "../../../api";
import { useParams } from "react-router";
import CommentList from "./CommentList";
import { orderBy } from "lodash";

export default function Comments({ users }) {
    const { userId } = useParams();
    const [comments, setComments] = useState([]);
    const validatorConfig = {
        userName: {
            isRequired: { message: "User name is required" }
        },
        content: {
            isRequired: { message: "Message is required" }
        }
    };

    useEffect(() => {
        let isSub = true;
        api.comments
            .fetchCommentsForUser(userId)
            .then((comment) => (isSub ? setComments(comment) : null));

        return () => (isSub = false);
    }, []);

    const updateComments = (comment) => {
        console.log(comment);
        setComments([...comments, comment]);
    };

    const handleRemoveComment = (id) => {
        api.comments
            .remove(id)
            .then((id) =>
                setComments((prevState) =>
                    prevState.filter((comment) => comment._id !== id)
                )
            );
    };
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <div>
            <div className="card mb-2">
                <div className="card-body">
                    <h2 className="mb-4">New comment</h2>
                    <Form
                        userId={userId}
                        buttonName="Publish"
                        updateComments={updateComments}
                        professions={users}
                        actionType="SEND_COMMENT"
                        selectName="userName"
                        validatorConfig={validatorConfig}
                    >
                        <SelectedField label="User name" key="select" />
                        <TextAreaField key="textarea_input" />
                        <SubmitButton
                            buttonStyle="btn btn-primary mb-2 float-end"
                            key="submit_button"
                        />
                    </Form>
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body">
                    <h2>Comments</h2>
                    <hr />
                    <div
                        className="overflow-auto"
                        style={{
                            maxHeight: "370px"
                        }}
                    >
                        <CommentList
                            comments={sortedComments}
                            onRemove={handleRemoveComment}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

Comments.propTypes = {
    users: PropTypes.array
};
