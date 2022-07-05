import { boolean, number, object, string } from 'zod';

export const createProductSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    price: string({
      required_error: 'Price is required',
    }),
    type: number({
      required_error: 'Type is required',
    }),
    top: boolean({
      required_error: 'Top is required',
    }),
    category: string({
      required_error: 'Category is required',
    }),
  }),
});
