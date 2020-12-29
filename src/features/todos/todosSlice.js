const initialState = [
  {
    id: 1,
    content:
      "Est nisi duis nulla velit elit deserunt mollit veniam minim id reprehenderit id.",
    completed: false,
  },
  {
    id: 2,
    content:
      "Laborum fugiat nulla nostrud excepteur esse excepteur nostrud minim cillum sunt.",
    completed: false,
  },
  {
    id: 3,
    content:
      "Sit incididunt exercitation minim aute ex cupidatat dolore excepteur aliqua deserunt eu.",
    completed: false,
  },
];

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default todosReducer;
