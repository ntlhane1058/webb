const [isAdmin, setIsAdmin] = useState(false); // New state for admin checkbox

const handleAddUser = () => {
  // Ensure only admins can create users
  const currentUser = users.find(user => user.email === email && user.isAdmin);

  if (!currentUser || !currentUser.isAdmin) {
    alert('Only admins can add users.');
    return;
  }

  if (users.some(user => user.email === email)) {
    alert('User with this email already exists.');
    return;
  }

  const newUser = { name, email, password, isAdmin }; // Include isAdmin state
  const updatedUsers = [...users, newUser];
  setUsers(updatedUsers);
  saveUsersToLocalStorage(updatedUsers);
  setName('');
  setEmail('');
  setPassword('');
  setIsAdmin(false); // Reset checkbox
};
