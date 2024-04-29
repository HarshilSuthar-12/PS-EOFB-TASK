import React from 'react';
import '../css/Globals.css';

function User() {
  return (
    <div className="con">
      <h2 className="section-header">
        <i className="fas fa-info-circle"></i>User Information
      </h2>
      <table id="information-table">
        <tbody>
          <tr>
            <th>Name</th>
            <td>Harshil Suthar</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>i01014@3eco.com</td>
          </tr>
          <tr>
            <th>Job Title</th>
            <td>Engineer</td>
          </tr>
          <tr>
            <th>OU Path</th>
            <td>3E Contractor/Harshil Suthar</td>
          </tr>
          <tr>
            <th>Account Status</th>
            <td>Activated</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default User;
