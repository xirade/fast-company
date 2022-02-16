import React from "react";
import Quality from "./Quality";
import PropTypes from "prop-types";
import { useQualities } from "src/hooks/useQualities";
import Loader from "src/components/common/Loader";

export default function QualitiesList({ id, renderBadges }) {
    const { getQuality, isLoading } = useQualities();
    const qualities = id.map((d) => getQuality(d._id));
    if (!isLoading) {
        return (
            <>
                {qualities.map((qual) => (
                    <Quality key={qual._id} {...{ qual, renderBadges }} />
                ))}
            </>
        );
    }
    return <Loader />;
}

QualitiesList.propTypes = {
    id: PropTypes.array.isRequired,
    renderBadges: PropTypes.func.isRequired
};
