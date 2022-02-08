import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {accountService} from '@/_services';
import '../Admin.css';

function List() {
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    accountService.getAll().then(x => setUsers(x));
  }, []);
  function deleteUser(id) {
    setUsers(users.map(x => {
      if (x.id === id) { x.isDeleting = true; }
      return x;
    }));
    accountService.delete(id).then(() => {
      setUsers(users => users.filter(x => x.id !== id));
    });
  }

  return (
    <div className="user-list">
      <h1 className="">Users</h1>
        <div className="d-flex justify-content-between align-items-center">
          <Link to='add'
                className="btn btn-sm btn-primary mb-2">
           Add User
          </Link>
          <Link to="/admin"
                className="back-to-admin">
           Back to admin
          </Link>
        </div>
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: '30%' }}>Username</th>
            <th style={{ width: '30%' }}>Email</th>
            <th style={{ width: '30%' }}>Role</th>
            <th style={{ width: '10%' }}></th>
          </tr>
        </thead>
        <tbody>
          {users && users.map(user =>
            <tr key={user.id}>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td style={{ whiteSpace: 'nowrap' }}>
                <Link to={`edit/${user.id}`}
                      className="btn btn-sm btn-primary me-1"
                      style={{width: '3.75rem'}}>
                  Edit
                </Link>
                <button onClick={() => deleteUser(user.id)}
                        className="btn btn-sm btn-primary"
                        style={{ width: '3.75rem' }}
                        disabled={user.isDeleting}>
                  {user.isDeleting
                    ? <span className="spinner-border spinner-border-sm"></span>
                    : <span>Delete</span>
                  }
                </button>
              </td>
            </tr>
          )}
          {!users &&
            <tr>
              <td colSpan="4"
                  className="text-center">
                <span className="spinner-border spinner-border-lg align-center"></span>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  );
}
export {List};
