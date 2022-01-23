import React, { useEffect, useState } from "react";
import api from "../../../api";

// components
import Form from "src/components/common/form/Form";
import TextField from "src/components/common/form/TextField";
import SelectedField from "src/components/common/form/SelectedField";
import RadioField from "src/components/common/form/RadioField";
import MultiSelect from "src/components/common/form/MultiSelect";
import Loader from "src/components/common/Loader";
import { useParams } from "react-router";

export default function UserEditPage() {
    const { userId } = useParams();
    const [user, setUser] = useState();
    const [professions, setProfessions] = useState(null);
    const [qualities, setQualities] = useState(null);
    const validatorConfig = {
        email: {
            isRequired: { message: "email is required" },
            isEmail: { message: "invalid email formats" }
        },
        name: {
            isRequired: { message: "name is required" }
        },
        img: {
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

    useEffect(() => {
        let isSub = true;
        api.users
            .getById(userId)
            .then((data) => (isSub ? setUser(data) : null));
        api.professions
            .fetchAll()
            .then((data) => (isSub ? setProfessions(data) : null));
        api.qualities.fetchAll().then((data) =>
            isSub
                ? setQualities(
                    Object.keys({ ...data }).map((quality) => {
                        return {
                            label: data[quality].name,
                            value: data[quality]._id,
                            color: data[quality].color
                        };
                    })
                )
                : null
        );

        return () => (isSub = false);
    }, []);

    // url for redirection
    const urlType = `/users/${userId}`;

    return professions && qualities ? (
        <div className="col-lg-6 col-md-8 offset-md-3 shadow p-4">
            <h3 className="mb-3">Edit User</h3>
            <Form
                professions={professions}
                qualities={qualities}
                validatorConfig={validatorConfig}
                userId={userId}
                user={user}
                urlType={urlType}
            >
                <TextField autoFocus key="name_input" />
                <TextField key="email_input" />
                <TextField key="image_input" />
                <SelectedField key="select" />
                <RadioField key="radio" />
                <MultiSelect key="multiselect" />
            </Form>
        </div>
    ) : (
        <Loader />
    );
}
