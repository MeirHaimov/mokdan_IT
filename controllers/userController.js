const fs = require('fs');
const path = require('path');

const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../dev-data/example.json'), 'utf-8')
);

exports.searchUsers = (req, res) => {
  const { query } = req.query; 

  if (!query) {
    return res.status(400).json({
      status: 'fail',
      message: 'נא בצע חיפוש תקין על ידי הזנת מזהה אישי, שם פרטי או שם משפחה'
    });
  }

  const filteredUsers = users.filter(user => {
    return (
      user.personalId.includes(query) ||
      user.firstName.includes(query) ||
      user.lastName.includes(query)
    );
  });

  res.status(200).json({
    status: 'success',
    results: filteredUsers.length,
    data: {
      users: filteredUsers
    }
  });
};