import axios from "axios";

export function getAllPersons(callback, errorcallback) {
  axios
    .get("http://localhost:5000/api/person")
    .then((res) => {
      if (callback != null) {
        callback(res);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

export function deletePerson(personId, callback, errorcallback) {
  axios
    .delete(`http://localhost:5000/api/person/${personId}`)
    .then((res) => {
      if (callback != null) {
        console.log(res.data.deletedCount + " person(s) deleted successfully");
        callback(res);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        console.log(
          "There was a problem deleting the user from the database with error: " +
            err.message
        );
        errorcallback(err);
      }
    });
}

export function updatePerson(updateData, callback, errorcallback) {
  axios
    .patch(`http://localhost:5000/api/person/${updateData._id}`, updateData)
    .then((res) => {
      if (callback != null) {
        console.log("Person updated successfully");
        callback(res);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        console.log(
          "There was a problem updating the user from the database with error: " +
            err.message
        );
        errorcallback(err);
      }
    });
}

export function getPersonById(personId, callback, errorcallback) {
  axios
    .get(`http://localhost:5000/api/person/${personId}`)
    .then((res) => {
      if (callback != null) {
        callback(res);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        console.log(
          "There was a problem getting the user from the database with error: " +
            err.message
        );
        errorcallback(err);
      }
    });
}

export function getPersonByName(data, callback, errorcallback) {
  axios
    .get(
      `http://localhost:5000/api/person?firstname=${data.firstname}&lastname=${data.lastname}`
    )

    .then((res) => {
      if (callback != null) {
        callback(res);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        console.log(
          "There was a problem getting the user from the database with error: " +
            err.message
        );
        errorcallback(err);
      }
    });
}

export function newPerson(newPersonData, callback, errorcallback) {
  axios
    .post("http://localhost:5000/api/person", newPersonData)
    .then((res) => {
      if (callback != null) {
        console.log("New person added successfully");
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        console.log("Error creating new user: " + err.message);
      }
      errorcallback(err);
    });
}
