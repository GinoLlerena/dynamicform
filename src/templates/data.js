module.exports = {
    "formId": "14779320789550015k4v",
    "name": "My Custom Dynamic Form",
    "formElements": [{
      "displayName": "First Name",
      "displayOrder": 1,
      "required": false,
      "elementId": "mainPerson.firstname",
      "type": "text",
      "readOnly": false,
      "parentInfo": []
    }, {
      "displayName": "Last Name",
      "displayOrder": 2,
      "required": false,
      "elementId": "mainPerson.lastname",
      "type": "text",
      "readOnly": false,
      "parentInfo": []
    }, {
      "displayName": "Company",
      "displayOrder": 3,
      "required": false,
      "elementId": "mainPerson.standardCompanyname",
      "type": "text",
      "readOnly": false,
      "parentInfo": []
    }, {
      "displayName": "Job Title",
      "displayOrder": 4,
      "required": false,
      "elementId": "mainPerson.jobtitle",
      "type": "text",
      "readOnly": true,
      "parentInfo": []
    }, {
      "displayName": "Sales Rep First Name",
      "displayOrder": 5,
      "required": false,
      "elementId": "salesPersonFirstName",
      "type": "text",
      "readOnly": true,
      "parentInfo": []
    }, {
      "displayName": "Sales Rep Last Name",
      "displayOrder": 6,
      "required": false,
      "elementId": "salesPersonLastName",
      "type": "text",
      "readOnly": true,
      "parentInfo": []
    }, {
      "displayName": "Sales Rep Email",
      "displayOrder": 7,
      "required": false,
      "elementId": "salesPersonEmail",
      "type": "text",
      "readOnly": true,
      "parentInfo": [],
    }, {
      "displayName": "Status",
      "displayOrder": 8,
      "required": false,
      "elementId": "status",
      "formElementValues": [{
        "displayName": "Approved",
        "displayOrder": 1,
        "elementvalueId": "approved"
      }, {
        "displayName": "Declined",
        "displayOrder": 2,
        "elementvalueId": "declined"
      }, {
        "displayName": "Pending",
        "displayOrder": 3,
        "elementvalueId": "pending"
      }],
      "type": "radio",
      "readOnly": true,
      "parentInfo": [],
    }, {
      "displayName": "Registered?",
      "displayOrder": 9,
      "required": false,
      "elementId": "registered",
      "formElementValues": [{
        "displayName": "Registered",
        "displayOrder": 1,
        "name": "Registered",
        "elementvalueId": "yes"
      }],
      "type": "checkbox",
      "readOnly": true,
      "parentInfo": []
    }]
}
