// Generate ID unik tanpa library eksternal
function uuidv4() {
  return 'id-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
}

// State awal
export const initialState = {
  todos: [],
  currentUser: null,
  isAuthenticated: false,
};

// Reducer function
export function todoReducer(state, action) {
  switch (action.type) {

    case 'LOGIN':
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
      };

    case 'LOGOUT':
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
      };

    case 'SET_TODOS':
      return {
        ...state,
        todos: action.payload,
      };

    case 'ADD_TODO': {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.title,
        description: action.payload.description,
        priority: action.payload.priority,
        deadline: action.payload.deadline,
        completed: false,
        ownerId: state.currentUser.id,
        sharedWith: action.payload.sharedWith || [],
        createdAt: new Date().toISOString(),
      };
      return {
        ...state,
        todos: [...state.todos, newTodo],
      };
    }

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, ...action.payload.data }
            : todo
        ),
      };

    case 'SHARE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id !== action.payload.todoId) return todo;
          if (todo.sharedWith.includes(action.payload.userId)) return todo;
          return {
            ...todo,
            sharedWith: [...todo.sharedWith, action.payload.userId],
          };
        }),
      };

    default:
      return state;
  }
}