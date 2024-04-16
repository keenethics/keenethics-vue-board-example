interface Resource {
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface APIResponse<T> {
  data: T;
}
