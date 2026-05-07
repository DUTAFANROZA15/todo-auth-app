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

    // Login user
    case 'LOGIN':
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
      };

    // Logout user
    case 'LOGOUT':
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
      };

    // Set semua todos (saat pertama load)
    case 'SET_TODOS':
      return {
        ...state,
        todos: action.payload,
      };

    // Tambah tugas baru
    case 'ADD_TODO':
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

    // Hapus tugas
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    // Tandai selesai / belum selesai
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    // Edit tugas
    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, ...action.payload.data }
            : todo
        ),
      };

    // Berbagi tugas ke user lain
    case 'SHARE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.todoId
            ? {
                ...todo,
                sharedWith: todo.sharedWith.includes(action.payload.userId)
                  ? todo.sharedWith
                  : [...todo.sharedWith, action.payload.userId],
              }
            : todo
        ),
      };

    default:
      return state;
  }
}