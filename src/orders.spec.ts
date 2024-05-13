import {getTotalPrice, getOrdersByQuery} from "./orders"
import { orders,  Order,
GetOrdersSearchItemsCountNegativeError,
GetOrdersSearchNoConditionError,
GetOrdersSearchQueryError,
GetOrdersSearchTotalPriceArgIsNegativeError,
GetOrdersSearchTotalPriceFormatError,
OrdersQuery} from './shared/orders.models';

describe('getTotalPrice', () => {

    it.each([[0,[]],[4361, orders[0].items],[6633, orders[2].items]])("Testing getTotalPrice() function, with diferent data", (expectedResult, params) => {
        expect(getTotalPrice(params)).toBe(expectedResult)
    })

})

describe('getOrdersByQuery', () => {
    it.each([[GetOrdersSearchQueryError, "qq"]])("Should throw 'GetOrdersSearchQueryError' Error, if serch.lenght < 3", (expectedResult, params) => {
        const query: OrdersQuery = { search: params };
        if (expectedResult) {
            expect(() => getOrdersByQuery(query)).toThrow(expectedResult);
        }
    })

    it("Should not throw 'GetOrdersSearchQueryError' Error, if search.length < 3", () => {
        const search = "qqq";
        const query: OrdersQuery = { search };
        expect(() => getOrdersByQuery(query)).not.toThrow(GetOrdersSearchQueryError);
    });

    it.each([[GetOrdersSearchItemsCountNegativeError, -1]])("should throw error if itemsCount is negative", (expectedResult, params) => {
        const query: OrdersQuery = { itemsCount: params };
        if (expectedResult) {
            expect(() => getOrdersByQuery(query)).toThrow(expectedResult);
        }
    })

    it("should throw error if eq and gt or lt are not null", () => {
        const query: OrdersQuery = { totalPrice: { eq: 1, gt: 2 } };
        expect(() => getOrdersByQuery(query)).toThrow(GetOrdersSearchTotalPriceFormatError);
      });
    
    it("should not throw error if either gt or lt is not null, but without eq", () => {
        const queryForGt: OrdersQuery = { totalPrice: { gt: 50 } };
        const queryForLt: OrdersQuery = { totalPrice: { lt: 50 } };
        expect(() => getOrdersByQuery(queryForGt)).not.toThrow(GetOrdersSearchTotalPriceFormatError);
        expect(() => getOrdersByQuery(queryForLt)).not.toThrow(GetOrdersSearchTotalPriceFormatError);
    });

    it("Should throw 'GetOrdersSearchTotalPriceArgIsNegativeError' Error, if eq < 0", () => {
        const query: OrdersQuery = { totalPrice: { eq: -1 } }
        expect(() => getOrdersByQuery(query)).toThrow(GetOrdersSearchTotalPriceArgIsNegativeError);
    })

    it("Should not throw 'GetOrdersSearchTotalPriceArgIsNegativeError' Error, if eq < 0", () => {
        const query: OrdersQuery = { totalPrice: { eq: 1 } }
        expect(() => getOrdersByQuery(query)).not.toThrow(GetOrdersSearchTotalPriceArgIsNegativeError);
    })

    it("Should throw 'GetOrdersSearchTotalPriceArgIsNegativeError' Error, if lt < 0", () => {
        const query: OrdersQuery = { totalPrice: { lt: -1 } }
        expect(() => getOrdersByQuery(query)).toThrow(GetOrdersSearchTotalPriceArgIsNegativeError);
    })

    it("Should not to throw 'GetOrdersSearchTotalPriceArgIsNegativeError' Error, if lt < 0", () => {
        const query: OrdersQuery = { totalPrice: { lt: 1 } }
        expect(() => getOrdersByQuery(query)).not.toThrow(GetOrdersSearchTotalPriceArgIsNegativeError);
    })

    it("Should throw 'GetOrdersSearchTotalPriceArgIsNegativeError' Error, if gt < 0", () => {
        const query: OrdersQuery = { totalPrice: { gt: -1 } }
        expect(() => getOrdersByQuery(query)).toThrow(GetOrdersSearchTotalPriceArgIsNegativeError);
    })

    it("Should not to throw 'GetOrdersSearchTotalPriceArgIsNegativeError' Error, if gt < 0", () => {
        const query: OrdersQuery = { totalPrice: { gt: 1 } }
        expect(() => getOrdersByQuery(query)).not.toThrow(GetOrdersSearchTotalPriceArgIsNegativeError);
    })

    it("should not throw error if conditions are present", () => {
        const query: OrdersQuery = { search: "varius et, euismod" };
        expect(() => getOrdersByQuery(query)).not.toThrow(GetOrdersSearchNoConditionError);
    });
    
    it("should throw error if no conditions are present", () => {
        const query: OrdersQuery = {};
        expect(() => getOrdersByQuery(query)).toThrow(GetOrdersSearchNoConditionError);
    });
})