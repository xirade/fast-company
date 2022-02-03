import React from "react";
import QualitiesList from "../qualities/QualitiesList";
import PropTypes from "prop-types";

export default function QualitiesCard({ renderBadges, qualities }) {
    return (
        <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                    <QualitiesList
                        qualities={qualities}
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
    qualities: PropTypes.array.isRequired
};
