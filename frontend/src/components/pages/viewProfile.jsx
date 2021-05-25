import React, { Component } from "react";
import ProfileSection from "../profileSection";
import { getPersonById } from "../../utils/personAPI";

class ViewProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: "",
      firstName: "",
      lastName: "",
      jobTitle: "",
      role: "",
      organisation: "",
      department: "",
      email: "",
      phoneWork: "",
      phoneMobile: "",
      location: "",
    };
  }

  componentDidMount = async () => {
    this.getUser();
  };

  getUser() {
    const personId = this.props.match.params.id;
    getPersonById(personId, (res) => {
      this.setState(res.data);
    });
  }

  render() {
    const { profileFields } = this.props;
    const person = this.state;
    return <ProfileSection person={person} profileFields={profileFields} />;
  }
}

export default ViewProfile;
