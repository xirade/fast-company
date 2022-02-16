import React from "react";
import Form from "src/components/common/form/Form";
import SubmitButton from "src/components/common/form/SubmitButton";
import TextAreaField from "src/components/common/form/TextAreaField";
import PropTypes from "prop-types";
import CommentList from "./CommentList";
import { orderBy } from "lodash";
import { useParams } from "react-router";
import { useComments } from "src/hooks/useComments";

export default function Comments({ users }) {
    const { userId } = useParams();
    const { createComment, removeComment, comments } = useComments();
    const validatorConfig = {
        content: {
            isRequired: { message: "Message is required" }
        }
    };

    const updateComments = (comment) => {
        createComment(comment);
    };

    const handleRemoveComment = (id) => {
        removeComment(id);
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
                        submitMethod={updateComments}
                        professions={users}
                        actionType="SEND_COMMENT"
                        selectName="userName"
                        validatorConfig={validatorConfig}
                    >
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
                    <>
                        <CommentList
                            comments={sortedComments}
                            onRemove={handleRemoveComment}
                        />
                    </>
                </div>
            </div>
        </div>
    );
}

Comments.propTypes = {
    users: PropTypes.array
};
