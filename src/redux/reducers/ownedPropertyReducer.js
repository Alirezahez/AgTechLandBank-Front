import * as ACTION_TYPES from "../../actions/actionTypes";

import img1 from "./Property-23090354-LargePhoto-1.png";
import img2 from "./r2532116-1-m.jpg";

const initialState = {
    ownedProperties: [
        {
            id: 0,
            address: "SE-12-20-33-W1",
            stock: 7.78,
            totalWorth: 26500,
            currentPrice: 2540,
            investmentReturn: 25,
            img: img1,
        },
        {
            id: 2,
            address: "SE-53-10-23-W1",
            stock: 5.78,
            totalWorth: 35600,
            currentPrice: 6540,
            investmentReturn: -15,
            img: img2,
        },
    ],
    myWallet: { funds: 15000 },
};

export default function ownedPropertyReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPES.BUY_MYPROPERTY_STOCK: {
            console.log({
                ...state,
                ownedProperties: state.ownedProperties.map((property) =>
                    property.id === action.payload.id
                        ? {
                              ...property,
                              totalWorth:
                                  parseFloat(property.totalWorth) +
                                  parseFloat(property.currentPrice),
                              stock:
                                  parseFloat(property.stock) +
                                  parseFloat(action.payload.amountBought),
                          }
                        : property
                ),
                myWallet: {
                    funds:
                        state.myWallet.funds -
                        parseFloat(action.payload.amountBought) *
                            parseFloat(
                                state.ownedProperties.find(
                                    (property) =>
                                        action.payload.id === property.id
                                ).currentPrice
                            ),
                },
            });
            return {
                ...state,
                ownedProperties: state.ownedProperties.map((property) =>
                    property.id === action.payload.id
                        ? {
                              ...property,
                              totalWorth:
                                  parseFloat(property.totalWorth) +
                                  parseFloat(property.currentPrice),
                              stock:
                                  parseFloat(property.stock) +
                                  parseFloat(action.payload.amountBought),
                          }
                        : property
                ),
                myWallet: {
                    funds:
                        state.myWallet.funds -
                        parseFloat(action.payload.amountBought) *
                            parseFloat(
                                state.ownedProperties.find(
                                    (property) =>
                                        action.payload.id === property.id
                                ).currentPrice
                            ),
                },
            };
        }
        case ACTION_TYPES.SELL_MYPROPERTY_STOCK: {
            return {
                ...state,
                ownedProperties: state.ownedProperties.map((property) =>
                    property.id === action.payload.id
                        ? {
                              ...property,
                              totalWorth:
                                  property.totalWorth - property.currentPrice,
                              stock: property.stock - action.payload.amountSold,
                          }
                        : property
                ),
                myWallet: {
                    funds:
                        state.myWallet.funds +
                        action.payload.amountBought *
                            state.ownedProperties.find(
                                (property) => action.payload.id === property.id
                            ).currentPrice,
                },
            };
        }
        case ACTION_TYPES.GET_MYPROPERTY_DATA: {
            return {
                ...state,
                ownedProperties: action.payload.ownedProperties,
            };
        }
        case ACTION_TYPES.GET_MYWALLET_DATA: {
            return {
                ...state,
                myWallet: action.payload.myWallet,
            };
        }
        default:
            return state;
    }
}
