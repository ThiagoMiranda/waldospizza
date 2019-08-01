// @flow
export type UserState = {
    name: string,
    email: string,
    avatar: string,
    orders: Array<Object>,
    logged: boolean
}

export type PizzaState = {
    size: ?string,
    price: number,
    toppings: Array<string>,
    maxToppings: ?number
}

export type Action = {
    type: string,
    payload: any
}
