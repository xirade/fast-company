import React from "react";

// components
import Form from "src/components/common/form/Form";
import TextField from "src/components/common/form/TextField";
import SelectedField from "src/components/common/form/SelectedField";
import RadioField from "src/components/common/form/RadioField";
import MultiSelect from "src/components/common/form/MultiSelect";
import Loader from "src/components/common/Loader";
import { Redirect, useParams } from "react-router-dom";
import SubmitButton from "src/components/common/form/SubmitButton";
import BackButton from "src/components/common/BackButton";
import { useProfession } from "src/hooks/useProfession";
import { useQualities } from "src/hooks/useQualities";
import { useAuth } from "src/hooks/useAuth";
import { useUser } from "src/hooks/useUsers";

export default function UserEditPage() {
    const { userId } = useParams();

    const { currentUser } = useAuth();
    const { professions } = useProfession();
    const { qualities } = useQualities();
    const { updateProfile } = useUser();

    const filteredQualities = Object.keys({ ...qualities }).map((quality) => {
        return {
            label: qualities[quality].name,
            value: qualities[quality]._id,
            color: qualities[quality].color
        };
    });

    const validatorConfig = {
        email: {
            isRequired: { message: "email is required" },
            isEmail: { message: "invalid email formats" }
        },
        name: {
            isRequired: { message: "name is required" }
        },
        image: {
            isRequired: { message: "image is required" },
            isImage: { message: "invalid link image formats" }
        },
        profession: {
            isRequired: { message: "profession is required" }
        },
        qualities: {
            isRequired: { message: "qualities is required" }
        }
    };

    return userId !== currentUser._id ? (
        <Redirect to={`/users/${currentUser._id}/edit`} />
    ) : professions.length && filteredQualities.length ? (
        <>
            <BackButton />
            <div className="col-lg-6 col-md-8 offset-md-3 shadow p-4">
                <h3 className="mb-3">Edit User</h3>
                <Form
                    professions={professions}
                    qualities={filteredQualities}
                    validatorConfig={validatorConfig}
                    userId={userId}
                    user={currentUser}
                    submitMethod={updateProfile}
                    actionType="UPDATE_PROFILE"
                >
                    <TextField autoFocus key="name_input" />
                    <TextField key="email_input" />
                    <TextField key="image_input" />
                    <SelectedField key="select" />
                    <RadioField key="radio" />
                    <MultiSelect key="multiselect" />
                    <SubmitButton key="submit_button" />
                </Form>
            </div>
        </>
    ) : (
        <Loader />
    );
}
