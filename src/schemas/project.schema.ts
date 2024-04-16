import { object, string, type InferType } from 'yup';

const schema = object().shape({
  name: string().required(),
  description: string().optional(),
});

export type ProjectSchema = InferType<typeof schema>;

export default schema;
