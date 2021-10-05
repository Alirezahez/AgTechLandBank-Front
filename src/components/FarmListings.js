import React, { useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "./../actions/actionCreators";

import FarmListing from "./FarmListing";

const FarmListings = (props) => {
    useEffect(() => {
        props.fetchOwnedProperties();
    }, []);
    return (
        <div>
            {props.ownedProperties.map((ownedProperty) => {
                return (
                    <FarmListing
                        key={ownedProperty.id}
                        ownedProperty={ownedProperty}
                    />
                );
            })}
        </div>
    );
};

const mapStateToProps = (state) => ({
    ownedProperties: state.ownedPropertyReducer.ownedProperties,
});

const mapActionsToProps = (state) => ({
    fetchOwnedProperties: actions.fetchMyPropertyData(state.dispatch),
});

export default connect(mapStateToProps, mapActionsToProps)(FarmListings);
