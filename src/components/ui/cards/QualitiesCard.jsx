import React from "react";
import QualitiesList from "../qualities/QualitiesList";
import PropTypes from "prop-types";

export default function QualitiesCard({ renderBadges, id }) {
    return (
        <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                    <QualitiesList
                        id={id}
                        renderBadges={renderBadges}
                    />
                </h5>
                <p className="card-text">Качества</p>
            </div>
        </div>
    );
}

QualitiesCard.propTypes = {
    renderBadges: PropTypes.func.isRequired,
    id: PropTypes.array.isRequired
};
