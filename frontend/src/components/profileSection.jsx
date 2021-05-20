import React from "react";

const ProfileSection = (props) => {
  const { person, profileFields } = props;
  return (
    <div className="profile-container">
      <table>
        <tbody>
          {profileFields.map((p) => (
            <tr key={p.name}>
              <th scope="row" className="profile-container-row">
                {p.label}
              </th>
              <td className="profile-container-cell">{person[p.name]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfileSection;
